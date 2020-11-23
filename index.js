const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

// Connection to the Atlas MongoDB database JulienQHN
const url =
  "mongodb+srv://JulienQHN:JYTYGUG7B5ALAhA5@cluster0.3j9t9.mongodb.net/JulienQHN?retryWrites=true&w=majority";

// Create the MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// The database to use in this program is "JulienQHN"

const dbName = "JulienQHN";

// Permit to use all the Http requests and allow to use (req) and (res)
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

let db, weaponDb;

// Start the application
run().catch(console.dir);

//code used to start our application
async function run() {
  // try to start the application only if the database is connected correctly
  try {
    //connect to the database
    await client.connect();

    //connect to the database ("JulienQHN")
    db = client.db(dbName);

    //get reference to our weapon table
    weaponDb = db.collection("weapon");

    //start listening to requests get/post/put/delete
    app.listen(3000);
  } catch (err) {
    //in case we couldn't connect to our database throw the error in the console
    console.log(err.stack);
  }
}

//get all weapons of the collection "weapon"
app.get("/weapon", (req, res) => {
  db.collection("weapon", function (err, collection) {
    if (err) throw err;
    collection.find({}).toArray(function (error, weapons) {
      if (err) throw error;
      res.send(weapons);
    });
  });
});

//get a specific weapon in the collection, here the "AK47" model
app.get("/weapon/:id", (req, res) => {
  console.log("You are in the AK47 weapon route");

  async function findAK47Weapon() {
    const foundWeapon = await weaponDb.findOne({ model: "AK47" });
    res.json(foundWeapon);
  }
  findAK47Weapon();
});

//Permit to insert a weapon in the weapon collection of the database

app.post("/weapon", (req, res) => {
  console.log("I have received a post request in the /weapon route");

  //create a weapon
  let weapon = new Weapon(
    req.body.make,
    req.body.model,
    req.body.volume,
    req.body.country,
    req.body.availability
  );

  //insert the weapon in the database
  weaponDb.insertOne(weapon);
  res.sendStatus(200);
});

// weapon router for updating
app.put("/weapon", (req, res) => {
  console.log(" Weapon router for update ");
  async function findWeapon() {
    try {
      const foundWeapon = await weaponDb.findOne({
        _id: ObjectId(req.body.id),
      });
      //if the weapon is found edit it and send a message to the user
      if (foundWeapon !== null) {
        let weapon = new Weapon(
          foundWeapon.make,
          foundWeapon.model,
          foundWeapon.volume,
          foundWeapon.country,
          foundWeapon.availability
        );
        weapon.make = req.body.make;
        weapon.model = req.body.model;
        weapon.volume = req.body.volume;
        weapon.country = req.body.country;
        weapon.availability = req.body.availability;
        // console.log(weapon);
        try {
          const updateResult = await weaponDb.updateOne(
            { _id: ObjectId(req.body.id) },
            { $set: weapon }
          );
        } catch (err) {
          console.log(err.stack);
        }
        res.send("The weapon was updated");
      } else {
        //if the weapon is not found send a message to the user saying that this entry doe not exist
        res.send("The weapon was not updatedd");
      }
    } catch (err) {
      res.send("Object id is invalid");
    }
  }
  findWeapon();
});
// weapon router to delete a weapon in the collection
app.delete("/weapon", (req, res) => {
  console.log("Weapon router to delete one weapon");

  console.log(req.body.id);

  weaponDb.deleteOne({ _id: ObjectId(req.body.id) });
  async function findWeapon() {
    const foundWeapon = await weaponDb.findOne({ _id: ObjectId(req.body.id) });
    if (foundWeapon !== null) {
      res.send("The weapon was not deleted");
    }
    res.send("The weapon was deleted");
  }
  findWeapon();
});

// Describe the weapon class with every parameters
class Weapon {
  constructor(make, model, volume, country, availability = false) {
    this.make = make;
    this.model = model;
    this.volume = volume;
    this.country = country;
    this.availability = availability;
  }
}
