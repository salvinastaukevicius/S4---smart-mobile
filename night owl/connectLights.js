const redirectToSettings = () => {
  window.location.href = "/profile.html";
};
const redirectToHome = () => {window.location.href="/home.html"};
const redirectToProfile = () => {window.location.href="/profile.html"};
const redirectToSleep = () => {window.location.href="/sleep.html"};


var receivedIp;

var submitButton = document.getElementById("textUseThisIP");
submitButton.addEventListener("click", function() {
  var inputElement = document.getElementById("ipInput");
  var inputData = inputElement.value;
  receivedIp = inputData;
  console.log(receivedIp);

  if(receivedIp) {
    information.innerHTML = "We received the IP address of your Philips Hue Bridge"
} else {
    information.innerHTML = "try again"
}
});

//get input IP
// 192.168.0.100


var connectButton = document.getElementById("connect");
connectButton.addEventListener('click', function() {
    fetchData();
})

function fetchData(data) {
    var bridgeIP = receivedIp; 
    const username = "salvinas1765"; 
    fetch(`https://${bridgeIP}/api`, {
      method: "POST",
      body: JSON.stringify({ devicetype: `myapp#${username}` }),
    })
      .then((response) => response.json())
      .then((data) => {
         var username = data[0].success.username;
        // console.log(data);
        console.log(username);
        tunnel(username);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
      });;

    };
    let correctKey;
    const tunnel = data => correctKey = data;
    
    const ButtonOn = document.getElementById("turnon");

    ButtonOn.addEventListener("click", function () {
      document.cookie = "cookieIp=" + receivedIp + "; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/";
      document.cookie = "cookieKey=" + correctKey + "; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/";

      if(receivedIp && correctKey) {
        confirmation.innerHTML = "Lights successfully registered"
      } else {
        confirmation.innerHTML = "Try again"
      }
    });

    var information = document.getElementById('information');
    var confirmation = document.getElementById('confirmation');




    
    



      