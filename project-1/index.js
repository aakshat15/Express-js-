const express = require('express');
const fs = require('fs');
// const users = require('./MOCK_DATA.json');
const mongoose = require("mongoose");
const app = express();

const port = 4000;


//     --------->CREATE A SCHEMA FOR CONNECT WITH MONGODB(MODLE)
const userschema =  mongoose.Schema({
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
    }
})


//--------------------->CREATE A MODLE FOR MONGODB;
const User = mongoose.model('user',userschema);


//-------------->MONGO CONNECT WITH SERVER
mongoose.connect("mongodb://localhost:27017/Users")
.then(() => console.log("MongoDb Connected"))
.catch( err => console.log("Mongo ERR",err))


//MIDDLEWARE - PLUGINN

app.use(express.urlencoded({ extended: false}));


//CREATE A MIDDLEWARE BY USING USE KEYWORD.

// app.use((req , res ,next) => {
//     console.log('this is 1St middleWare');
//     next();
// })

//RETRUN ALL USERS 
app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    res.setHeader('myName' , 'AkshaYadav')
    console.log(req.headers);
    return res.json(allDbUsers);
})

//RETRUN IN TABLE FORMATE
app.get('/users', async (req, res) => { 
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((users) => `<li>${users.firstname}- ${users.email}</li>`).join('')}
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
app.post('/api/user/post', async (req, res) => {
    const body = req.body;

    // Validate required fields
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "All fields are required." });
    }

        // Create a new user
        const result = await User.create({
            firstname: body.first_name,
            lastname: body.last_name,
            email: body.email,
            gender: body.gender,
            jobtitle: body.job_title,  // Include job_title here
        });
        // console.log("result", result);
        return res.status(201).json({ msg: "Success" });
});


// ROUTE BY
app.route('/api/users/:id')
.get(async (req , res)  => {
    const user = await User.findById(req.params.id);
    if( !user ) return res.status(404).json({ error: "user not found"})
        return res.json(user);
})
.patch(async (req , res ) => {
    
    const user = await User.findByIdAndUpdate(req.params.id , { lastame : "Changed"});
        return res.json( {status : 'Succeess'})
})
.delete(  async (req , res ) => {
    // const id = Number(req.params.id);
    // const userIndex = users.findIndex((user) => user.id === id);
    // users.splice(userIndex, 1);

    const user = await User.findByIdAndDelete(req.params.id);
    return res.json( {status : 'panding'})
})


app.listen(port, () => console.log(`Start Server ${port}`));