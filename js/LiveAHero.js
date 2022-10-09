

function makeRow(a) {
    const rowTag = "tr";
    const itemTag = "td";
    // Creating and adding data to first row of the table
    let row = document.createElement(rowTag);
    for (let i = 0; i < a.length; i++) {
        let each = document.createElement(itemTag);

        let di = a[i];
        let txt = document.createElement("label");
        txt.innerHTML = di;

        each.appendChild(txt);
        row.appendChild(each);
    }
    return row;
}

// remove children and make table inside
function makeTable(rootID, data) {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    //console.log(`rootID = ${rootID}, data = ${data}`);
    //console.table(data);
    let n = data.length;
    let row;
    let i = 0;
    for (i = 0; i < n; i++) {
        row = makeRow(data[i]);
        tbody.appendChild(row);
    }
    //table.appendChild(thead);
    table.appendChild(tbody);
    //table.style.border = "1px solid black";

    // Adding the entire table to the body tag
    const root = document.getElementById(rootID);
    removeChildDom(rootID);
    root.appendChild(table);
}

function makeIt2() {
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

function makeIt() {
    makeOverallTable();
    makeCardTable();
    makePoolTable();
}

function makeCardTable() {
    // let data = [
    //     ["項目", "Hero 3 ☆", "Hero 4 ☆", "Hero 5 ☆", "Sidekick 3 ☆", "Sidekick 4 ☆"],
    //     ["一般機率",],
    //     ["10抽機率",],
    // ];
    let i, j, n = 4, m = 10;
    let data = matrixMxN(n, m);
    for (i = 0; i < n; i++) {
        for (j = 0; j < m; j++) {
            //let x = Math.floor(Math.random() * 1_000);
            let x = randomInt(1000);
            //console.log(`x = ${x}`);
            data[i][j] = x;
        }
    }
    makeTable("cardTable", data);
}

function makePoolTable() {
    let K = 1000;
    let normal = [350, 80, 20, 450, 100];
    let tenUp = [0, 960, 40, 0, 0];
    let tenUps = [0, 320, 22, 0, 0];
    let normalP = [
        [
            [90, "モクダイ 木",],
            [-1,
            "アカシ 火",
            "スイ 水",
            "ラクタ 火",
            "ロレン 水",
            "イサリビ 水",
            "ゴロウ 木",
            "ディグラム 影",
            "アルキバ 影",
            "キルシュ 火",
            "ナリヒト 影",
            "プロキー 光",],
        ],
        [
            [20, "ガンメイ 木"],
            [-1,
            "ライキ 光",
            "クローネ 影",
            "バレル 光",
            "ハロン 水",
            "ヴィクトム 火",
            "キョウイチ 木",
            "フラミー 火",
            "トウシュウ 影",
            "ハイドール 水",
            "ヒトミ 光",
            "スバル 木",
            "ハックル 光",
            "マクラータ 水",
            "アルフェッカ 火",
            "カラスキ 火",
            "ヨシオリ 水",
            "オキタカ 木",
            "ボレアリス 影",
            "ヤスヒコ 光",
            "ロイカー 光",],
        ],
        [
            [11, "スハイル 火"],
            [-1,
            "ショウエン 水",
            "マルフィク 影",
            "ポラリスマスク 火",
            "コウキ 光",
            "アンドリュー 光",
            "スハイル 火",
            "モノマサ 木",
            "ゴメイサ 木",
            "ルティリクス 光",
            "シャフト 影",
            "サダヨシ 水",
            "ライラック 木",
            "サンテツ 木",
            "ガイウス 水",],
        ],
        [
            [120, "ガンメイ", "スハイル"],
            [-1,
            "ライキ",
            "クローネ",
            "バレル",
            "ハロン",
            "ヴィクトム",
            "キョウイチ",
            "ショウエン",
            "トウシュウ",
            "マルフィク",
            "ポラリスマスク",
            "ハイドール",
            "コウキ",
            "ヒトミ",
            "ラクタ",
            "イサリビ",
            "ディグラム",
            "アンドリュー",
            "アルキバ",
            "スバル",
            "キルシュ",
            "ナリヒト",
            "モノマサ",
            "プロキー",
            "ゴメイサ",
            "マクラータ",
            "ルティリクス",
            "アルフェッカ",
            "シャフト",
            "ヨシオリ",
            "サダヨシ",
            "ボレアリス",
            "ライラック",
            "サンテツ",
            "ガイウス",]
        ],
        [
            [50, "モクダイ"],
            [-1,
            "アカシ",
            "スイ",
            "フラミー",
            "ロレン",
            "ゴロウ",
            "ハックル",
            "エクシオ",
            "カラスキ",
            "メリデ",
            "オキタカ",
            "ヤスヒコ",
            "ロイカー",
            "セイイチロウ",],
        ],
    ];

    let tenUpP = [];
    let it = normalP;
    for (var i = 0; i < it.length; i++) {
        tenUpP[i] = [];
        for (var j = 0; j < it[i].length; j++) {
            tenUpP[i][j] = [];
            for (var k = 0; k < it[i][j].length; k++) {
                tenUpP[i][j][k] = it[i][j][k];
            }
        }
        tenUpP[i][0][0] = tenUps[i];
    }

    let cardCDF = [];
    let pdfs = [normal, tenUp];
    let cards = [normalP, tenUpP];
    for (var j = 0; j < 2; j++) {
        let r = pdfs[j];
        cardCDF[j] = [];
        cardCDF[j][0] = r[0];
        for (var i = 1; i < r.length; i++) {
            cardCDF[j][i] = cardCDF[j][i-1] + r[i];
        }
    }
    console.log("cardCDF");
    console.table(cardCDF);
    console.log("pdfs");
    console.table(pdfs);
    console.log("cards");
    console.table(cards);
    //makeTable("see", cardCDF);

        // [1,  90, 11, -1], // 1 * 9% + 11 * equal
        // [1,  20, 20, -1],
        // [1, 110, 13, -1],
        // [2, 120, 34, -1],
        // [1,  50, 13, -1],


    // let data = [
    //     ["項目", "Hero 3 ☆", "Hero 4 ☆", "Hero 5 ☆", "Sidekick 3 ☆", "Sidekick 4 ☆"],
    //     ["一般機率",],
    //     ["10抽機率",],
    // ];
    let dataT = ["Hero 3 ☆", "Hero 4 ☆", "Hero 5 ☆", "Sidekick 3 ☆", "Sidekick 4 ☆"];
    let n = 20, m = 10;
    let data = matrixMxN(1+n, 1+m);
    let drawn = {};
    for (var i = 0; i < dataT.length; i++) {
        for (var j = 0; j < normalP[i].length; j++) {
            for (var k = 1; k < normalP[i][j].length; k++) {
                let key = dataT[i] + " " + normalP[i][j][k];
                drawn[key] = 0;
            }
        }
    }
    var applyTenDraw = true;
    let w = Math.max(data.length, data[0].length);
    for (var i = 0; i < w; i++) {
        if (i < data.length) {
            data[i][0] = `R# ${i}`;
        }
        if (i < data[0].length) {
            data[0][i] = `C# ${i}`;
        }
    }
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            let up;
            if (applyTenDraw) {
                up = j == 0 ? 1 : 0;
            } else {
                up = 0;
            }
            let cdf = cardCDF[up];
            let pdf = pdfs[up];
            let card = cards[up];
            //console.log(`up = ${up} on (i, j) = (${i}, ${j})`);
            let x1, x2;
            x1 = randomInt(K);
            let y = getFx(x1, cdf);
            let max = pdf[y];
            x2 = randomInt(max);
            let y2 = getCard(x2, max, card[y]);
            //console.log(`x1 = ${x1}`);
            let end = x1 + "</br>" + dataT[y] + "</br>" + y2;
            // <b></b>, = bold, <i></i> = italic
            let key = dataT[y] + " " + y2;
            drawn[key] = drawn[key] + 1;

            if (y == 1 || y == 4) {
                end = "<b>" + end + "</b>"; // bold text = <b></b>
            } else if (y == 2) {
                end = "<i><b>" + end + "</b><i>";  // bold text
            }
            data[1+i][1+j] = end;
        }
    }
    makeTable("random2", data);
    console.table(drawn);
}

