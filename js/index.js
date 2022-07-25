//import {TicTac} from "TicTac.js"; // how to import other js file...?
// import { powNK } from "./util";


//----
// constants
const fixedDigit = 1;
const MOD = powNK(10, fixedDigit);
const COLOR_LEVEL = [1_500_000, 1_000_000, 500_000, 100_000, 10_000, -10_000, -100_000, -500_000, -1_000_000];
const COLOR_CLASS = ["P5", "P4", "P3", "P2", "P1", "N1", "N2", "N3", "N4", "N5"];

const tictac = new TicTac();

//---
// Define events, id, function
// id : function
function setupClickListeners() {
    setOnClickListener("deceaseBtn", function (e) {
        const year = domValueInt("year");
        const rate = domValueInt("rateOfReturn");
        const pay = domValueInt("deceasePay");
        console.log(`deceaseBtn, y = ${year}, r = ${rate}`);
        tictac.tic();
        const table = evalDeceasePension(pay, year, rate);
        makeTable("eval", table);
        let ms = tictac.tacL();
        const name = e.target.innerText;
        showSpent(`計算 ${name} ${ms}`);
    });

    setOnClickListener("survivorBtn", function (e) {
        const year = domValueInt("year");
        const rate = domValueInt("rateOfReturn");
        const pay = domValueInt("survivorPay");
        console.log(`survivorPay, y = ${year}, r = ${rate}`);
        tictac.tic();
        const table = evalSurvivalPension(pay, year, rate);
        makeTable("eval", table);
        let ms = tictac.tacL();
        const name = e.target.innerText;
        showSpent(`計算 ${name} ${ms}`);
    });

    setOnClickListener("deceaseMinusSurvivorBtn", function (e) {
        const year = domValueInt("year");
        const rate = domValueInt("rateOfReturn");
        const dpay = domValueInt("deceasePay");
        const spay = domValueInt("survivorPay");
        console.log(`decease - survivor, y = ${year}, r = ${rate}`);
        tictac.tic();
        // const deceaseTable = evalDeceasePension(dpay, year, rate);
        // const survivorTable = evalSurvivalPension(spay, year, rate);
        // eval deceaseTable[1,2:] - survivorTable[1,2:]
        let ans = makeData(year, rate);
        let m = rate;
        let n = year;
        console.log(`decease - survivor, m = ${m}, n = ${n}`);
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                let dec = evalDeceasePay(dpay, i, j);
                let sur = evalSurvivalPay(spay, i, j);
                let val = dec - sur;
                ans[i][1+j] = val;
            }
        }

        makeTable("eval", ans, true);
        let ms = tictac.tacL();
        const name = e.target.innerText;
        showSpent(`計算 ${name} ${ms}`);
    });

    document.getElementById("rateOfReturn").onchange = function(e) {
        updateRate();
    }

    enterToClick("funeralPay", "funeralBtn");
    enterToClick("survivorPay", "survivorBtn");

    enterToRun("monthlyInsured", function (e) {
        const mon6 = domValueInt("survivorPay");
        const mPay = domValueInt("monthlyInsured");
        updatePay(mon6, mPay);
    });
}

function showSpent(ms) {
    document.getElementById("spent").innerText = `${ms} ms`;
}

function updateRate() {
    const it = document.getElementById("rateOfReturn");
    const r = domValueInt("rateOfReturn");
    const val = (100 + r) / 100;
    document.getElementById("sampleR").innerHTML = val;
}

// deceaseTable
// 本人死亡給付 = A(1+r)^N
function evalDeceasePension(oneA, year, rate) {
    let ans = makeData(year, rate);
    let m = ans.length;
    let n = ans[0].length;
    m = rate;
    n = year;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            ans[i][1+j] = evalDeceasePay(oneA, i, j);
        }
    }
    return ans;
}

function evalDeceasePay(oneA, rateAt, yearAt) {
    const nf = MOD; // %.1f
    const r = rateAt;
    const N = yearAt;
    let val = 0.0;
    val = oneA * Math.pow((100 + r) / 100, N);
    val = Math.round(val * nf) / nf;
    return val;
}

// survivorTable
//遺屬年金給付 = M * ((1 + r/12)^(12*N) - 1) / (r/12)
function evalSurvivalPension(oneM, year, rate) {
    let ans = makeData(year, rate);
    let m = ans.length;
    let n = ans[0].length;
    m = rate;
    n = year;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            ans[i][1+j] = evalSurvivalPay(oneM, i, j);
        }
    }
    return ans;
}

function evalSurvivalPay(oneM, rateAt, yearAt) {
    const nf = MOD; // %.1f
    const r = rateAt;
    const N = yearAt;
    const r12 = (r) / 1200; // = if r = 3, 1 + 3% / 12
    let val = 0.0;
    val = oneM * (Math.pow(1 + r12, N * 12) - 1) / r12;
    val = Math.round(val * nf) / nf;
    return val;
}


