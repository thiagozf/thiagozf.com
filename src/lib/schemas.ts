import { site } from '@/site'
import { type CollectionEntry } from 'astro:content'
import type { BlogPosting, Person, WithContext } from 'schema-dts'
import { getPostImage, getPostURL } from './posts'

const buildAuthorSchema = (author: CollectionEntry<'authors'>): Person => {
  const { id, data } = author
  const { name, email } = data
  const url = new URL(`/authors/${id}`, site.url).href
  const image = new URL(`/og/authors/${id}`, site.url).href
  return {
    '@type': 'Person',
    name,
    url,
    email,
    image,
  }
}

export const buildPostSchema = (
  post: CollectionEntry<'blog'>,
  author: CollectionEntry<'authors'>,
): WithContext<BlogPosting> => {
  const image = getPostImage(post)
  const url = getPostURL(post)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    author: buildAuthorSchema(author),
    headline: post.data.title,
    datePublished: post.data.date.toISOString(),
    dateCreated: post.data.date.toISOString(),
    description: post.data.description,
    keywords: post.data.tags,
    image,
    url,
  }
}
