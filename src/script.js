//// css import

import './style';

//// click callback

function onButtonClick () {
  alert('Clicked!');
}

const button = document.getElementById('button')

button?.addEventListener('click', onButtonClick);

//// api query

const QUERY_URL = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';

async function fetchData (url) {
  try {
    const response = await fetch(url);

    if (response.status !== 200) {
      return 'Error occured';
    }

    return await response.json();
  } catch {
    return 'Error occured';
  }
}

async function onDomLoaded () {
  const data = await fetchData(QUERY_URL);
  
  console.log(data);
}

document.addEventListener('DOMContentLoaded', onDomLoaded);
