# Train-Scheduler

###UI
-Used bootsrap grid with 2 rows
    - In first row used a jumbtron to insert the heading and current time
    -In second row, in the first col-9 section, inserted the table with heading using panel and in the next col-3 section, inserted the Form with heading again using panel

###Implementation
-Initialized Firebase
-Called currentTime function for showing current time in header
-Reloaded the page every 1 min inorder to display the correct current train schedule update every minute 
-On clicking submit button , got the form textbox values and pushed it in to firebase
-Each time child was added to db, added new row in table after calculating next arrival time and minutes away
-inserted a remove row button by setting the key from database to data-key attribute and using remove() method