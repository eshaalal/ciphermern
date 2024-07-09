const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";
const app = express();
app.use(express.json());

const ALL_USERS = [
    {
        username: "eshalal@gmail.com",
        password: "123",
        name: "esha lal"
    },
    {
        username: "lana@gmail.com",
        password: "1234",
        name: "lana del rey"
    },
    {
        username: "chotu@gmail.com",
        password: "123",
        name: "chotu lal"
    }
];

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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
