// import "jquery.js"

$(document).ready(function(){
  getIP()
})

function getIP(){
  $.get("http://ipinfo.io", function(response) {
    console.log(response);
  }, "jsonp");
}
