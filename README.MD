First we need to open the repository on VScode or our prefered IDE and we should open two different terminals 

In first terminal we perform the backend work for that type "cd api" and in second  terminal we perform the frontend work for that type "cd client"

In both  the terminal we need to install npm so for that type npm install

And wait for the installation to complete

After the completion of the npm installation if there are any conflicts then use this command
"npm install --force"
this will resolve  the problems.



Once the node modules folder is installed, then go to your MongoDB atlas and get the connection key.
 
After receiving the MongoDB  connection key
Now we need to  create a .env file in api and ensure to name it ".env" only.
Now  in that file we should keep our mongoDb atlas connection key in this way

MONGO = your key ..[Dont use these->""].. Just paste the link

After the connection set up 
Now in both terminal type npm start

After this the application will start


Go to [http://localhost:5173] this is the local host id where the page would be running
this will be the output page which displays the contents

Now create some accounts, both buyer and seller(check the seller option while account creation for a seller account) and then you can explore this MarketPlace!!