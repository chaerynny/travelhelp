const { User } = require('../../models');
const bcrypt = require('bcrypt');

/*
1. check req.email & password from the db
  1. if no email matches
    1. res err, 401 sign up first
  2. if email exists on db
    1. but the password does not match from the db
      1. res err, 401 wrong password
    2. & password matches
      1. update last visitsed time
      2. store sign in information(user ID) on session
      3. Succeed sign in! res 200
        1. redirect to Home page(handle from client side)
*/

module.exports = {
  askSignin: async (req, res) => {

    try {
      const { email, password } = req.body;

      // bring the user information with req.body.email
      const userData = await User.findOne({
        where: {
          email: email
        }
      });
      
      // check req.body.email exists on db
      if (!userData) {
        res.send({ status: 404, message: 'You need to sign up first.' });
      }
      // redirect user to email verification page when email is not verified
      else if (userData && !userData.dataValues.is_email_verified) {
        res.send({ status: 403, message: 'You need to verify your email first' });
      }
      else {
        // compare req.body.password && hashed password from db
        bcrypt.compare(password, userData.dataValues.password, (err, result) => {
          // catch err or wrong password, 
          if (err || !result) { 
            console.log('Error from password: ', err);
            res.status(401).send({ message: 'Wrong password.' });
          }
          else {
            // store user information & sign in status & visit times on the session
            req.session.user_id = userData.dataValues.id;
            req.session.user_name = userData.dataValues.name;
            req.session.user_email = userData.dataValues.email;
            req.session.user_language = userData.dataValues.language;
            req.session.visit_count = userData.dataValues.visit_count;

            if (req.session.visit_count) {
              req.session.visit_count++;
            } else {
              req.session.visit_count = 1;
            }
  
            // excutes this callback after saving the session
            req.session.save(() => {
              console.log('current session ID: ', req.session.id);
              console.log(`${req.session.user_name} visited Travel Help ${req.session.visit_count} times`)

              // update last visited time & visit count on users table from the db
              User.update({
                last_visited_at: new Date(),
                visit_count: req.session.visit_count
              }, {  
                where: {
                  id: userData.dataValues.id
                }
              });

              // send user info to client side as an object
              res.status(200).send({
                id: req.session.user_id,
                name: req.session.user_name,
                email: req.session.user_email,
                language: req.session.user_language
              });
            });
          }
        });
      }
    }
    catch (err) {
      // response err to the client
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });  
    }
    
  }
};
