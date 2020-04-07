var queue = require('async/queue');

class BankService {

  constructor(account) {
    this.account = account;
    this.transactioner = queue((task, callback) => {
      try {
        this.account.applyTransaction(task);  
      } catch(err) {
        return callback(err);
      }
      console.log(this.account.amount);
      callback();
    }, 1);
  }

  generateMiddleware() {
    return (req, res, next) => {
      req.account = this.account;
      req.addTransaction = (transaction) => {
        return new Promise((resolve, reject) => {
          this.transactioner.push(transaction, (err) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        })
      }
      next();
    }
  }
}

module.exports = BankService;