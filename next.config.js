const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname)],
    prependData: `
      @import "styles/_custom-variables.scss";
      @import "styles/_vars.scss";`,
  },
}

module.exports = nextConfig
