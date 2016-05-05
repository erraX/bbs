import express from 'exporess'

let index = exporess.Router();

index.get('/', function (req, res, next) {
    res.send('aa');
});

export default index;
