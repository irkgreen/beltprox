// here is a live demo of this code: http://www.ellipsetours.com/Demos/storage/

//titlerow
var gTitle='"dPCy","dPCn","dPCu","dPUy","dPUn","dPUu","dVANy","dVANn","dVANu","dSUVy","dSUVn","dSUVu","pPCy","pPCn","pPCu","pPUy","pPUn","pPUu","pVANy","pVANn","pVANu","pSUVy","pSUVn","pSUVu","My","Mn","Mu","By","Bn","Bu","SiteID","Name","Location","Comments","Date","End","Ver"';

$(document).ready(function(){
	//this fires on load or when a button is pressed
	
	//if non-retina then use scale
	if (window.devicePixelRatio < 2) { 
	    document.querySelector("meta[name=viewport]").setAttribute('content','width=device-width, initial-scale=1.0, user-scalable = no');
	    }
	    
    //determin if an increment or decrement button was pushed
    //increm as 0-30, decrems are 100-130 and spans (where the value is stored) are 200-230
    $('.IncremBtn').click(function(event){
    	var MyID = parseInt(event.target.id);
    	adjustValue(1,MyID);
    	//store this ID in undo button
    	$('#Undo').val(MyID);
    	$('#Undo').html("Undo " + IDtoName(MyID));
    });
    $('#Undo').click(function(event){
    	var UndoValue = $('#Undo').val();
    	if (UndoValue!="-1") //-1 means there is nothing to undo, the default state
    	{
    		var MyID = parseInt(UndoValue); //get from undo button value
    		adjustValue(-1,MyID);
    	}

    });
    
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
      $("#startData")
      .button()
      .click(function() {
        startData();
      });
      $("#mycomments") //autosave as the user types
      .keyup(function() {
      	saveSite($("#mycomments").val());
      });
      $("#mylocation") //autosave as the user types
      .keyup(function() {
      	saveSite($("#mylocation").val());
      });
	loadSites();
	 
});

function adjustValue(Adjust,id){
	    //var snd = new Audio("audio/button-3.wav"); // buffers automatically when created
		var MyValue = parseInt($('#' + id).html());
	    var MyValues = Array();
		
		if (MyValue < 1 && Adjust ==-1) 
		{
			//don't make negative
			return false;
		}
		
		//var clickedID = this.id();
    	//alert('#' + id.toString);
    	//get current value and add one
        $('#' + parseInt(id)).html(MyValue+Adjust);
        //store data to local application cache
	 
	    MyValues = getCounts();
	  
	    localStorage[getID()] = JSON.stringify(MyValues);
	    
	    //snd.play();
 		changecolors();
 
	    //var storedNames = JSON.parse(localStorage[getID()]);
	    //alert(storedNames);
	    
	    //localStorage[$box.attr("id")] = JSON.stringify(getCounts);
}

