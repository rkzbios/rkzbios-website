//const withMDX = require('@next/mdx')()
//module.exports = withMDX()


module.exports = {
    env: {
        JIMBO_API_HOST: 'http://jimbogo.com'
    },
    publicRuntimeConfig: {
      API_URL: process.env.API_URL
    },
    webpack: (config) => {
      config.module.rules.push(
        {
          test: /\.md$/,
          use: 'raw-loader'
        }
      )
  
      return config
    },
  }
