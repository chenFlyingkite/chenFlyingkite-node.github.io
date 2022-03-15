// Define functions
function clock(domID) {
    // Get today's date and time
    let d = new Date();
    //var now = d.getTime(); // long value
    //var now = d.toISOString(); // yyyy-mm-ddThh:MM:ss.SSSZ like 2022-03-14T10:26:34
    var now = d.toLocaleString();// Date = 2022/3/15, Time = 上午10:47:46, Locale = Date + Time
    document.getElementById(domID).innerHTML = "時間: " + now;
}

// Run methods and main
// timer
setInterval(function() {
    clock("clock");
}, 1000);

clock();