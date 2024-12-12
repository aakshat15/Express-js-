const express = require('express');
const users = require('./MOCK_DATA.json')
const app = express();

const port = 3000;

//RETRUN ALL USERS
app.get('/api/users', (req, res) => {
    return res.json(users);
})

//RETRUN IN TABLE FORMATE
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((users) => `<li>${users.first_name}</li>`).join('')}
    </ul>
    `;
    return res.send(html)
})


//  RETRUN WITH OUR ROUTE
// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id)
//     return res.json(user);
// })


// POST REQUEST
app.post('/api/users/:id' , (req , res) =>{
   res.json({status : 'panding'})
})


// ROUTE BY
app.route('/api/users/:id')
.get((req , res)  => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id );
    return res.json(user);    
})
.patch((req , res ) => {
    return res.json( {status : 'panding'})
})
.delete((req , res ) => {
    return res.json( {status : 'panding'})
})
app.listen(port, () => console.log(`Start Server ${port}`));