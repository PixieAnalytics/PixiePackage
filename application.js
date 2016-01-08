// import "jquery.js"

$(document).ready(function(){
  getIP()
  $(document).click(getClicksPerSession)
  // $(window).unload(sendUser)
  $('a').click(addDestination)
  $(window).bind('beforeunload', sendUser)
})

function getIP(){
  $.get("http://ipinfo.io", function(response) {
    user = response;
    user.arrival = new Date
    user.clicks = 0
    user.domain = "test"
    // now = getTime()
  }, "jsonp");
}

function getClicksPerSession(e){
  user.clicks += 1
}

function addDestination(){
  user.destination = $(this).attr("href")
}

function sendUser(e){
  e.preventDefault()
  user.leave = new Date
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/visitors/manage",
    data: user,
  }).done(function(){
    console.log(user.destination)
  }).fail(function(e){
    console.log(e)
  })
}
