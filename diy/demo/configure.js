var {
  generateProject
} = require('diy');

generateProject(_ => {
  _.collect("all", _ => {
    _.toFile( "_site/client.js", _ => {
      _.minify( _ => {
        _.concat( _ => {
          _.js("src/*.js")
        })
      })
    })
  })
})
