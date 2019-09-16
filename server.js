const express = require('express');
const app = express();



//First Route
app.get('/', (req,res) => res.send('hello team 3!'));

const port = 5104;

app.listen(port, () => console.log(`Server running on ${port}`));