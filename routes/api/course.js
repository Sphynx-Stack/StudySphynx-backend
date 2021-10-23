const express = require('express');
const Course = require('../../models/course');

const route = express.Router();

route.get('/courseList', async (req, res) => {
    try {
        let userMap = {};
        let users = await Course.find({});
        
        users.forEach(user => {
            userMap[user._id] = user;
        });

        return res.send(userMap);
    
    } catch (error) {
        console.error(error);
        res.status(404).json({error});
    }
})

module.exports = route;