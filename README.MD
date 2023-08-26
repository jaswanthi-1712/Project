Firstly after opening this repository on VScode or your prefered IDE, open two different terminals 
And in 1st one type "cd api" and in second one type "cd client"
then in both terminal type npm install
wait for the installation to complete
you might see some module peer conflicts, in such case use this command
"npm install --force"
this shall fix your problems

Once the node modules folder is installed, then go to your MongoDB atlas and get the connection key.

now create a .env File in api and ensure you name it ".env" only and in that put your mongoDb atlas connection key like this

MONGO = your key ..[Dont use these->""].. Just paste the link

Now in both terminal type npm start

this should start your application

Go to [http://localhost:5173] this is where the page would be running

create some accounts, both buyer and seller(check the seller option while account creation for a seller account) and then you can explore this MarketPlace!!