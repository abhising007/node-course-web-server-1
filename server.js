const express = require('express');
const hbs = require('hbs'); // handlebars is used to templatize static html pages in view folder e.g header, footer pages   
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); // views/partials folder has reusable static templates
app.set('view engine', 'hbs'); // set hbs as view engine

// create a logger middleware tha captures all requests to website
app.use((request, response, next)=>{
    // next variable is used to tell express that middleware is done - until then the call won't move forward
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
        console.log('Unable to append to server.log file');
        }
    });
    console.log(log);
    //  
    next();
});

// middleware for maintenance page
// app.use((request, response, next)=>{
//     response.render('maintenance.hbs');
// });


// register express middleware to teach it something that it doesn't do by default
app.use(express.static(__dirname + '/public')); // setup path of static pages directory 


// util method to get Year - method used in partials file
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

// util method to make text capital - method is used in partials file
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response)=>{
    // response.send('<h1>Hello express!</h1>');
    // response.send({
    //     name:'Abhishek',
    //     likes: ['Play', 'TV', 'Food']
    // });

    response.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeText: 'Welcome to home page'
    });
});   

app.get('/about',(request, response) => {
    response.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad',(request, response) => {
    response.send({
        error_code: 404,
        error_description: 'Error'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
}); // listen app on 3000

