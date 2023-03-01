import passport from 'passport';

export const loginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: 'Successfully Loged In',
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: 'Not Authorized' });
  }
};

export const loginFailed = (req, res) => {
  res.status(401).json({
    error: true,
    message: 'Log in failure',
  });
};

export const getDataGoogle = passport.authenticate('google', ['profile', 'email']);

export const AuthGoogle = passport.authenticate('google', {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: '/login/failed',
});

export const logoutGoogle = (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
};
