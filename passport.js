module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    var bCrypt = require('bcrypt-nodejs');

    var multer = require('multer');
    var storage = multer.diskStorage({
      filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
    var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter});
var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'dskmn0vwa', 
    api_key:"943622486141547", 
    api_secret:"klX-ayutXqmxdZUmtL9bXhTQbro"
});
//

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
        //hashing the password
        var generateHash = function(password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
            if (user)
            {
               res.flash("error",'That email is already taken');
               return done(null, false);
           } else{
               var userPassword = generateHash(password);
               var data =
               {
                email: email,
                mode:req.body.mode,
                password: userPassword,
                name:req.body.name,
                contact:req.body.contact,
                password:userPassword,
                image:req.body.image,
                createdAt:new Date()
            };
            cloudinary.uploader.upload(req.file.path, function(result) {
              data.image = result.secure_url;
              User.create(data).then(function(newUser, created) {
                if (!newUser) {
                    return done(null, false);
                }
                if (newUser) {
                    req.flash("success","Welcome to clubbo "+newUser.name);
                    return done(null, newUser);
                }

            });
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
        var isValidPassword = function(userpass, password) {
           return bCrypt.compareSync(password, userpass);
       }
       User.findOne({
        where: {
            email: email
        }
    }).then(function(user) {
        if (!user) {
            res.flash("error",'Email does not exist');
            return done(null, false);
        }
        if (!isValidPassword(user.password, password)) {
            res.flash("error",'Incorrect password.');
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