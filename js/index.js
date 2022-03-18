//import TicTac from "js/TicTac";
// import { powNK } from "./util";

//-- Base implementation
const allClicks = new Map();
function addClickListeners() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
    allClicks.forEach(function(value, key, map) {
        const e = document.getElementById(key);
        //console.log(`${key[0]} -> ${value}`);
        if (e) {
            e.addEventListener("click", value);
        } else {
            console.error(`Cannot find dom : key = ${key}, v = ${value}`);
        }
    });
}

function callOnClick(domID) {
    let e = document.getElementById(domID);
    if (e) {
        console.log(`id = ${domID}, e = ${e}, ${e.onclick}, ${e.onkeyup}`);
        if (typeof e.onclick === "function") {
            e.onclick.apply(e);
        }
    }
}

//----
// constants
const fixedDigit = 1;

const MOD = powNKA(10, fixedDigit);

//-------
class TicTac {
    constructor() {
        // time stack
        this.tictac = [];
        this.tag = "TicTac";
        this.log = true;
        this.enable = true;
    }

    tic() {
        if (!this.enable) {
            return -1;
        } else {
            const tic = this.now();
            this.tictac.push(tic);
            return tic;
        }
    }

    tacL() {
        if (!this.enable) {
            return -1;
        } else {
            const tac = this.now();
            if (this.tictac.length < 1) {
                return -1; // underflow
            } else {
                const tic = this.tictac.pop();
                return tac - tic;
            }
        }
    }

    // get tictac() {
    //     return this.tictac;
    // }

    tac(msg) {
        if (!this.enable) {
            return -1;
        } else {
            const tac = this.now();
            if (this.tictac.empty()) {
                this.logError(tac, msg);
                return -1;
            } else {
                const tic = this.tictac.pop();
                sb = "";
                for (let i = 0; i < this.tictac.length; i++) {
                    sb += " ";
                }
                sb += `[${tac-tic}] : ${msg}`;
                this.logTac(sb.toString());
                return tac - tic;
            }
        }
    }

    reset() {
        this.tictac.clear();
    }

    logError(tac, msg) {
        console.log(`X_X Omitted. tic = N/A, tac = ${getTime(tac)} : ${msg}`);
    }

    logTac(msg) {
        if (this.log) {
            console.log(msg);
        }
    }

    //static
    getTime(timeMS) {
        return new Date(timeMS).toISOString();
    }

    toString() {
        return `tictac.size() = ${this.tictac.length()}`;
    }

    //static
    now() {
        return new Date().getTime();// .currentTimeMillis;
    }
}
const tictac = new TicTac();

//---

// Define functions
function clock(domID) {
    // Get today's date and time
    let d = new Date();
    //var now = d.getTime(); // long value
    //var now = d.toISOString(); // yyyy-mm-ddThh:MM:ss.SSSZ like 2022-03-14T10:26:34
    var now = d.toLocaleString();// Date = 2022/3/15, Time = 上午10:47:46, Locale = Date + Time
    document.getElementById(domID).innerHTML = "現在時間: " + now;
}

// Run methods and main
function setupTimer() {
    const run = function () {
        clock("clock");
    }
    run();
    setInterval(run, 1000);
}

// Define events, id, function
// id : function

//Deprecated
// allClicks.set("send", function onSend(e) {
//     console.log("Hello!");
//     alert("Hello");
// });

// allClicks.set("make3x4", function onSend2(e) {
//     console.log("Hello! send2 " + e.target.value);
//     makeTable0("eval");
// });

// allClicks.set("makeTable", function (e) {
//     const year = parseDom("year");
//     const rate = parseDom("rateOfReturn");
//     console.log(`y = ${year}, r = ${rate}`);
//     makeTable0("eval");
// });

allClicks.set("funeralBtn", function (e) {
    const year = parseDom("year");
    const rate = parseDom("rateOfReturn");
    const pay = parseDom("funeralPay");
    console.log(`funeralBtn, y = ${year}, r = ${rate}`);
    tictac.tic();
    const table = evalFuneralPension(pay, year, rate);
    makeTable("eval", table);
    let ms = tictac.tacL();
    const name = e.target.innerText;
    showSpent(`計算 ${name} ${ms}`);
});

allClicks.set("survivorTable", function (e) {
    const year = parseDom("year");
    const rate = parseDom("rateOfReturn");
    const pay = parseDom("survivorPay");
    console.log(`survivorPay, y = ${year}, r = ${rate}`);
    tictac.tic();
    const table = evalSurvivalPension(pay, year, rate);
    makeTable("eval", table);
    let ms = tictac.tacL();
    const name = e.target.innerText;
    showSpent(`計算 ${name} ${ms}`);
});

function showSpent(ms) {
    document.getElementById("spent").innerText = `${ms} ms`;
}

function parseDom(domID) {
    const e = document.getElementById(domID);
    if (e) {
        return e.value;
        //return parseInt(e.value, 10);
    } else {
        return 0;
    }
}

