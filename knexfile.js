
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/gStudy'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
