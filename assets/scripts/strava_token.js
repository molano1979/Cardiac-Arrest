setTimeout(function () {
  const tokenURL = `https://www.strava.com/api/v3/oauth/token`;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", tokenURL);

  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log("status", xhr.status);
      console.log("responsetext", xhr.responseText);
      var arrayResponse = JSON.parse(xhr.responseText);
      var expiration = arrayResponse.expires_in;
      var access_token = arrayResponse.access_token;
      localStorage.setItem("access_token", access_token);
      console.log("Seconds to expiration: %c" + expiration, "color:green");
      clearTimeout();
    } else {
      console.log("%c Refreshing access token", "color:red");
    }
  };

  var data = `client_id=${clientID}&client_secret=${secretID}&grant_type=refresh_token&refresh_token=${refreshToken}`;

  xhr.send(data);
}, 1000);