// https://www.delftstack.com/zh-tw/howto/javascript/create-table-javascript/
function makeTable0(rootID) {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    let row;
    row = makeRow("tr", "th", ["h1", "h2", "h3"]);
    thead.appendChild(row);
    row = makeRow("tr", "td", ["b1", "b2", "b3"]);
    tbody.appendChild(row);
    row = makeRow("tr", "td", ["c1", "c2", "c3"]);
    tbody.appendChild(row);
    row = makeRow("tr", "td", ["f1", "f2", "f3"]);
    tbody.appendChild(row);

    table.appendChild(thead);
    table.appendChild(tbody);

    // Adding the entire table to the body tag
    const root = document.getElementById(rootID);
    var reset = true; // RD
    if (reset) {
        while (root.firstChild) {
            root.firstChild.remove();
        }
    }
    root.appendChild(table);
}

// funeralTable
// 本人死亡給付 = A(1+r)^N
function evalFuneralPension(oneA, year, rate) {
    const nf = MOD; // %.1f
    let ans = makeData(year, rate);
    let m = ans.length;
    let n = ans[0].length;
    m = rate;
    n = year;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const r = i;
            const N = j;
            let val = 0.0;
            val = oneA * Math.pow((100 + r) / 100, N);
            val = Math.round(val * nf) / nf;
            ans[i][1+j] = val; // fill in table
        }
    }
    return ans;
}

// survivorTable
//遺屬年金給付 = M * ((1 + r/12)^(12*N) - 1) / (r/12)
function evalSurvivalPension(oneM, year, rate) {
    const nf = MOD; // %.1f
    let ans = makeData(year, rate);
    let m = ans.length;
    let n = ans[0].length;
    m = rate;
    n = year;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const r = i;
            const N = j;
            const r12 = (r) / 1200; // = if r = 3, 1 + 3% / 12
            let val = 0.0;
            val = oneM * (Math.pow(1 + r12, N * 12) - 1) / r12;
            val = Math.round(val * nf) / nf;
            ans[i][1+j] = val;
        }
    }
    return ans;
}

// base table
function makeData(year, rate) {
    // https://www.delftstack.com/zh-tw/howto/javascript/javascript-2d-array/
    // mxn array = let arr = Array.from(Array(m), () => new Array(n)); // failed
    //let ans = Array.from(Array(rate + 1), ()=>(new Array(year + 2)));// new Array(rate + 1);//<Array<string>>;

    // make ans[rate+1][year+2]
    const m = rate + 1;
    const n = year + 2;
    let ans = [];
    for (let i = 0; i < m; i++) {
        ans[i] = [];
    }
    // fill in first row
    ans[0][0] = "年利率 = r";
    ans[0][1] = "1 + r";
    for (let i = 1; i <= year; i++) {
        ans[0][i+1] = i;
    }
    // fill in two columns
    for (let i = 1; i <= rate; i++) {
        ans[i][0] = i;
        ans[i][1] = (100 + i) / 100;
    }
    return ans;
}

function makeTable(rootID, data) {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    let row;
    let n = data.length;
    if (n > 0) {
        row = makeRow("tr", "th", data[0]);
        thead.appendChild(row);
    }
    for (let i = 1; i < n; i++) {
        row = makeRow("tr", "td", data[i]);
        tbody.appendChild(row);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    //table.style.border = "1px solid black";

    // Adding the entire table to the body tag
    const root = document.getElementById(rootID);
    var reset = true; // RD
    if (reset) {
        while (root.firstChild) {
            root.firstChild.remove();
        }
    }
    root.appendChild(table);
}

// (tr, th) or (tr, td) on content as a
function makeRow(rowTag, itemTag, a) {
    // Creating and adding data to first row of the table
    let row = document.createElement(rowTag);
    for (let i = 0; i < a.length; i++) {
        let ai = document.createElement(itemTag);
        //ai.innerHTML = a[i].toLocaleString();// ok
        let s = a[i].toLocaleString();
        ai.innerHTML = s;
        row.appendChild(ai);
    }
    return row;
}

function applyMom() {
    const month = document.getElementById("monthlyInsured").value;
    document.getElementById("funeralPay").value = 5 * month;//1335990;
    document.getElementById("survivorPay").value = 9606;
}

// integer n, integer k, return n^k
function powNKA(n, k) {
    let x = n, y = k;
    let ans = 1; // n^0
    while (y > 0) {
        if (y & 0x1 == 1) { // y % 2 == 1
            ans = ans * x;
        }
        x = x * x;
        y /= 2;
    }
    return ans;
}

function enterToClick(keyUpDomID, clickDomID) {
    const e = document.getElementById(keyUpDomID);
    if (e) {
        e.onkeyup = function (e) {
            if (e.keyCode === 13) {
                // Enter = 13
                allClicks.get(clickDomID).apply(e);
            }
        }
    } else {
        console.log(`Element not found for ${keyUpDomID}`);
    }
}

function addListeners() {
    addClickListeners();
    enterToClick("funeralPay", "funeralBtn");
    enterToClick("survivorPay", "survivorBtn");
}

function main() {
    setupTimer();
    addListeners();
    applyMom();
    callOnClick("funeralTable");
}

window.onload = function() {
    console.log("onload");
    main();
}
