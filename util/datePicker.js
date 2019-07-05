class datePicker {
    constructor() {
        this.d = new Date()
        //仅供展示
        this.fullyear = this.d.getFullYear()
        //this.dis_m = this.d.getMonth() + 1
        //this.dis_todayHaoma = this.d.getDate()
        this.m = this.d.getMonth()
        this.calFirstandLast()
    }
    calFirstandLast() {
        this.d.setDate(1)
        //1~6~0
        this.firstDayXingqi = this.d.getDay()
        if (this.firstDayXingqi == 0) {
            this.firstDayXingqi = 7
        }
        let m = this.d.getMonth()
        this.d.setMonth(m + 1)
        this.d.setDate(0)
        this.lastDayHaoma = this.d.getDate()
        this.d.setDate(0)
        this.leftLastDayHaoma = this.d.getDate()
        /**
         * 1 0
         * 2 1
         * 3 2
         * 4 3
         * 7 6
         */
        this.genArr()
    }
    genArr() {
        let leftLen = this.firstDayXingqi - 1
        let leftArr = Array.from(new Array(leftLen), (v, k) => this.leftLastDayHaoma - k).reverse()

        let midArr = Array.from(new Array(this.lastDayHaoma), (v, k) => k + 1)

        let rightLen = 42 - leftLen - this.lastDayHaoma
        let rightArr = Array.from(new Array(rightLen), (v, k) => k + 1)

        let res = [...leftArr, ...midArr, ...rightArr]
        console.log(JSON.stringify(res));
    }
    changeYear(y){
        this.d.setFullYear(y)
        this.d.setMonth(this.m)
    }
    //m 0~11
    changeMonth(m) {
        this.d.setDate(1)
        this.d.setMonth(m)
    }
    nextMonth() {
        this.m = this.m + 1
        this.changeMonth(this.m)
        this.calFirstandLast()
    }
    preMonth() {
        this.m = this.m - 1
        this.changeMonth(this.m)
        this.calFirstandLast()
    }
    nextYear() {
        this.fullyear = this.fullyear + 1
        this.changeYear(this.fullyear)
        console.log(this.d);
        this.calFirstandLast()
    }
    preYear() {
        this.fullyear = this.fullyear - 1
        this.changeYear(this.fullyear)
        this.calFirstandLast()
    }
    goMonth(m) {
        this.m = m - 1
        this.changeMonth(this.m)
        this.calFirstandLast()
    }
}

var d = new datePicker()
// d.goMonth(9)
// d.preMonth()
d.nextYear()
d.nextYear()
