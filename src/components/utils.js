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

function sortData(dataArray, keyword) {
  let search_results = dataArray
    .filter((prof) => {
      // Filter results by doing case insensitive match on name here
      return (
        prof.name.toLowerCase().includes(keyword.toLowerCase()) ||
        prof.symbol.toLowerCase().includes(keyword.toLowerCase())
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

  return search_results;
}

export { displayError, displayLoadingScreen, sortData };
