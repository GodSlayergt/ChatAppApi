

const GoogleStrategy =require('passport-google-oauth').OAuth2Strategy;
const User=require("../model/user");
const config=require("../../config");

module.exports = (passport)=>{

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



passport.use(new GoogleStrategy({
      clientID: config.google_client_id,
     clientSecret: config.google_client_secret,
    callbackURL: "http://127.0.0.1:3001/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    
    User.findOrCreate({ googleid: profile.id},{name:profile.displayName,
                                              password:profile.id,
                                              email:profile.emails.find((email)=>{return (email.verified==true)}).value },
       function (err, user) {
      console.log("user saved");
      return done(err, user);
    });
  }
));

}