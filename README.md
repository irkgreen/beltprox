beltprox
========

http://diveintohtml5.info/storage.html

things to do:

add New and Upload buttons
New - asks for ID, date, time, user, comments, unhides the data collection adds an end and pause button, starts timer
Upload - grabs all currently cached data and emails it as csv

Store data on button click to local storage

figure out what to do with undo buttons (right now there is only one per row)
-they are in the IncremBtn class too (might need to change)

check for “QUOTA_EXCEEDED_ERR”
-There is a 5MB limit
-should be okay for several data collections

There is a SQLLite version of localstorage but I am unsure of its support

create a list of sites already saved to the device.  have a button to open its data up in the data collector