import { fetchData, displayLoadingScreen, displayNotif } from '../utils';

// Api key Etherscan
// 5RTBT9H4WF8D61R19UFE78Z9SMBJ6S1J9V

async function getAddressInfo(address) {
  const dataBalance = await fetchData(
    `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=5RTBT9H4WF8D61R19UFE78Z9SMBJ6S1J9V`,
  );
  const dataTransactions = await fetchData(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=20&sort=asc&apikey=5RTBT9H4WF8D61R19UFE78Z9SMBJ6S1J9V`,
  );
  return { dataBalance, dataTransactions };
}

async function getCryptoValue(currency) {
  const data = await fetchData(
    `https://api.coingecko.com/api/v3/coins/${currency}?tickers=true&market_data=true`,
  );
  return data;
}

async function getSupportedCurrencies() {
  const data = fetchData(
    `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`,
  );
  return data;
}

export { getAddressInfo, getCryptoValue, getSupportedCurrencies };
