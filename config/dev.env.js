'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:8201/mall-admin"'
  BASE_API: '"http://127.14.113.191:8201/mall-admin"'
})
