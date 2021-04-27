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
        weekDate: weekStart.getDate() + ", " + getFullMonth(weekStart.getMonth()) + " " + weekStart.getFullYear() + " - " + weekEnd.getDate() + ", " + getFullMonth(weekEnd.getMonth()) + " " + weekEnd.getFullYear()
    });
};
function getFullDay(d) {
    var array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return array[d];
}
function getFullMonth(m) {
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return month[m];
}