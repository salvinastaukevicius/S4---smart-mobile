const redirectToHome = () => {window.location.href="/home.html"};

const redirectToLights = () => {window.location.href="/connectLights.html"};



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
  
  let usernames = getCookie("cookieIp");
  let gotTheKey = getCookie('cookieKey')
  console.log(usernames);
  console.log(gotTheKey);


