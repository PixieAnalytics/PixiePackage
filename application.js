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
    url: "http://localhost:3000/users/1/projects/1",
    data: user,
    method: "post"
  }).done(function(){
    console.log("done")
  }).fail(function(e){
    console.log(e)
  })
}
