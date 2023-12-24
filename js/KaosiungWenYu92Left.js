

function makeTable1(a) {
    const rowTag = "tr";
    const itemTag = "td";
    // Creating and adding data to first row of the table
    let row = document.createElement(rowTag);
    for (let i = 0; i < a.length; i++) {
        let each = document.createElement(itemTag);

        let di = a[i];
        let txt = document.createElement("label");
        let img = document.createElement("img");
        txt.innerHTML = di[0];
        img.src = di[1];
        img.width = 800;


        each.appendChild(txt);
        each.appendChild(document.createElement("br"));
        each.appendChild(img);
        each.appendChild(document.createElement("br"));
        row.appendChild(each);
    }
    return row;
}

function create(tag) {
    return document.createElement(tag);
}


// display data in rootID as table, colN items per row
function makeTable(rootID, data, colN) {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    console.log(`rootID = ${rootID}, data = ${data}`);
    console.table(data);
    let row;
    let n = data.length;

    let rowN = Math.ceil(n / colN);
    let i = 0;
    for (i = 0; i < rowN; i++) {
        let m = [];
        for (let j = 0; j < colN; j++) {
            m[j] = data[i * colN + j];
        }
        row = makeTable1(m);
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

function makeIt() {
    let messages = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
    ];

    let images = [
        "./image/taipei101/0026/1.jpg",
        "./image/taipei101/0026/2.jpg",
        "./image/taipei101/0026/3.jpg",
        "./image/taipei101/0026/4.jpg",
        "./image/taipei101/0027/1.jpg",
        "./image/taipei101/0027/2.jpg",
        "./image/taipei101/0027/3.jpg",
        "./image/taipei101/0027/4.jpg",
    ];

    let n = messages.length;
    let data = [[]];// = new String[n][2];
    for (let i = 0; i < n; i++) {
        data[i] = [messages[i], images[i]];
    }

    makeTable("eval", data, 4);
}

function main() {
    setupClock("clock");
    makeIt();
}

window.onload = function() {
    main();
}
