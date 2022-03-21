import User from './models/users.js';

const jwtCallback = async (jwt_payload, done) => {
  const user = await User.findOne({email: jwt_payload.email});
  if (user) {
    return done(null, user);
  }
  return done(null, false);
};

export {
  jwtCallback,
};