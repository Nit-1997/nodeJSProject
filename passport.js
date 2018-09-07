module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

   //serialize
   passport.serializeUser(function(user, done) {
    done(null, user.id);
   });

   // deserialize user 
   passport.deserializeUser(function(id, done) {   
    User.findById(id).then(function(user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
   });

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
                console.log('nahi mila');
                return done(null, false);
            } else{
                console.log('milgaya');
                var data =
                {
                    email: email,
                    password: password,
                    name:req.body.name,
                    contact:req.body.contact,
                    createdAt:new Date(),
                    upadtedAt:new Date()
                };
                console.log("data batao");
                console.log(data);
                User.create(data).then(function(newUser, created) {
                    if (!newUser) {
                        console.log('fat gaya');
                        return done(null, false);
                    }
                    if (newUser) {
                        console.log('yahan fata');
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
            var userinfo = user.get();
            console.log(userinfo);
            return done(null, userinfo);
        }).catch(function(err) {
            console.log("Error:", err);
            return done(null, false);
        });
    }
    ));

}