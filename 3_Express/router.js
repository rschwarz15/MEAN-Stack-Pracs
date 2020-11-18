let express = require('express');
let router = express.Router();

// The database is implemented as an array of items (objects)
let db = [];

// Stock the warehouse with something
let newId = Math.round(Math.random() * 1000);
let newRec = {
    id: newId,
    name: "Computers",
    count: "200",
    cost: "1500"
}
db.push(newRec);


// Home Page
router.get('/', function (req, res) {
    fileName = __dirname + "/index.html";
    res.sendFile(fileName)
});


// Add a new item to the warehouse
router.get('/newItem', function (req, res) {
    q = req.query;

    if (typeof q.name != "undefined" && typeof q.count != "undefined" && typeof q.cost != "undefined") {
        let newId = Math.round(Math.random() * 1000)
        let newRec = {
            id: newId,
            name: q.name,
            count: q.count,
            cost: q.cost
        }

        db.push(newRec);

        // Display new db
        res.send(`Item Added: </br>${JSON.stringify(newRec)}</br></br>` + generateList())
    } else {
        res.send("To add an item the query must contain name, count and cost");
    }
});


// List all items
router.get('/getallitems', function (req, res) {
    res.send(generateList());
});


// Delete an item by id
router.get('/removeitemid/:id', function (req, res) {
    p = req.params;
    itemDeleted = deleteItemByID(p.id);

    if (itemDeleted) {
        res.send(`Item ${p.id} Deleted </br></br>` + generateList());
    } else {
        res.send('Item is not in the database');
    }

});

// Delete an item by name
router.get('/removeitemname/:name', function (req, res) {
    p = req.params;
    itemDeleted = deleteItemByName(p.name);

    if (itemDeleted) {
        res.send(`Item ${p.name} Deleted </br></br>` + generateList());
    } else {
        res.send('Item is not in the database');
    }

});


// Get warehouse total value
router.get('/getwarehousevalue', function (req, res) {
    res.send(`Warehouse Total value: $${prettyNum(totalValue())}`)
});


// Unkown path fallback
router.get(/.*/, function (req, res) {
    res.send("Unknown Path");
});


// Return string representing the wharehouse db
function generateList() {
    let st = 'ID | Name | Count | Cost | Total Value </br>';

    // Go through all items adding data to string
    for (let i = 0; i < db.length; i++) {
        let value = db[i].cost * db[i].count;
        st += `${db[i].id} | ${db[i].name} | ${prettyNum(db[i].count)} | ${prettyNum(db[i].cost)} | ${prettyNum(value)} </br>`;
    }

    return st;
}


// Delete item from wharehouse db given an id
function deleteItemByID(id) {
    let itemDeleted = false;

    // Go through all items
    for (let i = 0; i < db.length; i++) {

        // If the item id matches the input id then remove the item from db
        if (db[i].id == id) {
            db.splice(i, 1);
            itemDeleted = true;
            break;
        }
    }

    return itemDeleted;
}

// Delete item from wharehouse db given an name
function deleteItemByName(name) {
    let itemDeleted = false;

    // Go through all items
    for (let i = 0; i < db.length; i++) {

        // If the item id matches the input name then remove the item from db
        if (db[i].name == name) {
            db.splice(i, 1);
            itemDeleted = true;
            break;
        }
    }

    return itemDeleted;
}


// Return the total value of the wharehouse
function totalValue() {
    let totalValue = 0;

    // Go through all items adding up total value
    for (let i = 0; i < db.length; i++) {
        let value = db[i].cost * db[i].count;
        totalValue += value;
    }

    return totalValue
}


// Pretty number print
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function prettyNum(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


module.exports = router;
