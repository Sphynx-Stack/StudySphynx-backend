const express = require('express');
const User = require('../../models/user');
const { userID } = require('../../middleware/auth');


const route = express.Router();

route.get('/', userID, async (req, res) => {
    let user_id = req.user_id;
    try {
        let users = await User.findOne({ _id: user_id });
        if(users){
            return res.status(200).json(users);
        }

        throw Error("User Not found");
    } catch (error) {
        console.error(error);
        res.status(400).json({error: error});
    }
})

route.get('/friends/:friend_id', async (req, res) => {
    let friend_id = req.params.friend_id;
    try {
        let friend = await User.findOne({ _id :friend_id });
        if(friend){
            return res.status(200).json(friend);
        }
        throw Error("Friend Not Found");
    
    } catch (error) {
        console.error(error);
        res.status(400).json({error});    
    }
})

route.get('/notifications', userID ,async (req, res) => {
    let _id = req.user_id;
    try {
        let user = await User.findOne({ _id });
        if(user){
            return res.status(200).json({notif : user.notifications});
        }

        throw Error("User Not found");

    } catch (error) {
        console.error(error);
        res.status(400).json({error});
        return;
    }
})