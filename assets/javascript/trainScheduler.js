$(document).ready(function()
{

 // Initialize Firebase
 
 var config = {
    apiKey: "AIzaSyDzdHbUwtKECdPSfp-Ioa6WyQbixnfRv0M",
    authDomain: "train-scheduler-e7e2e.firebaseapp.com",
    databaseURL: "https://train-scheduler-e7e2e.firebaseio.com",
    projectId: "train-scheduler-e7e2e",
    storageBucket: "train-scheduler-e7e2e.appspot.com",
    messagingSenderId: "399881015459"
  };
  firebase.initializeApp(config);
  
 let db = firebase.database();
 let tMinutesTillTrain, nextTrain, firstTrainTimeVal, frequencyVal, val;
 
 //Calling currentTime function for showing current time in header
 currentTime();

 //Reloading the page every 1 min inorder to display the correct current train schedule update every minute 
 setInterval(function() {
    window.location.reload();
  }, 60000);

  //Retaining the values entered in textboxes during page reload by saving values to sessionStorage and getting values from sessionStorage to textboxes
  $(".formField").on("keyup", function() {
    var traintemp = $("#trainName").val().trim();
    var citytemp = $("#destination").val().trim();
    var timetemp = $("#firstTrainTime").val().trim();
    var freqtemp = $("#frequency").val().trim();
  
    sessionStorage.setItem("train", traintemp);
    sessionStorage.setItem("city", citytemp);
    sessionStorage.setItem("time", timetemp);
    sessionStorage.setItem("freq", freqtemp);
  });
  
  $("#trainName").val(sessionStorage.getItem("train"));
  $("#destination").val(sessionStorage.getItem("city"));
  $("#firstTrainTime").val(sessionStorage.getItem("time"));
  $("#frequency").val(sessionStorage.getItem("freq"));



 //event listener for submit button
 $("#sumbit-button").on('click', function (event) {
     event.preventDefault()
     let trainNameVal = $("#trainName").val()
     let destinationVal = $("#destination").val()
     firstTrainTimeVal = $("#firstTrainTime").val()
     frequencyVal = $("#frequency").val()

     //Pushing Form values to db
     db.ref().push({
         "trainNamedb": trainNameVal,
         "destinationdb": destinationVal,
         "firstTrainTimedb": firstTrainTimeVal,
         "frequencydb": frequencyVal,
     })

    //  sessionStorage.clear();

     //Emptying Form values on clicking Submit
     $(".formField").val("");
   })
 
 //Event listener for update in db
  db.ref().on('child_added', function(snapshot) {
    val = snapshot.val()
    var key = snapshot.key;
    //calling function buildRow to create new rows in table
    buildRow(val.trainNamedb, val.destinationdb, val.frequencydb, key)
 })

 //Creating new rows in table
 function buildRow(trainNameFn, destinationFn, frequencyFn, keyFn) {
     let row = $("<tr>")
     let trainNameRow = $("<td>").text(trainNameFn)
     let destinationRow = $("<td>").text(destinationFn)
     let frequencyRow = $("<td>").text(frequencyFn)
     calculateTime();
     let nextArrivalRow = $("<td>").text(nextTrainCorrect)
     let MinutesAwayRow = $("<td>").text(tMinutesTillTrain)
     row.append(trainNameRow, destinationRow, frequencyRow,nextArrivalRow,MinutesAwayRow)
     row.append($("<td class='text-center'><button class='arrival btn btn-danger btn-xs' data-key='" + keyFn + "'>X</button></td>"));
     $("#table-body").append(row)
    }

 function calculateTime()
 {
     // First Time (pushed back 1 year to make sure it comes before current time)
     let firstTimeConverted = moment(val.firstTrainTimedb, "HH:mm").subtract(1, "years");
     console.log(firstTimeConverted);

     // Current Time
     let currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

     // Difference between the times
     let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);

     // Time apart (remainder)
     let tRemainder = diffTime % val.frequencydb;
     console.log(tRemainder);

     // Minute Until Train
     tMinutesTillTrain = val.frequencydb - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

     // Next Train
     nextTrain = moment().add(tMinutesTillTrain, "minutes");
     nextTrainCorrect = moment(nextTrain).format("LT")
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    }

 //Function for showing current time - using setTimeout
 function currentTime() {
     var current = moment().format('LT');
     $("#currentTime").html(current);
     setTimeout(currentTime, 1000);
   };

 //Function for removing the row
 $(document).on("click", ".arrival", function() {
     keyref = $(this).attr("data-key");
     db.ref().child(keyref).remove();
     window.location.reload();
  });
});