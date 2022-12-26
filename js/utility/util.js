// return N^K, N, K are integers
function powNK(n, k) {
    let x = n, y = k;
    let ans = 1; // = n^0
    while (y > 0) {
        if (y & 0x1 == 1) { // y % 2 == 1
            ans = ans * x;
        }
        x = x * x;
        y /= 2;
    }
    return ans;
}

// integer n, integer k, return n^k
// function powNKA(n, k) {
//     let x = n, y = k;
//     let ans = 1; // n^0
//     while (y > 0) {
//         if (y & 0x1 == 1) { // y % 2 == 1
//             ans = ans * x;
//         }
//         x = x * x;
//         y /= 2;
//     }
//     return ans;
// }

function matrixMxN(m, n) {
    let ans = [];
    for (let i = 0; i < m; i++) {
        ans[i] = [];
        for (let j = 0; j < n; j++) {
            ans[i][j] = '';
        }
    }
    return ans;
}

// failed
function randomInt(max, min = 0) {
    return min + Math.floor((max - min) * Math.random());
}

function transposeMatrix(a) {
    if (a == null) return a;
    let n = a.length;
    if (n == 0) return a;
    let m = a[0].length;

    let b = matrixMxN(m, n);
    let i = 0, j = 0;
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            b[j][i] = a[i][j];
        }
    }
    return b;
}

// Define functions
function clock(domID) {
    const it = document.getElementById(domID);
    if (it) {
        // Get today's date and time
        let d = new Date();
        //var now = d.getTime(); // long value
        //var now = d.toISOString(); // yyyy-mm-ddThh:MM:ss.SSSZ like 2022-03-14T10:26:34
        var now = d.toLocaleString();// Date = 2022/3/15, Time = 上午10:47:46, Locale = Date + Time
        it.innerHTML = "現在時間: " + now;
    }
}

// Run methods and main
function setupClock(domID) {
    const it = document.getElementById(domID);
    if (!it) {
        noDom(domID);
        return;
    }

    const run = function () {
        clock(domID);
    }
    run();
    setInterval(run, 1000);
}

class Random {
    nextInt(max) {
        return Math.floor(this.nextRange(0, max));
    }

    nextRange(min, max) {
        return min + (max - min) * Math.random();
    }

}
//export {powNK};