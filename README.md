beltprox
========

http://diveintohtml5.info/storage.html

things to do:

New - starts timer, shows countdown on table?

check for “QUOTA_EXCEEDED_ERR”
-There is a 5MB limit
-should be okay for several data collections (let's do math)

There is a SQLLite version of localstorage but I am unsure of its support

add note to comments if user edits or stops early or edits a database - make uneditable?

test app cache
-I had to refresh website on my iPhone that was connected to wi-fi in order to get the latest version.  It was using cached.

consider switching completely to jquery (need to use name or change name to ID to use hashtag refs)

consider using json mappings instead of CSV

warn if increment becomes negative?

clean up, make buttons bigger, line up titles and driver, passenger etc.
make look iOS-ey

make sound on click (buffering) or clean up background color event (buggy)

form not populating on edit on iOS in chrome but okay in safari?

<link rel="apple-touch-startup-image" href="/startup.png">
hide title bar

check if date and comment have a comma!

need to remove motorcycle/bike unknowns in local storage or export

change date to number for key

title row for CSV is set in two places

email not sent on desktop (check and use another method?)

what if no data and upload clicked?

Fix app cache or have users follow: chrome://appcache-internals/

I flash the background to red on click (the audio isn't buffering like I wanted).  Can we make the table hollow?  Or should I flash the table red?

I had set the scale to 2.0 and disabled the user's zoom.  I think we should set the scale to 1.0 so that it better mirrors what your desktop looks like.  This is in the html.

I think we need to design for portrait based on the details in the table.  Plus this matches what the paper form looks like and I think would be more natural to hold.

The label 'Front seat passenger' is taking up valuable real estate.  Perhaps we can wrap it or shorthand it.  Using a picture would be ideal but that can be down the road.

Yes, it would seem that moving the passenger buttons would make ergonomic-sense. Two issues, 1) we have trained using our paper form and have folks that have used this form for years and we are unable to forcibly change this.  2) You are far too optimistic as to how many vehicles have more than one occupant.  Most cars have just 1 during 8-5.  The passenger table is used far less than the driver table.  That being said, the ultimate vision is to let the user choose from a variety of forms.  Especially for other states.  This is just Kentucky's form.  We can actually Google search other states' methodologies and perhaps find their forms.
I am sure you cringed when you saw my html table.  And I like how you prettied it up.  However, there was a method to my madness.  I generated that in Excel and should have shared it.  I used it to calculate the IDs 0-30, 100-130 and 200-230 for up, down, and value objects.  It saved me a lot of wasted time when I changed it to the existing two button scheme as I was merely able to edit my excel formula.  

