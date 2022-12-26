

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

function makeTable(rootID, data) {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    console.log(`rootID = ${rootID}, data = ${data}`);
    console.table(data);
    let row;
    let n = data.length;
    // 5 items per row
    let colN = 5;
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
        "開啟 [Line]，點選右下角的 [錢包]",
        "點選功能表的 iPASSMONEY [一卡通MONEY]",
        "輸入您的密碼以登入",
        "出現 一卡通MONEY 主畫面",
        "點選功能表的 [儲值]",
        "點選 [新增銀行帳戶]",
        "選擇要連接的銀行 (以 連線銀行 為例)",
        "確認銀行代碼與名稱 點選 [下一步]",
        "閱讀內容後 點選 [同意使用條款]",
        "輸入需要的資訊，帳戶及驗證碼等等後 點選 [下一步]",
        "確認資料後 點選 [下一步]",
        "在時限內收到 OTP 號碼後 點選 [確認申請連結]",
        "新增銀行帳戶成功 點選 [OK]",
        "回到原本畫面，看到帳戶已新增，點選連線銀行 [選擇銀行]",
        "輸入金額 點選 [儲值]",
        "儲值成功 點選 [確定]",
        "回到 一卡通MONEY 主畫面，點選 [提領]",
        "輸入金額 點選 [提領]",
        "確認資訊後 點選 [提領]",
        "確認已提領 點選 [確定]",
    ];

    let images = [
        "./image/LinePay/20220702_121621.jpg",
        "./image/LinePay/20220702_121950.jpg",
        "./image/LinePay/20220702_122132.jpg",
        "./image/LinePay/20220702_122150.jpg",
        "./image/LinePay/20220702_122150.jpg",
        "./image/LinePay/20220702_122321.jpg",
        "./image/LinePay/20220702_122439.jpg",
        "./image/LinePay/20220702_122447.jpg",
        "./image/LinePay/20220702_122759.jpg",
        "./image/LinePay/20220702_122817.jpg",
        "./image/LinePay/20220702_122845.jpg",
        "./image/LinePay/20220702_122853.jpg",
        "./image/LinePay/20220702_122909.jpg",
        "./image/LinePay/20220702_123000.jpg",
        "./image/LinePay/20220702_123027.jpg",
        "./image/LinePay/20220702_123038.jpg",
        "./image/LinePay/20220702_123117.jpg",
        "./image/LinePay/20220702_123117.jpg",
        "./image/LinePay/20220702_123128.jpg",
        "./image/LinePay/20220702_123141.jpg",
    ];

    let n = messages.length;
    let data = [[]];// = new String[n][2];
    for (let i = 0; i < n; i++) {
        data[i] = [];
        data[i][0] = messages[i];
        data[i][1] = images[i];
    }

    makeTable("eval", data);
}

function main() {
    setupClock("clock");
    makeIt();
}

window.onload = function() {
    main();
}
