//connects to the realtime Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAltfVxA74BnR_V-lWJvtmxs4xtEs9IVZ4",
  authDomain: "project-alarm-1b5d7.firebaseapp.com",
  databaseURL: "https://project-alarm-1b5d7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-alarm-1b5d7",
  storageBucket: "project-alarm-1b5d7.appspot.com",
  messagingSenderId: "92077132617",
  appId: "1:92077132617:web:2228b1b31f0bd1c8cda898",
  measurementId: "G-5S6MS2GE03"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const dbRef = db.ref();


//function to update the alarm state to off on the database
function silenceAlarm(alarmState) {
  firebase.database().ref("AlarmState/-MxaMf5E_orKF7XW6Yhw").set({
    alarmOn: alarmState
  });
}

//function to get the data from the firebase.
//the async means that this function will execute in the background while the script
//performing other tasks.
async function firebaseGet(collectionName) {

    const snapshot = await dbRef.child(collectionName).get()
		.catch(error => {
          throw error.message;
		});
    return snapshot.val();
}


//contact us form
var messagesRef = firebase.database().ref('contactformmessages');

$('#contactForm').submit(function(e) {
    e.preventDefault();
  //data that is sent to firebase
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: $('.fullname').val(),
        email: $('.email').val(),
        subject: $('.subject').val(),
        message: $('.message').val()
    });
 //success message that is shown once you click sumbit
    $('.success-message').show();
 //resets the form once you click submit
    $('#contactForm')[0].reset();
});
