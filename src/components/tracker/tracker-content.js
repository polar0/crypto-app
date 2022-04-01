import {
  sortCurrencies,
  formatPrice,
  displayUpdateTime,
  converter,
  displayNotif,
  displayLoadingScreen,
  getStickyHeader,
  scrollSmoothTo,
} from '../utils';
import {
  getAddressInfo,
  getCryptoValue,
  getSupportedCurrencies,
} from './tracker-data';
import {
  displayCalcResult,
  displayAddressInfo,
  createTransactionsColumn,
} from './tracker-layout';

let unit = 'usd';
let timer;

async function initEthPrice() {
  const price = await getCryptoValue('ethereum');

  document.querySelector('.eth-price-header img').src = price.image.thumb;
  document.querySelector('.eth-calculator-icon-eth').src = price.image.thumb;

  // Show conversion currencies
  const supportedCurrencies = await getSupportedCurrencies();
  sortCurrencies(supportedCurrencies);

  for (const currency of supportedCurrencies) {
    const opt = document.createElement('option');
    opt.setAttribute('value', currency);
    opt.textContent = currency;
    document.querySelector('.eth-price-unit').appendChild(opt);
  }

  loadEthPrice(price);
  updateEthPrice();
}

function loadEthPrice(price) {
  document.querySelector('.eth-price-value').textContent = `${formatPrice(
    price.market_data.current_price[unit],
  )} ${unit.toUpperCase()}`;

  // Display the price variations
  const variation = document.querySelector('.eth-price-var-container');
  variation.children[0].textContent =
    price.market_data.price_change_percentage_24h.toFixed(2);
  variation.children[1].textContent =
    price.market_data.price_change_percentage_7d.toFixed(2);
  variation.children[2].textContent =
    price.market_data.price_change_percentage_14d.toFixed(2);
  variation.children[3].textContent =
    price.market_data.price_change_percentage_30d.toFixed(2);

  for (const item of variation.children) {
    Number(item.textContent) >= 0
      ? item.classList.add('positive')
      : item.classList.add('negative');
  }
}

function updateEthPrice() {
  clearInterval(timer);

  timer = setInterval(async function () {
    const price = await getCryptoValue('ethereum')
      .then(
        // Display the last update time
        displayUpdateTime(document.querySelector('.tracker .update-time')),
      )
      .catch((err) => {
        displayNotif('error', err);
      });
    loadEthPrice(price);
  }, 10000);
}

async function updateUnit() {
  unit = this.value;
  const price = await getCryptoValue('ethereum');
  loadEthPrice(price);
  // Update currency in confirmation time calculator
  document.querySelector('.eth-calculator-label-currency').textContent =
    unit.toUpperCase();
  displayCalcConversion(
    document.querySelector('#eth-calculator-input-eth').value,
    'update',
  );
}

function getCalcInput(e) {
  // Ignore other keys than numbers, backspace, and '.' or ','
  if (
    (e.keyCode < 47 && e.keyCode !== 8) ||
    (e.keyCode > 58 && e.keyCode !== 188 && e.keyCode !== 190)
  ) {
    return;
  }
  if (
    this === document.querySelector('.eth-calculator-button-eth') ||
    this === document.querySelector('#eth-calculator-input-eth')
  ) {
    const ethValue = document.querySelector('#eth-calculator-input-eth').value;

    displayCalcConversion(ethValue, 'eth');
  } else {
    const currValue = document.querySelector(
      '#eth-calculator-input-currency',
    ).value;

    displayCalcConversion(currValue);
  }
}

async function displayCalcConversion(value, selector) {
  let order;
  if (selector === 'eth' || selector === 'update') {
    if (
      document.querySelector('#eth-calculator-input-currency').value === '' &&
      document.querySelector('#eth-calculator-input-eth').value === ''
    ) {
      return;
    }
    value = await converter.cryptoToCurrency(unit, value, 'ethereum');
    document.querySelector('#eth-calculator-input-currency').value = value;
    order = 'ethToCurr';
  } else {
    value = await converter.currencyToCrypto(unit, value, 'ethereum');
    document.querySelector('#eth-calculator-input-eth').value = value;
    order = 'currToEth';
  }

  displayCalcResult(
    document.querySelector('#eth-calculator-input-eth').value,
    document.querySelector('#eth-calculator-input-currency').value,
    'eth',
    unit,
    order,
  );
}

