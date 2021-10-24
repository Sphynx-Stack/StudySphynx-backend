const express = require('express');
const { userID } = require('../../middleware/auth');
const { Course } = require('../../models/course');
const { User } = require('../../models/user');
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
        res.status(200).json({course, redirect : 'dashboard.html'});
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

// POST -> (:id) => Select a course for a user
route.post('/:id', [userID ,express.json()], async (req, res) => {
    try {
        let user = await User.findOne({ user_id : req.user_id });
        if(!user){
            return res.json({msg: "User not found"});
        }
        let crs = await Course.findById(req.params.id);
        if(!crs){
            return res.json({msg: "Course not found"});
        }
        if(user.courses.filter((course)=> course.id.toString() === req.params.id)){
            return res.status(400).json({msg: 'Course already taken.'});
        }
        user.courses.unshift(req.params.id);
        user.recents.unshift(req.params.id);
        user.recents.slice(0,4);
        await user.save();
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
})


// GET => () => Getting all Recent Courses
route.get('/recents', [userID, express.json()], async(req, res)=>{
    try {
        let user = await User.findOne({ user_id : req.user_id });
        if(!user){
            return res.json({msg: "User not found"});
        }
        return res.json(user.recents);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
})

// GET => () => Getting all of my courses
route.get('/mycourses', [userID, express.json()], async(req, res)=>{
    try {
        let user = await User.findOne({ user_id : req.user_id });
        if(!user){
            return res.json({msg: "User not found"});
        }
        return res.json(user.courses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
})

// PUT -> (:cid) => Put notes in c course for user
route.put('/:course_id/notes', userID, async (req, res)=>{
    try {
        let user = await User.findOne({ user_id : req.user_id });
        if(!user){
            return res.json({msg: "User not found"});
        }
        let crs = await Course.findById(req.params.course_id);
        if(!crs){
            return res.json({msg: "Course not found"});
        }
        if(user.notes.filter((n)=>n.course.toString === req.params.course_id)){
            user.notes = user.notes.filter(
                (n) => n.course.toString === req.params.course_id
            );
        }

        user.notes.unshift({
            content:req.body.content,
            course:req.params.course_id
        });
        await user.save();
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
})

// GET -> () => Get all Notes
route.get('/notes', userID, async (req, res)=>{
    try{
        let user = await User.findOne({ user_id : req.user_id });
        if(!user){
            return res.json({msg: "User not found"});
        }
        return res.json(user.notes);
    }catch(error){
        console.error(error);
        return res.status(500).json({error});
    }
})

// GET -> (:cid) => Get Notes for c course
route.get('/:course_id/notes', userID, async (req, res)=>{
    try{
        let user = await User.findOne({ user_id : req.user_id });
        if(!user){
            return res.json({msg: "User not found"});
        }
        user.notes.forEach(({content, course})=>{
            if(course === req.params.course_id){
                return res.json({content, course});
            }
        })
        return res.json({msg: "Notes not found"});
    }catch(error){
        console.error(error);
        return res.status(500).json({error});
    }
})

module.exports = route;