const express = require('express');
      hbs = require('hbs');
      fs = require('fs');
      port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
        console.log('Can not append to server.log')
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// }); 

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (normalText) => {
    return normalText.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
/*    res.send({
        name: 'Robocop',
        fears: ['water', 'rain', 'snow'],
        isImmortal: false 
    }); */
    res.render('home.hbs', {
        welcomeMessage: 'Much welcome. Many thanks. Wow!',
        pageTitle: 'Home Page'
    })
});

app.get('/about', (req, res) => {
    // res.send('Something about Robocop') we'll use view engiine instead
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'You came to wrong neigborhood...'
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}, lets rock!`)
});