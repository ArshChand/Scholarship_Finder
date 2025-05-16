const express = require('express');
const router = express.Router();
const Students = require('../models/student');

router.get('/', async (req, res) => {
    try{
        const students = await Students.find();
        res.json(students);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.post('/', async (req, res) => {
    try{
        const student = new Students(req.body);
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
});

module.exports = router;