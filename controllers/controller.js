const Product = require('../models/product');
exports.getHome = (req, res) => {
    var date = new Date();
    var dateToday = getFullDay(date.getDay()) + ", " + getFullMonth(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();
    var startOfWeek = date.getDate() - date.getDay();
    var endOfWeek = startOfWeek + 6;
    var weekStart = new Date(date.setDate(startOfWeek));
    var weekEnd = new Date(date.setDate(endOfWeek));
    res.render('home', {
        path: '/',
        dateToday: dateToday,
        weekDate: getFullMonth(weekStart.getMonth()) + " "+ weekStart.getDate() + ", " + " " + weekStart.getFullYear() + " - " + getFullMonth(weekEnd.getMonth()) + " " +weekEnd.getDate() + ", "  + " " + weekEnd.getFullYear()
    });
};
exports.getInventory = (req, res) =>{
    res.render('inventory', {
        path: '/inventory'
    });
}
exports.getProducts = (req, res) => {
    var date = new Date();
    var dateToday = getFullDay(date.getDay()) + ", " + getFullMonth(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();
    Product.getProducts().then(result => {
        Product.getOnStock().then(result2 => {
            Product.getOutOfStock().then(result3 => {
                res.render('products', {
                    path: '/products',
                    products: result,
                    dateToday: dateToday,
                    totalProducts: result.length,
                    onStock: result2.length,
                    outOfStock: result3.length
                });
            });
        });
    }).catch(err => {
        console.log(err);
    })
}
function getFullDay(d) {
    var array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return array[d];
}
function getFullMonth(m) {
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return month[m];
}