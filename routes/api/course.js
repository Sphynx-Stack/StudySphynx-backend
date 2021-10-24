const express = require('express');
const { Course } = require('../../models/course');
// const CourseSegmentSchema = require('../../models/coursesegment.schema');
// const Flashcard = require('../../models/flashcard.schema');

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        let userMap = [];
        let users = await Course.find({});
        
        users.forEach(user => {
            userMap.push(user);
        });

        return res.json({user: userMap});
    
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
})

route.post('/add', express.json(), async (req, res) => {
    const {segement, flashcards, ...data} = req.body;
    // console.log(req.body);
    try {

        let course = await Course.create({
            ...data,
            segments: segement,
            flashcards,
            reviews: []
        });

        console.log('successfully added a course');
        res.status(200).json(course);
        return;
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
})


// GET -> (:id) => Get us a specific course
route.get('/:id', express.json(), async (req, res) => {
    try {
        let crs = await Course.findById(req.params.id);
        if(!crs){
            return res.json({msg: "Course not found"});
        }
        return res.json(crs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
})



module.exports = route;