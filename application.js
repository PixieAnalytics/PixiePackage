// import "jquery.js"

$(document).ready(function(){
  getIP()
  $(document).click(getClicksPerSession)
  // $(window).unload(sendUser)
  $(window).bind('beforeunload', sendUser)
})

function getIP(){
  $.get("http://ipinfo.io", function(response) {
    user = response;
    user.arrival = new Date
    user.clicks = {}
    user.domain = "test"
    // now = getTime()
  }, "jsonp");
}

function getClicksPerSession(e){
  user.clicks[e.target.innerHTML.split(" ")[0]]= new Date - user.arrival
}


function sendUser(e){
  e.preventDefault()
  user.leave = new Date
  user.destination = $(e.target).attr("href")
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/visitors/manage",
    data: user,
  }).done(function(){
    console.log("done")
  }).fail(function(e){
    console.log(e)
  })
}
