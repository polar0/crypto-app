import { loadLeaderboard } from '../data';
import {
  getCurrencyInput,
  showTrendingCurrency,
  loadSearchFunctions,
} from '../search';

const container = document.querySelector('.content');

function loadCrypto() {
  container.textContent = '';
  const error = document.createElement('div');
  error.classList.add('error');
  container.appendChild(error);

  const content = document.createElement('div');
  content.classList.add('crypto');

  // Search section
  const search = document.createElement('div');
  search.classList.add('search');

  // Search input
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'crc-search');
  input.setAttribute('id', 'crc-search');
  input.setAttribute('placeholder', 'Search for a cryptocurrency');
  const logo = document.createElement('i');
  logo.classList.add('logo', 'fa-solid', 'fa-search');
  const searchContainer = document.createElement('div');
  searchContainer.classList.add('search-container');
  searchContainer.style.display = 'none';

  // Search header
  const searchTitle = document.createElement('div');
  searchTitle.classList.add('search-title');
  const searchHeaderResult = document.createElement('div');
  searchHeaderResult.classList.add('search-header', 'result');
  const searchHeaderTrending = document.createElement('div');
  searchHeaderTrending.classList.add('search-header', 'trending');

  // Searching
  const shName = document.createElement('div');
  shName.classList.add('search-header-item');
  shName.textContent = 'Name';
  const shSymbol = document.createElement('div');
  shSymbol.classList.add('search-header-item');
  shSymbol.textContent = 'Symbol';
  const shPlatform = document.createElement('div');
  shPlatform.classList.add('search-header-item');
  shPlatform.textContent = 'Platform';
  const shId = document.createElement('div');
  shId.classList.add('search-header-item');
  shId.textContent = 'ID';

  searchHeaderResult.appendChild(shName);
  searchHeaderResult.appendChild(shSymbol);
  searchHeaderResult.appendChild(shPlatform);
  searchHeaderResult.appendChild(shId);

  // Trending
  const shRank = document.createElement('div');
  shRank.classList.add('search-header-item');
  shRank.textContent = 'Rank';
  const shCurrency = document.createElement('div');
  shCurrency.classList.add('search-header-item');
  shCurrency.textContent = 'Currency';
  const shSymbol2 = document.createElement('div');
  shSymbol2.classList.add('search-header-item');
  shSymbol2.textContent = 'Symbol';
  const shId2 = document.createElement('div');
  shId2.classList.add('search-header-item');
  shId2.textContent = 'ID';

  searchHeaderTrending.appendChild(shRank);
  searchHeaderTrending.appendChild(shCurrency);
  searchHeaderTrending.appendChild(shSymbol2);
  searchHeaderTrending.appendChild(shId2);

  searchContainer.appendChild(searchTitle);
  searchContainer.appendChild(searchHeaderResult);
  searchContainer.appendChild(searchHeaderTrending);

  search.appendChild(input);
  search.appendChild(logo);
  search.appendChild(searchContainer);

  // Result section
  const result = document.createElement('div');
  result.setAttribute('id', 'result');

  const resultTable = document.createElement('div');
  resultTable.classList.add('assets-table');
  result.appendChild(resultTable);

  // Header
  const resultHeader = createHeader();

  // Content
  const resultContent = document.createElement('div');
  resultContent.classList.add('table-content');

  resultTable.appendChild(resultHeader);
  resultTable.appendChild(resultContent);

  // Leaderboard section
  const leaderboard = document.createElement('div');
  leaderboard.setAttribute('id', 'leaderboard');

  const leaderboardTable = document.createElement('div');
  leaderboardTable.classList.add('assets-table');
  leaderboard.appendChild(leaderboardTable);

  // Title
  const leaderboardTitle = document.createElement('div');
  leaderboardTitle.classList.add('table-title');

  const leaderboardTitleHead = document.createElement('div');
  leaderboardTitleHead.classList.add('head');
  leaderboardTitleHead.textContent = 'Leaderboard';
  const leaderboardTitleUpdate = document.createElement('div');
  leaderboardTitleUpdate.classList.add('update-time');
  const leaderboardTitleCount = document.createElement('select');
  leaderboardTitleCount.setAttribute('name', 'leaderboard-count');
  leaderboardTitleCount.setAttribute('id', 'leaderboard-count');
  const leaderboardTitleCountA = document.createElement('option');
  leaderboardTitleCountA.setAttribute('value', '10');
  leaderboardTitleCountA.textContent = '10';
  const leaderboardTitleCountB = document.createElement('option');
  leaderboardTitleCountB.setAttribute('value', '20');
  leaderboardTitleCountB.textContent = '20';
  const leaderboardTitleCountC = document.createElement('option');
  leaderboardTitleCountC.setAttribute('value', '50');
  leaderboardTitleCountC.textContent = '50';
  const leaderboardTitleCountD = document.createElement('option');
  leaderboardTitleCountD.setAttribute('value', '100');
  leaderboardTitleCountD.textContent = '100';

  leaderboardTitleCount.appendChild(leaderboardTitleCountA);
  leaderboardTitleCount.appendChild(leaderboardTitleCountB);
  leaderboardTitleCount.appendChild(leaderboardTitleCountC);
  leaderboardTitleCount.appendChild(leaderboardTitleCountD);

  leaderboardTitle.appendChild(leaderboardTitleHead);
  leaderboardTitle.appendChild(leaderboardTitleUpdate);
  leaderboardTitle.appendChild(leaderboardTitleCount);

  // Header
  const leaderboardHeader = createHeader();

  // Content
  const leaderboardContent = document.createElement('div');
  leaderboardContent.classList.add('table-content');

  leaderboardTable.appendChild(leaderboardTitle);
  leaderboardTable.appendChild(leaderboardHeader);
  leaderboardTable.appendChild(leaderboardContent);

  content.appendChild(search);
  content.appendChild(result);
  content.appendChild(leaderboard);

  container.appendChild(content);

  loadCryptoFunctions();
}

function createHeader() {
  const header = document.createElement('div');
  header.classList.add('table-header');

  const rank = document.createElement('div');
  rank.classList.add('table-header-item');
  rank.textContent = 'Rank';
  const currency = document.createElement('div');
  currency.classList.add('table-header-item');
  currency.textContent = 'Currency';
  const price = document.createElement('div');
  price.classList.add('table-header-item');
  price.textContent = 'Price';
  const variation = document.createElement('div');
  variation.classList.add('table-header-item');
  variation.textContent = 'Variation (24h)';
  const limits = document.createElement('div');
  limits.classList.add('table-header-item');
  limits.textContent = 'High / Low (24h)';

  header.appendChild(rank);
  header.appendChild(currency);
  header.appendChild(price);
  header.appendChild(variation);
  header.appendChild(limits);

  return header;
}

function loadCryptoFunctions() {
  const leaderboardLimit = document.querySelector('#leaderboard select');
  leaderboardLimit.addEventListener('input', function () {
    loadLeaderboard(this.value);
  });
  loadLeaderboard(10);

  const currencySearchInput = document.querySelector('input#crc-search');
  currencySearchInput.addEventListener('keyup', getCurrencyInput);
  currencySearchInput.addEventListener('focus', showTrendingCurrency);

  loadSearchFunctions();
}

export { loadCrypto };
