const isAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('back');
  }
};

module.exports = { isAuth };
