function signInWithGoogle() {
	var googleAuthProvider = new firebase.auth.GoogleAuthProvider
	var database = firebase.database()
	firebase.auth().signInWithRedirect(googleAuthProvider)
		.then(function(data) {
			
		})
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			}
			else {
				alert(errorMessage);
			}
			console.log(error)
		})
}

function reloadData() {
	var user = firebase.auth().currentUser
	var idToken = user.idToken
	var image = user.photoURL
	var email = user.email
	var name = user.displayName

	document.getElementById('pfp').setAttribute('src', image)
	document.getElementById('ppfp').setAttribute('src', image)
	document.getElementById('google-displayName').innerHTML = name
	document.getElementById('google-email').innerHTML = email
	document.getElementById('hidden').style.display = "inline"
	document.getElementById('login-screen').style.display = "none"

	getLocation()
}

function checkIfLoggedIn() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log('User signed in')
			console.log(user)
			console.log(firebase.auth())
			document.getElementById('code').disabled = false
			document.getElementById('submit-button').disabled = false
			document.getElementById('center').style.backgroundColor = "#58a618"
			document.getElementById('signin-button').setAttribute("disabled", true)
				// do logged in stuff
				// reloadData()
		}
		else {
			console.log('User not signed in.')
				// do not logged in stuff

		}
	})

}

window.onload = function() {
	checkIfLoggedIn()
}

function signOut() {
	firebase.auth().signOut()
	document.getElementById('signin-button').setAttribute("disabled", false)
	location.reload();
}

function checkForCode() {
	var familyCode = document.getElementById('code').value
	var database = firebase.database()
	var databaseRef = database.ref('/')
		// var testDatabase = database.
	databaseRef.once("value")
		.then(function(snapshot) {
			var exists = snapshot.child(familyCode).exists() // true
			if (exists == true){
				reloadData()
			} else if (exists == false){
				console.log("invalid code")
			}
		})

}