const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";
const app = express();
app.use(express.json());

mongoose.connect(
    "mongodb+srv://eshalal9693:esha2127E@cluster0.3mrzxzx.mongodb.net/user_app",
  );

const User = mongoose.model("Users", {
    name: String,
    email: String,
    password: String,
  }); 

function userExists(username, password) {
    let userExists=false;
    for(let i=0;i<ALL_USERS.length;i++){
      if(ALL_USERS[i].username==username && ALL_USERS[i].password==password){
          userExists=true;
      }
    }
    return userExists
  }

app.post("/signin", async function (req, res) {
    const { username, password } = req.body;

    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesn't exist in our in-memory db",
        });
    }

    const token = jwt.sign({ username }, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        const users = ALL_USERS.filter(user => user.username !== username);
        return res.json(users);
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid token",
        });
    }
});
app.post("/signup",async function(req,res){
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const existingUser= await User.findOne({email:username});
    if(existingUser){
        return res.status(400).send("username already exist");
    }
    const user=new User({
        name:name,
        email:username,
        password:password
    })
    user.save();
    res.json({
        "msg":"user created succesfully"
    });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
