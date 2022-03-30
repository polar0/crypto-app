async function fetchData(url) {
  const value = await fetch(url, { mode: 'cors' });
  if (!value.ok) return 'Error';
  const data = await value.json();

  return data;
}

function displayError(err) {
  const div = document.querySelector('.error');
  div.classList.add('active');
  div.textContent = err;
  setTimeout(() => {
    div.classList.remove('active');
  }, 2000);
}

function displayLoadingScreen(status, parent) {
  const loader = document.createElement('div');
  const wrapped = document.createElement('div');
  loader.setAttribute('id', 'loader');
  wrapped.classList.add('wrapped-loader');
  loader.appendChild(wrapped);

  if (status) {
    parent.textContent = '';
    parent.appendChild(loader);
  } else {
    parent.textContent = '';
  }
}

function displayUpdateTime(container) {
  const time = new Date();
  container.textContent = `Updated the ${time.getFullYear()}-${
    time.getMonth() + 1
  }-${time.getDate()} at ${time.getHours()}:${('0' + time.getMinutes()).slice(
    -2,
  )}`;
}

function sortData(dataArray, keyword, compare) {
  let searchResults = dataArray
    .filter((input) => {
      // Filter results by doing case insensitive match on name
      return (
        input.name.toLowerCase().includes(keyword.toLowerCase()) ||
        input.symbol.toLowerCase().includes(keyword.toLowerCase())
      );
    })
    .sort((a, b) => {
      // Sort results by matching name with keyword position in name
      if (
        a.name.toLowerCase().indexOf(keyword.toLowerCase()) >
          b.name.toLowerCase().indexOf(keyword.toLowerCase()) ||
        a.symbol.toLowerCase().indexOf(keyword.toLowerCase()) >
          b.symbol.toLowerCase().indexOf(keyword.toLowerCase())
      ) {
        return 1;
      } else if (
        a.name.toLowerCase().indexOf(keyword.toLowerCase()) <
          b.name.toLowerCase().indexOf(keyword.toLowerCase()) ||
        a.symbol.toLowerCase().indexOf(keyword.toLowerCase()) <
          b.symbol.toLowerCase().indexOf(keyword.toLowerCase())
      ) {
        return -1;
      } else {
        if (a.name > b.name || a.symbol > b.symbol) return 1;
        else return -1;
      }
    });
  if (compare !== undefined) {
    searchResults = searchResults.sort((a, b) => {
      for (const ref of compare) {
        if (
          ref.indexOf(a.name.toLowerCase()) > ref.indexOf(b.name.toLowerCase())
        ) {
          return -1;
        } else if (
          ref.indexOf(a.name.toLowerCase()) < ref.indexOf(b.name.toLowerCase())
        ) {
          return 1;
        }
      }
    });
  }

  return searchResults;
}

function sortCurrencies(array) {
  const exceptions = {
    usd: 1,
    eur: 2,
  };

  const sorted = array.sort((a, b) => {
    if (exceptions[a] && exceptions[b]) {
      //if both items are exceptions
      return exceptions[a] - exceptions[b];
    } else if (exceptions[a]) {
      //only `a` is in exceptions, sort it to front
      return -1;
    } else if (exceptions[b]) {
      //only `b` is in exceptions, sort it to back
      return 1;
    } else {
      //no exceptions to account for, return alphabetic sort
      return a.localeCompare(b);
    }
  });

  return sorted;
}

function formatPrice(price) {
  return price
    .toString()
    .split('')
    .reverse()
    .join('')
    .replace(/([0-9]{3})/g, '$1 ')
    .replace(/ \./g, '.')
    .split('')
    .reverse()
    .join('');
}

// Convert currency to crypto

async function convertCurrencyToCrypto(currencyUnit, currencyValue, crypto) {
  const cryptoValue = await getCurrencyValue(crypto);
  const value = cryptoValue.market_data.current_price[currencyUnit];
  const converted = currencyValue / value;
  return converted;
}

async function getCurrencyValue(currency) {
  const value = await fetch(
    `https://api.coingecko.com/api/v3/coins/${currency}?tickers=true&market_data=true`,
    { mode: 'cors' },
  );

  if (!value.ok) return 'Error';
  const data = await value.json();
  return data;
}

export {
  fetchData,
  displayError,
  displayLoadingScreen,
  displayUpdateTime,
  sortData,
  sortCurrencies,
  formatPrice,
  convertCurrencyToCrypto,
};
