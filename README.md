# TrailFeathers
Trail Feathers is an app for hiking and bird watching anywhere in the world! Use it to explore hiking and biking trails, organize lists of items
to bring with you, and search for any North American bird. 

# Team ACE
Product Owner:
Scrum Master: Caity Opelka
Development Team: Rodolfo Machirica, Rene Mercadel, John Dyer, Santo Lococo, Murphy Fleenor

## Application Walk Through

The idea is to have one stop shop for all your hiking needs, with a focus on Louisiana.

When a user opens the application they will be brought to the login page where they will be redirected to google to login.

Located at the top left of every page is a navigation burger menu which contains {x} options that will quickly navigate the user to various features of the application. From left to right are the ...

Quartermaster
Allows user to create packing lists with just a name of the list and a description, after which the list is displayed on the page.
User can click on a given list which will open a new view; and there, the user can add items that they want for that trip/packing list.

Trail Feathers
Trail Feathers is an app for hiking and bird watching anywhere in the world! Use it to explore hiking and biking trails, organize lists of items
to bring with you, and search for any North American bird. 

Search Trails

Setup Photo upload

Packing List

Birding Check List
A searchable checklist of all the bird in Louisiana (according to eBird a Cornell run Bird Data API). This includes the bird's common name, scientific name, common family name, and common scientific name. Users can check any bird they have spotted along there journey to keep along the trail.

## Tech
1. Cloudinary - Image hosting library
2. React-Router - Router library
3. Mysql - Database
4. Sequelize - ORM
5. React - Framework
6. Axios - http Client
7. Javascript
8. Node.js - Runtime Environment
9. Express - Server
10. Bulma - CSS Library
11. eslint - Linter
12. Webpack - Module Bundler
13. Passport/Google OAuth - Authentication
14. AWS - Deployment
15. Ebird - Bird data API


Dev Setup:
## Environment Variables Needed
1. GOOGLE_CLIENT_ID=
2. GOOGLE_CLIENT_SECRET=
3. CLOUDINARY_URL=
4. CLOUDINARY_NAME=
5. CLOUDINARY_API_KEY=
6. CLOUDINARY_API_SECRET=
7. GOOGLE_CLIENT_SECRET=

## Google OAuth
Google Oauth requires a google cloud account. First create your account and then navigate to the developer console. Go to google API and create a clientID and clientSecret. This goes inside the .env file.

## Installation/Start-up
1. First fork the repo and clone it to your local machine.
2. Collect all env keys
3. Run 'npm install' to install all dependencies
4. Open mysql, create and use a database called 'TakeAHike'
4. Run 'npm run dev' to start Webpack
5. Run 'npm start' to run the server

### Known Bugs
If you input a non-land based coordinate when searching for trails, it will return an error.
