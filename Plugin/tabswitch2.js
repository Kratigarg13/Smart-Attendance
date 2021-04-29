// Assign DOM to current currentTab
const currentTab = document;

// Class duration in seconds
const classtime = 1000*60;

// Max warning time in seconds
const warningThreshold = 15000;

var t0 = 0;
var t1 = 0;

// Student info
const session = {
  alive: false,
  studentName: "",
  studentId: "",
  totalTime: 0,
  warnings: 0,
};


const getStudentData = () => {
  // Note: Filter inputs
  session.studentName = window.prompt("Enter your Name...");
  session.studentId = window.prompt("Enter your Roll Number...");
};

window.onload = () => {
    session.alive=true;
    console.log(performance.now());
  getStudentData();
};

const sendSession = () => {
  const data = session;
    
    fetch("http://localhost:3000/saveData",{
            method : "POST",
             headers : {
                 'Accept' : "application/json",
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(session)
        })

};



currentTab.addEventListener('visibilitychange', function() {
    
    //Set tab's title
    currentTab.title = currentTab.visibilityState;
    
        if (document.visibilityState == 'hidden') {
        t0 = performance.now();
        console.log("Hide Time: " + t0);
        console.log(performance.now());
    }
    else {
        t1 = performance.now();
        console.log("Show Time: " + t1);
        console.log(performance.now());
    }
        if (t1!=0 && t1>t0) {
            session.totalTime = session.totalTime + t1-t0;
            console.log("Total Hidden Time: " + session.totalTime/1000 + " seconds");
        console.log(" ");
        
    if(session.totalTime>15000 && session.alive) {
    session.warnings++;
    alert("Please do not switch tabs or minimize anymore. Otherwise, Your attendance will be cancelled. \n Warning Number: " + session.warnings );
    
    console.log("Class time Left: " +((classtime-performance.now())/1000)  + " seconds");
    }
    }
    if (session.warnings>5 && session.alive) {
        session.alive=false;
        console.log("Session Successfully Sent");
        sendSession();
    }
    
});

