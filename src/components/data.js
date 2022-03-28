import { displayLoadingScreen, displayError } from './utils';
import { createItem, displayUpdateTime, updateTable } from './table';
import { getCurrencyInput } from './search';

let timerSingle;
let timerLeader;

async function getSingleCurrencyData(currency) {
  if (currency === '') return 'Error';
  const value = await fetch(
    `https://api.coingecko.com/api/v3/coins/${currency}?market_data=true`,
    { mode: 'cors' },
  );

  if (!value.ok) return 'Error';

  const data = await value.json();

  return {
    rank: data.market_cap_rank,
    icon: data.image.thumb,
    name: data.name,
    symbol: data.symbol.toUpperCase(),
    price: data.market_data.current_price.usd,
    variation24H: Number(
      data.market_data.price_change_percentage_24h_in_currency.usd,
    ),
    high: Number(data.market_data.high_24h.usd),
    low: Number(data.market_data.low_24h.usd),
  };
}

async function getTopCurrencyData(num) {
  const value = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`,
    { mode: 'cors' },
  );
  const data = await value.json();
  let dataArray = [];

  for (let i = 0; i < num; i++) {
    let x = {
      rank: data[i].market_cap_rank,
      icon: getThumbIcon(data[i].image),
      name: data[i].name,
      symbol: data[i].symbol.toUpperCase(),
      price: data[i].current_price,
      variation24H: Number(data[i].price_change_percentage_24h),
      high: Number(data[i].high_24h),
      low: Number(data[i].low_24h),
    };
    dataArray.push(x);
  }

  return dataArray;
}

async function getAllCurencyData() {
  const value = await fetch(
    `https://api.coingecko.com/api/v3/coins/list?include_platform=true`,
    { mode: 'cors' },
  );
  const data = await value.json();
  return data;
}

async function getTrendingCurrencyData() {
  const value = await fetch(
    `https://api.coingecko.com/api/v3/search/trending`,
    { mode: 'cors' },
  );
  const data = await value.json();

  return data;
}

async function loadCurrencyData(input) {
  const container = document.querySelector('#result .assets-table');
  const content = document.querySelector('#result .table-content');
  const currencySearchInput = document.querySelector('input#crc-search');

  displayLoadingScreen(true, content);
  const data = await getSingleCurrencyData(input);
  displayLoadingScreen(false, content);

  if (data === 'Error') {
    displayError(`We could not find a currency named '${input}'`);
    currencySearchInput.focus();
    return;
  }

  const item = createItem(data);
  container.style.display = 'grid';
  content.appendChild(item[0]);
  updateSingleCurrency(content, 'none', input);
}

async function loadLeaderboard(limit) {
  const leaderboard = document.querySelector('#leaderboard .table-content');
  displayLoadingScreen(true, leaderboard);
  const data = await getTopCurrencyData(limit);
  displayLoadingScreen(false, leaderboard);

  for (let i = 0; i < limit; i++) {
    const item = createItem(data[i]);
    leaderboard.appendChild(item[0]);
  }
  updateLeaderboard(leaderboard, limit);
  displayUpdateTime();
}

function updateLeaderboard(content, limit) {
  clearInterval(timerLeader);

  timerLeader = setInterval(async function () {
    const data = await getTopCurrencyData(limit);
    updateTable(content, limit, data);
    displayUpdateTime();
  }, 10000);
}

function updateSingleCurrency(content, limit, target) {
  clearInterval(timerSingle);

  timerSingle = setInterval(async function () {
    const data = await getSingleCurrencyData(target);
    updateTable(content, limit, data);
  }, 10000);
}

function getThumbIcon(icon) {
  return icon.replace('large', 'thumb');
}

function cancelUpdatables() {
  clearInterval(timerLeader);
  clearInterval(timerSingle);
}

export {
  getSingleCurrencyData,
  getTopCurrencyData,
  getAllCurencyData,
  getTrendingCurrencyData,
  loadCurrencyData,
  loadLeaderboard,
  cancelUpdatables,
};