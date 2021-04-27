const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./routes/adminRoute');
const mongoose = require('mongoose');
const app = express();
app.set('views', 'views');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(adminRoute);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://Games:wintermelon@itisdevc5.0sb4n.mongodb.net/ITISDEVC5', {useNewUrlParser: true, useUnifiedTopology: true});
app.listen(3000);