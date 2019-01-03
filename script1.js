const monthCollection = ['January', 'February', 'March',
'April', 'May', 'June',
'July', 'August', 'September',
'October', 'November', 'December'];

const dayCollection = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
'Thursday', 'Friday', 'Saturday'];

showCalendar();

createTable("t", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('.btn-prev').onclick = function () {                                                    
    createTable("t", document.querySelector('#calendar-month-year')
        .dataset.year, parseFloat(document.querySelector('#calendar-month-year').dataset.month) - 1);
}
// переключатель плюс месяц
document.querySelector('.btn-next').onclick = function () {
    createTable("t", document.querySelector('#calendar-month-year')
        .dataset.year, parseFloat(document.querySelector('#calendar-month-year').dataset.month) + 1);
}

//this function will find today's date
function showCalendar() {
    var date = new Date();

    setText('calendar-day', dayCollection[date.getDay()]);
    setText('calendar-date', date.getDate());
    setText('calendar-month-year', monthCollection[date.getMonth()] + ' ' + (date.getYear()));

    function setText(id, val) {
        if (val < 10) {
            val = '0' + val;
        }
        document.getElementById(id).innerHTML = val;
    };
}

function createTable(id, year, monthIndex) {
    var lastDate = new Date(year, monthIndex + 1, 0).getDate();
    var nowDate = new Date(year, monthIndex, lastDate);
    var lastDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), lastDate).getDay();
    var firstDay = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1).getDay();

    let calendarRowCollection = new Array();
    let calendarRow = document.createElement('tr');

    //sunday is last day in the week
    if (firstDay == 0)
        firstDay = 7;

    for (var i = 1; i < firstDay; i++) {
        let zeroCell = document.createElement('td');
        calendarRow.appendChild(zeroCell);
    }

    // дни месяца
    for (var i = 1; i <= lastDate; i++) {
        if (i == new Date().getDate() && nowDate.getFullYear() == new Date().getFullYear() && nowDate.getMonth() == new Date().getMonth()) {
            let todayCell = createTd(i);
            todayCell.setAttribute('id', 'today');
            calendarRow.appendChild(todayCell);
        } else if (new Date(nowDate.getFullYear(), nowDate.getMonth(), i).getDay() == 0
            || new Date(nowDate.getFullYear(), nowDate.getMonth(), i).getDay() == 6) {
            let weekendCell = createTd(i);
            weekendCell.setAttribute('id', 'weekend');
            calendarRow.appendChild(weekendCell);
        } else {
            let regularCell = createTd(i);
            calendarRow.appendChild(regularCell);
        }
        if (new Date(nowDate.getFullYear(), nowDate.getMonth(), i).getDay() == 0) {
            calendarRowCollection.push(calendarRow);
            calendarRow = document.createElement('tr');
        }
    }

    const weekDays =  7;
    const emptyCellsAmont = weekDays-calendarRow.childElementCount;

    if(emptyCellsAmont != weekDays ){
        for (let index = 0; index < emptyCellsAmont; index++) {
            let zeroCell = document.createElement('td');
            calendarRow.appendChild(zeroCell);
        } 
        calendarRowCollection.push(calendarRow);
    }
   
    let docBody = document.querySelector('#' + id + ' tbody');
    docBody.innerHTML = '';

    for (const row of calendarRowCollection) {
        docBody.appendChild(row);
    }

    document.querySelector('#calendar-month-year').innerText = monthCollection[monthIndex] + ' ' + nowDate.getFullYear();
    document.querySelector('#calendar-month-year').dataset.month = nowDate.getMonth();
    document.querySelector('#calendar-month-year').dataset.year = nowDate.getFullYear();
    // if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) { // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
    //     document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    // }

    function createTd(dayN) {
        let result = document.createElement("td");
        result.innerText = dayN;
        result.setAttribute('onclick', 'tdclick(event);');
        return result;
    }
}

function tdclick(event) {
    let clickedTD = event.currentTarget;
    let selectedDayNumber = clickedTD.innerText;
    let currentDaySelector = document.querySelector("#calendar-date");
    var i = 1;

    let tmpNode =  clickedTD;
    while( (tmpNode = tmpNode.previousSibling) != null ) 
      i++;

    if (i == 7)
      i = 0;

    let dayOfWeek = dayCollection[i];
    let currentWeekDaySelector = document.querySelector("#calendar-day");
    currentWeekDaySelector.innerText = dayOfWeek;
    currentDaySelector.innerText = selectedDayNumber;
    event.stopPropagation();
};