// base table
function makeData(year, rate) {
    // https://www.delftstack.com/zh-tw/howto/javascript/javascript-2d-array/
    // mxn array = let arr = Array.from(Array(m), () => new Array(n)); // failed
    //let ans = Array.from(Array(rate + 1), ()=>(new Array(year + 2)));// new Array(rate + 1);//<Array<string>>;

    let ans = matrixMxN(rate + 1, year + 2);
    // fill in first row
    ans[0][0] = "s";
    ans[0][1] = "年利率 = r";
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

function makeTable(rootID, data, color) {
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
        let m = data[i].length;
        row = makeRow("tr", "td", data[i], color, 2, m);
        tbody.appendChild(row);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    //table.style.border = "1px solid black";

    // Adding the entire table to the body tag
    const root = document.getElementById(rootID);
    removeChildDom(rootID);
    root.appendChild(table);
}

function getColorClass(v) {
    const level = COLOR_LEVEL;
    const clazz = COLOR_CLASS;
    let n = clazz.length;
    for (let i = 0; i < n; i++) {
        if (v >= level[i]) {
            return clazz[i];
        }
    }
    return clazz[n-1];
}

// (tr, th) or (tr, td) on content as a
// fill in color table from a[coloFrom:colorEnd]
function makeRow(rowTag, itemTag, a, color, colorFrom = 0, colorEnd = a.length) {
    // Creating and adding data to first row of the table
    let row = document.createElement(rowTag);
    for (let i = 0; i < a.length; i++) {
        let ai = document.createElement(itemTag);
        //ai.innerHTML = a[i].toLocaleString();// ok
        let s = a[i].toLocaleString();
        ai.innerHTML = s;
        const inbound = colorFrom <= i && i < colorEnd;
        if (color && inbound) {
            if (typeof a[i] === 'number') {
                let cls = getColorClass(a[i]);
                ai.classList.add(cls);
            }
        }
        row.appendChild(ai);
    }
    return row;
}

function applyMom() {
    const monthlyPay = 9606; // 遺屬年金給付 每月
    const sixMonthInsured = 44533; // 6個月之平均月投保薪資
    // funeral = 222665;
    // decease = 1335990;
    updatePay(monthlyPay, sixMonthInsured);
}

// monthlyPay = 遺屬年金給付 每月
// sixMonthInsured = 6個月之平均月投保薪資
function updatePay(monthlyPay, sixMonthInsured) {
    document.getElementById("monthlyInsured").value = sixMonthInsured;
    document.getElementById("funeralPay").value = 5 * sixMonthInsured;
    document.getElementById("deceasePay").value = 30 * sixMonthInsured;
    document.getElementById("survivorPay").value = monthlyPay;
}

function makeColorTable() {
    const data = COLOR_LEVEL;
    const rootID = "colorTable";
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let row = makeRow("tr", "th", data, true);
    thead.appendChild(row);
    table.appendChild(thead);
    const root = document.getElementById(rootID);
    removeChildDom(rootID);
    root.appendChild(table);
}

function main() {
    setupClock("clock");
    setupClickListeners();
    makeColorTable();
    updateRate();
    applyMom();
    callOnClick("deceaseMinusSurvivorBtn");
    readm();
}
//--

// this work for click to select file
function dispFile(contents) {
    document.getElementById('contents').innerHTML=contents
  }
  function clickElem(elem) {
      // Thx user1601638 on Stack Overflow (6/6/2018 - https://stackoverflow.com/questions/13405129/javascript-create-and-save-file )
      var eventMouse = document.createEvent("MouseEvents")
      eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      elem.dispatchEvent(eventMouse)
  }
  function openFile(func) {
      readFile = function(e) {
          var file = e.target.files[0];
          console.log(`file = ${file}`);
        //   (index) Value
        //   name	'美金.csv'
        //   lastModified	1658199841830
        //   lastModifiedDate	Tue Jul 19 2022 11:04:01 GMT+0800 (台北標準時間)
        //   size	17897
          console.table(file);
        //   (index) name lastModified lastModifiedDate webkitRelativePath size type Value
        //   0	'美金.csv'	1658199841830	Tue Jul 19 2022 11:04:01 GMT+0800 (台北標準時間)	''	17897	'text/csv'
          console.log(`e.target.files`);
          console.table(e.target.files);
          if (!file) {
              return;
          }
          var reader = new FileReader();
          reader.onload = function(e) {
              var contents = e.target.result;
              fileInput.func(contents)
              document.body.removeChild(fileInput)
          }
          reader.readAsText(file)
      }
      fileInput = document.createElement("input")
      fileInput.type='file'
      fileInput.style.display='none'
      fileInput.onchange=readFile
      fileInput.func=func
      document.body.appendChild(fileInput)
      clickElem(fileInput);
  }
//--
  function readm() {
    //Access to fetch at 'file:///D:/Github/my-bli-gov/README.md' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, chrome-untrusted, https.
    let src = "./README.md";
    //src = "D:/a1.txt";
    //src = "/index.js";
    //src = "http://localhost/a1.txt";
    // fetch(src).then((res) => {
    //     console.log(`rm = ${res}`);
    //     console.table(res);
    // });
    logFileText(src);
    //readTextFile(src); //<= Call function ===== don't need "file:///..." just the path
  }

  const logFileText = async file => {
    const response = await fetch(file)
    const text = await response.text()
    console.log(text)
    }

    function readTextFile(file) {
        var rawFile = new XMLHttpRequest(); // XMLHttpRequest (often abbreviated as XHR) is a browser object accessible in JavaScript that provides data in XML, JSON, but also HTML format, or even a simple text using HTTP requests.
        rawFile.open("GET", file, false); // open with method GET the file with the link file ,  false (synchronous)
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4) // readyState = 4: request finished and response is ready
            {
                if(rawFile.status === 200) // status 200: "OK"
                {
                    var allText = rawFile.responseText; //  Returns the response data as a string
                    console.log(allText); // display text on the console
                }
            }
        }
        rawFile.send(null); //Sends the request to the server Used for GET requests with param null
    }
//--

window.onload = function() {
    console.log("onload");
    main();
}
