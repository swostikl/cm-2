const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')

// Create JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// Signup a user
const signupUser = async (req, res) => {
  const { name, email, password, phone_number, gender, address } = req.body

  try {
    if (!name || !email || !password || !phone_number || !gender || !address)
      throw new Error('All fields must be filled')

    if (!validator.isEmail(email)) throw new Error('Email not valid')
    if (!validator.isStrongPassword(password))
      throw new Error('Password not strong enough')
    if (!validator.isMobilePhone(phone_number))
      throw new Error('Invalid phone number')

    const exists = await User.findOne({ email })
    if (exists) throw new Error('Email already in use')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hash,
      phone_number,
      gender,
      address,
    })

    const token = createToken(user._id)

    res.status(201).json({ email, token })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) throw new Error('All fields must be filled')

    const user = await User.findOne({ email })
    if (!user) throw new Error('Incorrect email')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Incorrect password')

    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = { signupUser, loginUser }
