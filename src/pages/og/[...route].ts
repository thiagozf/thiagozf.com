import { OGImageRoute } from 'astro-og-canvas'

const pages = import.meta.glob('/src/content/**/*.{md,mdx}', { eager: true })

const newPages = Object.entries(pages).reduce((acc, [path, page]) => {
  const newPath = path.replace('/src/content', '')
  return { ...acc, [newPath]: page }
}, {})

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages: newPages,
  getImageOptions: (_path, page) => ({
    title: page.frontmatter.title || page.frontmatter.name || '',
    description: page.frontmatter.description || '',
    logo: {
      path: './public/static/logo.png',
      size: [124, 124],
    },
    font: {
      title: {
        families: ['JetBrains Mono', 'monospaced'],
        weight: 'Bold',
        color: [250, 250, 250],
      },
      description: {
        families: ['JetBrains Mono', 'monospaced'],
        color: [211, 198, 170],
      },
    },
    fonts: ['./public/fonts/JetBrainsMono[wght].woff2'],
    bgGradient: [[10, 10, 10]],
  }),
})
