# Atlas MongoDB + Express Database ! 

  - The objective of this program is to perform CRUD operations using Node, Mongo-Db and Express on a remote database ( Atlas cloud). 

You can :
  - Connect to your own Data base
  - Get informations from specific collection
  - Make CRUD operations
      - Create an object (insert)
      - Read the list of objectfs or a specific one (find)
      - Update a specific object (update)
      - Delete an object of the collection

>  The application respond to the following http requests :

> get request: localhost:3000/<your class> -to get all your objects

> get request: localhost:3000/<your class>/<id/or any other index> -to get 1 object

> post request: localhost:300/<your class> -to insert 1 object

> put request: localhost:3000/<your class> -to update 1 object

> delete requests: localhost:3000/<yourclass>-to delete 1 object

### How to Use 
Open your Terminal and run these commands.

First cd to the right folder :
```sh
cd CA1
```
Start :
```sh
$ node index.js
```

