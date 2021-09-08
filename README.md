# AngularCRUD-Django
Simple CRUD app written in Angular (Frontend) and Django + Django REST Framework (API)

# Django server

To run django server:
1. Go to "django-server" folder.
2. Run script "start.sh"

Of course make sure you have *python* installed :-) 

### SERVER ADDRESS: 

127.0.0.1:8000 or localhost:8000

### ENDPOINTS:

#### Offers: 
* /api/v1/offers/ : **POST, GET ALL**
* /api/v1/offers/<id:int> : **GET (one), DELETE, PUT**
* /api/v1/offers/?category=<ids:string> : **GET ALL (filtered by category id, possible mulitple categories after comma i.e. '1,2,3'
  
#### Categories: SERVER_ADDRESS/api/v1/offers/

# Angular app

1. Open project in Visual Studio Code or WebStorm.
2. Run "npm install" in terminal opened in "angular-crud" folder.
3. If it's over, run "npm start".

Of course make sure you have *node.js with npm* installed :-) 

## SERVER ADDRESS:

127.0.0.1:4200 or localhost:4200
