import express from 'express';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';

const router = express.Router();

router.post('/', (req, res) => {
  // not passing 'password'
  // password is hashed, not using raw password
  const { email, password } = req.body.user;
  const user = new User({ email });
  user.setPassword(password);
  user
    .save()
    .then(userRecord => res.json({ user: userRecord.toAuthJSON()}))
    .catch( (err) => res.status(400).json( {errors: parseErrors(er.errors)} ))
});

export default router;
