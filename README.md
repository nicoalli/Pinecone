## Getting started
### To install project locally:
- git clone https://github.com/CSC309-spring2017/Team36-Pinecone.git
### Dependencies
- $npm install
### Access Database (Mlab)
- https://www.mlab.com/login/
- username = csc309
- password = pinecone36
### Run App
- $node index.js
### To run endpoints
- Use /api/endpointname to access it. For example /api/room/list_rooms to get the list of all rooms
- Then navigate to http://localhost:3000/
## Heroku:
https://pinecone36.herokuapp.com/
## Project Structure
- We are following MVC (Model Views Controllers) approach. So all our database collections are under ~/models. The html pages are under ~/views/pages. The helper html pages are under ~/views/partials. The routes are under ~/routes. The route handlers(controllers) are under ~/controllers and all our reports are under ~/reports.

## How to use
- The homepage is the login/registration page. New users are able to create an account by clicking the “sign up” button and then provide their name, email, and a password and create an account. Returning users can log back in (default of the page). 
- Sample users
1) Simple User
- email - nikita.dua@mail.utoronto.ca
- password - 1342
2) Admin User
- email - nadine.c@mail.utoronto.ca
- password - 4321
## User Homepage
- Upon logging in, a user a shown their homepage that has options to either search for a room by location or criteria. The homepage also has current events happening around UofT listed.
## Location Page
- The page displays a map with a list of buildings. A building can be selected from the list of buildings which drops a pin on the map. Rooms available for booking in this building can be accessed by clicking view rooms on the pop-up besides the building pin.
## Filter Page
- The page displays all available rooms. The rooms can be filtered using a filter bar which has attributes such as availibility date, time,  capacity, wifi, computers, desks and chairs, whiteboard/blackboard, projector, building.
## Criteria Page
- It is a form which asks the user for the information about the room booking.  It looks for rooms for the date, start-time, end-time and capacity specified by the user and then prioritizes other features
## Profile Page
- Each user has a profile page. This can be accessed in the menu bar in the top right hand side beside the search bar. This page displays the user's profile information as well as the user bookings
## Admin Page
- Users with admin privileges can edit/delete rooms, delete other users and delete other user bookings.
## Log Out
- Upon logging out, the session is removed and a user must log back in by entering their email and password.

## Additional Features Implemented
- Implemented filtering (besides the form specified in phase 1) for a list view of all rooms (based on room attributes like wifi, computer, times, buildings, etc)
- Users are able to log in based on email
- Users are unable to get a room when a room is already booked by another user. For cases with multiple users, if multiple users try to book a room, it's first checked if the room is booked already or not and for both cases, will be handled appropriately.

## Phase 1 Report
- https://github.com/CSC309-spring2017/Team36-Pinecone/blob/master/CSC309%20Phase%201%20-%20Sheet1.pdf

## Notes (For Demo)
-  We will add more items in the database to filter rooms.
- We will make the advanced form criteria query more efficient.
-  We will fix the book room pop-up






