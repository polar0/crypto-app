const container = document.querySelector('.content');

function loadTracker() {
  container.classList.remove('page-1');
  container.textContent = '';
  const error = document.createElement('div');
  error.classList.add('error');
  const content = document.createElement('div');
  content.classList.add('tracker');
  const tools = document.createElement('div');
  tools.classList.add('tools');

  // Search section
  const search = loadSearchContainer();

  // Eth price
  const eth = loadEthPriceContainer();

  // Gas tracker
  const gas = loadConfirmationTimeContainer();

  content.appendChild(search);
  tools.appendChild(eth);
  tools.appendChild(gas);
  content.appendChild(tools);

  container.appendChild(error);
  container.appendChild(content);
}

function loadSearchContainer() {
  const search = document.createElement('div');
  search.classList.add('search');

  // Search input
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'crc-search');
  input.setAttribute('id', 'crc-search');
  input.setAttribute('placeholder', 'Search for an adress');
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

function loadEthPriceContainer() {
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

function loadConfirmationTimeContainer() {
  const gas = document.createElement('div');
  gas.classList.add('eth-gas-container');

  // Header
  const header = document.createElement('div');
  header.classList.add('eth-gas-header');
  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-clock');
  const title = document.createElement('div');
  title.classList.add('eth-gas-title');
  title.textContent = 'Confirmation time calculator';

  header.appendChild(icon);
  header.appendChild(title);

  // Content
  const gasContent = document.createElement('div');
  gasContent.classList.add('eth-gas-content');
  const caption = document.createElement('div');
  caption.classList.add('eth-gas-caption');
  caption.textContent = 'How much are you willing to pay ?';

  // Eth input
  const ethGas = document.createElement('div');
  ethGas.classList.add('eth-gas-input-container');
  const ethRef = document.createElement('div');
  ethRef.classList.add('eth-gas-ref-eth');
  const ethCalcLabel = document.createElement('div');
  ethCalcLabel.classList.add('eth-gas-label-eth');
  ethCalcLabel.setAttribute('for', 'eth-gas-input-eth');
  ethCalcLabel.textContent = 'ETH';
  const ethIcon = document.createElement('img');
  ethIcon.classList.add('eth-gas-icon-eth');
  const ethCalcInput = document.createElement('input');
  ethCalcInput.setAttribute('type', 'number');
  ethCalcInput.setAttribute('id', 'eth-gas-input-eth');
  const ethCalcButton = document.createElement('button');
  ethCalcButton.classList.add('eth-gas-button-eth');
  ethCalcButton.textContent = 'Enter';

  ethRef.appendChild(ethCalcLabel);
  ethRef.appendChild(ethIcon);
  ethGas.appendChild(ethRef);
  ethGas.appendChild(ethCalcInput);
  ethGas.appendChild(ethCalcButton);

  // Currency input
  const currGas = document.createElement('div');
  currGas.classList.add('eth-gas-input-container');
  const currRef = document.createElement('div');
  currRef.classList.add('eth-gas-ref-currency');
  const currCalcLabel = document.createElement('div');
  currCalcLabel.classList.add('eth-gas-label-currency');
  currCalcLabel.setAttribute('for', 'eth-gas-input-currency');
  currCalcLabel.textContent = 'USD';
  const currIcon = document.createElement('i');
  currIcon.classList.add('eth-gas-icon-currency', 'fa-solid', 'fa-coins');
  const currCalcInput = document.createElement('input');
  currCalcInput.setAttribute('type', 'number');
  currCalcInput.setAttribute('id', 'eth-gas-input-currency');
  const currCalcButton = document.createElement('button');
  currCalcButton.classList.add('eth-gas-button-currency');
  currCalcButton.textContent = 'Enter';

  currRef.appendChild(currCalcLabel);
  currRef.appendChild(currIcon);
  currGas.appendChild(currRef);
  currGas.appendChild(currCalcInput);
  currGas.appendChild(currCalcButton);

  gasContent.appendChild(caption);
  gasContent.appendChild(ethGas);
  gasContent.appendChild(currGas);

  // Build le result
  // Faire la fonction qui donne le résultat après, avec comme arguments les données
  // Pour la lancer ) chaque fois que besoin

  gas.appendChild(header);
  gas.appendChild(gasContent);

  return gas;
}

function loadConfirmationTimeResult(time) {
  const container = document.querySelector('.eth-gas-container');
  container.children[2] !== undefined && container.children[2].remove();

  const result = document.createElement('div');
  result.classList.add('eth-gas-result');

  const resultCaption = document.createElement('div');
  resultCaption.classList.add('eth-gas-result-caption');
  resultCaption.textContent = 'Your transaction should be approved in';
  const resultIcon = document.createElement('i');
  resultIcon.classList.add('fa-solid', 'fa-angles-right');
  const resultContent = document.createElement('div');
  resultContent.classList.add('eth-gas-result-content');
  resultContent.textContent = time;

  result.appendChild(resultCaption);
  result.appendChild(resultIcon);
  result.appendChild(resultContent);

  container.appendChild(result);
}

export { loadTracker, loadConfirmationTimeResult };
