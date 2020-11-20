# Smart-Attendance
A Chrome extension which will handle the attendance along with a backend web application which will manage code for our facial recognition module. 
The structure of our project and each module is defined below:

Tracking Tab Switching and Minimization: Creating a Google Chrome extension which gets active automatically on a Google meet. It keeps the track of visibility of the meet page using javascript’s document.visibilityState attribute. Then the data is sent to a realtime database operated by firebase. Here the teacher can see the data from all the students export it accordingly. 

Picture Clicking and Facial Recognition: We’re using OpenCv to get pictures at random intervals from the webcam.  Then those images will be processed using a deep neural network model, built using dlib, face-recognition. The images of students are initially fed for the training purposes, and during the class pictures from the webcam are captured at random intervals and the python script works on it. 