// return i, where i is smallest that a[i] > x
function getFx(x, a) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] > x) {
            return i;
        }
    }
    return -1;
}

function getCard(p, max, a) {
    let now = p;
    let passed = 0;
    console.log(`getCard ${max}, ${p}, ${a}`);
    for (var i = 0; i < a.length; i++) {
        let x = a[i];
        if (x[0] >= 0) {
            // take each probability, and minus on it
            let pr = x[0];
            for (var j = 1; j < x.length; j++) {
                now -= pr;
                passed += pr;
                if (now < 0) {
                    console.log(`return ${x[j]}`);
                    return x[j];
                }
            }
        } else {
            // equal cases
            let eqs = x.length - 1; // equal card number
            let each = (max - passed) / eqs;
            let r = Math.floor(now / each);
            console.log(`eqs = ${eqs}, each = ${each}, ${r}, return ${x[1+r]}`);
            return x[1 + r]; // x[0] = -1
        }
    }
}

function makeOverallTable() {
    let normal = [35, 8, 2, 45, 10];
    let tenUp = [0, 96, 4, 0, 0];
    let data = [
        ["項目", "Hero 3 ☆", "Hero 4 ☆", "Hero 5 ☆", "Sidekick 3 ☆", "Sidekick 4 ☆"],
        ["一般機率",],
        ["10抽機率",],
    ];
    let n = normal.length;
    for (var i = 0; i < n; i++) {
        data[1][1+i] = normal[i] + "%";
        data[2][1+i] = tenUp[i] + "%";
        let x = Math.random();
        //console.log(`Math.R = ${x}`);
    }
    makeTable("overall", data);
}

// Uncompleted, this is try to simulate the card draw
function main() {
    setupClock("clock");
    makeIt();
}

window.onload = function() {
    main();
}
