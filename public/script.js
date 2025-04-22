document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const taskForm = document.getElementById('task-form');
  const taskList = document.getElementById('tasks');
  const modal = document.getElementById('task-modal');
  const closeBtn = document.querySelector('.close');
  const editForm = document.getElementById('edit-form');
  
  // Carregar tarefas existentes
  loadTasks();
  
  // Event listeners
  taskForm.addEventListener('submit', addTask);
  editForm.addEventListener('submit', updateTask);
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Função para carregar tarefas da API
  async function loadTasks() {
    try {
      const response = await fetch('/api/tasks');
      const tasks = await response.json();
      
      taskList.innerHTML = '';
      
      if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-tasks">Nenhuma tarefa encontrada</li>';
        return;
      }
      
      tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
      });
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  }
  
  // Criar elemento de tarefa
  function createTaskElement(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.className = task.completed ? 'task completed' : 'task';
    
    li.innerHTML = `
      <div class="task-content">
        <h3>${task.title}</h3>
        <p>${task.description || ''}</p>
        <small>Criado em: ${new Date(task.createdAt).toLocaleString()}</small>
      </div>
      <div class="task-actions">
        <button class="btn btn-toggle">${task.completed ? 'Reabrir' : 'Concluir'}</button>
        <button class="btn btn-edit">Editar</button>
        <button class="btn btn-delete">Excluir</button>
      </div>
    `;
    
    // Adicionar event listeners para os botões
    li.querySelector('.btn-toggle').addEventListener('click', () => toggleTask(task.id));
    li.querySelector('.btn-edit').addEventListener('click', () => openEditModal(task));
    li.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task.id));
    
    return li;
  }
  
  // Adicionar nova tarefa
  async function addTask(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    
    if (!title) return;
    
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      });
      
      if (response.ok) {
        taskForm.reset();
        loadTasks();
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  }
  
  // Marcar tarefa como concluída/pendente
  async function toggleTask(id) {
    try {
      const response = await fetch(`/api/tasks/${id}/toggle`, {
        method: 'PATCH'
      });
      
      if (response.ok) {
        loadTasks();
      }
    } catch (error) {
      console.error('Erro ao alterar status da tarefa:', error);
    }
  }
  
  // Abrir modal de edição
  function openEditModal(task) {
    document.getElementById('edit-id').value = task.id;
    document.getElementById('edit-title').value = task.title;
    document.getElementById('edit-description').value = task.description || '';
    modal.style.display = 'block';
  }
  
  // Atualizar tarefa
  async function updateTask(e) {
    e.preventDefault();
    
    const id = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title').value.trim();
    const description = document.getElementById('edit-description').value.trim();
    
    if (!title) return;
    
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      });
      
      if (response.ok) {
        modal.style.display = 'none';
        loadTasks();
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  }
  
  // Excluir tarefa
  async function deleteTask(id) {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        loadTasks();
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  }
});