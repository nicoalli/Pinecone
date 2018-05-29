#Commands for user related routes
read -p $'\nCreate user'
curl -v \
-H "Content-Type: application/json; charset=utf-8" \
-X POST "http://localhost:3000/api/login"
-d $'{
	"first_name": "Leann",
	"last_name": "Alli",
	"email": "leanna@mail.com",
	"password": "leanna"
	}'
	
read -p $'\nLog In'
curl -v \
-H "Content-Type: application/json charset=utf-8" \
-X POST "http://localhost:3000/api/login"
-d $'{
	"email": "leanna@mail.com",
	"password": "leanna" 
	}'

read -p $'\nGet list of all users'
curl "http://localhost:3000/api/user"

read -p $'\nGet user by email'
curl "http://localhost:3000/api/user/leanna@mail.com"

read -p $'\nUpdate users information'
curl -v \
-H "Content-Type: application/json; charset=uft-8" \
-X PUT "http://localhost:3000/api/user/leanna@mail.com" \
-d $'{
	"first_name": "Coco",
	"last_name": "Alli",
	"password": "newpassword"
	}'

#Commands for room related routes
read -p $'\nGet all rooms'
curl "http://localhost:3000/api/room/list_rooms" \

read -p $'\nGet room by room number'
curl "http://localhost:3000/api/room/UC140" \

read -p $'\nAdd a new room'
curl -v \
-H "Content-Type: application/json; charset=utf-8" \
-X POST "http://localhost:3000/api/room" \
-d $'{
    "room_number" : "BA2270",
    "room_schedules" : "",
    "capacity" : 71,
    "wifi" : true,
    "computer" : true,
    "number_computers" :8,
    "desks_chairs" : true,
    "number_desks" : 50,
    "number_chairs" : 50,
    "whiteboard_blackboard" : true,
    "projector" : false,
    "building": "Bahen Center Information Tech"
    }'

read -p $'\nDelete a room'
curl -v \
-H "Content-Type: application/json; charset=utf-8" \
-X DELETE "http://localhost:3000/api/room/BA2270"
-d $'{}'

#Commands for other things
read -p $'\nGet all buildings for map'
curl "http://localhost:3000/api/map/locadBuildings"