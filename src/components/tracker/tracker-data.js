import { fetchData, displayLoadingScreen, displayError } from '../utils';

async function getAdressInfo(adress) {
  const value = await fetch(
    `https://testnets-api.opensea.io/api/v1/collection/${adress}`,
    { method: 'GET' },
    // ! NON C'EST EN TESTNET
  );

  if (!value.ok) return 'Error';
  const data = await value.json();
  return data;
}

async function getEthPrice() {
  const data = await fetchData(
    `https://api.coingecko.com/api/v3/coins/ethereum?tickers=true&market_data=true`,
  );
  return data;
}

async function getConfirmationTime(gas) {
  if (gas === '') return 'errorEmpty';
  // const data = fetchData(
  //   `https://api.etherscan.io/api?module=gastracker&action=gasestimate&gasprice=1000&apikey=5RTBT9H4WF8D61R19UFE78Z9SMBJ6S1J9V`,
  // );
  const data = fetchData(
    `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=5RTBT9H4WF8D61R19UFE78Z9SMBJ6S1J9V`,
  );

  return data;
}

async function getSupportedCurrencies() {
  const data = fetchData(
    `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`,
  );
  return data;
}

export {
  getAdressInfo,
  getEthPrice,
  getConfirmationTime,
  getSupportedCurrencies,
};
