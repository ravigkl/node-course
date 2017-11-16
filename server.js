const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

   fs.appendFile('server.log', log +'\n', (err)=>{
     if(err){
       console.log('Unable to append server.log');
     }
   } )
  console.log(log);
  next();
})
//maintenance page for site, uncomment when want to enable

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// })

app.get('/', (req, res)=>{
    res.render('home.hbs',{
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to my website',
      currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


app.listen(3000, ()=>{
  console.log('server is up and running on port 3000');
});
