



function updateCapacity() {
        var newval = prompt("Update capacity:", "0");
        
        //Need to check if it's a number -- implement check later
        if (newval != null) {
            document.getElementById("capacityval").innerHTML = newval;
        } else if (newval == null) {
       
        } else {
        	alert("Not a valid entry");
        }
}
    
function updateWifi() {
        var newval = prompt("Update wifi availability:", "Yes/No");
        
        if (newval == "Yes" || newval == "No") {
            document.getElementById("wifival").innerHTML = newval;
        } else if (newval == null) {
       
        } else {
        	alert("Not a valid entry");
        }
}
   

function updateComputer() {
        var newval = prompt("Update computer availability:", "Yes/No");
        
        if (newval == "Yes" || newval == "No") {
            document.getElementById("computerval").innerHTML = newval;
        } else if (newval == null) {
       
        } else {
        	alert("Not a valid entry");
        }
        
}

function updateNumComputer() {
        var newval = prompt("Update number of computers:", "0");
        
        
        if (newval != null) {
            document.getElementById("numcomputerval").innerHTML = newval;
        } else if (newval == null) {
       
        } else {
        	alert("Not a valid entry");
        }
        
}


function updateDeskChair() {
        var newval = prompt("Update desk and chair availability:", "Yes/No");
        
        if (newval == "Yes" || newval == "No") {
            document.getElementById("deskchairval").innerHTML = newval;
        } else if (newval == null) {
       
        } else {
        	alert("Not a valid entry");
        }
        
}

function updateNumDesk() {
        var newval = prompt("Update number of desks:", "0");
        
        //Need to check if it's a number -- implement check later
        if (newval != null) {
            document.getElementById("numdeskval").innerHTML = newval;
        } else if (newval == null) {
       
        } else {
        	alert("Not a valid entry");
        }
        
}

function updateNumChair() {
        var newval = prompt("Update number of chairs:", "0");
        
        //Need to check if it's a number -- implement check later
        if (newval != null) {
            document.getElementById("numchairval").innerHTML = newval;
        } else if (newval == null) {
       
        } else {
        	alert("Not a valid entry");
        }
        
}


function updateBoard() {
        var newval = prompt("Update whiteboard/blackboard availability:", "Yes/No");
        
        if (newval == "Yes" || newval == "No") {
            document.getElementById("boardval").innerHTML = newval;
        } else if (newval == null) {
       
        } else {
        	alert("Not a valid entry");
        }
        
}

function updateProjector() {
        var newval = prompt("Update projector availability:", "Yes/No");
        
        if (newval == "Yes" || newval == "No") {
            document.getElementById("projectorval").innerHTML = newval;
        } else if (newval == null) {
       
        } else {
        	alert("Not a valid entry");
        }
        
}


function saveButton(room_number) {

	//Save changes to database!
    var projector = false;
    var board = false;
    var comp = false; 
    var wifi = false;
   
    if(document.getElementById("projectorval").innerHTML.localeCompare("Yes") == 0)  projector = true; 
    if(document.getElementById("boardval").innerHTML.localeCompare("Yes") == 0) board = true;
    if(document.getElementById("computerval").innerHTML.localeCompare("Yes") == 0) comp = true;
    if(document.getElementById("wifival").innerHTML.localeCompare("Yes") == 0) wifi = true;


     
     var num_chair =  parseInt(document.getElementById("numchairval").innerHTML, 10);
     var num_desk =  parseInt(document.getElementById("numdeskval").innerHTML, 10);

     var  num_comp =  parseInt(document.getElementById("numcomputerval").innerHTML, 10); 
     
     //var comp =   document.getElementById("computerval").innerHTML;
     //var wifi =   document.getElementById("wifival").innerHTML;
     var capacity =   parseInt(document.getElementById("capacityval").innerHTML, 10); 

    $.ajax({
            url:  'admin/' + room_number,
            type: 'PUT',
            data: {
        "projector": projector,
       "whiteboard_blackboard": board,
        "number_chairs": num_chair,
        "number_desks": num_desk, 
        "number_computers": num_comp,
       "computer" : comp, 
       "wifi": wifi,
        "capacity": capacity
      },

      success: function(result) {
              window.alert("Changes saved!");


              //Redirect you back to the admin page with the changes made
              location.href = "/api/admin";
            }
          
        });  



	
        
}

function cancelButton() {

	//Redirect you back to the admin page
	location.href = "/api/admin";
        
}


