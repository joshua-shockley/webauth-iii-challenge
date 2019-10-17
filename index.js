const server = require('./server/server.js');

const port = process.env.PORT || 4444;

server.listen(port, () => {
    console.log(`server listening on port ${port}....have fun`);
});