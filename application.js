// import "jquery.js"

$(document).ready(function(){
  getIP()
  $(document).click(getClicksPerSession)
  // $(window).unload(sendUser)
  $('a').click(addDestination)
  $(window).bind('beforeunload', sendUser)
})

function getIP(){
  $.ajax({
    url: "https://freegeoip.net/json/",
    type: "post",
    dataType: "jsonp"
  })
  .done(function(response){
    user=response
    user.arrival = new Date
    user.clicks = 0
    user.heatmap = []
    user.domain = domain
  })
}

function clickLocation(e){
  return {x: e.pageX, y: e.pageY}
}

function getClicksPerSession(e){
  user.heatmap.push(clickLocation(e))
  user.clicks +=1
}

function addDestination(){
  user.destination = $(this).attr("href")
}

function sendUser(e){
  e.preventDefault()
  user.leave = new Date
  $.ajax({
    type: "POST",
    url: "http://pixiereport.herokuapp.com/visitors/manage",
    data: user,
  }).done(function(){
    console.log(user.destination)
  }).fail(function(e){
    console.log(e)
  })
}
