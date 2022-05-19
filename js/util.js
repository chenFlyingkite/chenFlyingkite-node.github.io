// return N^K, N, K are integers
function powNK(n, k) {
    let x = n, y = k;
    let ans = 1; // n^0
    while (y > 0) {
        if (y & 0x1 == 1) {
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

//---------------------
// Dom Action
//---------------------
// Adding the entire table to the body tag
function removeChildDom(rootID) {
    const it = document.getElementById(rootID);
    it.innerHTML = "";
    // while (it.firstChild) {
    //     it.firstChild.remove();
    // }
    return it;
}

function domValue(domID, fallback = 0) {
    const e = document.getElementById(domID);
    if (e) {
        return e.value;
        //return parseInt(e.value, 10);
    } else {
        return fallback;
    }
}

function doWhenEnter(domID, method) {
    const it = document.getElementById(domID);
    if (it) {
        it.onkeyup = function (e) {
            if (e.keyCode === 13) {
                // Enter = 13
                if (method) {
                    method(e);
                }
            }
        }
    } else {
        console.log(`Element not found for ${domID}`);
    }
}

function enterToClick(keyUpDomID, clickDomID) {
    const e = document.getElementById(keyUpDomID);
    if (e) {
        e.onkeyup = function (e) {
            if (e.keyCode === 13) {
                // Enter = 13
                const f = document.getElementById(clickDomID);
                if (f) {
                    f.onclick({target: e});
                    //allClicks.get(clickDomID).apply(e);
                }
            }
        }
    } else {
        console.log(`Element not found for ${keyUpDomID}`);
    }
}

function callOnClick(domID) {
    let e = document.getElementById(domID);
    if (e) {
        console.log(`id = ${domID}, e = ${e}, ${e.onclick}, ${e.onkeyup}`);
        if (typeof e.onclick === "function") {
            //e.onclick.apply(e);
            e.onclick({target: e}); // fake event
        }
    }
}

//export {powNK};