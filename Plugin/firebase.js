var firebaseConfig = {
  apiKey: "AIzaSyDwp7uboevelSc6fEcbCPoL4xDEjnNuVhI",
  authDomain: "toc-project-6a3cb.firebaseapp.com",
  databaseURL: "https://toc-project-6a3cb.firebaseio.com",
  projectId: "toc-project-6a3cb",
  storageBucket: "toc-project-6a3cb.appspot.com",
  messagingSenderId: "839842828787",
  appId: "1:839842828787:web:d563db2eb8c11d6d144286",
  measurementId: "G-KH8TW8QML0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseDb = firebase.database();

chrome.runtime.onMessage.addListener(({ type, data }, sender, sendResponse) => {
  switch (type) {
    case "post":
      const res = saveData(data);
      sendResponse(res);
      break;
    default:
      break;
  }
});

const saveData = (data) => {
  try {
    firebaseDb.ref("students").set(data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
