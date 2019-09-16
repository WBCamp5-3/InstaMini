const express = require('express');
const app = express();



//First Route
app.get('/', (req,res) => res.send('hello'));

const port = 5104;

app.listen(port, () => console.log(`Server running on ${port}`));