//let map;

/*
function haversine_distance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}
*/



function initMap() {
  const startLatlng = { lat: 41.15333, lng: 20.1683 };
  //const capitalLatlng = { lat: 41.3275, lng: 19.8187};
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: startLatlng,
  });
  /*
  var mk1 = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: "Country",
  });
  var mk2 = new google.maps.Marker({
    position: capitalLatlng,
    map: map,
    title: "Captial",
  });
  */

  //var distanceLine = new google.maps.Polyline({path: [myLatlng, capitalLatlng], map: map});
  //var distance = haversine_distance(mk1, mk2);
  //console.log("Distance between two markers: " + distance + " miles.")

  map.addListener("center_changed", () => {
    window.setTimeout(() => {
      map.panTo(marker.getPosition());
    }, 200000);
  });
  mk1.addListener("click", () => {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
  map.addListener("bounds_changed", () => {
    if ((map.getBounds().contains(capitalLatlng)) == true) {
      console.log("Capital city is in current map bounds.");
    } else{
      console.log("Capital city is not in current map bounds.");
    }
  });
  map.addListener("zoom_changed", () => {
    currentZoom = map.getZoom();
    console.log("Current zoom is: " + currentZoom);
  });
}

function instructionMessage(){
  alert("Hello this is my map mania game!\nThe game has a 5 minute timer, you are only given 3 hints.\nEach hint uses $100 map cash.\nThe goal of the game is to finish with as much cash as possible.\nOnce you press okay the timer will begin.");
}

function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {
        var counter = document.getElementById("counter");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }
        }
    }
    tick();   
}

function mapCashTracker() {
  var currentCash = 500;
  if(currentCash <= 0){

  }
  var mapCash = document.getElementById("mapCash");
  mapCash.innerHTML = "$" + currentCash.toString();
}

function trackHints() {
  var hints = 3;
  if(hints = 0) {

  }
  var hintsLeft = document.getElementById("hintsLeft");
  hintsLeft.innerHTML = hints.toString(); 
}
