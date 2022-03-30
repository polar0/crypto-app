import { loadCrypto } from './crypto/crypto-layout';
import { cancelUpdatables } from './crypto/crypto-data';
import { cancelCryptoSearchFunctions } from './crypto/crypto-search';
import { loadTracker } from './tracker/tracker-layout';
import {
  loadTrackerFunctions,
  cancelTrackerFunctions,
} from './tracker/tracker-content';

function getPageToDisplay() {
  const menuBtn = document.querySelectorAll('button');
  menuBtn[0].classList.add('active');

  menuBtn.forEach((button) => {
    button.addEventListener('click', function () {
      for (const button of menuBtn) {
        button.classList.remove('active');
      }
      this.classList.add('active');

      if (this.value === 'crypto') {
        loadCrypto();
        cancelTrackerFunctions();
      } else {
        loadTracker();
        loadTrackerFunctions();
        cancelUpdatables();
        cancelCryptoSearchFunctions();
      }
    });
  });
  loadTracker();
  loadTrackerFunctions();
}

export { getPageToDisplay };
