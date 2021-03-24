// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeesArray) {
  return employeesArray.map(function (newEmployee) {
    return createEmployeeRecord(newEmployee);
  });
}

let createTimeInEvent = function (employee, dateTimeStamp) {
  let [date, hour] = dateTimeStamp.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
};

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(function (e) {
    return e.date === date;
  });
  let timeOut = employee.timeOutEvents.find(function (e) {
    return e.date === date;
  });
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let wagesEarned = hoursWorkedOnDate(employee, date) * employee.payPerHour;
  return parseFloat(wagesEarned.toString());
}

function allWagesFor(employee) {
  let datesWorked = employee.timeInEvents.map(function (e) {
    return e.date;
  });

  let totalPay = datesWorked.reduce(function (daysPay, d) {
    return daysPay + wagesEarnedOnDate(employee, d);
  }, 0);
  return totalPay;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((e) => e.firstName === firstName);
}

let calculatePayroll = function (arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function (memo, rec) {
    return memo + allWagesFor(rec);
  }, 0);
};
