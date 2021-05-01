const Product = require('../models/product');
const History = require('../models/priceHistory');
const OrderSale = require('../models/orders');
exports.getHome = (req, res) => {
    var date = new Date();
    var startOfWeek = date.getDate() - date.getDay();
    var weekStart = new Date(date.setDate(startOfWeek));
    date = new Date();
    var dateToday = getFullDay(date.getDay()) + ", " + getFullMonth(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();
    OrderSale.getOrdersToday().then(result => {
        OrderSale.getWeeklyOrders().then(result2 => {
            var todaySum = 0;
            var weeklySum = 0;
            for (var i = 0; i< result.length; i++)
                todaySum+=parseFloat(result[i].totalSale);
            for (var i = 0; i < result2.length; i++)
                weeklySum += parseFloat(result2[i].totalSale);
            res.render('home', {
                path: '/',
                dateToday: dateToday,
                weekDate: getFullMonth(weekStart.getMonth()) + " "+ weekStart.getDate() + ", " + " " + weekStart.getFullYear() + " - " + getFullMonth(date.getMonth()) + " " + date.getDate() + ", "  + " " + date.getFullYear(),
                todaysOrders: result.length,
                earnedToday: todaySum,
                weeklyOrders: result2.length,
                weeklySum: weeklySum
            });
        })
    })
    
};
exports.getInventory = (req, res) =>{
    res.render('inventory', {
        path: '/inventory'
    });
}
exports.getProducts = (req, res) => {
    var date = new Date();
    var dateToday = getFullDay(date.getDay()) + ", " + getFullMonth(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();
    var prices;
    History.findProductPrice().then(result0 => {
        for (var i = 1; i<result0.length; i++) {
            if (result0[i].productID.equals(result0[i-1].productID)) {
                result0.splice(i,1);
                i--;
            }
        }   
        console.log(result0);
        prices = result0;
        Product.getProducts().then(result => {
            Product.getOnStock().then(result2 => {
                Product.getOutOfStock().then(result3 => {
                    res.render('products', {
                        path: '/products',
                        products: result,
                        dateToday: dateToday,
                        totalProducts: result.length,
                        onStock: result2.length,
                        outOfStock: result3.length,
                        prices: prices
                    });
                });
            });
        }).catch(err => {
            console.log(err);
        })
    }) 
}
exports.postPriceChange = (req, res, next) => {
    var date = new Date();
    console.log(req.body.id);
    if (req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
        const history = new History({
            productID: req.body.id,
            currPrice: req.body.price,
            dateChanged: date.toISOString().slice(0,10)
        })
        history.save();
        res.redirect('/products');
    } else next();
    
}
function getFullDay(d) {
    var array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return array[d];
}
function getFullMonth(m) {
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return month[m];
}