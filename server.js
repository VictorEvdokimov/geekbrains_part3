const fs = require('fs');
const express = require('express');
const api = express();
const bodyParser = require('body-parser');

api.use(bodyParser.urlencoded({ extended : false }));

api.use(bodyParser.json());

api.get('/goods-list', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./products.json'));
  res.json(data);
});

api.get('/cart', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./cart.json'));
  res.json(data);
});

api.post('/cart', (req, res) => {
  const cart = JSON.parse(fs.readFileSync('./cart.json'));
  cart.push(req.body);
  console.log(cart);
  fs.writeFileSync('./cart.json', JSON.stringify(cart));
  res.send('ok');
})

api.delete('/cart', (req, res, next) => {
  const cart = JSON.parse(fs.readFileSync('./cart.json'));
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === req.body.id) {
      cart.splice(i, 1);
        fs.writeFileSync('./cart.json', JSON.stringify(cart));
        res.send('ok');
        return;
    } 
  }
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
})

api.listen(3000, () => {
  console.log('listen on port 3000')
});
