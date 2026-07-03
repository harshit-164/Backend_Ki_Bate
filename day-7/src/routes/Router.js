const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const notesModel = require('../models/notes.model')

router.post('/notes', async (req, res)=>{
    const {title, description} = req.body;
    const notes = await notesModel.create({
        title, description
    });

    res.status(201).json({
        message: 'note created'
    })
    console.log(notes);
}); 

router.get('/notes', async (req, res)=>{
    const notes = await notesModel.find();
    res.status(200).json({
        message: "data fetched sucessfully",
        notes
    });
});

module.exports = router;