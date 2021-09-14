// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    chainWebpack: (config) => {
        // GraphQL Loader
        config.module
          .rule('graphql')
          .test(/\.(graphql|gql)$/)
          .use('graphql-tag/loader')
          .loader('graphql-tag/loader')
          .end();
      },
};
