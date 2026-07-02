const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello from Day 2!'));

app.get('/about', (req, res) => res.send('This is the about page of Day 2!'));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}); //server created
app.listen(3000); //server is listening on port 3000 (started)