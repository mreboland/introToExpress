"use strict";

// 1. Require express package
// We use require instead of import as this is a Node app and not react. The line of code does nothing in of itself.
const express = require("express");

// Instantiate a router
// The express.Router() class allows us to create modular, mountable route handlers.This allows us to group routes related to a particular section of our application.
// For example, we can group all of the functionality related to user accounts by appending /users to the end of our API URL, and adding our endpoint after this. We can have /users/login, /users/signup, /users/forgotpass, etc.
const router = express.Router();

// 2. Instantiate express "app"
// We call the express function in order to use it's library. Think of express() as a way of saying, "I want to create a new empty application".
const app = express();

// 3. Add simple GET handler
// This is an endpoint that will provide us with a response. We are telling Express how to respond to a particular type of request from the client.
// A get method on app is telling Express that we want to respond to requests with a method of GET.
// The first argument is the path we want to respond to. Think of it as everything that comes after your domain name in a URL. By entering /, we're saying that we want to respond to requests that are made without any additional information after the domain name.
// Inside this function, we're going to specify what we should send back to the user. There are always at least 2 arguments passed to this function:
// req is an object that contains information about the request.We'll look at this in more detail later.
// res allows us to build a response to send back to the user.
// There is also a third argument, next, that is used for error handling and some more advanced functionality
app.get("/", (req, res) => {
    res.send("hello world");
});

////////////////////////////////////////////////////////////////////////////////////////////////////

// Exercise 2 - Utilizing the res object


// There are a variety of ways to send info via res using app.get

// 1. Send HTML
app.get("/html", (req, res) => {
    res.send('<h1>Hello World</h1><br /><h3>HTML Route<h3>');
});

// 2. Send JSON
app.get("/json", (req, res) => {
    res.send({ main: "hello world", meta: "JSON route" })
});

// 3. Send custom status code
app.get("/", (req, res) => {
    res.status(418).send({
        data: "I'm a Teapot"
    });
});

// res.send: Sends data back to the client.If you pass a string, it will be sent as HTML.If you send a JavaScript object, it will be sent as JSON.
// res.status(code): Set the status of the response.
// res.set(name, value): Set a header on the response.
// res.redirect(path): Redirect the user to another URL.

////////////////////////////////////////////////////////////////////////////////////////////////////


// Exercise 3 - Utilise the req object

// req object is used to represent the HTTP request itself and contains properties for the query string, parameters that are being set, headers, and other info pertaining to the request itself.

// 1. req.query
app.get("/query", (req, res) => {
    const { completed } = req.query;

    res.json({ data: req.query });
});
// This is an object containing a property for each query string parameter

// 2. req.params
app.get("/params/:id", (req, res) => {
    const { id } = req.params;

    res.json({ data: req.params });
});
// This is an object containing properties that are mapping to named route parameters. Named route parameters are specified by the colon prior to their name in the route, as shown by ID in the above example.

// 3. req.method
app.get("/method", (req, res) => {
    res.json({ data: req.method });
});
// req.method will hold a string that corresponds to the HTTP method of the request (GET, POST, PUT, DELETE, etc).

// 4. req.path
app.get("/path", (req, res) => {
    res.json({ data: req.path });
});
// req.path will hold the specific path of the request URL. For this example, the path is /path.

// req has a ton of extra functionality.Express will automatically parse the URL for you, and puts the information directly in the req variable for you.

// Some useful properties of req are as follows:

// req.query: The parsed querystring of the request.
// req.params: Any named parameters associated with the requests.
// req.method: The method of the request.
// req.path: The path being requested.

////////////////////////////////////////////////////////////////////////////////////////////////////

// Exercise 4 - Express Router

// We need to first run the Router function from express at the top of the file

// Add route handlers
router.route("/")
    .get((req, res) => {
        // Respond with JSON data
        res.json({
            data: {
                path: req.path,
                method: req.method,
            }
        });
    })
    .post((req, res) => {
        // Response with JSON data
        res.json({
            data: {
                path: req.path,
                method: req.method,
                payload: req.body,
            }
        });
    });

// Add router as middleware to "app"
app.use("/router", router);


////////////////////////////////////////////////////////////////////////////////////////////////////

// Exercise 5 - Serve HTML Files

const options = {
    make: 'Ford',
    model: 'Mustang',
    year: 1969
}

// app.use(express.static("public", options));
// When using the.static method, the root argument specifies the root directory from which to serve static assets.
// When you call app.use(), you’re telling Express to use a piece of middleware. Middleware is a function that Express passes requests through before sending them to your routing functions, such as your app.get('/') route. express.static() finds and returns the static files requested. The argument you pass into express.static() is the name of the directory you want Express to serve files. Here, the public directory. 

app.use(express.static("public", options));



////////////////////////////////////////////////////////////////////////////////////////////////////

// 4. Start app
// This tells express to start our server and specify which port to listen on. It can be accessed by going to http://localhost:3000 when the server is run.
app.listen(3000, () => {
    console.log("app running...");
});

