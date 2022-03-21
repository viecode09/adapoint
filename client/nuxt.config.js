export default {
  target: "static",
  ssr: false,
  buildDir: ".n",
  head: {
    titleTemplate: "%s - Adapoint",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Welcome to Adapoint App!",
      },
      {
        hid: "robots",
        name: "robots",
        content: "index, follow",
      },
    ],
    link: [
      {
        hid: "icon",
        rel: "icon",
        type: "image/png",
        // href: '/favicon.png',
      },
    ],
  },
  components: true,
  cli: {
    badgeMessages: ["Service Landing"],
  },

  modules: [
    "@nuxtjs/sitemap",
    "@nuxtjs/axios",
    "@nuxtjs/toast",
    "@nuxtjs/auth-next",
    "nuxt-highcharts",
  ],
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/device", "@nuxtjs/moment"],
  plugins: ["~/plugins/qr-reader.js", "~/plugins/qr-generator.js"],
  axios: {
    baseURL: process.env.GATEWAY
      ? process.env.GATEWAY
      : "https://api-adapoint.satrio.ac",
  },
  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      callback: false,
      home: "/app/home",
    },
    strategies: {
      local: {
        token: {
          name: "X-ADAPOINT",
          property: "data",
          global: true,
          type: false,
          maxAge: 86400,
        },
        user: {
          property: "data",
        },
        endpoints: {
          login: { url: "login", method: "post" },
          logout: false,
          user: { url: "me", method: "get" },
        },
      },
    },
  },
  router: {
    middleware: ["auth"],
  },
  device: {
    refreshOnResize: true,
  },
  toast: {
    position: "bottom-center",
    duration: 4500,
  },
  vuetify: {
    treeShake: true,
    defaultAssets: {
      font: {
        family: "Rubik",
      },
    },
    theme: {
      light: true,
      themes: {
        light: {
          primary: "#16347A",
          accent: "#526CFF",
          secondary: "#F2994A",
          info: "#06A0C1",
          warning: "#F2994A",
          error: "#EB5757",
          success: "#7BBC78",
        },
      },
    },
  },

  server: {
    host: "0",
    port: 3333,
  },
  sitemap: {
    hostname: "https://adapoint.satrio.ac",
    gzip: true,
    defaults: {
      changefreq: "daily",
      priority: 1,
      lastmod: new Date(),
    },
  },
};
