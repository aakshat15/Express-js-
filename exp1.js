const express = require('express');
const app = express();

app.get('/' , (req , res) => {
    res.send('<h1>THis is from server</h1>');
});

app.listen(3000, (req,res) => {
    console.log('http://localhost:3000');  
})
