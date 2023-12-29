const express=require('express');
const users=require("./MOCK_DATA.json");
const fs=require('fs')

const app=express();
const port=8000;

//using middlewares
app.use(express.urlencoded({extended: false}));

//ROUTES

//  GET request to get all the data from our MOCK DATA file

app.get('/api/users',(req,res)=>{
    return res.json(users);
});
//sending html
//server side rendering
app.get('/users',(req,res)=>{
    const html=`
        <ul>
            ${users.map((user)=>`<li>${user.first_name}</li>`).join('')}
        </ul>
    `;
    res.send(html);
})

//Dynamic path parameter :
// get /api/users/:id
//getting user
app.get('/users/api/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    if(!user)   return res.status(404).json({error : 'user not found'});
    return res.json(user);
});

//POST
//create a new user
app.post('/users/api/',(req,res)=>{
    const body=req.body;
    if(!body.first_name){
        //using HTTP Status Codes //good practice //bad request - 400
        return res.status(400).json({msg:'First name required'})
    }
    // console.log(body);
    users.push({...body, id : users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.status(201).json({
            status:"success",
            id: users.length
        });
    });
});

//patch
//update the user
app.patch('users/api/:id',(req,res)=>{
    return res.json({status:"pending"});
});
//delete
app.delete("/users/api/:id", (req, res) => {
    return res.json({status:"pending"});
});

app.listen(port,()=>console.log(`server started at port:${port}`));