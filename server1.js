const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
// make your own middleware to fetch public assets
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response)=>{
    // response.send('<h1>Hello express!</h1>');
    response.send({
        name:'Abhishek',
        likes: ['Play', 'TV', 'Food']
    });

}); 

app.get('/about',(request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});
  
app.get('/bad',(request, response) => {
    response.send({
        errorMessage: 'Error handling request',
        code: 400
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});