function Upload(){

	//check for data
	if ($('#previousData > option').length < 1)
	{
		alert("No data collected.  Go collect some data!");
		return false;
	}
	
	//write to a backup file (timestamp)
	exportToCSV();
	
	//check internet
	
	//loop through local storage and add to string
	var emailBody = gTitle;
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
	if (confirm('The data will be pasted into an email message.  Be sure to send this email right away.  The data will be deleted from the local storage.  Are you sure?  A backup will be temporarily available on this page.')) {
		//remove all data from local storage and listbox
	    localStorage.clear();
		loadSites(); //this will verfify that the localstorage was cleared and clear the dropbown accordingly
		createNewSite();  //clear form cache
		
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

function saveSite(myVal){
//this function saves the site in the event the user changes main form values

		//check for commas
		if(myVal.indexOf(",") > -1)
		{
			alert("Please remove any commas from comments and location!");
			return false;
		}

	    var MyValues = Array();
	    MyValues = getCounts();
	    localStorage[getID()] = JSON.stringify(MyValues);    
	    //alert(MyValues);
	   	//var storedNames = JSON.parse(localStorage[getID()]);
	    //alert(storedNames);
    	//location.reload(); A reload will clear backup!!
    	loadSites();
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
	     
}

function removeSite(){
//this function saves the site in the event the user changes main form values

      	//load previous session and show table
      	var strKey = $('#previousData option:selected').val();
        var strValue = localStorage.removeItem(strKey);
        
        //location.reload(); a reload will clear backup!!
        loadSites();
    	createNewSite();  //clear form cache as we don't know which record they deleted
	
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
  
   	//clear all data
    for (var i = 0; i < 30; i++) {
		//alert(document.getElementById(i.toString()).innerHTML);
		document.getElementById(i.toString()).innerHTML=0;
		//$('#' + i.toString).html(0); //doesnt work???
    }

    document.getElementsByName("mysiteID")[0].value = ""; // this doesnt seem to work $("#mysiteID").val();
    document.getElementsByName("myname")[0].value = ""; // $('#myname').val();
    document.getElementsByName("mylocation")[0].value = ""; // $('#mylocation').val();
    document.getElementsByName("mycomments")[0].value = ""; // $('#mycomments').val();
    document.getElementsByName("mydate")[0].value = ""; // $('#mydate').val();
    document.getElementsByName("myend")[0].value = ""; // $('#myend').val();

    document.getElementsByName("mysiteID")[0].disabled = false;
    document.getElementsByName("myname")[0].disabled = false;
    
  }
  
function startData() {

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
	  	
  	//set date and time to now if blank
  	//if not blank then that means the user is editing and changing this will change the key
  	if (document.getElementsByName("mydate")[0].value=="")
  	{
  		var today = new Date();
  		document.getElementsByName("mydate")[0].value = today; // $('#mydate').val() = today;
  	}
  	
   //unhide table
   document.querySelector('#datatable').style.display = 'table';
   document.querySelector('#Site').style.display = 'none';
   
   saveSite("ok");
   
    document.getElementsByName("mysiteID")[0].disabled = true;
    document.getElementsByName("myname")[0].disabled = true;
    
    //clear undo
    $('#Undo').val("-1");
    $('#Undo').html("Nothing to undo");
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
   
  }

function exportToCSV() {

	//var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
	//saveAs(blob, "hello world.txt");
	
	// prepare CSV data
	var csvData = new Array();
	csvData.push(gTitle);
	
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

function changecolors() {
	if (document.body.style.background == "")
	{
		document.body.style.background = "grey";
	}
	else 
	{	
		document.body.style.background = "";
	}
        //setInterval(changeBack, 200);
    }

function changeBack() {
	document.body.style.background = "white";
}

function IDtoName(ID)
{
	switch(ID)
	{
		case 0:
		myUndo="Driver PC Yes";
		break;
		case 1:
		myUndo="Driver PC No";
		break;
		case 2:
		myUndo="Driver PC Unknown";
		break;
		case 3:
		myUndo="Driver PU Yes";
		break;
		case 4:
		myUndo="Driver PU No";
		break;
		case 5:
		myUndo="Driver PU Unknown";
		break;
		case 6:
		myUndo="Driver VAN Yes";
		break;
		case 7:
		myUndo="Driver VAN No";
		break;
		case 8:
		myUndo="Driver VAN Unknown";
		break;
		case 9:
		myUndo="Driver SUV Yes";
		break;
		case 10:
		myUndo="Driver SUV No";
		break;
		case 11:
		myUndo="Driver SUV Unknown";
		break;
		case 12:
		myUndo="Passenger PC Yes";
		break;
		case 13:
		myUndo="Passenger PC No";
		break;
		case 14:
		myUndo="Passenger PC Unknown";
		break;
		case 15:
		myUndo="Passenger PU Yes";
		break;
		case 16:
		myUndo="Passenger PU No";
		break;
		case 17:
		myUndo="Passenger PU Unknown";
		break;
		case 18:
		myUndo="Passenger VAN Yes";
		break;
		case 19:
		myUndo="Passenger VAN No";
		break;
		case 20:
		myUndo="Passenger VAN Unknown";
		break;
		case 21:
		myUndo="Passenger SUV Yes";
		break;
		case 22:
		myUndo="Passenger SUV No";
		break;
		case 23:
		myUndo="Passenger SUV Unknown";
		break;
		case 24:
		myUndo="Motorcycle Yes";
		break;
		case 25:
		myUndo="Motorcycle No";
		break;
		case 26:
		myUndo="Motorcycle Unknown";
		break;
		case 27:
		myUndo="Bike Yes";
		break;
		case 28:
		myUndo="Bike No";
		break;
		case 29:
		myUndo="Bike Unknown";
		break;
		default:
		myUndo = "";
	}

	return myUndo;
}

function usageRate()
{
  var MyYes = 0
	for (var i = 0; i < 30; i+=3){
	  MyYes = MyYes + parseInt($('#' + id).html());
	}
  var MyNo = 0
	for (var i = 1; i < 30; i+=3){
	  MyNo = MyNo + parseInt($('#' + id).html());
	}
  var MyUnk = 0
	for (var i = 2; i < 30; i+=3){
	  MyUkn = MyUkn + parseInt($('#' + id).html());
	}
alert(MyYes/(MyYes+MyNo);
}
