const coins = [];
coins[0] = 1; // céntimo
coins[1] = 2; // céntimos
coins[2] = 5; // céntimos
coins[3] = 10; // céntimos
coins[4] = 20; // céntimos
coins[5] = 50; // céntimos

function getCoins(amount) {
  const returnedCoins = new Array(5);
  for (let i = coins.length - 1; i >= 0; i--) {
    returnedCoins[i] = 0;
    const result = Math.floor(amount / coins[i]);
    if (result > 0) {
      amount = amount % coins[i];
      returnedCoins[i] = result;
    }
  }
  return returnedCoins;
}

console.log(51, getCoins(51)); // [1, 0, 0, 0, 0, 1] -> una moneda de 1 céntimo y otra de 50 céntimos
console.log(3, getCoins(3)); // [1, 1, 0, 0, 0, 0] -> una moneda de 1 céntimo y otra de 2
console.log(6, getCoins(5)); // [0, 0, 1, 0, 0, 0] -> una moneda de 5 céntimos
console.log(16, getCoins(16)); // [1, 0, 1, 1, 0, 0] -> una moneda de 1 céntimo, una de 5 y una de 10
console.log(100, getCoins(100)); // [0, 0, 0, 0, 0, 2] -> dos monedas de 50 céntimos
