import { displayNotif, formatPrice } from '../utils';

const container = document.querySelector('.content');

function displayTracker() {
  container.classList.remove('page-1');
  container.textContent = '';
  const notif = document.createElement('div');
  notif.classList.add('notif');
  const content = document.createElement('div');
  content.classList.add('tracker');
  const tools = document.createElement('div');
  tools.classList.add('tools');

  // Search section
  const search = displaySearchContainer();

  // Eth price
  const eth = displayEthPriceContainer();

  // Gas tracker
  const calculator = displayCalculatorContainer();

  content.appendChild(search);
  tools.appendChild(eth);
  tools.appendChild(calculator);
  content.appendChild(tools);

  container.appendChild(notif);
  container.appendChild(content);
}

function displaySearchContainer() {
  const search = document.createElement('div');
  search.classList.add('search');

  // Search input
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'crc-search');
  input.setAttribute('id', 'crc-search');
  input.setAttribute('placeholder', 'Search for an address');
  const logo = document.createElement('i');
  logo.classList.add('logo', 'fa-solid', 'fa-search');
  const searchBtn = document.createElement('button');
  searchBtn.classList.add('search-button');
  searchBtn.textContent = 'Search';

  search.appendChild(input);
  search.appendChild(logo);
  search.appendChild(searchBtn);

  return search;
}

function displayEthPriceContainer() {
  const eth = document.createElement('div');
  eth.classList.add('eth-price-container');
  const ethHeader = document.createElement('div');
  ethHeader.classList.add('eth-price-header');
  const ethLogo = document.createElement('img');
  const ethTitle = document.createElement('div');
  ethTitle.classList.add('eth-price-title');
  ethTitle.textContent = 'Ethereum (ETH)';
  const ethPriceUnit = document.createElement('select');
  ethPriceUnit.classList.add('eth-price-unit');

  const ethContent = document.createElement('div');
  ethContent.classList.add('eth-price-content');
  const ethPrice = document.createElement('div');
  ethPrice.classList.add('eth-price-value');

  const ethVar = document.createElement('div');
  ethVar.classList.add('eth-price-var-container');
  const ethVar24h = document.createElement('div');
  ethVar24h.classList.add('eth-price-var');
  const ethVar7d = document.createElement('div');
  ethVar7d.classList.add('eth-price-var');
  const ethVar14d = document.createElement('div');
  ethVar14d.classList.add('eth-price-var');
  const ethVar30d = document.createElement('div');
  ethVar30d.classList.add('eth-price-var');
  ethVar.appendChild(ethVar24h);
  ethVar.appendChild(ethVar14d);
  ethVar.appendChild(ethVar7d);
  ethVar.appendChild(ethVar30d);

  const ethRef = document.createElement('div');
  ethRef.classList.add('eth-price-ref');
  ethRef.textContent = '1 ETH';
  const ethUpdate = document.createElement('div');
  ethUpdate.classList.add('update-time');

  ethHeader.appendChild(ethLogo);
  ethHeader.appendChild(ethTitle);
  ethHeader.appendChild(ethPriceUnit);
  ethContent.appendChild(ethPrice);
  ethContent.appendChild(ethVar);
  ethContent.appendChild(ethRef);
  ethContent.appendChild(ethUpdate);
  eth.appendChild(ethHeader);
  eth.appendChild(ethContent);

  return eth;
}

