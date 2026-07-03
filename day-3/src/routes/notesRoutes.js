const express = require('express');
const router = express.Router();

const notes = [];

router.post('/', (req, res) => {
    notes.push(req.body);
    console.log(notes);
    res.send('note created');
});

router.get('/', (req, res) => {
    console.log('notes in get method:', notes)
    res.send(notes);
});

router.delete('/:index', (req, res) => {
    delete notes[req.params.index];
    res.send('note deleted');
});

router.patch('/:index', (req, res) => {
    notes[req.params.index].content = req.body.content;
    res.send('notes updated');
});

module.exports = router;