// return N^K, N, K are integers
function powNK(n, k) {
    let x = n, y = k;
    let ans = 1; // n^0
    while (y > 0) {
        ans = ans * x;
        x = x * x;
        y /= 2;
    }
    return ans;
}

export {powNK};