beltprox
========

Resources:
-http://diveintohtml5.info/storage.html

Staged:
-change to lighter grey
-why are blank dupes being created (ver 1.019)



Essential:
need to find a way to edit top combobox item if it is already selected
-test on high volume
-date not showing in access
-end date not saving to CSV


-color buttons MISC (stop = red, undo = yellow)
-add timer to bottom
-test app cache
--add check or a way to forcibly get the latest version.  This could happen every time the user uploads
--force users to run: chrome://appcache-internals/ or similar
-make sound on click (buffering) or clean up background color event (buggy)
-design for portrait or landscape
-make look iOS-ey - boot strap

Would-be-nice:
add linefeeds to CSV
remove [ and ]'s (would need to change Eric's import program)
-start timer, shows countdown on table?
-add note to comments if user edits or stops early or edits a database - make uneditable?
-Clean up workflow – the current site isn’t selected in the dropdown (counterintuitive)
-Add startup image: <link rel="apple-touch-startup-image" href="/startup.png">
-Test running app from springboard
-Add favicon for icon on springboard
-Hide title bar
-change date to number when stored in key (currently a very long string) - maybe okay
-email not sent on desktop during upload. We should check and use another method for debugging
-Use a picture for vehicle types and seat
-disable copy/paste

Optimization:
-check for “QUOTA_EXCEEDED_ERR”
--There is a 5MB limit
--should be okay for several data collections (let's do math)
-There is a SQLLite version of localstorage but I am unsure of its support
-consider switching completely to jquery (need to use name or change name to ID to use hashtag refs, e.g. #29)
-consider using json mappings instead of CSV (this was used in the original sample code; it would be easier to read)
 


