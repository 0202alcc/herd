var map, infoWindow
var x = document.getElementById("demo");

var minorComments = {
	late: "I'm running late",
	sick: "Not feeling well",
	busy: "Stuck at work/school"
}
var majorComments = {
	attacked: "I was attacked/assaulted",
	sick: "In the hospital",
	call: "Call Me ASAP"
	
}
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}
function showPosition(position) {
	//inits and centers the map based on current user's location
	var ltt = position.coords.latitude
	var lgt = position.coords.longitude
	// x.innerHTML = "Latitude: " + ltt + "<br>Longitude: " + lgt

	var home = {
		lat: ltt,
		lng: lgt
	}

	map = new google.maps.Map(document.getElementById('map'), {
		center: home,
		zoom: 15
	})
	document.getElementById("loading").style.display = "none"
	var database = firebase.database()
	var user = firebase.auth().currentUser
	var profile = user.photoURL
	var name = user.displayName
	var uid = user.uid
	//updates the herd database
	var familyCode = document.getElementById('code').value
	var userLatitude = database.ref('/' + familyCode + '/' + uid + '/latitude')
	var userLongitude = database.ref('/' + familyCode + '/' + uid + '/longitude')
	var userPic = database.ref('/' + familyCode + '/' + uid + '/pic')
	var userName = database.ref('/' + familyCode + '/' + uid + '/name')
	var userId = database.ref('/' + familyCode + '/' + uid + '/uid')
	var famRef = database.ref('/' + familyCode)
	var statusRef = database.ref('/' + familyCode + '/' + uid + '/status')
	famRef.on('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var childData = childSnapshot.val()
			console.log(childData)
			function changeCenter(){
				var center = new google.maps.LatLng(childData.latitude, childData.longitude)
				map.panTo(center)
			}
			var image = {
				url: childData.pic,
				scaledSize: new google.maps.Size(25, 25),
				anchor: new google.maps.Point(12.5, 37.5)
			}

			var marker = new google.maps.Marker({
				position: {
					lat: childData.latitude,
					lng: childData.longitude,
				},
				label: childData.name,
				map: map

			})
			var marker = new google.maps.Marker({
				position: {
					lat: childData.latitude,
					lng: childData.longitude,
				},
				icon: image,
				map: map

			})
			var list = document.createElement("li")
			var tabName = document.createElement("a")
			var tabSubName = document.createTextNode(childData.name)
			var tabImage = document.createElement("img")
			tabName.appendChild(tabImage)
			tabName.appendChild(tabSubName)
			list.appendChild(tabName)
			var tab = document.getElementById("tabs")
			tab.appendChild(list)
			tabName.className = "white-text waves-effect truncate"
			tabImage.className = "tabImage"
			tabName.onclick = function() {
				var center = new google.maps.LatLng(childData.latitude, childData.longitude)
				map.panTo(center)
			}
			tabName.setAttribute("id", "tabs")
			tabImage.setAttribute("src", childData.pic)
		})
	})
	return userLatitude.set(ltt) && userLongitude.set(lgt) && userPic.set(profile) && userName.set(name) && userId.set(uid) && statusRef.set(status)
}
var minor = document.getElementById('minorissue')
var major = document.getElementById('majorissue')
var ok = document.getElementById('noissue')
var status
var statusText = document.getElementById('')
minor.onclick = function(){
	status = "minor"
	console.log(status)
	document.getElementById('status').innerHTML = "Current status: " + status
}
major.onclick = function(){
	status = "major"
	console.log(status)
	document.getElementById('status').innerHTML = "Current status: " + status
}
noissue.onclick = function(){
	status = "OK"
	console.log(status)
	document.getElementById('status').innerHTML = "Current status: " + status
}