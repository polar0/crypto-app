const container = document.querySelector('.content');
const content = document.createElement('div');
content.classList.add('nft');

function loadNft() {
  container.textContent = '';
  const error = document.createElement('div');
  error.classList.add('error');

  container.appendChild(error);
  container.appendChild(content);
}

export { loadNft };
