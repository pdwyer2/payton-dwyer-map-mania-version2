var favoritePlaces = [
  {"content":"Fence Lake Wisconsin","hint":"Hidden in America's Dairyland","coordinates":{"lat":45.9514,"lng":-89.8358}},
  {"content":"The Great Barrier Reef","hint":"The world's largest coral reef","coordinates":{"lat":-18.2871,"lng":147.6992}},
  {"content":"Chicago","hint":"The Windy City","coordinates":{"lat":41.8781,"lng":-87.6298}}
];
var cheatCodeWin = [
  {"content":"Iceland Secret Win","coordinates":{"lat":64.9631,"lng":-19.0208}}
]
var currentPlaceIndex = favoritePlaces.length-1;
var currentPlace = favoritePlaces[currentPlaceIndex];
var hints = 3;
var totalMarkers = [];


function initApplication() {
  console.log("Favorite Places - Starting!");
}

function initMap() {
  gMap = new google.maps.Map(document.getElementById("map"), {
    "center": {"lat": 41.878, "lng": 10}, "zoom": 3});

    google.maps.event.addListener(gMap, 'idle', function() { updateGame()});
    google.maps.event.addListener(gMap, 'center_changed', function() { checkWin() });
}

function updateGame(){
  console.log("updateGame()");

  var zoomLevel = gMap.getZoom();
  console.log("Zoom Level:" + zoomLevel);

  var inBounds = false;
  if (gMap.getBounds().contains(currentPlace.coordinates)) {
      var inBounds = true;
  } if (gMap.getBounds().contains(cheatCodeWin[0].coordinates)){
      var inBounds = true;
      if ((zoomLevel > 7) && (inBounds)) {
        alert("Cheat location found. YOU WON THE GAME! CONGRATULATIONS!");
        window.close();
      }
  }

  if ((zoomLevel > 7) && (inBounds)) {
      var tempMarker
      console.log("Found!!!");
      if(currentPlaceIndex == 0) {
        var foundLoc = document.getElementById("foundLoc");
        console.log("You Found: " + JSON.stringify(currentPlace.content));
        foundLoc.innerHTML = ("You Found: " + JSON.stringify(currentPlace.content)).toString();
        tempMarker = addMarker(currentPlace);
        totalMarkers.push(tempMarker);
        console.log(totalMarkers.length);
      } else {
        var foundLoc = document.getElementById("foundLoc");
        console.log("You Found: " + JSON.stringify(currentPlace.content));
        foundLoc.innerHTML = ("You Found: " + JSON.stringify(currentPlace.content)).toString();
        tempMarker = addMarker(currentPlace);
        totalMarkers.push(tempMarker);
        console.log(totalMarkers.length);
        nextPlace();
      } 
  }
}

function nextPlace() {
  currentPlaceIndex--;
  currentPlace = favoritePlaces[currentPlaceIndex];
}

function instructionMessage(){
  alert("Hello this is my map mania game!\nThe game has a one minute timer, you are only given three hints.\nThe goal is to find the three locations within one minute.\nOnce you press OKAY the timer will begin. Good Luck.");
}

function addMarker(markerContent) {
  var marker = new google.maps.Marker({position:markerContent.coordinates, map:gMap});
  if (markerContent.iconImagePath) {
      marker.setIcon(markerContent.iconImagePath);
  }

  if (markerContent.content) {
      var infoWindow = new google.maps.InfoWindow({"content":markerContent.content});
      marker.addListener("click", function() { infoWindow.open(gMap, marker) });
  }
}

function countdown(minutes) {
  var seconds = 60;
  var mins = minutes
  
  function tick() {
      var counter = document.getElementById("counter");
      var current_minutes = mins-1;
      seconds--;
      counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
      if( seconds > 0 ) {
          setTimeout(tick, 1000);
      } else {
          if(mins > 1){
              countdown(mins-1);           
          }
      }
      if((current_minutes == 0) && (seconds == 0)) {
        alert("Time run out! GAME OVER!");
        window.close();
      }
  }
  tick();
}

function trackHints() {
if(hints == 0) {
  var hintsLeft = document.getElementById("hintsLeft");
  hintsLeft.innerHTML = "Out of Hints!"
  document.getElementById("hintButton").disabled = true;
} else {
  var hintsLeft = document.getElementById("hintsLeft");
  hintsLeft.innerHTML = hints.toString();

}
}

function sendHint() {
  document.getElementById("hintGiven").setAttribute("value",JSON.stringify(currentPlace.hint));
  hints--;
  trackHints();
  console.log(hints);
}

function checkWin() {
  if ((totalMarkers.length) >= 3){
    alert("YOU WON THE GAME! CONGRATULATIONS!");
    window.close();
  }
}