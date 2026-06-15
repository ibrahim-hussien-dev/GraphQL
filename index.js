const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');
const schema = require('./schema');

const app = express();
const port = 3000;

app.get('/', function (req, res) {
    res.type('html');
    res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.all(
    '/graphql',
    createHandler({
        schema: schema,
    }),
);

app.listen(port, function () {
    console.log('Server running on http://localhost:' + port);
});
