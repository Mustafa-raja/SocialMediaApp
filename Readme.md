## Dependencies in SpringBoot:
- Spring Web
- Spring DevTool
- Spring Data JPA
- MySql server

## Run the BackEnd:

- Make sure the backend runs on the Port:8080, since frontEnd is for now using LocalHost:8080 for all ApiEndPoints.
- Make sure you configure the database (mySql) correctly in application.properties as without it the application would not run as expected.

## Run the FrontEnd:

Firstly RUN THE FOLLOWING COMMAND TO INSTALL THE NECESSARY DEPENDENCIES IN THE PROJECT:

			npm install

Secondly to run the server Run the following command:

			npm start

## About Application :

A social media application with very basic functionality (since we had three days to develop and understand some concepts):
- The application allows you to register and login as a user:
- You can post your thoughts on the application.
- You can post/Update your bio.
- You can Update/Delete your existing post.
- You like/unlike posts of the users you follow as well as your posts.
- You comment on posts of the users you follow as well as your posts.
- The news feed of the app would display you the posts of all the users that you have followed.
- The app lets you search from all the users in the website, where you can follow/unfollow the users.
And some more.
- For now, not much of Registration constaints have been applied to the application.

—— The application is built in two components a RESTapi and a React frontEnd, they are loosely coupled and only talk to each other using the api Mappings ——
