
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
     $("#Upload")
      .button()
      .click(function() {
        Upload();
      });
	loadSites();
	 
});

function adjustValue(Adjust,id){
	    var snd = new Audio("audio/button-3.wav"); // buffers automatically when created
		var MyValue = parseInt($(id).html());
	    var MyValues = Array();

		//var clickedID = this.id();
    	//alert('#' + id.toString);
    	//get current value and add one
        $(id).html(MyValue+Adjust);
        //store data to local application cache
	 
	    MyValues = getCounts();
	  
	    localStorage[getID()] = JSON.stringify(MyValues);
	    
	    snd.play();
 
	    //var storedNames = JSON.parse(localStorage[getID()]);
	    //alert(storedNames);
	    
	    //localStorage[$box.attr("id")] = JSON.stringify(getCounts);
}

function Upload(){

	//write to a backup file (timestamp)
	exportToCSV();
	
	//check internet
	
	//loop through local storage and add to string
	var emailBody = '"dPCy","dPCn","dPUy","dPUn","dVANy","dVANn","dSUVy","dSUVn","pPCy","pPCn","pPUy","pPUn","pVANy","pVANn","pSUVy","pSUVn","dPCu","dPUu","dVANu","dSUVu","pPCu","pPUu","pVANu","pSUVu","My","Mn","By","Bn","SiteID","Name","Location","Comments","Date","End","Ver"';
	var localstro = "";
	for (var i = 0; i < localStorage.length; i++){
		localstor = localStorage.getItem(localStorage.key(i));
		emailBody = emailBody + "\n" + localstor;
		//csvData.push(str.substring(1,str.length - 3)); //strip off first and last chars [ ]
		}
	
	//send email
	//window.open("mailto:eric.green@uky.edu?subject=BeltProxUpload&body="); // + emailBody);
	
	window.location.href = "mailto:eric.green@uky.edu?subject=BeltProxUpload&body=" + emailBody;

	//verify email
	
	//ask user if they are sure
	if (confirm('Was the email sent and would you like to delete the local data?')) {
		//remove all data from local storage and listbox
	    localStorage.clear();
		loadSites(); //this will verfify that the localstorage was cleared and clear the dropbown accordingly
		
	} else {
	    // Do nothing!
	}
	
	//console.log("here!");
	//copy all data to clipboard

}

function loadSites(){
	  //load any previous data into listbox for review and edit

	var opt = "";
	
	$("#previousData > option").remove();
		
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

function exportToCSV() {

//var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
//saveAs(blob, "hello world.txt");

// prepare CSV data
var csvData = new Array();
csvData.push('"dPCy","dPCn","dPUy","dPUn","dVANy","dVANn","dSUVy","dSUVn","pPCy","pPCn","pPUy","pPUn","pVANy","pVANn","pSUVy","pSUVn","dPCu","dPUu","dVANu","dSUVu","pPCu","pPUu","pVANu","pSUVu","My","Mn","By","Bn","SiteID","Name","Location","Comments","Date","End","Ver"');

for (var i = 0; i < localStorage.length; i++){
var str = localStorage.getItem(localStorage.key(i));
csvData.push(str.substring(1,str.length - 3)); //strip off first and last chars [ ]
}

// download stuff
var buffer = csvData.join("\n");
var uri = "data:text/csv;charset=utf8," + encodeURIComponent(buffer);
var today = new Date();
var fileName = today + ".csv";

$(this).attr("href", uri).attr("download", fileName);

var link = document.createElement("a");
var myBreak = document.createElement("br");
//if(link.download !== undefined) { // feature detection
  // Browsers that support HTML5 download attribute
link.setAttribute("href", uri);
  //link.setAttribute("download", fileName);
//}
//else {
  // it needs to implement server side export
  //link.setAttribute("href", "http://www.example.com/export");
//}
link.innerHTML = "Backup " + today;

//add link and break
document.getElementById('Backup').appendChild(link);
document.getElementById('Backup').appendChild(myBreak);

//document.body.appendChild(link);

//window.open(uri);

//$(this).attr('href', link);
// link.download();

/*
	var csv = "Abc, DEF, GHI, JKLM";
	alert("tes");
	csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
	
	$(this)
	
	.attr({
	
	'href': csvData,
	
	'target': '_blank'
	
	});
*/
}
