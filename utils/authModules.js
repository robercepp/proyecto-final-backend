function auth(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect("/");
    }
  }

  function notAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/productos");
    }
    return next();
  }

  module.exports = {auth, notAuth}