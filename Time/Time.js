"use strict";
class TimerTest {
    constructor() {
        this.timerCounDown = -1;
    }
    CountDown() {
        let closeTime = Date.now() + 10000;
        let nowTime = Date.now();
        this.timerCounDown = setInterval(() => {
            if (closeTime <= nowTime) {
                clearInterval(this.timerCounDown);
            }
            else {
                console.log("剩餘時間 = " + Math.round((closeTime - nowTime) / 1000));
            }
            nowTime = Date.now();
        }, 1000);
    }
}
let countDown = new TimerTest();
countDown.CountDown();
