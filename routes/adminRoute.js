const express = require('express');
const route = express();
route.get('/', (req, res) => {
    res.render('home', {
        path: '/'
    });
});
module.exports = route;