let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const now =new Date();
  tasks.sort((a,b) => a.name.localeCompare(b.name));
  
  const list = document.getElementById('taskList');
  const statusMessage = document.getElementById('statusMessage');
  const actionButtons = document.getElementById('action-buttons');
  list.innerHTML = '';

  
  tasks.forEach((task, i) => {
    const item = document.createElement('li');
    const taskIcon = task.done ? "✅" : "⬜";
    const deadlineDate = task.deadline ? new Date(task.deadline) : null;
    const countdownText = (deadlineDate && !task.done) ? formatCountdown(task.deadline) : '';

    let deadlineText = '';
    let style = '';
    
    if(deadlineDate) {
      const timeDiff = deadlineDate - now;
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      deadlineText = `(Deadline: ${task.deadline})`;
      
      if (days < 0 && !task.done) {
        style = 'color: red;';
      } else if (days <= 2 && !task.done) {
        style = 'color: orange;';
      } else {
        style = 'color: #7A73D1';
      }
    }
    
    item.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
    <div style="margin: auto";>
    ${taskIcon} <span style="${style}; font-weight: bold;">${task.name}</span>
    <span style="color: white; font-style: italic;"> (${task.client})</span>
    <span style="color: gray;"> ${deadlineText}</span>
    <div style="font-size: 12px; color: lightgray;">${countdownText}</div>
    </div>
    <div style="margin: auto; margin-top : 8px;">
    <button onclick="toggleDone(${i})" style="margin-right: 5px;">${task.done ? "Batal" : "Selesai"}</button>
    <button onclick="deleteTask(${i})">Hapus</button>
    </div>
    </div>
    `;
    list.appendChild(item);
  });
  
  if (tasks.length === 0) {
    statusMessage.innerHTML = '';
    actionButtons.style.display = 'none';
    document.querySelector('.option').style.display = 'none';
  } else {
    actionButtons.style.display = 'flex';
    actionButtons.style.justifyContent = 'center';
    document.querySelector('.option').style.display = 'flex';
    
    if (tasks.every(task => task.done)) {
      statusMessage.innerHTML = `
      <img src="./Cammelya.jpeg" alt="selesai" style="margin-bottom: 12px; width: 100px; display: block; margin: 0 auto;">
      <p style="color: #7A73D1; font-family: 'MyCustomFont'; font-size: 16px; margin-top: 8px;">
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
  const clientInput = document.getElementById('clientInput');
  const deadlineInput = document.getElementById('deadlineInput');
  const name = input.value.trim();
  const client = clientInput.value.trim();
  const deadline = deadlineInput.value;
  
  if (name) {
    tasks.push({ name, client, deadline, done: false });
    input.value = '';
    clientInput.value = '';
    deadlineInput.value = '';
    renderTasks();
  }
}

function formatCountdown(deadline) {
  const now = new Date();
  const target = new Date(deadline);
  const diff = target - now;
  
  if (diff <= 0) return "Waktu habis";
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  
  return `${days}h ${hours}j ${minutes}m lagi`;
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
  renderTasks();
}, 1000);