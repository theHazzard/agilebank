class Account {
  constructor(name, initialAmount) {
    this.name = name;
    this.movements = [];
    this.amount = initialAmount;
  }

  applyTransaction(transaction) {
    const {type, amount} = transaction;
    switch (type) {
      case 'credit':
        this.ammount += amount;
        break;
      case 'debit': 
        if (amount > this.amount) {
          throw Error('not enough founds');
        }
        this.amount -= amount;
        break;
      default:
        throw Error('malformed transaction');
    }

    this.movements.push(transaction);
  }
}

module.exports = Account;