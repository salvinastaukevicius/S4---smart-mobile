// Get the authorization code from the URL query parameters
const code = new URLSearchParams(window.location.search).get("code");

// Send a POST request to the token endpoint to exchange the code for an access token
const data = {
    code: code,
    client_id:
        "643398672506-a5k2fjtmk0hsljf90qli3jiibebalpok.apps.googleusercontent.com",
    client_secret: "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",
    redirect_uri: "http://localhost:5500/pwa/redirect.html",
    //   redirect_uri: 'https://i481136.hera.fhict.nl/redirect.html',
    grant_type: "authorization_code",
};

fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => {

        const accessToken = data.access_token;
        caloriesData(accessToken);
        stepsData(accessToken);
        stepsDataWeek(accessToken);
        stepsDataMonth(accessToken);


    });

//getting fitness data

var endTimeMillis = new Date().getTime(); //right now

const now = new Date(); //start of the day
now.setHours(0, 0, 0, 0);
var startTimeMillis = now.getTime();

const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (now.getDay() + 6) % 7, 0, 0, 0);
const wAgoMidnightMillis = startOfWeek.getTime();

const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
const mAgoMidnightMillis = startOfMonth.getTime();
console.log(mAgoMidnightMillis);

let dayOfWeek = now.getDay(); // get the day of the week (0-6)
if (dayOfWeek === 0) {
    dayOfWeek = 7; // convert Sunday (0) to 7
} 











function caloriesData(data) {

    if (typeof data !== 'undefined') {
        mydata = data;
        localStorage.setItem('thetoken', mydata);
    } else {

    }

    console.log("Access token:", localStorage.getItem('thetoken'));

    fetch(
        "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('thetoken'),
            },
            body: JSON.stringify(requestBody_calories),
        }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            var steps = data.bucket[0].dataset[0].point[0].value[0].fpVal;
            let small_steps = steps.toFixed(0);
            var stepsElement = document.getElementById("calories");
            stepsElement.innerHTML = small_steps + " kcal";
            console.log(small_steps);
        })
        .catch((error) => {
            console.error(error);
        });

    console.log(steps);
}

function stepsData(data) {

    if (typeof data !== 'undefined') {
        mydata = data;
        localStorage.setItem('thetoken', mydata);
    } else {

    }

    console.log("Access token:", localStorage.getItem('thetoken'));

    fetch(
        "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('thetoken'),
            },
            body: JSON.stringify(requestBody_steps),
        }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            var steps = data.bucket[0].dataset[0].point[0].value[0].intVal;
            var stepsElement = document.getElementById("steps");
            stepsElement.innerHTML = steps;
            console.log(steps);
            getStepsdaily(steps);
        })
        .catch((error) => {
            console.error(error);
        });

    console.log(steps);
}

function stepsDataWeek(data) {

    if (typeof data !== 'undefined') {
        mydata = data;
        localStorage.setItem('thetoken', mydata);
    } else {

    }

    console.log("Access token:", localStorage.getItem('thetoken'));

    fetch(
        "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('thetoken'),
            },
            body: JSON.stringify(requestBody_steps_week),
        }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            var stepsweek = data.bucket[0].dataset[0].point[0].value[0].intVal;
            console.log(stepsweek);
            getStepsWeek(stepsweek);
            getStepsWeekAverage(stepsweek);
        })
        .catch((error) => {
            console.error(error);
        });

    console.log(stepsweek);
};

function stepsDataMonth(data) {

    if (typeof data !== 'undefined') {
        mydata = data;
        localStorage.setItem('thetokennnnn', mydata);
    } else {

    }

    console.log("Access token:", localStorage.getItem('thetoken'));

    fetch(
        "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('thetoken'),
            },
            body: JSON.stringify(requestBody_steps_month),
        }
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            var stepsmonth = data.bucket[0].dataset[0].point[0].value[0].intVal;
            console.log(stepsmonth);
            getStepsMonth(stepsmonth);
        })
        .catch((error) => {
            console.error(error);
        });

};








var requestBody_calories = {
    aggregateBy: [
        {
            dataTypeName: "com.google.calories.expended",
            dataSourceId:
                "derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended",
        },
    ],
    bucketByTime: { durationMillis: 86400000 },
    startTimeMillis: startTimeMillis,
    endTimeMillis: endTimeMillis,
};

var requestBody_steps = {
    aggregateBy: [
        {
            dataTypeName: "com.google.step_count.delta",
            dataSourceId:
                "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
        },
    ],
    bucketByTime: { durationMillis: 86400000 },
    startTimeMillis: startTimeMillis,
    endTimeMillis: endTimeMillis,
};

var requestBody_steps_week = {
    aggregateBy: [
        {
            dataTypeName: "com.google.step_count.delta",
            dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
        },
    ],
    bucketByTime: { durationMillis: 6048000000 },
    startTimeMillis: wAgoMidnightMillis,
    endTimeMillis: endTimeMillis,
};

var requestBody_steps_month = {
    aggregateBy: [
        {
            dataTypeName: "com.google.step_count.delta",
            dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
        },
    ],
    bucketByTime: { durationMillis: 24192000000 },
    startTimeMillis: mAgoMidnightMillis,
    endTimeMillis: endTimeMillis,
};

















const buttons = document.querySelectorAll(".selectorButton");
let selectedButton = document.querySelector(".selectorButton.selected");

var stepsDailyData
let getStepsdaily = (data) => { stepsDailyData = data; }


var stepsWeekData
let getStepsWeek = (data) => { stepsWeekData = data; }

var stepsWeekDataAverage
var stepsWeekDataAverageReally 

let getStepsWeekAverage = (data) => {
    stepsWeekDataAverage = data;
 stepsWeekDataAverageReally = stepsWeekDataAverage / dayOfWeek; 
}


var stepsMonthData
let getStepsMonth = (data) => { stepsMonthData = data; }



var steps6monthData

var stepsYearData
var span1 = document.getElementById('averageText');
                var span2 = document.getElementById('average');
                var span3 = document.getElementById('perDay');


buttons.forEach(button => {
    button.addEventListener('click', function () {


        if (selectedButton) {
            selectedButton.classList.remove('selected');
        }
        button.classList.add('selected');
        selectedButton = button;

        selectedTimeInterval = selectedButton.textContent;


        switch (selectedTimeInterval) {
            case "D":
                var showDailySteps = document.getElementById('steps');
                showDailySteps.innerHTML = stepsDailyData;
                var showDayText = document.getElementById('today');
                showDayText.innerHTML = "Today"

                span1.innerHTML = "";
                span2.innerHTML = "";
                span3.innerHTML = "";
                break;
            case "W":
                var showWeekSteps = document.getElementById('steps');
                showWeekSteps.innerHTML = stepsWeekData;
                var showDayText = document.getElementById('today');
                showDayText.innerHTML = "This week"
                var showWeekStepsAverage = document.getElementById('average');
                showWeekStepsAverage.innerHTML = stepsWeekDataAverageReally;

                span1.innerHTML = "AVERAGE";

                span3.innerHTML = "per day";
                break;
            case "M":
                var showMonthSteps = document.getElementById('steps');
                showMonthSteps.innerHTML = stepsMonthData;
                var showDayText = document.getElementById('today');
                showDayText.innerHTML = "This month"
                break;
            case "6 M":
                console.log("now its 6m");
                break;
            case "Y":
                console.log("now its Y");
                break;
            default:
                console.log("def d")
        }


    });
});