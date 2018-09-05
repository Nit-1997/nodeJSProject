module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;


    //signup
    passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback: true 
    },
    function(req, email, password, done) {
        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
            if (user)
            {
                return done(null, false);
            } else{
                var data =
                {
                    email: email,
                    password: password,
                    name:req.body.name
                };
                User.create(data).then(function(newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }

                });

            }

        });

    }

    ));


    //login
    passport.use('local-signin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true 
    },
    function(req, email, password, done) {
        var User = user;
        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
            if (!user) {
                return done(null, false);
            }
            if (!isValidPassword(user.password, password)) {
                return done(null, false);
            }

            var userinfo = user.get();
            return done(null, userinfo);
        }).catch(function(err) {
            console.log("Error:", err);
            return done(null, false);
        });
    }
    ));

}