import express from 'express';

const app = express();

app.get('/',function (req, res) {
    console.log("funcionando")
})

app.listen(3030, function(){
    console.log("escuchando servidor");
})