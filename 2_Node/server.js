const http = require('http');
const fs = require('fs');
const url = require('url');

/**
 * 
 * @param {day} d 
 * @param {month} m 
 * @param {year} y 
 * @returns Reponse String reagarding which week of semester 2 the date is, 
 *          and an error string if the date is before or after the semester
 */
function getDaysDiff(d, m, y) {
    let currentDay = new Date();
    currentDay.setDate(parseInt(d));
    currentDay.setMonth(parseInt(m) - 1); // months start from 0
    currentDay.setYear(parseInt(y));

    let firstDay = new Date("August 3, 2020 00:00:01"); // first day in semester 2
    let lastDay = new Date("November 6, 2020 23:59:59"); // last in semester 2

    if (currentDay < firstDay) {
        responseString = "Wrong Date!!! First Day in Sem 2 is the 3rd of August";
    }
    else if (currentDay > lastDay) {
        responseString = "Wrong Date!!! Last Day in Sem 2 is the 6th of November";

    }
    else {
        var diffDays = parseInt((currentDay - firstDay) / (1000 * 60 * 60 * 24)); //gives day difference 
        week = (Math.floor(diffDays / 7) + 1);
        responseString = `We are in Week ${week}`;
    }

    return (responseString);
}


http.createServer(function (request, response) {
    pathName = url.parse(request.url).pathname;
    params = url.parse(request.url, true).query;

    if (pathName === "/whichweek/") { pathName = "/whichweek" }
    if (pathName === "/my-favourite/") { pathName = "/my-favourite" }

    if (request.url.endsWith(".ico")) {
        response.end();
    } else {
        console.log(request.url)
        console.log("Path Name: " + pathName + " params: " + JSON.stringify(params))

        switch (pathName) {
            case '/':
                fileName = 'index.html';
                break;
            case '/assessments':
                fileName = 'assessments.html';
                break;
            case '/topics':
                fileName = 'topics.html';
                break;
            case '/whichweek':
                fileName = 'whichweek.html';
                responseString = getDaysDiff(params.d, params.m, params.y);
                break;
            case '/my-favourite':
                fileName = 'whichweek.html';
                responseString = `
                    <p>My Favourite Emoji ${params.emoji}</p>
                    <p style="font-size:200px">&#${params.emoji};</p>`
                break;
            default:
                fileName = '404.html';
                break;
        }
    
        fs.readFile(fileName, function (error, content) {
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
    
            if (typeof responseString !== "undefined") {
                response.write(responseString);
            }

            // Reset it back to null for subsequent queries
            responseString = ""
    
            response.end(content, 'utf-8');
        });
    }
}).listen(8080);

console.log('Server running at http://localhost:8080');