async function loadAddressInfo(input) {
  /* const data = await getAddressInfo(
    '0x78b7B25292bDf02611eb8128f1D91d1257B29186',
    ); */

  // Build the container
  const elements = displayAddressInfo();

  // Show the loading screen
  displayLoadingScreen(true, document.querySelector('.account-info'));

  // Get the informations
  const data = await getAddressInfo(input);

  // TODO Remove the loading screen
  displayLoadingScreen(false, document.querySelector('.account-info'));

  // Handle errors
  if (data['dataBalance'].status === '0') {
    displayNotif('error', data['dataBalance'].result);
  } else if (data['dataTransactions'].status === '0') {
    displayNotif('error', data['dataTransactions'].result);
  } else {
    const balance = +data['dataBalance'].result * Math.pow(10, -18);
    const transactions = data['dataTransactions'].result;

    const infos = {
      address: input,
      balanceEth: balance,
      balanceCurrency: await converter.cryptoToCurrency(
        unit,
        balance,
        'ethereum',
      ),
      currencyUnit: unit.toUpperCase(),
      transactions: transactions,
    };

    // Add the infos to the container
    updateAdressInfo(infos, elements);

    // Let the user copy the adress to clipboard
    elements['adressCopy'].addEventListener('click', function () {
      const btn = this;
      navigator.clipboard.writeText(input).then(
        function () {
          btn.classList.remove('fa-clipboard');
          btn.classList.add('fa-clipboard-check');
          displayNotif('info', 'Successfully copied!');
          setTimeout(() => {
            btn.classList.remove('fa-clipboard-check');
            btn.classList.add('fa-clipboard');
          }, 2000);
        },
        // If failed
        function () {
          displayNotif(
            'error',
            'We could not write the adress to your clipboard.',
          );
        },
      );
    });
    document.querySelectorAll('.address-link').forEach((link) => {
      link.addEventListener('click', function () {
        loadAddressInfo(this.textContent);
      });
    });
    document.querySelectorAll('.value-link').forEach((link) => {
      link.addEventListener('click', function () {
        document.querySelector('#eth-calculator-input-eth').value =
          this.textContent;
        document.querySelector('.eth-calculator-button-eth').click();
        scrollSmoothTo(document.querySelector('.eth-calculator-header'));
      });
    });
  }
}

function updateAdressInfo(account, elements) {
  // Adress
  elements['adressId'].textContent = account['address'];

  // Balance
  elements['balanceEth'].textContent = `${formatPrice(
    Number(account['balanceEth']).toFixed(4),
  )} ETH`;
  elements['balanceCurrency'].textContent = `(${formatPrice(
    account['balanceCurrency'],
  )} ${account['currencyUnit']})`;
  elements['balanceEthMin'].textContent = `${formatPrice(
    account['balanceEth'],
  )} ETH`;

  const transactionsColumns = [
    'blockHash',
    'blockNumber',
    'from',
    'to',
    'value',
    'Hash',
    'Block',
    'Sender',
    'Receiver',
    'Value (ETH)',
  ];

  for (let i = 0; i < transactionsColumns.length / 2; i++) {
    const column = createTransactionsColumn(
      transactionsColumns[i],
      account['transactions'],
      transactionsColumns[i + transactionsColumns.length / 2],
      account['address'],
    );
    elements['transactionsContent'].appendChild(column);
  }

  getStickyHeader('.account-info-transactions-column-header');
}

function getSearchInput(e) {
  if (e.keyCode === 13) {
    loadAddressInfo(this.value);
    this.blur();
  } else if (e.keyCode === 27) {
    this.blur();
    return;
  }
}

function loadTrackerFunctions() {
  document
    .querySelector('.eth-price-unit')
    .addEventListener('input', updateUnit);
  initEthPrice();

  // Calculator
  document
    .querySelector('.eth-calculator-button-eth')
    .addEventListener('click', getCalcInput);
  document
    .querySelector('.eth-calculator-button-currency')
    .addEventListener('click', getCalcInput);
  document
    .querySelector('#eth-calculator-input-eth')
    .addEventListener('keyup', getCalcInput);
  document
    .querySelector('#eth-calculator-input-currency')
    .addEventListener('keyup', getCalcInput);

  // Search address info
  const searchInput = document.querySelector('#crc-search');
  searchInput.addEventListener('keyup', getSearchInput);
  document
    .querySelector('.search-button')
    .addEventListener('click', function () {
      loadAddressInfo(searchInput.value);
    });
}

function cancelTrackerFunctions() {
  clearInterval(timer);
}

export { loadTrackerFunctions, cancelTrackerFunctions };
