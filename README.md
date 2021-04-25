# Getting Started with Zoo App

1. Have nodejs installed on your system
2. cd into "zoo-management" folder and run "npm install" in this directory
3. also run "npm i @date-io/date-fns@1.3.13" because there's a weird dependency issue with this library where it has to be this version
4. From here you should be able to start up the front end by running "npm start"
5. In another terminal you can run the command "npm run server" in order to start up the back end (if you don't do this step you will not have access to the database)

That should be all the steps required to run our project.

Live site can be found at : https://elegant-brahmagupta-9482fd.netlify.app/

# About our app

This app is using a React frontend hosted on netlify, express backend hosted on heroku and a mySQL database hosted on AWS.

The files listed within zoo-management are the front-end and the files within the server folder of zoo-management are the backend.

# User roles

1. Any customer user can be created, however a sample one is: 
    user: forsubmit@gmail.com
    password: test1234

2. For admin:
    user: admin1@admin.com
    password: test1234

3. Any admin can create a user employee, however a sample one is:
    user: jdoe@gmail.com  
    password: test1234