export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@prisma/nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    'nuxt-file-storage',
    [
      '@vee-validate/nuxt',
      {
        autoImports: true,
      },
    ],
    ['@nuxtjs/google-fonts', {
      families: {
        Roboto: true,
        Inter: [400, 500, 700],
      }
    }],
    '@nuxt/image',
    '@nuxt/icon'
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  },
  nitro: {
    storage: {
      redis: {
        driver: "redis",
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: 0,
      },
    },
  },
  colorMode: {
    classSuffix: ''
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg', href: '/logo-site.svg' }]
    }
  }
})