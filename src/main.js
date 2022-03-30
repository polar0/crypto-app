import './styles/style.css';
import { getPageToDisplay } from './components/pages';

// Etherscan
// 5RTBT9H4WF8D61R19UFE78Z9SMBJ6S1J9V

// Get Eth balance for a Single Adress
// Par exemple avec des personnes connues

// https://api.etherscan.io/api
//    ?module=account
//    &action=balance
//    &address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae
//    &tag=latest
//    &apikey=YourApiKeyToken

(function displayData() {
  getPageToDisplay();
})();
