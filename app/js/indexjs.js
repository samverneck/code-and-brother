
// function to get data and parse to json
const getData = (data) => JSON.parse(data)

// event click
const useClick = `click`

// function get element by its id
const elementId = (id) => document.getElementById(id)

// function add event listener to el
const addEventTo = (el, event, run) =>
  el.addEventListener(event, run)

// default options for google maps
const mapDefaultOptions = {
  center: { lat: -25.363, lng: -61.044 },
  scrollwheel: false,
  zoom: 2
}
// function to initialize map
const initMap = (el) => () =>
  new google.maps.Map(elementId(el), mapDefaultOptions)
// add function initialize map in global window to execute via callback from jasonp on google maps
window.initMap = initMap(`map`)

// function to get value from element with the id
const getValueElementId = (id) => elementId(id).value


// function to get own location from map
const forGetOwnLocation = () => getOnwLocation()


// function add event to button to get own location
const buttonOwnLocation = addEventTo(elementId(`ownLocation`),
                                            useClick,
                                            forGetOwnLocation)

// function to get own location from current
const getOnwLocation = () =>
  getCurrentPositionFrom(navigator.geolocation,
                          showOwnLocation,
                          showErroGeolocation)

// function to get the current position
const getCurrentPositionFrom = (geolocation, showOwnLocation, showErroGeolocation) => {
  (map)
  return geolocation.getCurrentPosition(showOwnLocation, showErroGeolocation)
}

// function to show error from geolocation
const showErroGeolocation = (err) =>
  ERRORS[ err.code ](elementId(`coordinates`),
                      err.message)

// function to show own location from own position
const showOwnLocation = (pos) => {
  const position = pos.coords
  window.scrollTo(0, 600)
  // log in console of its own position
  ownPositionLog(position)

  return showMapWithMarker ('Own Location')
                              ({ lat: position.latitude,
                                  lon: position.longitude })
}

// function to add marker in map
const showMapWithMarker = (title, type = `own`) => (response) =>
  addMarker( title,
              getGoogleMap('map', getMapOptions(response, type)),
              getPositionCenter(response))


// function to add marker into position in map
const addMarker = (title, map, position) =>
  new google.maps.Marker({
    map,
    position,
    title
})

// function to get google map by its element id
const getGoogleMap = (el, options) =>
  new google.maps.Map(elementId(el), options)

// function get options from map
const getMapOptions = (response, type) => ({
  zoom:  getZoom(type),
  center: getPositionCenter(response),
  scrollwheel: false
})

// function to get zoom, if its domain location or own location
const getZoom = (type) => (type === `own`) ? 17 : 13

// function to get center position from latitude and longitude
const getPositionCenter = (response) =>
  ({ lat: response.lat, lng: response.lon })

// error handlers
const ERRORS = [ '',
  (x) =>
    x.innerHTML = "User denied the request for Geolocation.",
  (x) =>
    x.innerHTML = "Location information is unavailable.",
  (x) =>
    x.innerHTML = "The request to get user location timed out."
]

// function to log position from google map
const ownPositionLog = (position) => {

  console.log('Current Own Position: ')
  console.log('Latitude : ' + position.latitude)
  console.log('Longitude: ' + position.longitude)
  console.log('Accuracy position: ' + position.accuracy)
  console.log('ownPositionLog() ::; ', position);
}
