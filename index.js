const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRITION%}/g, product.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic) {
        output = output.replace(/{%NOTORGANIC%}/g, 'not-organic');
    }
    return output;
}

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHTML = dataObj.map(el => replaceTemplate(tempCard, el));
        const output = tempOverview.replace('{%CARDS%}', cardsHTML);
        res.end(output);

    } else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

    } else if (pathname === '/api') {
        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => { 
        //     const productData = JSON.parse(data);
        res.writeHead(200, {
            'Content-type': 'application/json'});
        //console.log(productData);
        res.end(data);

    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',});
        res.end('<h1>Page not found</h1>')
    }
});


server.listen(8000, '127.0.0.1', () => {
    console.log('The server has been started')
})