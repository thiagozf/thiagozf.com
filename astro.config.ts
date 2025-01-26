import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { transformerCopyButton } from '@rehype-pretty/transformers'
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from '@shikijs/transformers'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import sectionize from '@hbsnow/rehype-sectionize'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://thiagozf.com',

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon(),
  ],

  image: {
    domains: ['github.com', 'x.com', 'twitter.com', 'twimg.com'],
    remotePatterns: [{ protocol: 'https' }],
  },

  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
      rehypeHeadingIds,
      rehypeKatex,
      sectionize,
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'everforest-dark',
            dark: 'everforest-dark',
          },
          transformers: [
            transformerNotationDiff(),
            transformerMetaHighlight(),
            transformerCopyButton({
              visibility: 'hover',
              feedbackDuration: 1000,
            }),
          ],
        },
      ],
    ],
    remarkPlugins: [remarkToc, remarkMath, remarkEmoji],
  },

  server: {
    port: 1234,
    host: true,
  },

  devToolbar: {
    enabled: false,
  },
})
