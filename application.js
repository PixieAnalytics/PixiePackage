// import "jquery.js"

$(document).ready(function(){
  getIP()
  $(document).click(getClicksPerSession)
  $(window).unload(sendUser)
})

function getIP(){
  $.get("http://ipinfo.io", function(response) {
    user = response;
    user.arrival = new Date
    user.clicks = {}
    // now = getTime()
  }, "jsonp");
}

function getClicksPerSession(e){
  user.clicks[e.target.innerHTML.split(" ")[0]]= new Date - user.arrival
}


function sendUser(e){
  user.leave = new Date
  user.destination = $(e.target).attr("href")
  $.ajax({
    url: "http://localhost:3000",
    data: user,
    method: "post"
  }).done(function(){
    console.log("done")
  }).fail(function(){
    console.log("fail")
  })
}
