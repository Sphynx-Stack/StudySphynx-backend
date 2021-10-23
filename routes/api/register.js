const express = require('express');
const route = express.Router();
const User = require('../../models/userauth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

route.get('/', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            res.status(200).json(user);
            return;
        }
        else {
            throw Error("User Not Found");
        }
        

   } catch (error) {
        console.log(error);
        res.status(400).json({ error });
   } 
});

route.post('/',express.json(), async (req, res) => {

    try {
        console.log(req.body, req.url, req.complete, req.query);
        const { user: name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ msg: 'User already exists' });
            return;
        }
        if (!name || !email || !password) {
            res.status(400).json({ msg: 'Incorrect credentials' });
            return;
        }
        else {

            const new_user = await User.create({
                name,
                email,
                password
            });

            console.log('Succesfully new user created');
            res.status(201).json({ msg: 'success redirecting to home', redirect: 'feature.html' });
            return;
        }
        
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: error });
    }
});

module.exports = route;