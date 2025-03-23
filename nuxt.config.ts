export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@prisma/nuxt',
    ['@nuxtjs/google-fonts', {
      families: {
        Roboto: true,
        Inter: [400, 500, 700],
      }
    }],
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
        password: process.env.REDIS_PASSWORD,
        db: 0,
      },
    },
  },
})