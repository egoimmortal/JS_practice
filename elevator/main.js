"use strict";
var ELEVATOR_DIRECTION;
(function (ELEVATOR_DIRECTION) {
    ELEVATOR_DIRECTION[ELEVATOR_DIRECTION["NONE"] = 0] = "NONE";
    ELEVATOR_DIRECTION[ELEVATOR_DIRECTION["UP"] = 1] = "UP";
    ELEVATOR_DIRECTION[ELEVATOR_DIRECTION["DOWN"] = 2] = "DOWN";
})(ELEVATOR_DIRECTION || (ELEVATOR_DIRECTION = {}));
class ElevatorPeople {
    constructor() {
        this.nowFloor = this.GetRandomFloor();
        this.targetFloor = this.GetRandomFloor();
        this.elevatorNum = 0;
        //讓目標樓層和現在樓層有差別
        while (this.targetFloor == this.nowFloor)
            this.targetFloor = this.GetRandomFloor();
    }
    /**取得當前樓層 */
    GetNowFloor() {
        return this.nowFloor;
    }
    /**取得目標樓層 */
    GetTargetFloor() {
        return this.targetFloor;
    }
    /**設定在哪一個電梯 */
    SetElevatorNum(num) {
        this.elevatorNum = num;
    }
    /**取得當前在哪一個電梯 */
    GetElevatorNum() {
        return this.elevatorNum;
    }
    /**取得1~10的亂數樓層 */
    GetRandomFloor() {
        return Math.floor(Math.random() * 9) + 1;
    }
}
class Building {
    constructor() {
        this.floor = 10;
        this.elevatorNum = 2;
        this.elevatorList = [];
        this.floorPeopleNum = [];
        //根據電梯上限新增幾部電梯
        for (let i = 0; i < this.elevatorNum; i++) {
            this.elevatorList.push(new Elevator(this.floor));
        }
    }
    /**取得大樓等待人數的長度 */
    GetElevatorListLength() {
        return this.elevatorList.length;
    }
    /**設定樓層 */
    SetFloor(people) {
        /**預設第一個電梯 */
        let nowElevator = this.elevatorList[0];
        /**預設樓層差距 */
        let distance = 9;
        /**將新增的人加入至隊伍中 */
        this.floorPeopleNum.push(people);
        //判斷哪一個電梯離該樓層較近
        for (let i = 0; i < this.elevatorNum; i++) {
            nowElevator = this.elevatorList[i];
            let temDistance = people.GetNowFloor() - this.elevatorList[i].GetFloor();
            //電梯移動中
            if (nowElevator.GetDirection() != ELEVATOR_DIRECTION.NONE) {
                //如果按電梯的人在反方向就不理她
                if (temDistance < 0)
                    continue;
            }
            //設定的樓層在電梯移動的方向
            if (temDistance < distance) {
                nowElevator = this.elevatorList[i];
                distance = temDistance;
            }
        }
        //如果目前沒有設定電梯方向
        if (nowElevator.GetDirection() == ELEVATOR_DIRECTION.NONE) {
            if (nowElevator.GetFloor() < people.GetTargetFloor())
                nowElevator.SetDirection(ELEVATOR_DIRECTION.UP);
            else
                nowElevator.SetDirection(ELEVATOR_DIRECTION.DOWN);
        }
        nowElevator.SetTargetFloor(people.GetTargetFloor());
    }
    /**移動樓層，如果電梯往上就往上加一層，電梯往下就往下減一層 */
    MoveFloor() {
        for (let i = 0; i < this.elevatorNum; i++) {
            let nowElevator = this.elevatorList[i];
            if (nowElevator.GetDirection() == ELEVATOR_DIRECTION.UP)
                nowElevator.SetFloor(nowElevator.GetFloor() + 1);
            else if (nowElevator.GetDirection() == ELEVATOR_DIRECTION.DOWN)
                nowElevator.SetFloor(nowElevator.GetFloor() - 1);
        }
    }
    /**處理樓層事件 */
    HandleFloor() {
        //判斷該樓層是否有人要下電梯，有的話電梯人數減少、大樓等待隊伍的人員移除電梯減少的人
        //判斷該樓層是否有人要上電梯，有的話電梯人數增加與該樓層人數減少一樣的人數
        //當電梯到達底層或頂層或這一層沒有人且電梯內沒有人的時候將電梯的移動狀態設置為不動(NONE)
        //判斷大樓裡是否有人等待電梯，有的話電梯移動且移動狀態改變
    }
    /**取得是否有電梯移動中 */
    IsElevatorMove() {
        for (let i = 0; i < this.elevatorNum; i++) {
            if (this.elevatorList[i].GetDirection() == ELEVATOR_DIRECTION.NONE)
                continue;
            else
                return true;
        }
        return false;
    }
}
class Elevator {
    constructor(floorNum) {
        this.targetFloor = [];
        this.floor = 1;
        this.direction = ELEVATOR_DIRECTION.NONE;
        this.people = 0;
        this.limit = 5;
        this.nextFloorTime = 1;
        this.handlePeopleTime = 1;
        for (let i = 0; i < floorNum; i++) {
            this.targetFloor.push(0);
        }
    }
    /**設定現在的樓層 */
    SetFloor(num) {
        this.floor = num;
    }
    /**設定目標樓層 */
    SetTargetFloor(num) {
        this.targetFloor[num] = 1;
    }
    /**設定電梯方向 */
    SetDirection(num) {
        this.direction = num;
    }
    /**取得現在的樓層 */
    GetFloor() {
        return this.floor;
    }
    /**取得目標樓層 */
    GetTargetFloor() {
        return this.targetFloor[0];
    }
    /**設定電梯方向 */
    GetDirection() {
        return this.direction;
    }
    /**取得人數 */
    GetPeopleNum() {
        return this.people;
    }
    /**取得電梯到下一個樓層的時間 */
    GetNextFloorTime() {
        return this.nextFloorTime;
    }
    /**電梯到當樓層的時候處理人類的時間 */
    GetHandlePeopleTime() {
        return this.handlePeopleTime;
    }
    /**增加人數 */
    AddPeople(num) {
        if (this.people < this.limit)
            this.people += num;
    }
    /**減少人數 */
    ReducePeople(num) {
        if (this.people > 0)
            this.people -= num;
    }
    /**到達樓層後移除樓層 */
    RemoveTargetFloor(num) {
        this.targetFloor[num] = 0;
    }
    /**到達一樓或是頂樓的時候清除所有的目標樓層，電梯方向歸零 */
    ClearTargetFloor() {
        for (let i = 0; i < this.targetFloor.length; i++) {
            this.targetFloor[i] = 0;
        }
        this.direction = ELEVATOR_DIRECTION.NONE;
    }
}
let nowPeopleNum = 0;
let peopleLimit = 40;
let totalTime = 0;
let BollerBuilding = new Building();
//每秒執行1次動作
let journey = setInterval(() => {
    if (nowPeopleNum < peopleLimit) {
        //產生1個人類
        let newPeople = new ElevatorPeople();
        //產生出來的人類按下電梯
        BollerBuilding.SetFloor(newPeople);
    }
    //電梯移動
    BollerBuilding.MoveFloor();
    //處理樓層事件
    BollerBuilding.HandleFloor();
    //總時間+1秒
    totalTime++;
    console.log("總花費時間為 : " + totalTime);
    //判斷是否人數超過上限、是否有人尚未移動完、電梯是否停止移動
    if (nowPeopleNum >= peopleLimit && BollerBuilding.GetElevatorListLength() == 0 && !BollerBuilding.IsElevatorMove()) {
        clearInterval(journey);
    }
}, 1000);
