import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import { validateString } from '../../utils/helpers.js';


const register = async (req, res) => {
  try {
    const { username, password } = req.body;


      if(!validateString(username) || !validateString(password)){
           return res.status(400).json({ message: 'Validation Error' });
      }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: newUser._id,
            username: newUser.username,
        }
    });

  } catch (error) {
      console.error("Error in register controller:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

      if(!validateString(username) || !validateString(password)){
          return res.status(400).json({ message: 'Validation Error' });
      }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.status(200).json({ message: 'Successfully logged in', token });
  } catch (error) {
      console.error("Error in login controller:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { register, login };