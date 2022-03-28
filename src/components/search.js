import {
  loadCurrencyData,
  getAllCurencyData,
  getTrendingCurrencyData,
} from './data';
import { displayLoadingScreen, sortData } from './utils';

const container = document.querySelector('.search-content');

let currencies;
let trending;
let searchActive;

async function loadSearchFunctions() {
  document.addEventListener('click', getFocus);
  currencies = await getAllCurencyData();
  trending = await getTrendingCurrencyData();
}

function getCurrencyInput(e) {
  // Get the crypto on Enter
  if (e.code === 'Enter') {
    loadCurrencyData(this.value);
    hideSearchScreen();
    // Hide the screen on Escape
  } else if (e.code === 'Escape') {
    hideSearchScreen();
  } else {
    showRelatedCurrency(this.value);
  }
  // display trending coins if search is empty
  if (this.value === '') showTrendingCurrency();
}

async function showRelatedCurrency(value) {
  value = value.toLowerCase();
  const matches = sortData(currencies, value);

  displaySearchScreen(matches);
}

async function showTrendingCurrency() {
  if (document.activeElement === document.querySelector('input#crc-search'))
    displaySearchScreen(trending);
}

function hideSearchScreen(status) {
  document.querySelector('#blur-container').classList.remove('blur');
  document.querySelector('.search-container').removeChild(container);
  document.querySelector('.search-container').style.display = 'none';
  document.querySelector('input#crc-search').blur();
  searchActive = false;
}

async function displaySearchScreen(matches) {
  document.querySelector('#blur-container').classList.add('blur');
  document.querySelector('.search-container').appendChild(container);
  document.querySelector('.search-container').style.display = 'grid';
  container.textContent = '';

  currencies === undefined
    ? displayLoadingScreen(true, container)
    : displayLoadingScreen(false, container);

  if (matches !== trending) {
    document.querySelector('.search-title').textContent = 'Result';

    matches.length > 10 ? (length = 10) : (length = matches.length);
    for (let i = 0; i < length; i++) {
      const item = createSearchBox(currencies[currencies.indexOf(matches[i])]);
      container.appendChild(item);

      item.addEventListener('click', function () {
        loadCurrencyData(this.children[3].textContent);
        hideSearchScreen();
      });
    }
  } else {
    document.querySelector('.search-title').textContent = 'Trending';
    for (const coin of trending.coins) {
      const item = createTrendingBox(coin.item);
      container.appendChild(item);

      item.addEventListener('click', function () {
        loadCurrencyData(coin.item.id);
        hideSearchScreen();
      });
    }
  }
}

function createSearchBox(currency) {
  document.querySelector('.search-header.trending').style.display = 'none';
  document.querySelector('.search-header.result').style.display = 'grid';

  const item = document.createElement('div');
  item.classList.add('search-item');

  const name = document.createElement('div');
  name.classList.add('search-item-name');
  name.textContent = currency.name;
  const symbol = document.createElement('div');
  symbol.classList.add('search-item-symbol');
  symbol.textContent = currency.symbol;
  const platform = document.createElement('div');
  platform.classList.add('search-item-platform');
  let platformString = Object.keys(currency.platforms)[0];
  if (platformString === undefined) platformString = '';
  platform.textContent =
    platformString.charAt(0).toUpperCase() + platformString.slice(1);
  const id = document.createElement('div');
  id.classList.add('search-item-id');
  id.textContent = currency.id;

  item.appendChild(name);
  item.appendChild(symbol);
  item.appendChild(platform);
  item.appendChild(id);

  return item;
}

function createTrendingBox(coin) {
  document.querySelector('.search-header.trending').style.display = 'grid';
  document.querySelector('.search-header.result').style.display = 'none';

  const item = document.createElement('div');
  item.classList.add('search-item');

  const rank = document.createElement('div');
  rank.classList.add('search-item-rank');
  rank.textContent = coin.market_cap_rank;

  const currency = document.createElement('div');
  currency.classList.add('search-item-currency');
  const icon = document.createElement('div');
  icon.classList.add('search-item-currency-icon');
  const iconImg = document.createElement('img');
  iconImg.src = coin.thumb;
  const name = document.createElement('div');
  name.classList.add('search-item-currency-name');
  name.textContent = coin.name;

  const symbol = document.createElement('div');
  symbol.classList.add('search-item-currency-shortcut');
  symbol.textContent = coin.symbol;

  const id = document.createElement('div');
  id.classList.add('search-item-id');
  id.textContent = coin.id;

  item.appendChild(rank);
  icon.appendChild(iconImg);
  currency.appendChild(icon);
  currency.appendChild(name);
  item.appendChild(currency);
  item.appendChild(symbol);
  item.appendChild(id);

  return item;
}

function getFocus(e) {
  if (searchActive && e.target === this.querySelector('#blur-container')) {
    hideSearchScreen();
  }
  if (document.querySelector('input#crc-search') === document.activeElement) {
    searchActive = true;
  }
}

function cancelSearchFunctions() {
  document.removeEventListener('click', getFocus);
}

// Eventuellement trier par market cap avec un autre outil

export {
  getCurrencyInput,
  showTrendingCurrency,
  loadSearchFunctions,
  cancelSearchFunctions,
};
