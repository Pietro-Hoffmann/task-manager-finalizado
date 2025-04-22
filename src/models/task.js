class Task {
  constructor(id, title, description, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

// Simulação de banco de dados em memória
const tasks = [];
let nextId = 1;

// Métodos para manipular as tarefas
module.exports = {
  getAll: () => {
    return tasks;
  },
  
  getById: (id) => {
    return tasks.find(task => task.id === parseInt(id));
  },
  
  create: (taskData) => {
    const task = new Task(
      nextId++,
      taskData.title,
      taskData.description
    );
    tasks.push(task);
    return task;
  },
  
  update: (id, taskData) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) return null;
    
    const task = tasks[taskIndex];
    task.title = taskData.title || task.title;
    task.description = taskData.description || task.description;
    task.updatedAt = new Date();
    
    return task;
  },
  
  toggleComplete: (id) => {
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) return null;
    
    task.completed = !task.completed;
    task.updatedAt = new Date();
    return task;
  },
  
  delete: (id) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) return false;
    
    tasks.splice(taskIndex, 1);
    return true;
  }
};