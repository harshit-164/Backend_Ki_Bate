const express = require('express');
const router = express.Router();
const path = require('path');

const notesModel = require('../models/notes.model')

router.post('/api/create', async (req, res)=>{

    const {title, description} = req.body;
    const notes =  await notesModel.create({
        title, description
    });

    res.status(201).json({
        message: 'note created'
    });

});

router.get('/api/notes', async (req, res)=>{
    const notes = await notesModel.find();
    res.status(200).json({
        message: 'notes fetched sucessfully',
        notes
    });
});

router.delete('/api/notes/:id', async (req, res)=>{
    const note = await notesModel.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(200).json({
            message: 'note deleted'
        });
    })
});

router.patch('/api/notes/:id', async (req, res)=>{
    const {description, title} = req.body;
    const note = await notesModel.findByIdAndUpdate(req.params.id, {description, title}).then(()=>{
        res.status(201).json({
            message: 'updated note'
        });
    });
});

router.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});


module.exports = router;