// GLOBALLY STORE ALL REQUIRED DATA FOR USE IN PROGRAM
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let am_pm = document.getElementById("AM-PM");
let startStop = document.getElementById("startStop");
let dayDisplay = document.getElementById("day");
let dateDisplay = document.getElementById("date");
let monthDisplay = document.getElementById("month");
let yearDisplay = document.getElementById("year");
let clockDisplay = document.getElementById("clock-display");
let alarmTime = document.getElementById("alarm-time");
let headerFlash = document.getElementById("header-flash");
let getOverlay = document.getElementById("img-overlay");
let getDay = new Date().getDay();
let getDate = new Date().getDate();
let getMonth = new Date().getMonth();
let getYear = new Date().getFullYear();
let getHour = new Date().getHours();

// PREPARE VARS TO STORE DYNAMIC DATA, SETUP ALARM. INSERT & LOOP TRACK
let currentTime;
let alarmElement;
let activeAlarm = false;
let sound = new Audio("media/Fun-LovingSpirit.mp3");
sound.loop = true;

// DISPLAY CLOCK INTERFACE & RUN ALARM FEATURES WHEN SET ALARM TIME IS REACHED
function showTime() {
    let now = new Date();
    currentTime = now.toLocaleTimeString();

    // RUN CHECK TO OUTPUT THE DAY OF THE WEEK IN NON-INTEGER FORMAT
    switch (getDay) {
        case 0:
            getDay = "Sunday";
            break;
        case 1:
            getDay = "Monday";
            break;
        case 2:
            getDay = "Tuesday";
            break;
        case 3:
            getDay = "Wednesday";
            break;
        case 4:
            getDay = "Thursday";
            break;
        case 5:
            getDay = "Friday";
            break;
        case 6:
            getDay = "Saturday";
    }
    // RUN CHECK TO OUTPUT THE MONTH OF THE YEAR IN NON-INTEGER FORMAT
    switch (getMonth) {
        case 0:
            getMonth = "January";
            break;
        case 1:
            getMonth = "February";
            break;
        case 2:
            getMonth = "March";
            break;
        case 3:
            getMonth = "April";
            break;
        case 4:
            getMonth = "May";
            break;
        case 5:
            getMonth = "June";
            break;
        case 6:
            getMonth = "July";
            break;
        case 7:
            getMonth = "August";
            break;
        case 8:
            getMonth = "September";
            break;
        case 9:
            getMonth = "October";
            break;
        case 10:
            getMonth = "November";
            break;
        case 11:
            getMonth = "December";
    }
    // CONDITIONAL STATEMENTS TO ACTIVATE ALARM ELEMENTS
    if (currentTime === alarmElement) {
        sound.play();
        getOverlay.style.width = "100%";
        headerFlash.style.cssText = "animation-name: header-flash; margin-left: 0px";
        startStop.style.animationName = "button-flash";
    }
    // DISPLAY INDIVIDUAL DATE OBJECTS & RUN TIME / CLOCK
    setTimeout(showTime, 1000);
    dayDisplay.innerHTML = getDay;
    dateDisplay.innerHTML = getDate;
    monthDisplay.innerHTML = getMonth;
    yearDisplay.innerHTML = getYear;
    clockDisplay.innerHTML = currentTime;
}
showTime();

// CLOSE IMAGE OVERLAY AFTER ALARM ACTIVATION (CLIENT ACTION)
function closeImageOverlay() {
    headerFlash.style.animationName = "";
    getOverlay.style.width = "0%";
    headerFlash.innerHTML = "Have a nice day :)";
}

// USE ES6 TERNARY OPERATOR TO DISPLAY AM OR PM
function showAmPm() {
    getHour >= 00 && getHour < 12 ? am_pm.innerHTML = "AM" : am_pm.innerHTML = "PM";
    // document.location.reload()??? HOW TO GET PAGE TO REFRESH ON AM/PM CHANGE??? 
}
showAmPm();

// LOOP THROUGH SELECT OPTIONS, ADDING EACH OPTION FOR CLIENT SELECTION
function addMinSec(id) {
    let select = id;
    let min = 59;

    for (i = 0; i <= min; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i);
    }
}

function addHour(id) {
    let select = id;
    let hour = 23;

    for (i = 0; i <= hour; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i);
    }
}

addHour(hours);
addMinSec(minutes);
addMinSec(seconds);

// 'SET ALARM' IS CLICKED > DISABLE OPTIONS, ASSIGN 'alarmElement' & ACTIVATE ANIMATION 
startStop.onclick = function () {
    if (activeAlarm === false) {
        hours.disabled = true;
        minutes.disabled = true;
        seconds.disabled = true;

        alarmElement = hours.value + ":" + minutes.value + ":" + seconds.value;
        this.textContent = "Clear Alarm";
        alarmTime.innerHTML = "This alarm is set for: " + alarmElement;
        alarmTime.style.animationName = "alarm-time-pulse";

        activeAlarm = true;
        // 'CLEAR ALARM' IS CLICKED > RE-ENABLE SELECTION...
    } else {
        hours.disabled = false;
        minutes.disabled = false;
        seconds.disabled = false;
        // STOP TRACK AND SET TRACK BACK TO START...
        sound.pause();
        sound.currentTime = 0;
        // AND RESET ALL REQUIRED ANIMATIONS & VISUAL INTERFACE
        alarmTime.style.animationName = "";
        alarmTime.innerHTML = "No alarm set";
        headerFlash.innerHTML = "Red Alert!!!";
        startStop.style.animationName = "";
        headerFlash.style.cssText = "animation-name: none; margin-left: -3000px";
        this.textContent = "Set Alarm";
        activeAlarm = false;
    }
}