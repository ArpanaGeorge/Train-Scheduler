# Train-Scheduler

###UI<br>
-Used bootsrap grid with 2 rows<br>
    - In first row used a jumbtron to insert the heading and current time<br>
    -In second row, in the first col-9 section, inserted the table with heading using panel and in the next col-3 section, inserted the Form with heading again using panel<br>

###Implementation
-Initialized Firebase<br>
-Called currentTime function for showing current time in header<br>
-Reloaded the page every 1 min inorder to display the correct current train schedule update every minute <br>
-Retained the values entered in textboxes during page reload by saving values to sessionStorage and getting values from sessionStorage to textboxes<br>
-On clicking submit button , got the form textbox values and pushed it in to firebase<br>
-Each time child was added to db, added new row in table after calculating next arrival time and minutes away<br>
-inserted a remove row button by setting the key from database to data-key attribute and using remove() method<br>