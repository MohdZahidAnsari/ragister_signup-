const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
const secretKey = 'your-secret-key'; // Replace with your secret key

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Signup route
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists. Please use a different email.' });
    }

    const user = new User({ name, email, password });
    await user.save();

    // Generate a JWT token with the user's ID
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.cookie('authToken', token, { httpOnly: true }); // Set the JWT token in a cookie
    res.status(201).json({ message: 'Signup successful!', user: { name: user.name, token } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Signin route
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials. Please try again.' });
    }

    // Generate a JWT token with the user's ID
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.cookie('authToken', token, { httpOnly: true }); // Set the JWT token in a cookie
    res.status(200).json({ message: 'Signin successful!', user: { name: user.name, token } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
