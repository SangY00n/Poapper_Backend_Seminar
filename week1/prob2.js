function fibo(n) {
    if (n < 0) {
        console.log("n이 음수입니다.");
        return -1;
    }
    else if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return fibo(n - 2) + fibo(n - 1);
    }
}