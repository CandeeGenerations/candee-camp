var fs = require('fs')

var db = JSON.parse(fs.readFileSync('db.json'))

module.exports = function(app) {
  app.route('/events').get((req, res) => res.json(db.events))

  app
    .route('/events/:eventId')
    .get((req, res) =>
      res.json(db.events.find(e => e.id === Number(req.params.eventId))),
    )

  app.route('/signin').post((req, res) => res.json(db.signin))

  app.route('/signout').post((req, res) => res.json(db.signout))

  app.route('/forgotpassword').post((req, res) => res.json(db.forgotPassword))

  app
    .route('/validateresetpasswordtoken')
    .post((req, res) => res.json(db.validateResetPasswordToken))

  app.route('/resetpassword').post((req, res) => res.json(db.resetPassword))
}
