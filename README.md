# Crypto Tracking App

I've made this app during my JavaScript Full-Stack apprenticeship with <a href="https://www.theodinproject.com/lessons/node-path-javascript-weather-app">The Odin Project</a>.

Once again, I took different inspiration, yet for the same purpose of learning to manipulate APIs. Therefore, this Weather App turned into a cryptocurrencies and Ethereum address tracking app. I've used <a href="https://www.coingecko.com/en/api/documentation">Coingecko</a> and <a href="https://docs.etherscan.io/">Etherscan</a> APIs for the queries.

## Features :

#### Cryptocurrencies

- Track Top 100 cryptocurrencies sorted by popularity
- Get the name, symbol, icon, USD value, 24h variation, highest and lowest value in the latest 24h
- Updated every 10 seconds

- Search for any crypto referenced in Coingecko (+ 13 000) and access the same details as previously
- Search input completion sorted by best matches and most popular cryptocurrencies
- See Top 7 Trending cryptocurrencies

#### Ethereum Trackers

- Follow the updated price of Ethereum (10 seconds) in any currency (you choose) supported by Coingecko
- Get the 24h, 7d, 14d and 30d variation
- Convert any Ether value to any of those currencies, in this way or the opposite

- Search for an account Ethereum address and access the latest data (fetched from Etherscan)
- Get the account balance in Ethereum, and converted to the currency you chose
- Get the latest transactions operated with this account (block hash, number, sender, receiver and value processed)
- Click on any address to access its balance and transactions
- Click on the transaction amount to convert it to your currency

## What I've learned (a lot!) :

- Using an API to fetch external data
- Using Promises, async and await
- Staying away from Callback Hell
- Handling errors, and chaining functions execution
- Accessing JSON data and creating objects with it
- Doing more with Webpack, Babel
- Organizing the code in modules, creating utilities to be reused anywhere
  - (fetching data and handling errors, sorting large amounts of data, notification display and styling, price formatter, currencies converter...)

<a href="https://polar0.github.io/crypto-app/">Live demo</a>
