const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json')
const app = express();

const port = 4000;

//MIDDLEWARE - PLUGINN

app.use(express.urlencoded({ extended: false}));

//RETRUN ALL USERS
// app.get('/api/users', (req, res) => {
//     return res.json(users);
// })

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
app.post('/api/user/post' , (req , res) =>{
    const body = req.body;
    users.push({...body , id: users.length+1 })
    // console.log('body' ,body);
    fs.writeFile('./MOCK_DATA.json' , JSON.stringify(users) , (err , data) => {
        return res.json({status : 'success' , id: users.length})
    } )
    
})

// ROUTE BY
app.route('/api/users/:id')
.get((req , res)  => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id );
    return res.json(user);    
})
.patch((req , res ) => {
    const id = Number(req.params.id);
    const body = req.body;
    console.log(body);
    const userIndex = users.findIndex(user => user.id === id);

    if(userIndex === -1){
        return res.status(404).json({status: 'error' , message: ' User not found'}) 
    }
        users[userIndex] = { ...users[userIndex], ...body };
        return res.json( {status : 'Succeess'})
})
.delete((req , res ) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex, 1);
    return res.json( {status : 'panding'})
})


app.listen(port, () => console.log(`Start Server ${port}`));