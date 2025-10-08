const User = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, password, email, role } = req.body;
        const userexist = await User.findOne({ email });
        if (userexist) {
            return res.status(400).json({ message: 'User already exists' });
        }
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All credentials required" });
          }
        const user = new User({ name, password, email, role });
        await user.save();
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({
            message: 'User created successfully',
           token,
           user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
           }
          })
    } catch (err) {
            res.status(500).json({ message: err.message });
         }
    }
  

    const login = async (req, res) => {
        try {
            const { email, password, role } = req.body;
            const user = await User.findOne({ email })      
            if(!user){
                return res.status(400).json({ message: 'User not found' });
            }
            if (user.role !== role) {
                return res.status(400).json({ message: "No credentials found for this role" });
              }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({ message: 'Invalid password' });
            }
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({
                message: 'User logged in successfully',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            })

        } catch (err) {
            res.status(500).json({ message: err.message });
        } 
    }
 module.exports = {login, register };
