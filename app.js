const express = require('express');
const app = express();
const port = 3001;
const exampleController = require('./examples.controller');
const controller = require('./controller');

app.use(express.json()) // => req.body

//Insert for signup
app.post("/api/signup", controller.signUp);

//Post for login
app.post("/api/login", controller.login);

//Post for change password
app.post("/api/changepassword", controller.changepassword);






//########################EXAMPLES#################################

//example Post by username
app.post("/post-single", exampleController.postSingleUserByUsername);


//example Get
app.get("/get-all", exampleController.getAllUser);


//example Get by username
app.get("/get-single/:username", exampleController.getSingleUserByUsername);


//Put request for updating the user
app.put("/put-user/:id",exampleController.updateUserById);

//Delete request for deleting a user
app.delete("/delete-user/:id", exampleController.deleteUserById);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.send('about')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})