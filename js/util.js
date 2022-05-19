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

// Adding the entire table to the body tag
function removeChildDom(rootID) {
    const it = document.getElementById(rootID);
    it.innerHTML = "";
    // while (it.firstChild) {
    //     it.firstChild.remove();
    // }
    return it;
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

//export {powNK};