import './styles/style.css';
import { getPageToDisplay } from './components/pages/pages';

// Etherscan
// 5RTBT9H4WF8D61R19UFE78Z9SMBJ6S1J9V

// Get Ether Last Price

// https://api.etherscan.io/api
//    ?module=stats
//    &action=ethprice
//    &apikey=YourApiKeyToken

// Get estimation of confirmation time (with gas paid)

// https://api.etherscan.io/api
//    ?module=gastracker
//    &action=gasestimate
//    &gasprice=2000000000
//    &apikey=YourApiKeyToken

// Get Eth balance for a Single Adress
// Par exemple avec des personnes connues

// https://api.etherscan.io/api
//    ?module=account
//    &action=balance
//    &address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae
//    &tag=latest
//    &apikey=YourApiKeyToken

// Coinguecko

// Get current price vs USD
// `https://api.coingecko.com/api/v3/coin/markets?ids=${currency}&vs_currencies=usd`

(function displayData() {
  getPageToDisplay();
})();

// Rajouter d'autres données
// Changement de page / Extension leaderboard
// Update automatique des valeurs (juste le prix et ce qui change, par ex une autre function qui change le textcontent de tout ça seulement)
// Updated x seconds ago
// toLowerCase l'input pour pas que ça compte
