const express = require('express');
const route = express.Router();

route.delete('/', (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge : 1});
        res.status(200).json({msg : "successfully logged out", redirect: '/'});
        return;
    
    } catch (error) {
        console.error(error);
        res.status(404).json({error});
        return;
    }
})

module.exports = route;