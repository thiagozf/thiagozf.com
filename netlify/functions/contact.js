const {URL} = require('url')
const Mailgun = require('mailgun-js')
const ow = require('ow')
const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const doc = require('rehype-document')
const format = require('rehype-format')
const html = require('rehype-stringify')

function markdownToHtml(markdownString) {
  return unified()
    .use(markdown)
    .use(remark2rehype)
    .use(doc)
    .use(format)
    .use(html)
    .process(markdownString)
    .then(x => x.contents)
}

const isEmail = ow.string.is(e => /^.+@.+\..+$/.test(e))

const isDomain = ow.string.is(e =>
  new RegExp(
    /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/,
    'igm',
  ).test(e),
)

ow(
  process.env.MAILGUN_API_KEY,
  'MAILGUN_API_KEY environment variable is not set',
  ow.string.minLength(1),
)
ow(
  process.env.MAILGUN_DOMAIN,
  'MAILGUN_DOMAIN environment variable is not set',
  isDomain,
)

const mailgun = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
})

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

async function handler(event) {
  const runId = Date.now().toString().slice(-5)
  // eslint-disable-next-line no-console
  const log = (...args) => console.log(runId, ...args)

  const origin = new URL(event.headers.origin)
  const acceptable =
    (origin.hostname === 'localhost' &&
      process.env.NODE_ENV !== 'production') ||
    origin.hostname === 'thiagozf.com'
  if (!acceptable) {
    return Promise.reject({
      statusCode: 403,
      body: 'Unacceptable request',
      headers,
    })
  }
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      body: 'CORS ok',
      headers,
    }
  }
  const {name, email, subject, body, ...otherData} = JSON.parse(event.body)

  try {
    log('> Validating input', ' name: ', name, ' email:', email)
    ow(name, 'Name is too short', ow.string.minLength(1))
    ow(name, 'Name is too long', ow.string.maxLength(60))
    ow(email, 'Email is invalid', isEmail)
    ow(
      subject,
      'Please keep the subject to a reasonable length',
      ow.string.minLength(5),
    )
    ow(
      subject,
      'Please keep the subject to a reasonable length',
      ow.string.maxLength(120),
    )
  } catch (e) {
    log('> Validation failed', e.message)
    return Promise.reject({
      statusCode: 403,
      body: e.message,
      headers,
    })
  }

  const otherDataString = JSON.stringify(otherData, null, 2)

  const text = `${body}\n\n---\n\nOther form data:\n\`\`\`\n${otherDataString}\n\`\`\`\n`
  const sender = `"${name}" <${email}>`

  const message = {
    from: sender,
    to: `"Thiago" <hi+site@thiagozf.com>`,
    cc: sender,
    subject,
    text,
    html: await markdownToHtml(text),
  }

  try {
    log('> Sending...')
    await mailgun.messages().send(message)
    log('> Send success!')
  } catch (error) {
    log('> Send failure!', error.message)
    return Promise.reject({
      statusCode: 500,
      body: error.message,
      headers,
    })
  }

  return {
    statusCode: 200,
    body: JSON.stringify({success: true}),
    headers,
  }
}

module.exports = {handler}
