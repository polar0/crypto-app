import {
  sortCurrencies,
  formatPrice,
  displayUpdateTime,
  convertCurrencyToCrypto,
} from '../utils';
import {
  getAdressInfo,
  getEthPrice,
  getConfirmationTime,
  getSupportedCurrencies,
} from './tracker-data';
import { loadConfirmationTimeResult } from './tracker-layout';

let unit = 'usd';
let timer;

async function initEthPrice() {
  const price = await getEthPrice();

  document.querySelector('.eth-price-header img').src = price.image.thumb;
  document.querySelector('.eth-gas-icon-eth').src = price.image.thumb;

  // Show conversion currencies
  const supportedCurrencies = await getSupportedCurrencies();
  sortCurrencies(supportedCurrencies);

  for (const currency of supportedCurrencies) {
    const opt = document.createElement('option');
    opt.setAttribute('value', currency);
    opt.textContent = currency;
    document.querySelector('.eth-price-unit').appendChild(opt);
  }

  displayEthPrice(price);
  updateEthPrice();
}

function displayEthPrice(price) {
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

  // Display the last update time
  displayUpdateTime(document.querySelector('.tracker .update-time'));
}

function updateEthPrice() {
  clearInterval(timer);

  timer = setInterval(async function () {
    const price = await getEthPrice();
    displayEthPrice(price);
  }, 10000);
}

async function updateUnit() {
  unit = this.value;
  const price = await getEthPrice();
  displayEthPrice(price);
  // Update currency in confirmation time calculator
  document.querySelector('.eth-gas-label-currency').textContent =
    unit.toUpperCase();
}

async function displayConfirmationTime(value, selector) {
  if (selector !== 'eth') {
    value = convertCurrencyToCrypto(unit, value, 'ethereum');
  }
  const timeToConfirm = await getConfirmationTime(value * Math.pow(10, 18));
  console.log(timeToConfirm);
  // * if it returns errorEmpty display error 'you need to enter a value'
  // * si Error display error there is a problem with the value you entered
  // récupérer le temps pour ce qui a été input
  // Convertir l'entrée eth ou currency en GWEI (Peut etre que ça varie en function prix de l'eth donc chercher)
  // éventuellement pour la currency qui a été entrée
  // Si c'est possible dans ce cas updater le 'USD' avec cette currency
  // loadConfirmationTimeResult() avec ce prix
}

function getGasInput() {
  if (this === document.querySelector('.eth-gas-button-eth')) {
    let value = document.querySelector('#eth-gas-input-eth').value;
    displayConfirmationTime(value, 'eth');
  } else {
    let value = document.querySelector('#eth-gas-input-currency').value;
    displayConfirmationTime(value, unit);
  }
}

async function loadTrackerFunctions() {
  document
    .querySelector('.eth-price-unit')
    .addEventListener('input', updateUnit);
  initEthPrice();

  document
    .querySelector('.eth-gas-button-eth')
    .addEventListener('click', getGasInput);
  document
    .querySelector('.eth-gas-button-currency')
    .addEventListener('click', getGasInput);
}

function cancelTrackerFunctions() {
  clearInterval(timer);
}

export { loadTrackerFunctions, cancelTrackerFunctions };
