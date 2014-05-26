
/// Copyright 2011, Ian Gilman
/// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/// <reference path="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.js" />
/// <reference path="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.21/jquery-ui.min.js" />
/// <reference path="Scripts/jquery.ui.touch-punch.min.js" />
/// <reference path="http://ajax.aspnetcdn.com/ajax/modernizr/modernizr-2.0.6-development-only.js" />

// hey all... look here...
// here is a live demo of this code: http://www.ellipsetours.com/Demos/storage/


$(document).ready(function(){
//this function fires anytime the user clicks a button in the IncremBtn class
    $('.IncremBtn').click(function(){
    	//var clickedID = this.id();
    	var MyValue = parseInt($(this).html());
    	
    	//get current value and add one
        $(this).html(MyValue+1);
        //store data to local application cache
	    
	    var MyValues = Array();
	    MyValues = getCounts();
	    localStorage[getID()] = JSON.stringify(MyValues);
	    
	    //var storedNames = JSON.parse(localStorage[getID()]);
	    //alert(storedNames);
	    
	    //localStorage[$box.attr("id")] = JSON.stringify(getCounts);
	    
    });
});

function saveSite(){
//this function saves the site in the event the user changes main form values

	    var MyValues = Array();
	    MyValues = getCounts();
	    localStorage[getID()] = JSON.stringify(MyValues);    
	    
	   	//var storedNames = JSON.parse(localStorage[getID()]);
	    //alert(storedNames);
    
}

function editSite(){
//this function saves the site in the event the user changes main form values

      	//load previous session and show table
      	var e = document.getElementById("previousData");
	  	var strKey = e.options[e.selectedIndex].text;
	  	alert(strKey);
   		var storedData = JSON.parse(localStorage.key(strKey.trim()));
	    
	 	for (var i = 1; i < 41; i++) {
		//alert(document.getElementById(i.toString()).innerHTML);
		document.getElementById(i.toString()).innerHTML = storedData[i];
    	}
	    
	    //unhide table
	   document.querySelector('#datatable').style.display = 'table';
	   document.querySelector('#Site').style.display = 'none';
	    //alert(storedNames);
    
}

function getCounts() {
	//this will store all data into an array
	var MyValues = new Array();
		  
	//add site info too
	MyValues[0] = "ver 1.0";
	
	//loop through each button and get count
	
    for (var i = 1; i < 41; i++) {
		//alert(document.getElementById(i.toString()).innerHTML);
		MyValues[i]=document.getElementById(i.toString()).innerHTML;
    }
    
    MyValues[41]=document.forms["Site"]["mysiteID"].value;
    MyValues[42]=document.forms["Site"]["myname"].value;
    MyValues[43]=document.forms["Site"]["mylocation"].value;
    MyValues[44]=document.forms["Site"]["mycomments"].value;
    MyValues[45]=document.forms["Site"]["mydate"].value;
    MyValues[46]=document.forms["Site"]["myend"].value;
    
    return MyValues;
}

function getID() {
	//generate a unique ID to use as a key
	var a = document.forms["Site"]["mysiteID"].value;
	var b = document.forms["Site"]["myname"].value;
	var c = document.forms["Site"]["mydate"].value;
	return a + '_' + b + '_' + c;
}

function createNewSite() {
   //this will create a new site ID to be used for all local storage

/* commented out for debugging
 
   		//check user's form data
		if (1=2) { //skip for testing

   		
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
    for (var i = 1; i < 41; i++) {
		//alert(document.getElementById(i.toString()).innerHTML);
		document.getElementById(i.toString()).innerHTML=0;
    }

  	//set date and time to now
  	var today = new Date();
  	document.forms["Site"]["mydate"].value = today;
  	
   //unhide table
   document.querySelector('#datatable').style.display = 'table';
   document.querySelector('#Site').style.display = 'none';
   
   return True;
   
  }

function stopData() {
   //this will stop data collection and show main form again
   
   //write end time to uneditable form
   //document.forms["Site"]["mytime"].value;
	
	//set date and time to now
  	var today = new Date();
  	document.forms["Site"]["myend"].value = today;
	
	//rehide table
   document.querySelector('#datatable').style.display = 'none';
   document.querySelector('#Site').style.display = 'block';
   
  }

// ----------
$(document).ready(function () {

//this only fires on load

	var self = this;
    
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
      //load any previous data into listbox for review and edit
      for (var i = 0; i < localStorage.length; i++){
  	        // Create an Option object
	        var opt = document.createElement("option");
    		// Assign text and value to Option object
    		opt.text = localStorage.key(i);
    		//opt.value = Value;
      		// Add an Option object to Drop Down/List Box
    		document.getElementById("previousData").options.add(opt);
			//alert(localStorage.getItem(localStorage.key(i)));
	 	}
});


