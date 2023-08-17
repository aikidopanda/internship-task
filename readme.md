How to launch:

1. Go into backend folder and type 'pip install -r requirements.txt'. This will install all libraries needed for the backend.
2. Go into frontend folder and type 'npm install'. This will do the same for the frontend.
3. Create your postgres database by running 'python db_create.py' from backend folder. Change your database settings in the app.config['SQLALCHEMY_DATABASE_URI'] part of backend/app.py
4. If you need to delete your database, run 'python db_drop.py' from backend folder and then return to step 3.
5. Type 'python app.py' from backend folder to run the server
6. Type 'npm start' from frontend folder to run the frontend part on React
7. Use the website

How to use:

1. Create a new user (Sign up)
2. Log in into your account (Sign in)
3. Create an organization. Your organization will automatically switch to new one. One user can be a member of only one organization.
4. Type the email of another user to add him to your organization. If there's no user with such email in the database, you will see a corresponding message.

The base functionality is completed but the work is still in progress since I need to add CSS to make the website look good.
