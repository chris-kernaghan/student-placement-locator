const overlay = document.getElementById('overlay');
const overlayShow = document.getElementById('show-overlay');
const overlayClose = document.getElementById('close-overlay');
const contactForm = document.getElementById('contact-input');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const messageInput = document.getElementById('message-input');
const postcodeForm = document.getElementById('postcode-form');
const postcodeInput = document.getElementById("postcode");

let isValid = false;
let findPostcodeBtn = document.getElementById("find-postcode");

function clearFormData() {
  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
}

// Show Overlay, focus on Name Input, Prevent scrolling
  function showOverlay() {
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    nameInput.focus();
  }

  // Hide Overlay, Allow Scrolling
function closeOverlay() {
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    clearFormData();
}


//Validation of contact form
let form = document.getElementById("contact-input");
async function handleSubmit(e) {
e.preventDefault();
let status = document.getElementById("my-form-status");
let data = new FormData(e.target);

fetch(e.target.action, {
  method: form.method,
  body: data,
  headers: {
    'Accept': 'application/json'
}
}).then(response => {
  if (response.ok) {
    status.innerHTML = "Thanks for your submission!";
    setTimeout(function(){
      status.innerHTML = "";
    }, 3000);    
    form.reset();
  } else {
    response.json().then(data => {
    if (Object.hasOwn(data, 'errors')) {
      status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
    } else {
      status.innerHTML = "Oops! There was a problem submitting your form";
      setTimeout(function(){
        status.innerHTML = "";
      }, 3000);    
    }
  })
}
}).catch(error => {
  status.innerHTML = "Oops! There was a problem submitting your form"
  setTimeout(function(){
    status.innerHTML = "";
  }, 3000);    
})
};

// Creation of tile layer using OpenStreetMap
const basemaps = {
  StreetView: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }),
};

// Create the map with a default view
let myMap = L.map('map-container', {
  scrollWheelZoom: false
}).setView([54.5296, -5.83], 10,);

// Add the tile layer to the map
basemaps.StreetView.addTo(myMap);

// Add Base Campuses to Map
let lisburnCampus = L.marker([54.51259, -6.04176]).addTo(myMap);
let bangorCampus = L.marker([54.65638, -5.66181]).addTo(myMap);
let downpatrickCampus = L.marker([54.32529, -5.71815]).addTo(myMap);

// Bind Popups to Markers
lisburnCampus.bindPopup("<b>South Eastern Regional College:</b><br>Lisburn");
bangorCampus.bindPopup("<b>South Eastern Regional College:</b><br>Bangor");
downpatrickCampus.bindPopup("<b>South Eastern Regional College:</b><br>Downpatrick");

// Function to read the JSON file
function readJSONFile(file, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

// Function to add placements to the map
function addPlacementsToMap(placements) {
  for (let i = 0; i < placements.length; i++) {
    let placement = placements[i];

    // Create a custom divIcon with the Font Awesome icon
    let customIcon = L.divIcon({
      className: 'custom-icon',
      html: '<i class="fas fa-shield-dog"></i>',
      iconSize: [30, 30], // Adjust the size of the icon as needed
      iconAnchor: [12, 30], // Anchor point of the icon relative to its position
      popupAnchor:  [3, -18] // Anchor where the pop up is shown to align to cutomIcon
    });

    let marker = L.marker([placement.lat, placement.lng], { icon: customIcon }).addTo(myMap);
    marker.bindPopup("<b>" + placement.name + "</b><br><b>Address: </b>" + placement.address + "<br><b>Website: </b>" + placement.website + "<br><b>Bus/Train links: </b>" + placement.description);
  }

  // Center the map on the default view coordinates
  myMap.setView([54.5296, -5.83], 10);
}

// Call readJSONFile to read Placement.json and add placements to the map
readJSONFile('Placement.json', function (response) {
  let placements = JSON.parse(response);
  addPlacementsToMap(placements);
});


// Function to locate and display map based on postcode
function locateByPostcode(postcode) {
  // Remove previous user-added markers from the map
  myMap.eachLayer(function (layer) {
    if (layer instanceof L.Marker && layer.getPopup().getContent() === "Your Postcode") {
      myMap.removeLayer(layer);
    }
  });

  // Locate postcode on map
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: postcode }, function (results, status) {
    if (status === "OK" && results.length > 0) {
      let location = results[0].geometry.location;

      // Center the map on the user's location
      myMap.setView([location.lat(), location.lng()], 12);

      // Add a marker at the user's location
      let userMarker = L.marker([location.lat(), location.lng()]).addTo(myMap);
      userMarker.bindPopup("Entered Postcode");
    } else {
      alert("Unable to locate the postcode. Please try again.");
    }
  });
}

// Function to clear user-added markers
function clearUserMarkers() {
  // Remove only the markers with popup content "Entered Postcode"
  myMap.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      let popupContent = layer.getPopup().getContent();
      if (popupContent === "Entered Postcode") {
        myMap.removeLayer(layer);
      }
    }
  });
}

// Will find entered postcode on map
function enteredPostcode() {
  let postcode = document.getElementById("postcode").value;
    if (postcode.trim() === "") {
      alert("Please enter a postcode.");
      return;
    }
    clearUserMarkers(); // Clear only the user-added markers
    locateByPostcode(postcode);
}

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Modal Event Listeners
  overlayShow.addEventListener('click', showOverlay);
  overlayClose.addEventListener('click', closeOverlay);
  // Contact Form Event Listeners
  form.addEventListener("submit", handleSubmit);
  // Map Event Listeners  
  findPostcodeBtn.addEventListener('click', enteredPostcode);
  // Event Listener for Enter Button - Need to fix this 
  postcodeInput.addEventListener('keydown', function(e) {       
    if (e.code === 'Enter') {  
      e.preventDefault();    
      enteredPostcode();
  }
  }); 

  let clearPostcodeBtn = document.getElementById("clear-postcode");
  clearPostcodeBtn.addEventListener("click", function () {
    clearUserMarkers(); // Clear only the user-added markers
    postcodeInput.value = ""; 
  });
});



