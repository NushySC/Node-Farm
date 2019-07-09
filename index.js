const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;
    //console.log(req.url);
    //res.end('Hello from the server');
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the overview')
    } else if (pathName === '/product') {
        res.end('These are the products')
    } else if (pathName === '/api') {
        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => { 
        //     const productData = JSON.parse(data);
            res.writeHead(200, {'Content-type': 'application/json'});
            //console.log(productData);
            res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
        });
        res.end('<h1>Page not found</h1>')
    }
});


server.listen(8000, '127.0.0.1', () => {
    console.log('The server has been started')
})


