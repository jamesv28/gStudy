
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/g_study'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
