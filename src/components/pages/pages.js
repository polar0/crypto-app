import { loadCrypto } from './crypto';
import { cancelSearchFunctions } from '../search';
import { loadNft } from './nft';
import { cancelUpdatables } from '../data';

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
      } else {
        loadNft();
        cancelUpdatables();
        cancelSearchFunctions();
      }
    });
  });
  loadCrypto();
}

export { getPageToDisplay };