function displayCalculatorContainer() {
  const calculator = document.createElement('div');
  calculator.classList.add('eth-calculator-container');

  // Header
  const header = document.createElement('div');
  header.classList.add('eth-calculator-header');
  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-calculator');
  const title = document.createElement('div');
  title.classList.add('eth-calculator-title');
  title.textContent = 'ETH Conversion';

  header.appendChild(icon);
  header.appendChild(title);

  // Content
  const calculatorContent = document.createElement('div');
  calculatorContent.classList.add('eth-calculator-content');
  /* const caption = document.createElement('div');
  caption.classList.add('eth-calculator-caption');
  caption.textContent = 'Enter the value below'; */

  // Eth input
  const ethCalc = document.createElement('div');
  ethCalc.classList.add('eth-calculator-input-container');
  const ethRef = document.createElement('div');
  ethRef.classList.add('eth-calculator-ref-eth');
  const ethCalcLabel = document.createElement('div');
  ethCalcLabel.classList.add('eth-calculator-label-eth');
  ethCalcLabel.setAttribute('for', 'eth-calculator-input-eth');
  ethCalcLabel.textContent = 'ETH';
  const ethIcon = document.createElement('img');
  ethIcon.classList.add('eth-calculator-icon-eth');
  const ethCalcInput = document.createElement('input');
  ethCalcInput.setAttribute('type', 'number');
  ethCalcInput.setAttribute('id', 'eth-calculator-input-eth');
  const ethCalcButton = document.createElement('button');
  ethCalcButton.classList.add('eth-calculator-button-eth');
  ethCalcButton.textContent = 'Enter';

  ethRef.appendChild(ethCalcLabel);
  ethRef.appendChild(ethIcon);
  ethCalc.appendChild(ethRef);
  ethCalc.appendChild(ethCalcInput);
  ethCalc.appendChild(ethCalcButton);

  // Currency input
  const currGas = document.createElement('div');
  currGas.classList.add('eth-calculator-input-container');
  const currRef = document.createElement('div');
  currRef.classList.add('eth-calculator-ref-currency');
  const currCalcLabel = document.createElement('div');
  currCalcLabel.classList.add('eth-calculator-label-currency');
  currCalcLabel.setAttribute('for', 'eth-calculator-input-currency');
  currCalcLabel.textContent = 'USD';
  const currIcon = document.createElement('i');
  currIcon.classList.add(
    'eth-calculator-icon-currency',
    'fa-solid',
    'fa-coins',
  );
  const currCalcInput = document.createElement('input');
  currCalcInput.setAttribute('type', 'number');
  currCalcInput.setAttribute('id', 'eth-calculator-input-currency');
  const currCalcButton = document.createElement('button');
  currCalcButton.classList.add('eth-calculator-button-currency');
  currCalcButton.textContent = 'Enter';

  currRef.appendChild(currCalcLabel);
  currRef.appendChild(currIcon);
  currGas.appendChild(currRef);
  currGas.appendChild(currCalcInput);
  currGas.appendChild(currCalcButton);

  // calculatorContent.appendChild(caption);
  calculatorContent.appendChild(ethCalc);
  calculatorContent.appendChild(currGas);

  calculator.appendChild(header);
  calculator.appendChild(calculatorContent);

  return calculator;
}

function displayCalcResult(ethValue, currValue, ethUnit, currUnit, order) {
  const container = document.querySelector('.eth-calculator-container');
  container.children[2] !== undefined && container.children[2].remove();

  const result = document.createElement('div');
  result.classList.add('eth-calculator-result');

  const resultCaption = document.createElement('div');
  resultCaption.classList.add('eth-calculator-result-caption');
  resultCaption.textContent = 'Right now, ';
  const resultEth = document.createElement('div');
  resultEth.classList.add('eth-calculator-result-content');
  ethValue = +ethValue;
  resultEth.textContent = `${+ethValue.toFixed(4)} ${ethUnit.toUpperCase()}`;
  const resultIcon = document.createElement('i');
  resultIcon.classList.add('fa-solid', 'fa-angles-right');
  const resultCurr = document.createElement('div');
  resultCurr.classList.add('eth-calculator-result-content');
  currValue = +currValue;
  resultCurr.textContent = `${formatPrice(
    +currValue,
  )} ${currUnit.toUpperCase()}`;

  result.appendChild(resultCaption);
  if (order === 'ethToCurr') {
    result.appendChild(resultEth);
    result.appendChild(resultIcon);
    result.appendChild(resultCurr);
  } else {
    result.appendChild(resultCurr);
    result.appendChild(resultIcon);
    result.appendChild(resultEth);
  }

  container.appendChild(result);
}

