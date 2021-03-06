const Product = require('../models/product');
const History = require('../models/priceHistory');
const IndivSales = require('../models/indivSales');
const OrderSale = require('../models/orders');
const PurchaseHistory = require('../models/purchaseHistory');
const Purchases = require('../models/purchases');
const Purchase = require('../models/purchases');

exports.getHome = (req, res) => {
    var date = new Date();
    var startOfWeek = date.getDate() - date.getDay();
    var weekStart = new Date(new Date(date.setDate(startOfWeek)).setHours(00,00,00))
    date = new Date();
    var dateToday = getFullDay(date.getDay()) + ", " + getFullMonth(date.getMonth()) + " " + date.getDate() + ", " + date.getFullYear();
    OrderSale.getOrdersToday().then(result => {
        OrderSale.getWeeklyOrders().then(result2 => {
            PurchaseHistory.getDailyPurchases().then(result3 => {
                PurchaseHistory.getWeeklyPurchases().then(result4 => {
                    PurchaseHistory.getMonthlyPurchases().then(result5 => {
                        OrderSale.getMonthlyOrders().then(result6 => {
                            var todaySum = 0;
                            var weeklySum = 0;
                            var monthlySum = 0;
                            var todayPurchases = 0;
                            var weeklyPurchases = 0;
                            var monthlyPurchases = 0;
                            for (var i = 0; i< result.length; i++)
                                todaySum+=parseFloat(result[i].totalSale);
                            for (var i = 0; i < result2.length; i++)
                                weeklySum += parseFloat(result2[i].totalSale);
                            for (var i = 0; i < result3.length; i++)
                                todayPurchases += result3[i].purchaseID.priceEach*result3[i].quantityBought;
                            for (var i = 0; i < result4.length; i++)
                                weeklyPurchases += result4[i].purchaseID.priceEach * result4[i].quantityBought;
                            for (var i = 0; i < result5.length; i++)
                                monthlyPurchases += result5[i].purchaseID.priceEach * result5[i].quantityBought;
                            for (var i = 0; i < result6.length; i++)
                                monthlySum += parseFloat(result6[i].totalSale);
                            res.render('home', {
                                path: '/',
                                dateToday: dateToday,
                                weekDate: getFullMonth(weekStart.getMonth()) + " "+ weekStart.getDate() + ", " + " " + weekStart.getFullYear() + " - " + getFullMonth(date.getMonth()) + " " + date.getDate() + ", "  + " " + date.getFullYear(),
                                todaysOrders: result.length,
                                earnedToday: (todaySum).toFixed(2),
                                todayPurchases: (todayPurchases).toFixed(2),
                                todayNet: (todaySum-todayPurchases).toFixed(2),
                                weeklyOrders: result2.length,
                                weeklySum: (weeklySum).toFixed(2),
                                weeklyPurchases: (weeklyPurchases).toFixed(2),
                                weeklyNet: (weeklySum-weeklyPurchases).toFixed(2),
                                monthlyOrders: result6.length,
                                monthlySum: (monthlySum).toFixed(2),
                                monthlyPurchases: (monthlyPurchases).toFixed(2)
                            });
                        })
                        
                    })
                })
            })
        })
    })
};
exports.getInventory = (req, res) =>{
    Purchases.getPurchases().then(result=>{
        PurchaseHistory.getLatestPurchases().then(result2 =>{
            result.sort(function(a, b) {
                var nameA = a.productID.productName.toUpperCase(); 
                var nameB = b.productID.productName.toUpperCase(); 
                if (nameA < nameB) {
                return -1;
                }
                if (nameA > nameB) {
                return 1;
                }
                // names must be equal
                return 0;
            });
            Product.getProducts().then(result3 =>{
                for(var i=0; i<result3.length;i++){
                    for(var j=0; j<result2.length;j++){
                        if(result2[j].purchaseID.productID.equals(result3[i]._id)){
                            var temp = {"productName": result3[i].productName,
                                "quantityBought": result2[j].quantityBought,
                                "purchaseID": result2[j].purchaseID};
                            result2[j] = temp;
                        }
                    }
                }
                res.render('inventory',{
                    path: '/inventory',
                    purchases: result,
                    purhistory: result2
                })
            })
            
        })
    }).catch(err => {
        console.log(err);
    })
}
exports.postRestock = (req, res) =>{
    var date = new Date();
    var qty = parseInt(req.body.productQuantity) + parseInt(req.body.oldquantity);
    Product.updateOne({productName: req.body.productSelect },
        {
            $set: {currQuantity:  qty, status: "On Stock"}
        }).then(result => {
            PurchaseHistory.create(
                {
                    purchaseID: req.body.purchaseid, quantityBought: req.body.productQuantity, dateBought: date
                }).then(result2 => {
                    res.redirect('/products');
            })
    }).catch(err => {
        console.log(err);
    })
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
exports.getTransactions = (req, res, next) => {
    if (req.query.fromdate !=null && req.query.todate!=null) {
        var fromdate = req.query.fromdate.split('-');
        var todate = req.query.todate.split('-');
        OrderSale.getOrders(fromdate, todate).then(result => {
            var found;
            var productsReports = [];
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < result[i].salesID.length; j++) {
                    found = -1;
                    for (var k = 0; k < productsReports.length; k++) {
                        if ((result[i].salesID[j].productID.equals(productsReports[k].productID))
                        && (result[i].salesID[j].totalPrice/result[i].salesID[j].quantitySold
                        == productsReports[k].totalPrice/productsReports[k].quantitySold))
                            found = k;
                    }
                    if (found == -1) {
                        var temp = {"productID": result[i].salesID[j].productID,
                            "quantitySold": result[i].salesID[j].quantitySold,
                            "totalPrice": result[i].salesID[j].totalPrice
                        };
                        productsReports.push(temp);
                    } else {
                        productsReports[found].quantitySold += result[i].salesID[j].quantitySold;
                        productsReports[found].totalPrice += result[i].salesID[j].totalPrice;
                    }
                }
            }
            Product.getProducts().then(result2 => {
                for (var i = 0; i < result2.length; i++) {
                    for (var j = 0; j < productsReports.length; j++) {
                        if (productsReports[j].productID.equals(result2[i]._id)) {
                            var temp = {"productID": productsReports[j].productID,
                                "productName": result2[i].productName,
                                "quantitySold": productsReports[j].quantitySold,
                                "totalPrice": productsReports[j].totalPrice
                            };
                            productsReports[j] = temp;
                        }
                    }
                }
                Purchase.getPurchases2().then(result3 => {
                    for (var i = 0; i < result3.length; i++) {
                        for (var j = 0; j < productsReports.length; j++) {
                            if (productsReports[j].productID.equals(result3[i].productID)) {
                                var temp = {"productID": productsReports[j].productID,
                                    "productName": productsReports[j].productName,
                                    "quantitySold": productsReports[j].quantitySold,
                                    "totalPrice": (productsReports[j].totalPrice).toFixed(2),
                                    "COGS": (result3[i].priceEach*productsReports[j].quantitySold).toFixed(2)
                                };
                                productsReports[j] = temp;
                            }
                        }
                    }
                    productsReports.sort(function(a,b) {
                        if (a.productName < b.productName)
                            return -1;
                        if (a.productName > b.productName)
                            return 1;
                        return 0;
                    })
                    res.render('reports', {
                        path: '/transactions',
                        reports: productsReports
                    })
                })
            })
        }) 
    } else res.render('reports', {
        path: '/transactions',
        reports: []
    })
}
exports.postPriceChange = (req, res, next) => {
    var date = new Date();
    if (req.body.id.match(/^[0-9a-fA-F]{24}$/)) {
        const history = new History({
            productID: req.body.id,
            currPrice: req.body.price,
            dateChanged: date
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