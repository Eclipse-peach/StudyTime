module.exports.fncRegular = function (timeType, periodNum, timeValue, reservFnc) {
    // timeType: periodic | specific | onetime
    switch (timeType) {
        case "periodic":
            
            if (periodNum == undefined || !timeValue || !reservFnc) {
                return new Error("Function values isn't valid.");
            } else if (typeof periodNum != "number") {
                return new Error(`value 'periodNum' requires type 'number', but type ${typeof periodNum} comes in.`);
            } else {
                if (periodNum == 0) {
                    // looping function
                    // timeValue: interval time (milisecond)
                    function loopFnc() {
                        return new Promise((resolve, reject) => {
                            try {
                                console.log("start!");
                                setTimeout(function () {
                                    reservFnc();
                                    resolve(loopFnc());
                                }, timeValue*1);
                            } catch (e) {
                                reject(e);
                            }
                        })
                    }
                    loopFnc();
                    // setTimeout(loopFnc(), timeValue);
                    return `Function successfully registered. Function will run ${new Date(Date.now() + timeValue)} at first`;
                } else {
                    // period count setted
                    // looping function (while counter > 0);
                    // timeValue: interval time (milisecond)
                    function loopFnc(counter) {
                        return new Promise((resolve, reject) => {
                            try {
                                // console.log("start!");
                                setTimeout(function () {
                                    reservFnc();
                                    if (counter > 1) resolve(loopFnc(counter - 1));
                                    else resolve("fncRegular: Complete");
                                }, timeValue);
                            } catch (e) {
                                reject(e);
                            }
                        })
                    }
                    loopFnc(periodNum);
                    return `Function successfully registered. Function will run ${new Date(Date.now() + timeValue)} at first, and end after function runs ${periodNum} time${periodNum == 1 ? '' : 's'}`;
                }
            }

            break;
            
        case "specific":
            /*

            timeValue: Object {
                optionSetter: HH/MM/SS,
                optionValue
            }

            */

            if (periodNum == undefined || !timeValue || !reservFnc) {
                return new Error("Function values isn't valid.");
            } else if (typeof periodNum != "number") {
                return new Error(`value 'periodNum' requires type 'number', but type ${typeof periodNum} comes in.`);
            } else {
                if (periodNum == 0) {
                    // looping function

                    let intervalTime = 0;

                    function loopFnc() {
                        return new Promise((resolve, reject) => {
                            try {
                                console.log("start!");
                                reservFnc();
                                setTimeout(function () {
                                    resolve(loopFnc());
                                }, intervalTime);
                            } catch (e) {
                                reject(e);
                            }
                        })
                    }

                    // function starttime
                    let startInterval;
                    let startTime;
                    const baseTime = new Date();
                    const Year = baseTime.getFullYear();
                    const Month = baseTime.getMonth();
                    const Day = baseTime.getDate();
                    const Hours = baseTime.getHours();
                    const Minutes = baseTime.getMinutes();
                    const Seconds = baseTime.getSeconds();

                    // function run interval
                    switch (timeValue.optionSetter) {
                        case "HH":
                            intervalTime = 24 * 60 * 60 * 1000;
                            startTime = new Date(Year, Month, Day, timeValue.optionValue, Minutes, Seconds);
                            startInterval = startTime.getTime() - new Date().getTime();
                            if (startInterval < 0) {
                                startTime = new Date(Year, Month, Day+1, timeValue.optionValue, Minutes, Seconds);
                                startInterval = startTime.getTime() - new Date().getTime();
                            }
                            break;
                        case "MM":
                            intervalTime = 60 * 60 * 1000;
                            startTime = new Date(Year, Month, Day, Hours, timeValue.optionValue, Seconds);
                            startInterval = startTime.getTime() - new Date().getTime();
                            if (startInterval < 0) {
                                startTime = new Date(Year, Month, Day, Hours+1, timeValue.optionValue, Seconds);
                                startInterval = startTime.getTime() - new Date().getTime();
                            }
                            break;
                        case "SS":
                            intervalTime = 60000;
                            startTime = new Date(Year, Month, Day, Hours, Minutes, timeValue.optionValue);
                            startInterval = startTime.getTime() - new Date().getTime();
                            if (startInterval < 0) {
                                startTime = new Date(Year, Month, Day, Hours, Minutes+1, timeValue.optionValue);
                                startInterval = startTime.getTime() - new Date().getTime();
                            }
                            break;
                        default:
                            return;
                            break;
                    }
                    // startInterval < 0 ? startInterval *= new Date(Year, Month, Day, Hours, Minutes, Seconds) : startInterval; 

                    setTimeout(() => {
                        loopFnc();
                    }, startInterval);
                    // setTimeout(loopFnc(), timeValue);
                    return `Function successfully registered. Function will run ${startTime} at first (startInterval: ${startInterval} / loopInterval: ${intervalTime})`;
                } else {
                    // period count setted
                    // looping function (while counter > 0);
                    let intervalTime = 0;

                    function loopFnc(counter) {
                        return new Promise((resolve, reject) => {
                            try {
                                console.log("start!");
                                reservFnc();
                                if (counter > 1) setTimeout(function () {
                                    resolve(loopFnc(counter-1));
                                }, intervalTime);
                                else resolve("fncRegular: Complete");
                            } catch (e) {
                                reject(e);
                            }
                        })
                    }

                    // function starttime
                    let startInterval;
                    let startTime;
                    const baseTime = new Date();
                    const Year = baseTime.getFullYear();
                    const Month = baseTime.getMonth();
                    const Day = baseTime.getDate();
                    const Hours = baseTime.getHours();
                    const Minutes = baseTime.getMinutes();
                    const Seconds = baseTime.getSeconds();

                    // function run interval
                    switch (timeValue.optionSetter) {
                        case "HH":
                            intervalTime = 24 * 60 * 60 * 1000;
                            startTime = new Date(Year, Month, Day, timeValue.optionValue, Minutes, Seconds);
                            startInterval = startTime.getTime() - new Date().getTime();
                            if (startInterval < 0) {
                                startTime = new Date(Year, Month, Day+1, timeValue.optionValue, Minutes, Seconds);
                                startInterval = startTime.getTime() - new Date().getTime();
                            }
                            break;
                        case "MM":
                            intervalTime = 60 * 60 * 1000;
                            startTime = new Date(Year, Month, Day, Hours, timeValue.optionValue, Seconds);
                            startInterval = startTime.getTime() - new Date().getTime();
                            if (startInterval < 0) {
                                startTime = new Date(Year, Month, Day, Hours+1, timeValue.optionValue, Seconds);
                                startInterval = startTime.getTime() - new Date().getTime();
                            }
                            break;
                        case "SS":
                            intervalTime = 60000;
                            startTime = new Date(Year, Month, Day, Hours, Minutes, timeValue.optionValue);
                            startInterval = startTime.getTime() - new Date().getTime();
                            if (startInterval < 0) {
                                startTime = new Date(Year, Month, Day, Hours, Minutes+1, timeValue.optionValue);
                                startInterval = startTime.getTime() - new Date().getTime();
                            }
                            break;
                        default:
                            return;
                            break;
                    }
                    // startInterval < 0 ? startInterval *= new Date(Year, Month, Day, Hours, Minutes, Seconds) : startInterval; 

                    setTimeout(() => {
                        loopFnc(periodNum);
                    }, startInterval);
                    return `Function successfully registered. Function will run ${startTime} at first, and end after function runs ${periodNum} time${periodNum == 1 ? '' : 's'}`;
                }
            }
            

            break;
        
        case "onetime":

            // timeValue: YYYYMMDDHHMMSS

            // reference: https://today-hello.tistory.com/13
            if (!timeValue || !reservFnc) {
                return new Error("Function values isn't valid.");
            } else if (periodNum) {
                return new Error(`fncRegular Type '${timeType}' doesn't support both 'timeType' option and 'periodNum' option`);
            } else if (typeof timeValue != "string") {
                return new Error(`value 'timeValue' requires type 'string', but type ${typeof periodNum} comes in.`);
            } else {
                var year = Number(timeValue.substring(0, 4));
                var month = Number(timeValue.substring(4, 6));
                var day = Number(timeValue.substring(6, 8));
                var time = Number(timeValue.substring(8, 10));
                var minute = Number(timeValue.substring(10, 12));
                var second = Number(timeValue.substring(12, 14));
            
                var oprDate = new Date(year, month-1, day, time, minute, second); //동작을 원하는 시간의 Date 객체를 생성합니다.
                var nowDate = new Date();
            
                var timer = oprDate.getTime() - nowDate.getTime(); //동작시간의 밀리세컨과 현재시간의 밀리세컨의 차이를 계산합니다.
                if (timer < 0) { //타이머가 0보다 작으면 함수를 종료합니다.
                    return new Error(`Module Started time (${nowDate}) is later than function start time (${oprDate})`);
                } else {
                    setTimeout(reservFnc, timer);
                    return `Function successfully registered. Function will run ${new Date(nowDate.getTime() + timer)} at first`;
                }
            }

            break;
        
        default:
            break;
    }
}

//Copyright 김화균