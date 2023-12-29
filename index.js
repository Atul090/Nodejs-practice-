const express=require('express');
const users=require("./MOCK_DATA.json");


const app=express();
const port=8000;

//routes
app.get('/api/users',(req,res)=>{
    return res.json(users);
});
//sending html
app.get('/users',(req,res)=>{
    const html=`
        <ul>
            ${users.map((user)=>`<li>${user.first_name}</li>`).join('')}
        </ul>
    `;
    res.send(html);
})

//Dynamic path parameter
// get /api/users/:id

app.get('/users/api/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id===id);
    return res.json(user);
});

//post
app.post('/users/api/',(req,res)=>{
    return res.json({status:"pending"});
});

//patch
app.patch('users/api/:id',(req,res)=>{
    return res.json({status:"pending"});
});
//delete
app.delete("/users/api/:id", (req, res) => {
    return res.json({status:"pending"});
});

app.listen(port,()=>console.log(`server started at port:${port}`));