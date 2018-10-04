 //Initialize Firebase
  var config = {
    apiKey: "AIzaSyD4tYm8bEmEQJk91U8W0P9sXSvpammlnfc",
    authDomain: "trainschedule-e6c0b.firebaseapp.com",
    databaseURL: "https://trainschedule-e6c0b.firebaseio.com",
    projectId: "trainschedule-e6c0b",
    storageBucket: "trainschedule-e6c0b.appspot.com",
    messagingSenderId: "223872231530"
  };

  firebase.initializeApp(config);



  

  var database = firebase.database();



  $("#submit").on("click", function(event){

	event.preventDefault();

  getData();

})





function getData() {

trainName = $("#trainName").val().trim();

destination = $("#destination").val().trim();

firstTrain = moment($("#firstTrain").val().trim(), "LT").format("X");

frequency = $("#frequency").val().trim();


database.ref().push({

  trainName : trainName,

  destination : destination,

  firstTrain : firstTrain,

  frequency : frequency,

  });


$("#trainName").val("");

$("#destination").val("");

$("#firstTrain").val("");

$("#frequency").val("");



};

database.ref().on("child_added", function(snapshot){

var train = snapshot.val().trainName;

var dest = snapshot.val().destination;

var fTrain = snapshot.val().firstTrain;

var freq = parseInt(snapshot.val().frequency);

var m = Math.ceil(parseInt(moment().diff(moment.unix(fTrain, "X"), 'minutes'))/freq);

var nextA = moment.unix(fTrain, "X").add(m*freq, "minutes");

var nextAr= moment(nextA).format("LT");

var minAway = moment(nextA).diff(moment(), "minutes")+1;









$("#trainTable > tbody").append("<tr><td>" + train + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + nextAr + "</td><td>" + minAway + "</td></tr>");



});