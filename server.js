const app=require("./index.js");

require('dotenv').config({path:"variable.env"});

app.set('port', process.env.port || 7777);
const server = app.listen(app.get('port'), () => {
    console.log("Servidor ativo http://localhost: " + server.address().port);
});