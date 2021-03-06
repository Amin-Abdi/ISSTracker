# ISSTracker

Website for tracking the current location of the International Space Station.

You can check when the ISS will be overheard at a certain location by using its latitude and longitude.

The website also displays the names of the astronauts that are currently in space.

I used an open source interactive map library called Leaflet that can be found at https://leafletjs.com/

## APIs USED

To get the current location of the ISS I used [wheretheiss at](https://wheretheiss.at/w/developer)

For the overhead times and the names of the astronauts, [open notify api](http://open-notify.org/)

The current location is updated every second since there is a rate limit

### Zoom in to see the real-time movement of the ISS

![ISS Demo](./ISSGif.gif)

### Here is an example using the latutuude and the longitude of London

![Screenshot](./ISSScreenshot.png)
