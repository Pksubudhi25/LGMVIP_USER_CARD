const getUsersBtn = document.getElementById('getUsersBtn');
const loader = document.getElementById('loader');
const gridContainer = document.getElementById('gridContainer');

getUsersBtn.addEventListener('click', () => {
  getUsers();
});

async function getUsers() {
  try {
    showLoader();
    const response = await fetch('https://reqres.in/api/users?page=1');
    const data = await response.json();
    hideLoader();
    displayUsers(data.data);
  } catch (error) {
    console.error('Error fetching users:', error);
    hideLoader();
  }
}

function showLoader() {
  loader.style.display = 'block';
  gridContainer.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
  gridContainer.style.display = 'grid';
}

function displayUsers(users) {
  gridContainer.innerHTML = '';
  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
    userCard.innerHTML = `
      <img src="${user.avatar}" alt="${user.first_name} ${user.last_name}">
      <div class="user-name">${user.first_name} ${user.last_name}</div>
      <div class="user-email">${user.email}</div>
    `;
    gridContainer.appendChild(userCard);
  });
}
