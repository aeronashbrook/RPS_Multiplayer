// Initialize Firebase
var config = {
    apiKey: "AIzaSyC1xSp3AXtgzES7mHsSNgn4vyJBQVc0EI8",
    authDomain: "train-schedule-a.firebaseapp.com",
    databaseURL: "https://train-schedule-a.firebaseio.com",
    projectId: "train-schedule-a",
    storageBucket: "train-schedule-a.appspot.com",
    messagingSenderId: "713286568301"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#submitForm").on("click", function(event) {
event.preventDefault();

var TRname  = $("#train-input").val().trim();
var TRdestination = $("#destination-input").val().trim();
var TRfirst  = $("#time-input").val().trim();
var TRfrequency  = $("#frequency-input").val().trim();

var addTrain = {
    name: TRname,
    destination: TRdestination,
    firstArrival: TRfirst,
    frequency: TRfrequency
};

database.ref().push(addTrain);

$("#train-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {

    var TRname = childSnapshot.val().name;
    var TRdestination = childSnapshot.val().destination;
    var TRfirst = childSnapshot.val().firstArrival;
    var TRfrequency = childSnapshot.val().frequency;

    var firstConverted = moment(TRfirst, "HH:mm");
    console.log(firstConverted);
    var currentTime = moment().format("HH:mm");
    console.log("Current time: " + currentTime);
    var timeDiff = moment().diff(moment(firstConverted), "minutes");
    console.log(TRfirst);
    console.log("Difference in Time: " + timeDiff);
    var timeRemaining = timeDiff % TRfrequency;
    console.log(timeRemaining);
    var minAway = TRfrequency - timeRemaining;
    var nextTrainArrival = moment().add(minAway, "minutes").format("HH:mm");
    var newTrain = $("<tr>").append(
        $("<td>").text(TRname),
        $("<td>").text(TRdestination),
        $("<td>").text(TRfrequency),
        $("<td>").text(nextTrainArrival),
        $("<td>").text(minAway)
    );
    
    $("#table > tbody").append(newTrain);

});