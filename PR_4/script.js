let latitudeInput = document.getElementById('latInput');
let longitudeInput = document.getElementById('lngInput');
let locateButton = document.getElementById('locateBtn');
let map = L.map('map');
let marker = null;
let LocateMarker = null;
let intervalId;

document.addEventListener('DOMContentLoaded', getMyLocation);

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert('No geolocation support');
    }
}

let KepCoords = {
    latitude: 48.94008672688009,
    longitude: 24.73776026810772
};

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let location = document.getElementById('location');
    let distanceToCollege = document.getElementById('distance');
    let km = computeDistance(position.coords, KepCoords);
    location.innerHTML = `Your latitude: ${latitude}, longitude: ${longitude}`;
    location.innerHTML += ` (with ${position.coords.accuracy.toFixed(2)} meters accuracy)`;
    distanceToCollege.innerHTML = `Distance to college: ${km.toFixed(2)} km`;
    setMarker(map, latitude, longitude);
    setMap(map, latitude, longitude);
}

function setMarker(map, lat, lng) {
    marker = L.marker([lat, lng]);
    let currentTime = new Date().toLocaleTimeString();
    marker.bindPopup(`Your coorsd: ${lat}, ${lng}. Time: ${currentTime}`).openPopup();
    marker.addTo(map);
    return marker;
}

function setMap(map, lat, lng) {
    map.setView([lat, lng], 15);
    if (!map.hasLayer(L.tileLayer)) {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }
}

function displayError(error) {
    const errorType = {
        0: 'Unknown error',
        1: 'Permission denied by user',
        2: 'Position is not available',
        3: 'Request timed out'
    };
    let location = document.getElementById('location');
    let errorMessage = errorType[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    location.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371;
    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians(degrees) {
    let radians = (degrees * Math.PI) / 180;
    return radians;
}

function setMapToCoords(event) {
    event.preventDefault();
    if (LocateMarker != null) {
        map.removeLayer(LocateMarker);
        LocateMarker = null;
    }
    let lat = parseFloat(latitudeInput.value);
    let lng = parseFloat(longitudeInput.value);
    if (isNaN(lat) || isNaN(lng)) {
        alert('Invalid coordinates');
        return;
    }
    LocateMarker = setMarker(map, lat, lng);
    setMap(map, lat, lng);
}

locateButton.addEventListener('click', setMapToCoords);

function markUpdate() {
    map.locate();
    console.log('update');
}

map.on("locationfound", function (e) {
    setMarker(map, e.latlng.lat, e.latlng.lng);
});

function startInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(markUpdate, 10000);
}

startInterval();