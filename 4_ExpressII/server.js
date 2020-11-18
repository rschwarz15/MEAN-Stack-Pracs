let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let morgan = require('morgan');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('images'));
app.use(express.static('css'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('common'));

let db = [];

// GET requests
app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/addEmployee', function (req, res) {
    res.render('addEmployee.html');
});

app.get('/employeesList', function (req, res) {
    res.render('employeesList.html', {db: db});
});

app.get(/.*/, function (req, res) {
    res.render('404.html');
});

// POST requests
app.post('/newEmployeeAdded', function (req, res) {
    name = req.body.name;
    dob = new Date(req.body.dob);
    department = req.body.department;
    yoe = req.body.yoe;

    // Calculate Age
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);

    // Check that name and department don't have less than 3 characters
    if (name.length < 3 || department.length < 3) {
        res.render('invalidData', {error: "Name and Department must have at least 3 characters"})
    }
    else if (dob > Date.now()) {
        res.render('invalidData', {error: "Nice try that date has not happened yet"})
    }
    // Check that they are at least 16 years of age
    else if (age < 16) {
        res.render('invalidData', {error: "Employee must be at least 16"})
    }
    else {
        // Add the new employee
        let newRec = {
            name: name,
            dob: dob,
            department: department,
            yoe: yoe
        }
        db.push(newRec);

        // Redirect to list of employees
        res.redirect('/employeesList')
    }
})

app.listen(8080);