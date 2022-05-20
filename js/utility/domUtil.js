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

// return parseInt(e.value, 10)
function domValueInt(domID, fallback = 0) {
    const e = document.getElementById(domID);
    if (e) {
        //return e.value; // it returns text
        return parseInt(e.value, 10);
    } else {
        return fallback;
    }
}

// function domNumber(domID, fallback = 0) {
//     const e = document.getElementById(domID);
//     if (e) {
//         return e.value;
//         //return parseInt(e.value, 10);
//     } else {
//         return fallback;
//     }
// }

function setOnClickListener(domID, method) {
    const it = document.getElementById(domID);
    if (it) {
        it.onclick = method;
    } else {
        noDom(domID);
    }
}

function noDom(domID) {
    console.log(`Element not found for id = ${domID}`);
}

function callOnClick(domID) {
    let e = document.getElementById(domID);
    if (e) {
        if (typeof e.onclick === "function") {
            //e.onclick.apply(e);
            e.onclick({target: e}); // fake event
        }
    } else {
        noDom(domID);
    }
}

function enterToClick(keyUpDomID, clickDomID) {
    // Enter = 13
    keyupToClick(keyUpDomID, clickDomID, 13);
}

function keyupToClick(keyUpDomID, clickDomID, keyCode) {
    const e = document.getElementById(keyUpDomID);
    if (e) {
        e.onkeyup = function (e) {
            if (e.keyCode === keyCode) {
                const f = document.getElementById(clickDomID);
                if (f) {
                    f.onclick({target: e});
                    //allClicks.get(clickDomID).apply(e);
                } else {
                    noDom(clickDomID);
                }
            }
        }
    } else {
        noDom(keyUpDomID);
    }
}

function enterToRun(domID, method) {
    keyupToRun(domID, method, 13);
}

function keyupToRun(domID, method, keyCode) {
    const it = document.getElementById(domID);
    if (it) {
        it.onkeyup = function(e) {
            if (e.keyCode === keyCode) {
                if (method) {
                    method();
                }
            }
        }
    } else {
        noDom(domID);
    }
}


//https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick
