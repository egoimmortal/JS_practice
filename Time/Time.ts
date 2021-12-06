class TimerTest
{
    protected timerCounDown: number = -1;
    
    constructor(){}

    public CountDown(): void
    {
        let closeTime: number = Date.now() + 10000;
        let nowTime: number = Date.now();

        this.timerCounDown = setInterval(() => {
            if(closeTime <= nowTime)
            {
                clearInterval(this.timerCounDown);
            }
            else
            {
                console.log("剩餘時間 = " + Math.round((closeTime - nowTime) / 1000));
            }
            nowTime = Date.now();
        }, 1000);
    }
}

let countDown = new TimerTest();
countDown.CountDown();