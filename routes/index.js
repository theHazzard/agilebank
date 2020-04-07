const express = require('express');
const router = express.Router();

const Transaction = require('../BankService/transaction');

router.get('/account', (req, res) => {
  const {name, amount} = req.account;

  res.json({
    name,
    amount,
  });
});


router.get('/transactions', (req, res) => {
  const {movements} = req.account;

  res.json(movements);
});

router.post('/transactions', async function(req, res) {
  const {type, amount} = req.body;

  const transaction = new Transaction(type, amount);

  try {
    await req.addTransaction(transaction)
    res.end('done');
  } catch(err) {
    res.status(418).end(err.message);
  }
  
});

module.exports = router;
