/* This script generates mock data for local development.
  This way you don't have to point to an actual API,
  but you can enjoy realistic, but randomized data,
  and rapid page loads due to local, static data.
 */
/* eslint-disable */

var fs = require('fs')
var Chance = require('chance')
var jsf = require('json-schema-faker')
var mockDataSchema = require('./schema')

jsf.extend('chance', function() {
  return new Chance()
})

var json = JSON.stringify(jsf(mockDataSchema))

fs.writeFile('./db.json', json, err => {
  if (err) {
    return console.log(err)
  } else {
    console.log('Mock data generated.')
  }
})
