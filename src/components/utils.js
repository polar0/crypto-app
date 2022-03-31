import { getCryptoValue } from './tracker/tracker-data';

let timer;

async function fetchData(url) {
  const value = await fetch(url, { mode: 'cors' }).catch((err) => {
    displayNotif('error', err);
  });
  if (!value.ok) {
    displayNotif(
      'error',
      'There seems to be an error connecting to the API. Please try again later.',
    );
  }
  const data = await value.json();

  return data;
}

function displayNotif(category, message) {
  clearInterval(timer);
  const div = document.querySelector('.notif');
  div.classList.add('active');
  if (category === 'error') {
    div.classList.add('error');
  } else {
    div.classList.add('info');
  }
  div.textContent = message;
  timer = setInterval(() => {
    div.classList.remove('active');
    div.classList.remove('error');
    div.classList.remove('info');
    clearInterval(timer);
  }, 2000);
}

function displayLoadingScreen(status, parent) {
  const loader = document.createElement('div');
  const wrapped = document.createElement('div');
  loader.setAttribute('id', 'loader');
  wrapped.classList.add('wrapped-loader');
  loader.appendChild(wrapped);

  if (status) {
    parent.appendChild(loader);
  } else {
    parent.removeChild(document.querySelector('#loader'));
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
  const newPrice = price.toString().split('.');
  newPrice[0] = newPrice[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return newPrice.join('.');
  /* return (
    price
      .toString()
      .split('')
      .reverse()
      .join('')
      .replace(/([0-9]{3})/g, '$1 ')
      // Replace if there is a space before a dot
      .replace(/ \./g, '.')
      .split('')
      .reverse()
      .join('')
  ); */
}

// Convert currency to crypto

const converter = {
  currencyToCrypto: async function (currencyUnit, currencyValue, crypto) {
    const cryptoRef = await getCryptoValue(crypto);
    const value = cryptoRef.market_data.current_price[currencyUnit];
    const converted = currencyValue / value;
    return converted;
  },
  cryptoToCurrency: async function (currencyUnit, cryptoValue, crypto) {
    const cryptoRef = await getCryptoValue(crypto);
    const value = cryptoRef.market_data.current_price[currencyUnit];
    const converted = (cryptoValue * value).toFixed(2);
    return converted;
  },
};

/*
function roundNumber(num, precision, max) {
  num = num.toString().split('.');
  // Don't change the number if it has no decimals
  if (num.length === 1) {
    return +num;
  } else if (num[1].length <= precision) {
    return Number(num.join('.'));
  } else if (num[1].length <= max) {
    return +num.join('.');
  } else {
    return +Number(num.join('.')).toFixed(max);
  }
  // if (num.lastIndexOf('0')) {
  //
  // } else {
  // return num.toFixed(decimals);
  // }
  // return +num;
}
*/

function getStickyHeader(element) {
  const el = document.querySelectorAll(element);
  for (const x of el) {
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('is-sticked', e.intersectionRatio < 1),
      { threshold: [1] },
    );

    observer.observe(x);
  }
}

function scrollSmoothTo(element) {
  element.scrollIntoView({
    behavior: 'smooth',
  });
}

let sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let waitFor = async function waitFor(f) {
  while (!f()) await sleep(200);
  return f();
};

export {
  fetchData,
  displayNotif,
  displayLoadingScreen,
  displayUpdateTime,
  sortData,
  sortCurrencies,
  formatPrice,
  converter,
  getStickyHeader,
  scrollSmoothTo,
  waitFor,
};
