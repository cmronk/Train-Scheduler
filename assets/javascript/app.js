// Initialize Firebase
var config = {
    apiKey: "AIzaSyB1KAko0WIgaqwLbOu0xaMZjz6yJ1Iqw7U",
    authDomain: "train-scheduler-79367.firebaseapp.com",
    databaseURL: "https://train-scheduler-79367.firebaseio.com",
    projectId: "train-scheduler-79367",
    storageBucket: "",
    messagingSenderId: "953141880946"
};

firebase.initializeApp(config);

// var to reference database
var database = firebase.database();

$("#add-train").on("click", function(event) {
    event.preventDefault();

var trainName = $("#name-input").val().trim();
var trainDest = $("#destination-input").val().trim();
var trainFirst = $("#first-input").val().trim();
var trainFreq = $("#frequency-input").val().trim();


// adding trains from user form
var newTrain = {
    name : trainName,
    destination : trainDest,
    first : trainFirst,
    frequency : trainFreq
};

database.ref().push(newTrain);

// console.log(newTrain.name);
// console.log(newTrain.destination);
// console.log(newTrain.first);
// console.log(newTrain.frequency);

// clears user input boxes
$("#name-input").val("");
$("#destination-input").val("");
$("#first-input").val("");
$("#frequency-input").val("");
});

// firebase event for adding trains to database in rows
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    // console.log(childSnapshot.val());

var trainName = childSnapshot.val().name;
var trainDest = childSnapshot.val().destination;
var trainFirst = childSnapshot.val().first;
var trainFreq = childSnapshot.val().frequency;

// console.log(trainName);
// console.log(trainDest);
// console.log(trainFirst);
// console.log(trainFreq);


// TODO
// calculate when the next trains will arrive and how many minutes away 



// grabs current time
var currentTime = moment();
console.log(moment(currentTime).format("hh:mm"));

// first times with a year subtracted so it hits before "current time"
var firstTrainConverted = moment(trainFirst, "hh:mm").subtract(1, "years");
console.log(firstTrainConverted);

// difference between first and current time
var difference = moment().diff(moment(firstTrainConverted), "minutes");
console.log("difference = " + difference);

// remainder
var remainder = difference % trainFreq;
var minutesLeft = trainFreq - remainder;
console.log("minutes left =  " + minutesLeft);

// console.log(remainder);

var nextTrains = moment().add(minutesLeft, "minutes");
console.log("arrival = " + moment(nextTrains).format("hh:mm"));


// updating our current time in the html
$("#current-time").text(moment(currentTime).format("hh:mmA"));

// updating our html table

$("#name").append("<tr><td>" + trainName + "</tr></td>");
$("#destination").append("<tr><td>" + trainDest + "</tr></td>");
$("#frequency").append("<tr><td>" + trainFreq + " minutes" + "</tr></td>");
$("#minAway").append("<tr><td>" + minutesLeft + " minutes" + "</tr></td>")
$("#next").append("<tr><td>" + nextTrains.format("hh:mm") + "</tr></td>")
});


