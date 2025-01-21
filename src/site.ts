export type Site = {
  title: string
  description: string
  email: string
  url: string
}

export type Link = {
  href: string
  label: string
}

export const site: Site = {
  title: 'thiagozf',
  description: 'Friendly tutorials for developers',
  email: 'hi@thiagozf.com',
  url: 'https://thiagozf.com',
}

export const nav: Link[] = [
  { href: '/blog/', label: 'Blog' },
  { href: '/newsletter/', label: 'Newsletter' },
]

export const social: Link[] = [
  { href: 'https://github.com/thiagozf', label: 'GitHub' },
  { href: 'https://twitter.com/thiagozf', label: 'Twitter' },
  { href: 'hi@thiagozf.com', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]
