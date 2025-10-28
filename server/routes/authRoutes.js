

import express from "express";

const router = express.Router();

import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import bcrypt from 'bcrypt';

const generateToken = async (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
    return token;
}
// Dummy token generation for illustration    

// Signup 
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    const exist = await User.findOne({ email })
    if (!name || !email || !password) {
        return res.json({ success: false, message: "Fields are missing" });
    }
    if (exist) {
        return res.json({ success: false, message: "User already exists" });
    }
    // get random profile image

    const profileImage = `https://api.dicebear.com/7.x/avataaars/png?seed=${name}`;
const newUser = new User({ name, email, password, profileImage });
await newUser.save();
    const token = await generateToken(newUser._id);
    res.json({ success: true, message: "User created successfully", data: { user: newUser, token } });
});




router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "Fields are missing" });
    }   
    const exist = await User.findOne({ email })
    if (!exist) {
        return res.json({ success: false, message: "User does not exist" });
    }
    
    //password check
    const isMatch = await bcrypt.compare(password,exist.password);
    if(!isMatch){
        return res.json({ success: false, message: "Invalid credentials" });
    } 

    const token = await generateToken(exist._id);
    res.json({ success: true, message: "Login successful", data: { user: exist, token } });
});

export default router;  