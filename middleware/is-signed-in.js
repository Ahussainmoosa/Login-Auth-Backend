const isSignedIn = (req, res, next) => {
  if (req.user) return next();
  res.redirect("/auth/sign-in");
};

module.exports = isSignedIn;