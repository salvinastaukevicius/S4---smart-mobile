
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const today = new Date();
const dayNameOfToday = daysOfWeek[today.getDay()];

// const redirectToProfile = () => {window.location.href="/profile.html"};

const dayOfMonth = today.getDate();
const month = monthsOfYear[today.getMonth()]

const getSpanOfDayNameOfToday = document.getElementById("dayNameOfToday");
const getSpanMonthAndDay = document.getElementById("dayAndMonth");
getSpanOfDayNameOfToday.innerHTML = dayNameOfToday;
getSpanMonthAndDay.innerHTML = dayOfMonth +  " " + month;



function getCookie(name) {
    let cookies = document.cookie.split(";");
  
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
  
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
  
    return null;
  }
  
  let gotTheKey = getCookie("cookieIp");
  let usernames = getCookie('cookieKey')
  console.log(usernames);
  console.log(gotTheKey);

const ButtonOn1 = document.getElementById("turnOn");
const buttonOff = document.getElementById("turnOff");

ButtonOn1.addEventListener("click", function () {
  console.log('hi');
  var bridgeIP = gotTheKey;
  const apiKey = usernames;
  const lightId = 14;
  fetch(`https://${bridgeIP}/api/${apiKey}/lights/${lightId}/state`, {
    method: "PUT",
    body: JSON.stringify({ on: true }),
  }).then((response) => console.log(response));
});

buttonOff.addEventListener("click", function () {
    console.log('hi');
    var bridgeIP = gotTheKey;
    const apiKey = usernames;
    const lightId = 14;
    fetch(`https://${bridgeIP}/api/${apiKey}/lights/${lightId}/state`, {
      method: "PUT",
      body: JSON.stringify({ on: false }),
    }).then((response) => console.log(response));
  });


 
  



//   const https = require('https');

// const options = {
//   hostname: 'www.i481136.hera.fhict.nl',
//   path: '/',
//   method: 'GET'
// };

// const req = https.request(options, res => {
//   console.log(`statusCode: ${res.statusCode}`);
//   res.on('data', d => {
//     process.stdout.write(d);
//   });
// });

// req.on('error', error => {
//   console.error(error);
// });

// req.end();




