$(document).ready(function()
{


 // Initialize Firebase
 console.log("test");
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
 let tMinutesTillTrain, nextTrain, firstTrainTimeVal, frequencyVal;
//  console.log("b4 click");
//  let val = $(".submit").attr("id");
//  let val2 = $(".submit").attr("class");
//  let val3 = $("button").val();
//  console.log(val);
//  console.log(val2);
//  console.log(val3);
//event listener for submit button
 $("#sumbit-button").on('click', function (event) {
     console.log("inside click");
    event.preventDefault()
 
    let trainNameVal = $("#trainName").val()
    // let role = $("#role").val()
    let destinationVal = $("#destination").val()
    firstTrainTimeVal = $("#firstTrainTime").val()
    frequencyVal = $("#frequency").val()

    
    // let next = parseInt(rawMonths[0])
    // let years = parseInt(rawMonths[2])
    // let monthsAgo = moment(months, "MM").fromNow()
    // console.log(monthsAgo)
    // let yearsAgo = moment(years, "YYYY").fromNow()
    // let monthsWorked
    // console.log(moment().month())
    // console.log(months)
    // if (moment().month() < months) {
    //     monthsWorked = parseInt(monthsAgo.split(" ")[1]) + (parseInt(yearsAgo.split(" ")[0]) * 12);
    // } else {
    //     monthsWorked = parseInt(monthsAgo.split(" ")[0]) + (parseInt(yearsAgo.split(" ")[0]) * 12);
    // }
    // let totalBilled = monthsWorked * monthlyRate;
    // console.log("inside db");
    db.ref().push({
        
        "trainNamedb": trainNameVal,
        "destinationdb": destinationVal,
        "firstTrainTimedb": firstTrainTimeVal,
        "frequencydb": frequencyVal,
        // "monthlyRate": monthlyRate,
        // "totalBilled": totalBilled
    })
 
 })
 
 
 
 db.ref().on('child_added', (snapshot) => {
    let val = snapshot.val()
    buildRow(val.trainNamedb, val.destinationdb, val.frequencydb)
 })


 function buildRow(trainNameFn, destinationFn, frequencyFn) {
    let row = $("<tr>")
    let trainNameRow = $("<td>").text(trainNameFn)
    let destinationRow = $("<td>").text(destinationFn)
    let frequencyRow = $("<td>").text(frequencyFn)
    calculateTime();
    let nextArrivalRow = $("<td>").text(nextTrainCorrect)
    let MinutesAwayRow = $("<td>").text(tMinutesTillTrain)

    // let emWorked = $("<td>").text(worked)
    // let emRate = $("<td>").text(rate)
    // let emBilled = $("<td>").text(billed)
    row.append(trainNameRow, destinationRow, frequencyRow,nextArrivalRow,MinutesAwayRow)
    $("#table-body").append(row)
 }

function calculateTime()
{
    // First Time (pushed back 1 year to make sure it comes before current time)
    let firstTimeConverted = moment(firstTrainTimeVal, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    let currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    let tRemainder = diffTime % frequencyVal;
    console.log(tRemainder);

    // Minute Until Train
    tMinutesTillTrain = frequencyVal - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrainCorrect = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
}
});
