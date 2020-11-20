
// Assign DOM to current currentTab
const currentTab = document;

// Class duration in seconds
const classtime = 10000;

// Max warning time in seconds
const warningThreshold = 15000;

// Student info
const session = {
//  alive: false,
  studentName: "",
  studentId: "",
//  startTime: 0,
//  endTime: 0,
  totalTime: 0,
  warnings: 0,
};
var startTime;
var endTime;

// Show student data
const showStudentData = () => {
  console.log(session);
};

// Get student data
const getStudentData = () => {
  // Note: Filter inputs
  session.studentName = window.prompt("Enter your Name...");
  session.studentId = window.prompt("Enter your Roll Number...");
};

// Check for other visibility types : [visible, hidden, prerender].
const setStartEndTime = (tabVisibility) => {
    if (tabVisibility == "hidden") {
      startTime = performance.now();
    console.log("Start Time:" + startTime);
    } else if (tabVisibility == "visible") {
    endTime = performance.now();
    console.log("End Time: " + endTime);
      // Calc total time attended before-after tab switch
      if  (endTime!=0 && endTime > startTime) {
        session.totalTime += endTime - startTime 
      console.log("Total Hidden Time: " + session.totalTime);
      }
    
    }
};

const checkWarningThreshold = () => {

  // Check warning threshold
  if (session.warnings <= 3) {
      if ( session.totalTime > warningThreshold) {
      session.warnings += 1
      alert(
      "Please do not switch tab or minimize browser, else your attendance will be cancelled.\n Warning left: " 
      + session.warnings
    );
    }
  } else {
    console.log("Running");
    sendSession();
  }
};

const sendSession = () => {
  const data = session;

  

  // Post request
  chrome.runtime.sendMessage({ type: "post", data }, (res) => {
    console.log(res,res ? 'Send successful': 'Send failed');
  });
};

// Tab change event
currentTab.addEventListener("visibilitychange", () => {
  const tabVisibility = currentTab.visibilityState;

  // Set current tab title
  currentTab.title = tabVisibility;

  // Set start or end time
setStartEndTime(tabVisibility);
    checkWarningThreshold();

});

// Tab close warning event
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = "Are you sure?";
});

// Start on window load
window.onload = () => {
  getStudentData();
};
