// Your code here
function createEmployeeRecord(recordArray){
    let obj = {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj
}
function createEmployeeRecords(arrOfArr){
    let employeeRecords = []

    for (let i=0; i < arrOfArr.length; i++){
        employeeRecords.push(createEmployeeRecord(arrOfArr[i]))
    }
    
    return employeeRecords
}  

function createTimeInEvent(eRecordObj, dateStamp){
    let obj = {
        type: "TimeIn", 
        hour: parseInt(dateStamp.slice(-4)), 
        date: dateStamp.slice(0, 10)
    }
    eRecordObj.timeInEvents.push(obj)
   
    return eRecordObj
}

function createTimeOutEvent(eRecordObj, dateStamp){
    let obj = {
        type: "TimeOut", 
        hour: parseInt(dateStamp.slice(-4)), 
        date: dateStamp.slice(0, 10)
    }
    eRecordObj.timeOutEvents.push(obj)

    return eRecordObj   
}

function hoursWorkedOnDate(eRecordObj, date){
    let hours;
    
    for (let i=0; i<eRecordObj.timeInEvents.length; i++){
        if (eRecordObj.timeInEvents[i].date === date){
            if (eRecordObj.timeOutEvents[i].date === date){
                hours = eRecordObj.timeOutEvents[i].hour - eRecordObj.timeInEvents[i].hour
            }
        }
    }

    return hours/100
}

function wagesEarnedOnDate(eRecordObj, date){
    return (hoursWorkedOnDate(eRecordObj, date)) * eRecordObj.payPerHour
}

function allWagesFor(eRecordObj){
    let allPay = [];
    let allDates = [];

    for (let i = 0; i < eRecordObj.timeInEvents.length; i++){
        allDates.push(eRecordObj.timeInEvents[i].date)
    }

    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(eRecordObj, date))
    });

    return allPay.reduce(( previousValue, currentValue ) => previousValue + currentValue)
}

function calculatePayroll(arrOfERecordObj){
    let payroll = [];

    arrOfERecordObj.forEach(employee => {
        payroll.push(allWagesFor(employee)) 
    });

    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}

