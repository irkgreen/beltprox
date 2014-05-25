
/// Copyright 2011, Ian Gilman
/// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
/// <reference path="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.js" />
/// <reference path="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.21/jquery-ui.min.js" />
/// <reference path="Scripts/jquery.ui.touch-punch.min.js" />
/// <reference path="http://ajax.aspnetcdn.com/ajax/modernizr/modernizr-2.0.6-development-only.js" />

// hey all... look here...
// here is a live demo of this code: http://www.ellipsetours.com/Demos/storage/


//this function fires anytime the user clicks a button in the IncremBtn class
$(document).ready(function(){
    $('.IncremBtn').click(function(){
    	//var clickedID = this.id();
    	var MyValue = parseInt($(this).html());
    	
    	//get current value and add one
        $(this).html(MyValue+1);
        //store data to local application cache
	    
	    var MyValues = Array();
	    MyValues = getCounts();
	    localStorage["MyData"] = JSON.stringify(MyValues);
	    
	    var storedNames = JSON.parse(localStorage["MyData"]);
	    alert(storedNames);
	    
	    //localStorage[$box.attr("id")] = JSON.stringify(getCounts);
	    
    });
});


function getCounts() {
	//this will store all data into an array
		  
	//add site info too
	
	//loop through each button and get count
	var MyValues = new Array(); //[];
    for (var i = 1; i < 41; i++) {
		//alert(document.getElementById(i.toString()).innerHTML);
		MyValues[i]=document.getElementById(i.toString()).innerHTML;
    }
       
    return MyValues;
}

function createNewSite() {
   //this will create a new site ID to be used for all local storage
   
   //check user's form data
   alert("yes");
   
   //unhide table
   
  }

// ----------
$(document).ready(function () {
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
});