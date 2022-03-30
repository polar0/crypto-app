import { formatPrice } from '../utils';

function createItem(data) {
  const item = document.createElement('div');
  item.classList.add('table-item');

  const rank = document.createElement('div');
  rank.classList.add('table-item-rank');
  rank.textContent = data.rank;

  const currency = document.createElement('div');
  currency.classList.add('table-item-currency');
  const icon = document.createElement('div');
  icon.classList.add('table-item-currency-icon');
  const iconImg = document.createElement('img');
  iconImg.src = data.icon;
  const symbol = document.createElement('div');
  symbol.classList.add('table-item-currency-shortcut');
  symbol.textContent = data.symbol;
  const name = document.createElement('div');
  name.classList.add('table-item-currency-name');
  name.textContent = data.name;

  const price = document.createElement('div');
  price.classList.add('table-item-price');
  const value = document.createElement('div');
  value.classList.add('table-item-price-real');
  value.textContent = `${formatPrice(data.price)} USD`;
  const ref = document.createElement('div');
  ref.classList.add('table-item-price-crypto');
  ref.textContent = `1 ${data.symbol}`;

  const variation = document.createElement('div');
  variation.classList.add('table-item-variation');

  if (data.variation24H >= 0) {
    variation.classList.add('positive');
    variation.textContent = `+${data.variation24H.toFixed(2)}`;
  } else {
    variation.classList.add('negative');
    variation.textContent = data.variation24H.toFixed(2);
  }

  const limits = document.createElement('div');
  limits.classList.add('table-item-limits');
  const high = document.createElement('div');
  high.classList.add('table-item-limits-high');
  high.textContent = Number(data.high.toFixed(4));
  const low = document.createElement('div');
  low.classList.add('table-item-limits-low');
  low.textContent = Number(data.low.toFixed(4));

  item.appendChild(rank);
  icon.appendChild(iconImg);
  currency.appendChild(icon);
  currency.appendChild(symbol);
  currency.appendChild(name);
  item.appendChild(currency);
  price.appendChild(value);
  price.appendChild(ref);
  item.appendChild(price);
  item.appendChild(variation);
  limits.appendChild(high);
  limits.appendChild(low);
  item.appendChild(limits);

  return [item, rank, iconImg, symbol, name, value, ref];
}

function updateTable(container, limit, data) {
  if (limit === 'none') {
    const newItem = createItem(data);
    if (container.length > 0)
      container.replaceChild(newItem[0], container.children[0]);
  } else {
    for (let i = 0; i < limit; i++) {
      const newItem = createItem(data[i]);
      container.replaceChild(newItem[0], container.children[i]);
    }
  }
}

export { createItem, updateTable };
