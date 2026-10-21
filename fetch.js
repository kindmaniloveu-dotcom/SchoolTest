const API_URL = 'https://jsonplaceholder.typicode.com';
 
async function getData(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`);
 
  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
 
  return response.json();
}

const statusEl = document.getElementById('status');
 
function showStatus(text, type = 'info') {
  statusEl.textContent = text;
  statusEl.className = `status status--${type}`;
}
 
function hideStatus() {
  statusEl.className = 'status hidden';
}

function createUserCard(user) {
  return `
    <article class="card" data-id="${user.id}">
      <div class="card__avatar">${escapeHtml(user.name[0])}</div>
      <h3 class="card__name">${escapeHtml(user.name)}</h3>
      <p class="card__username">@${escapeHtml(user.username)}</p>
      <ul class="card__info">
        <li><span>Email:</span> ${escapeHtml(user.email)}</li>
        <li><span>Телефон:</span> ${escapeHtml(user.phone)}</li>
        <li><span>Город:</span> ${escapeHtml(user.address.city)}</li>
        <li><span>Компания:</span> ${escapeHtml(user.company.name)}</li>
      </ul>
      <button class="card__btn">Показать посты</button>
    </article>
  `;
}

const usersEl = document.getElementById('users');
// let i = 0

const postsSection = document.getElementById('posts-section');
const postsTitle = document.getElementById('posts-title');
const postsEl = document.getElementById('posts');
 
function createPostCard(post) {
  return `
    <article class="post">
      <h4 class="post__title">${escapeHtml(post.title)}</h4>
      <p class="post__body">${escapeHtml(post.body)}</p>
    </article>
  `;
}
 
async function loadPosts(userId, userName) {
  showStatus('Загрузка постов...');
 
  try {
    const posts = await getData(`/posts?userId=${userId}`);
    postsTitle.textContent = `Посты: ${userName} (${posts.length})`;
    postsEl.innerHTML = posts.map(createPostCard).join('');
    postsSection.classList.remove('hidden');
    postsSection.scrollIntoView({ behavior: 'smooth' });
    hideStatus();
  } catch (error) {
    showStatus(`Не удалось загрузить посты: ${error.message}`, 'error');
  }
}

async function loadUsers() {
// if (i >= 3){
//         return showStatus('Вы загрузили всех пользователей', 'error');
//     }
showStatus('Загрузка пользователей...');
  try {
    const users = await getData('/users');
    const firstThreeUsers = users.slice(0, 8);
    // usersEl.innerHTML = users.map(createUserCard).join('');
    usersEl.innerHTML = firstThreeUsers.map(createUserCard).join('');
    // i++;
    hideStatus();
  } catch (error) {
    showStatus(`Не удалось загрузить данные: ${error.message}`, 'error');
  }
}
usersEl.addEventListener('click', (event) => {
  const button = event.target.closest('.card__btn');
  if (!button) return;
 
  const card = button.closest('.card');
  const name = card.querySelector('.card__name').textContent;
  loadPosts(card.dataset.id, name);
});
loadUsers();

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
//   document.body.appendChild(div);
  return div.innerHTML;
}
escapeHtml('Дарова');
createUserCard({
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  phone: '+1-555-1234',
  address: {
    city: 'New York'
  },
  company: {
    name: 'Acme Corp'
  }
});

// getData('/posts')
//   .then(data => console.log(data))


