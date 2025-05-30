let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const list = document.getElementById('taskList');
  const statusMessage = document.getElementById('statusMessage');
  const actionButtons = document.getElementById('action-buttons');
  list.innerHTML = '';

  tasks.forEach((task, i) => {
    const item = document.createElement('li');
    const taskIcon = task.done ? "✅" : "⬜";
    item.innerHTML = `
      ${taskIcon} ${task.name}
      <button onclick="toggleDone(${i})">${task.done ? "Batal" : "Selesai"}</button>
      <button onclick="deleteTask(${i})">Hapus</button>
    `;
    list.appendChild(item);
  });

  if (tasks.length === 0) {
    statusMessage.innerHTML = '';
    actionButtons.style.display = 'none';
  } else {
    actionButtons.style.display = 'flex';
    actionButtons.style.justifyContent = 'center';

    if (tasks.every(task => task.done)) {
      statusMessage.innerHTML = `
        <img src="./Cammelya.jpeg" alt="selesai" style="margin-bottom: 12px; width: 100px; display: block; margin: 0 auto;">
        <p style="color: #7A73D1; font-family: sans-serif; font-size: 16px; margin-top: 8px;">
          Sudah Selesai Hehe^^
        </p>`;
    } else {
      statusMessage.innerHTML = '';
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById('taskInput');
  const name = input.value.trim();
  if (name) {
    tasks.push({ name, done: false });
    input.value = '';
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function markAllDone() {
  tasks = tasks.map(task => ({ ...task, done: true }));
  renderTasks();
}

function markAllDelete() {
  tasks = tasks.map(task => ({ ...task, done: false }));
  renderTasks();
}

function deleteAll() {
  document.getElementById('customConfirm').style.display = 'flex';
}

function confirmDelete(confirmed) {
  document.getElementById('customConfirm').style.display = 'none';
  if (confirmed) {
    tasks = [];
    renderTasks();
  }
  console.log ("ini berhasil");
}

// Real-time clock
setInterval(() => {
  const now = new Date();
  document.getElementById('clock').innerText = now.toLocaleTimeString();
}, 1000);

renderTasks();
