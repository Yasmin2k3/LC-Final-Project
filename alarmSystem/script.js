//setting variables
const collName = "AlarmSchedule";
const docFields = { id: "identifier"};
const docFieldsArray = Object.keys(docFields);
const idPos = docFieldsArray.indexOf("id");
const mainDiv = "mainDiv";
const sideDiv = "sideDiv";

//shows the previous alarm times and current alarm
function showAlarm() {
  firebaseGet("AlarmSchedule")
    .then(res => {
      console.log(res, "succeeded");
      var docList = Object.values(res);
        //get the list of previous alarms
        let listHtml = genAlarmSchedule("AlarmSchedule", docList);
        //get the most recent time
        let html = "<h1>"+ Object.values(docList[docList.length - 1])[0] + ": " + Object.values(docList[docList.length - 1])[1] + "</h1>";
        document.getElementById(mainDiv).innerHTML = listHtml
        document.getElementById(sideDiv).innerHTML = html
    })
    //catches error
    .catch(error => {
      console.log("Collection: " + "AlarmSchedule" + " - Get All Failed: " + error);
    });
}

//shows the alarm list
function genAlarmSchedule(caption, docData){
  console.log(Object.values(docData[docData.length - 1])[0])
  //generates the table of alarm times.
  let html = '<div class="container-fluid">';
  let divEnd = '</div>';

  html += '<table class="table">'
  html += '<tbody>'
  //gives 11 alarm times
  for (let i = 1; i < 13; i++) {
    html += "<tr>";
      //has table ascending from newest to oldest
      html += "<td>" + (Object.values(docData[docData.length - (i+1)])[0]) + " " +"O'clock, " + (Object.values(docData[docData.length - (i+1)])[1]) + " " + "minute(s). </td>";
    html += "</tr>";
  };
  html += "</tr>";
  html += "</tbody>"
  html += "</table>";
  html += divEnd
  return html;
};

//executes function
showAlarm();