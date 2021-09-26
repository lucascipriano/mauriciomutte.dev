require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const pluginConfig = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/posts`,
      name: `posts`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/assets`,
      name: `assets`,
    },
  },
  {
    resolve: `gatsby-plugin-google-fonts`,
    options: {
      fonts: [`Nunito Sans\:400,600,700,800`],
      display: 'swap',
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 590,
          },
        },
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            languageExtensions: [
              {
                language: 'superscript',
                extend: 'javascript',
                definition: {
                  superscript_types: /(SuperType)/,
                },
                insertBefore: {
                  function: {
                    superscript_keywords: /(superif|superelse)/,
                  },
                },
              },
            ],
            prompt: {
              user: 'root',
              host: 'localhost',
              global: false,
            },
          },
        },
      ],
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Maurício Mutte`,
      short_name: `Maurício Mutte`,
      start_url: `/`,
      background_color: `#101723`,
      theme_color: `#101723`,
      display: `standalone`,
      icon: `static/favicon.png`,
    },
  },
  `gatsby-plugin-netlify-cms`,
  `gatsby-plugin-offline`,
  `gatsby-plugin-react-helmet`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-styled-components`,
];

if (process.env.CONTEXT === 'production') {
  const analytics = {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GOOGLE_ANALYTICS_ID,
      head: false,
    },
  };

  pluginConfig.push(analytics);
}

module.exports = {
  siteMetadata: {
    title: `Maurício Mutte`,
    author: `Maurício Mutte`,
    description: `Prazer, sou o Maurício Mutte, desenvolvedor Full Stack focado principalmente em React, NodeJS e GraphQl.`,
    siteUrl: `https://mauriciomutte.github.io`,
    social: {
      twitter: `mauriciomutte`,
    },
  },
  pathPrefix: '/',
  plugins: pluginConfig,
};
