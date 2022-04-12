const app = require('express')()
const port = 3000;

app.get('/', (req, res) => {
    res.send("<strong> Hello world! Im a daemon <strong/>")
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

process.on('SIGTERM', function () {
    if (server === undefined) return;
    server.close();
});



