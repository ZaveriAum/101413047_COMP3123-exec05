const express = require('express');
const app = express();
const router = express.Router();
const path = require('path')

const user_info = require('./user.json')

router.use(express.json())
router.use(express.urlencoded({extended:true}))

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
   res.sendFile(path.join(__dirname, '/home.html'));
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.sendFile(path.join(__dirname, 'user.json'));
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req,res) => {
  let username = req.body.username
  let password = req.body.password

  if(user_info.username !== username){
    res.send(JSON.stringify(
      {
        "status": false,
        "message": "User Name is invalid"
    }
  ))
  }
  else if(user_info.password !== password){
    res.send(JSON.stringify(
      {
        "status": false,
        "message": "Password is invalid"
      }
    ))
  }
  else{
    res.send(JSON.stringify(
      {
        "status": true,
        "message": "User Is valid"
      }
    ))
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req,res) => {
  let username = req.params.username
  res.send(`<b>${username} successfully logout.<b>`);
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((err,req,res,next) => {
  res.status(500)
  res.send('<b>Server Error</b>');
});

app.use('/', router);

app.listen(process.env.port || 1000);

console.log('Web Server is listening at port '+ (process.env.port || 1000));

/*
Question:- 6

- Why is `express.Router()` used in Express.js applications, and how does it benefit the code structure?

Only Express.js natively enables developers to create modular and mountable route handlers.
In other words, it is used to organize and manage your routing logic far better, which becomes especially true as your application has grown in complexity.
*/

/*
Question:- 7

- How would you implement error handling in the Express routes to ensure that any issues (such as file not found or server errors) are appropriately handled? Provide an example.

Express.js error handling ensures that such events as "file not found" (404 errors), "server errors" (500 errors), or any other unexpected issues fall into the safety net of the
programmed error handler and get processed on their own without server crashes or nonspecific error responses to the client.

*/

/*  
Bonus question:-
- How would you implement error handling in the Express routes to ensure that any issues (such as file not found or server errors) are appropriately handled? Provide an example.

This block checks for the PORT environment variable, which would normally be set by the hosting provider or operating system once the app has been deployed.
This would be the fallback port that the app should use if the PORT environment variable is not set. In this case,
it becomes the default port to make use of when one is running the app on one's localhost or on a development environment.

*/
