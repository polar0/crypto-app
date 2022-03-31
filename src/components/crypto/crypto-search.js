import {
  displayCurrencyData,
  getAllCurencyData,
  getTrendingCurrencyData,
  getTopCurrencyData,
} from './crypto-data';
import { displayLoadingScreen, sortData, waitFor } from '../utils';

let currencies;
let trending;
let loaded = false;
let popular = [];
let searchActive;

async function loadSearchFunctions() {
  document.addEventListener('click', getFocus);
  document
    .querySelector('.search-button')
    .addEventListener('click', getCurrencyInput);
  currencies = await getAllCurencyData();
  trending = await getTrendingCurrencyData();
  loaded = true;

  // Get popular coins to display first on search input
  let temp = await getTopCurrencyData(100);

  for (const coin of trending.coins) {
    temp.push(coin.item);
  }

  for (const item of temp) {
    popular.push(item.name.toLowerCase());
  }
}

function getCurrencyInput(e) {
  // Get the crypto on Enter
  if (e.code === 'Enter') {
    displayCurrencyData(this.value.toLowerCase());
    hideSearchScreen();
    // Hide the screen on Escape
  } else if (e.code === 'Escape') {
    hideSearchScreen();
  } else if (e.target === document.querySelector('.search-button')) {
    displayCurrencyData(
      document.querySelector('input#crc-search').value.toLowerCase(),
    );
    hideSearchScreen();
    e.stopPropagation();
  } else {
    loadSearchScreen(this);
  }
}

async function loadSearchScreen(input) {
  // Display the search screen
  document.querySelector('#blur-container').classList.add('blur');
  document.querySelector('.search-container').style.display = 'grid';
  document.querySelector('.search-content').textContent = '';

  // Display loading screen while waiting for data
  displayLoadingScreen(true, document.querySelector('.search-content'));
  await waitFor(() => loaded);
  displayLoadingScreen(false, document.querySelector('.search-content'));

  // Get the appropriate display for the input
  if (input.value === '') {
    displaySearchScreen(trending);
  } else {
    showRelatedCurrency(input.value);
  }
}

async function showRelatedCurrency(value) {
  value = value.toLowerCase();
  // Sort results by matching with the input value
  // Display top #100 and trending currencies first
  const matches = sortData(currencies, value, popular);

  displaySearchScreen(matches);
}

function hideSearchScreen(status) {
  document.querySelector('#blur-container').classList.remove('blur');
  document.querySelector('.search-container').style.display = 'none';
  document.querySelector('input#crc-search').blur();
  searchActive = false;
}

async function displaySearchScreen(matches) {
  if (matches === trending) {
    document.querySelector('.search-title').textContent = 'Trending';
    for (const coin of trending.coins) {
      const item = createTrendingBox(coin.item);
      document.querySelector('.search-content').appendChild(item);

      item.addEventListener('click', function () {
        displayCurrencyData(coin.item.id);
        hideSearchScreen();
      });
    }
  } else {
    document.querySelector('.search-title').textContent = 'Result';

    matches.length > 10 ? (length = 10) : (length = matches.length);
    for (let i = 0; i < length; i++) {
      const item = createSearchBox(currencies[currencies.indexOf(matches[i])]);
      document.querySelector('.search-content').appendChild(item);

      item.addEventListener('click', function () {
        displayCurrencyData(this.children[3].textContent);
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

function cancelCryptoSearchFunctions() {
  document.removeEventListener('click', getFocus);
}

export { getCurrencyInput, loadSearchFunctions, cancelCryptoSearchFunctions };
