import { site } from '@/site'
import type { CollectionEntry } from 'astro:content'

export const getPostURL = (post: CollectionEntry<'blog'>) => {
  return new URL(`/blog/${post.id}`, site.url).href
}

export const getPostImage = (post: CollectionEntry<'blog'>) => {
  return new URL(`/og/blog/${post.id}.png`, site.url).href
}
