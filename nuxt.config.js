import colors from 'vuetify/es5/util/colors'
export default {
  head: {
    titleTemplate: '%s - project',
    title: 'project',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
  ],
  axios: {
    proxy: true, 
    baseURL : 'http://localhost:3000',
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': '06c7e94db7ef447c8eb5699f84940671'
    }
  },
  proxy: {
    '/api/': {
      target: 'http://api.football-data.org/v4/',
      changeOrigin: true,
      pathRewrite: { '^/api/': ''}
    },
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.indigo.lighten1,
          accent: colors.indigo.darken3,
          secondary: colors.indigo.darken3,
          info: colors.indigo.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.indigo.accent3,
        },
      },
    },
  },
  build: {},
}
