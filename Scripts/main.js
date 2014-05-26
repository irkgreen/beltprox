
/// Copyright 2011, Ian Gilman
/// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/// <reference path="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.js" />
/// <reference path="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.21/jquery-ui.min.js" />
/// <reference path="Scripts/jquery.ui.touch-punch.min.js" />
/// <reference path="http://ajax.aspnetcdn.com/ajax/modernizr/modernizr-2.0.6-development-only.js" />

// hey all... look here...
// here is a live demo of this code: http://www.ellipsetours.com/Demos/storage/


$(document).ready(function(){
	//this fires on load or when a button is pressed

    //determin if an increment or decrement button was pushed
    $('.IncremBtn').click(function(event){
    	var MyID = event.target.id;
    	adjustValue(1,'#' + MyID);
    });
    $('.DecremBtn').click(function(event){
    	var MyID = parseInt(event.target.id) - 100;
    	adjustValue(-1,'#' + MyID);    });
    
    if (!Modernizr.localstorage) {
      alert("This browser does not support local storage.");
      return;
    }
    
    if (!Modernizr.hsla) {
      alert("This browser does not support hsl.");
      return;
    }
    
    if (!window.JSON) {
      alert("This browser does not support JSON.");
      return;
    }
     $("#newSite")
      .button()
      .click(function() {
        createNewSite();
      });
     $("#Stop")
      .button()
      .click(function() {
        stopData();
      });
     $("#saveSite")
      .button()
      .click(function() {
        saveSite();
      });
     $("#editSite")
      .button()
      .click(function() {
        editSite();
      });
     $("#removeSite")
      .button()
      .click(function() {
        removeSite();
      });
	loadSites();
	 
});

function adjustValue(Adjust,id){
		var MyValue = parseInt($(id).html());
	    var MyValues = Array();
		//var clickedID = this.id();
    	//alert('#' + id.toString);
    	//get current value and add one
        $(id).html(MyValue+Adjust);
        //store data to local application cache
	 
	    MyValues = getCounts();
	  
	    localStorage[getID()] = JSON.stringify(MyValues);
 
	    //var storedNames = JSON.parse(localStorage[getID()]);
	    //alert(storedNames);
	    
	    //localStorage[$box.attr("id")] = JSON.stringify(getCounts);
}

function loadSites(){
	  //load any previous data into listbox for review and edit
	  
	var opt = "";
	      
    for (var i = 0; i < localStorage.length; i++){
		// Create an Option object
		
		// Assign text and value to Option object
		opt = localStorage.key(i);
		//alert(opt);
		//opt.value = Value;
		// Add an Option object to Drop Down/List Box
		$('#previousData')
			.append($("<option></option>")
			.text(opt));
		//alert(localStorage.getItem(localStorage.key(i)));
	 	}
}

function saveSite(){
//this function saves the site in the event the user changes main form values

	    var MyValues = Array();
	    MyValues = getCounts();
	    localStorage[getID()] = JSON.stringify(MyValues);    
	    alert(MyValues);
	   	//var storedNames = JSON.parse(localStorage[getID()]);
	    //alert(storedNames);
    	location.reload();
}

function editSite(){
//this function saves the site in the event the user changes main form values

      	//load previous session and show table
      	var strKey = $('#previousData option:selected').val();
        var strValue = localStorage.getItem(strKey);
        var storedData = JSON.parse(strValue);
	    
	    //populate count data
	 	for (var i = 0; i < 30; i++) {
			//alert(document.getElementById(i.toString()).innerHTML);
			$('#' + i).html(storedData[i]); //not innerHTML?
    	}
	    
	    //populate site data
	    document.forms["Site"]["mysiteID"].value = storedData[30];
    	document.forms["Site"]["myname"].value = storedData[31];
	    document.forms["Site"]["mylocation"].value = storedData[32];
	    document.forms["Site"]["mycomments"].value = storedData[33];
	    document.forms["Site"]["mydate"].value = storedData[34];
	    document.forms["Site"]["myend"].value = storedData[35];
	    
	    //unhide table/hide site data
	   document.querySelector('#datatable').style.display = 'table';
	   document.querySelector('#Site').style.display = 'none';
	    //alert(storedNames);
    
}

function removeSite(){
//this function saves the site in the event the user changes main form values

      	//load previous session and show table
      	var strKey = $('#previousData option:selected').val();
        var strValue = localStorage.removeItem(strKey);
        
        location.reload();
}
function getCounts() {
	//this will store all data into an array
	var MyValues = new Array();
	var myID = "0"; 
	//loop through each button and get count
	
    for (var i = 0; i < 30; i++) {
		//alert(document.getElementById(i.toString()).innerHTML);
		myID = '#' + i;
		MyValues[i] = $(myID).html(); //document.getElementById(i.toString()).innerHTML;
    }
    //add site info too
    MyValues[30] = document.getElementsByName("mysiteID")[0].value; // this doesnt seem to work $("#mysiteID").val();
    MyValues[31] = document.getElementsByName("myname")[0].value; // $('#myname').val();
    MyValues[32] = document.getElementsByName("mylocation")[0].value; // $('#mylocation').val();
    MyValues[33] = document.getElementsByName("mycomments")[0].value; // $('#mycomments').val();
    MyValues[34] = document.getElementsByName("mydate")[0].value; // $('#mydate').val();
    MyValues[35] = document.getElementsByName("myend")[0].value; // $('#myend').val();
    MyValues[36] = "ver 1.0";
    return MyValues;
}

function getID() {
	//generate a unique ID to use as a key
	var a = document.getElementsByName("mysiteID")[0].value; // $('#mysiteID').val();
	var b = document.getElementsByName("myname")[0].value; // $('#myname').val();
	var c = document.getElementsByName("mydate")[0].value; // $('#mydate').val();
	//alert(a);
	return a + '_' + b + '_' + c;
}

function createNewSite() {
   //this will create a new site ID to be used for all local storage

/* commented out for debugging
 
   		//check user's form data
   		
	   		var x=document.forms["Site"]["mysiteID"].value;
			if (x==null || x=="")
		  	{
				alert("Site ID must be filled out!");
		  		return false;
		  	}
		   x=document.forms["Site"]["myname"].value;
			if (x==null || x=="")
		  	{
		  		alert("Name must be filled out!");
		  		return false;
		  	}
		  	
*/

	//clear all data
    for (var i = 0; i < 30; i++) {
		//alert(document.getElementById(i.toString()).innerHTML);
		//document.getElementById(i.toString()).innerHTML=0;
		$('#' + i.toString).html(0);
    }

  	//set date and time to now
  	var today = new Date();
  	document.getElementsByName("mydate")[0].value = today; // $('#mydate').val() = today;
  	
   //unhide table
   document.querySelector('#datatable').style.display = 'table';
   document.querySelector('#Site').style.display = 'none';
   
   //return True;
   
  }

function stopData() {
   //this will stop data collection and show main form again
   
   //write end time to uneditable form
   //document.forms["Site"]["mytime"].value;
	
	//set date and time to now
  	var today = new Date();
  	document.getElementsByName("myend")[0].value = today; // $('#myend').val() = today;
	
	//rehide table
   document.querySelector('#datatable').style.display = 'none';
   document.querySelector('#Site').style.display = 'block';
   
   location.reload();
   
  }


