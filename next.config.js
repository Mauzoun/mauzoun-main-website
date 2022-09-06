module.exports = {
  i18n: {
    locales: ["en-US", "ar"],
    defaultLocale: "en-US",
  },
  images: {
    domains: ["i.imgur.com", "writingandwellness.com"],
  },
  target: "serverless",
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  },

}