function displayAddressInfo() {
  const container = document.querySelector('.tracker');
  // Remove the info container if it's already here
  if (container.children[2] !== undefined) container.children[2].remove();

  const info = document.createElement('div');
  info.classList.add('account-info');

  // Adress
  const accAddress = document.createElement('div');
  accAddress.classList.add('account-info-address');
  const addressLabel = document.createElement('div');
  addressLabel.classList.add('account-info-address-label');
  addressLabel.textContent = 'Address';
  const adressId = document.createElement('div');
  adressId.classList.add('account-info-address-id');
  const adressCopy = document.createElement('button');
  adressCopy.classList.add(
    'account-info-address-copy',
    'fa-solid',
    'fa-clipboard',
  );

  accAddress.appendChild(addressLabel);
  accAddress.appendChild(adressId);
  accAddress.appendChild(adressCopy);

  // Balance
  const accBalance = document.createElement('div');
  accBalance.classList.add('account-info-balance');
  const balanceMain = document.createElement('div');
  balanceMain.classList.add('account-info-balance-main');
  const balanceEth = document.createElement('div');
  balanceEth.classList.add('account-info-balance-eth');
  const balanceCurrency = document.createElement('div');
  balanceCurrency.classList.add('account-info-balance-currency');
  const balanceEthMin = document.createElement('div');
  balanceEthMin.classList.add('account-info-balance-eth-min');

  balanceMain.appendChild(balanceEth);
  balanceMain.appendChild(balanceCurrency);
  accBalance.appendChild(balanceMain);
  accBalance.appendChild(balanceEthMin);

  // Transactions
  const accTransactions = document.createElement('div');
  accTransactions.classList.add('account-info-transactions');
  const transactionsTitle = document.createElement('div');
  transactionsTitle.classList.add('account-info-transactions-title');
  transactionsTitle.textContent = 'Transactions';

  /* const transactionsHeader = document.createElement('div');
  transactionsHeader.classList.add('account-info-transactions-header');
  const transactionHeaderHash = document.createElement('div');
  transactionHeaderHash.classList.add('account-info-transactions-header-item');
  transactionHeaderHash.textContent = 'Block Hash';
  const transactionHeaderNum = document.createElement('div');
  transactionHeaderNum.classList.add('account-info-transactions-header-item');
  transactionHeaderNum.textContent = 'Block Number';
  const transactionHeaderSender = document.createElement('div');
  transactionHeaderSender.classList.add(
    'account-info-transactions-header-item',
  );
  transactionHeaderSender.textContent = 'Sender';
  const transactionHeaderReceiver = document.createElement('div');
  transactionHeaderReceiver.classList.add(
    'account-info-transactions-header-item',
  );
  transactionHeaderReceiver.textContent = 'Receiver';

  transactionsHeader.appendChild(transactionHeaderHash);
  transactionsHeader.appendChild(transactionHeaderNum);
  transactionsHeader.appendChild(transactionHeaderSender);
  transactionsHeader.appendChild(transactionHeaderReceiver); */

  const transactionsContent = document.createElement('div');
  transactionsContent.classList.add('account-info-transactions-content');

  accTransactions.appendChild(transactionsTitle);
  accTransactions.appendChild(transactionsContent);
  // transactionsContent.appendChild(transactionsHeader);

  info.appendChild(accAddress);
  info.appendChild(accBalance);
  info.appendChild(accTransactions);

  container.appendChild(info);

  return {
    adressId,
    adressCopy,
    balanceEth,
    balanceCurrency,
    balanceEthMin,
    transactionsContent,
  };
}

function createTransactionsColumn(
  item,
  accountTransactions,
  headerName,
  accountAddress,
) {
  // console.log(transaction);
  const column = document.createElement('div');
  column.classList.add('account-info-transactions-column');
  const header = document.createElement('div');
  header.classList.add('account-info-transactions-column-header', item);
  header.textContent = headerName;
  column.appendChild(header);

  for (const transaction of accountTransactions) {
    const rowItem = document.createElement('a');
    rowItem.classList.add('account-info-transactions-row-item');
    // Exception for the value (need to be converted to ETH)
    if (item === 'value') {
      const num = formatPrice(Number(transaction[item]) * Math.pow(10, -18));
      rowItem.textContent = +num;
      rowItem.classList.add('value-link');
      // Get a link if the adress is not the owner's
    } else {
      rowItem.textContent = transaction[item];
      if (
        (item === 'from' || item === 'to') &&
        transaction[item] !== accountAddress
      ) {
        rowItem.classList.add('address-link');
      }
    }
    column.appendChild(rowItem);
  }

  return column;
}

export {
  displayTracker,
  displayCalcResult,
  displayAddressInfo,
  createTransactionsColumn,
};
