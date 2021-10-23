const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: '../.env' });
const User = require('../models/userauth.model');

const requireAuth = async (req, res, next) => {
    const token = res.cookies.jwt;
    try {
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    console.log(err.message)
                    return res.status(400).json({error : err});
                } else {
                    console.log(decoded);
                }
            })
        }
        
        next();

    } catch (error) {
        console.error(error);
        return res.status(400).json({error});
    }
};

const userID = async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);
    try {
        if(token){
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if(err){
                    console.log(err.message);
                    return res.status(400).json({error : err});
                }
                else{
                    console.log(decoded.id);
                    req.user_id = decoded.id;
                }
            })
        }

        next();
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({error});
    }
}

module.exports = { userID, requireAuth };