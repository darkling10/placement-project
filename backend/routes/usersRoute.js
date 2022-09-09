const express = require("express");
const userController = require("../controller/usersController");
const route = express.Router();
const bodyParser = require("body-parser");
const cors = require('cors')

// route.use(bodyParser.urlencoded({ extended: false }));
route.options('*', cors())

route.use(express.json())
var jwt = require("jsonwebtoken");
const { application } = require("express");




function authenticateToken(req, res, next) {
    const authHeader = req.headers['x-access-token']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWTSECRETKEY, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }


//Route:/users/
route.get("/", (req, res) => {
  res.send("Hiiiiiii");
});

route.post("/add", userController.userAdd);

//Route:/users/list
route.get("/list",authenticateToken, userController.userList);

route.post("/login", userController.userLogin);

route.delete("/logout",userController.userLogout)



module.exports = route;
