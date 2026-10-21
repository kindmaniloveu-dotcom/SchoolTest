const API_URL = 'https://jsonplaceholder.typicode.com/users';

async function fetchData() {

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));