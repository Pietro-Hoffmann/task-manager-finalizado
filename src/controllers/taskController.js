const TaskModel = require('../models/task');

module.exports = {
  // Obter todas as tarefas
  getAllTasks: (req, res) => {
    const tasks = TaskModel.getAll();
    res.json(tasks);
  },
  
  // Obter uma tarefa por ID
  getTaskById: (req, res) => {
    const task = TaskModel.getById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    res.json(task);
  },
  
  // Criar uma nova tarefa
  createTask: (req, res) => {
    if (!req.body.title) {
      return res.status(400).json({ error: 'O título da tarefa é obrigatório' });
    }
    
    const task = TaskModel.create({
      title: req.body.title,
      description: req.body.description || ''
    });
    
    res.status(201).json(task);
  },
  
  // Atualizar uma tarefa existente
  updateTask: (req, res) => {
    const updatedTask = TaskModel.update(req.params.id, {
      title: req.body.title,
      description: req.body.description
    });
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    res.json(updatedTask);
  },
  
  // Marcar tarefa como concluída/não concluída
  toggleTaskCompletion: (req, res) => {
    const task = TaskModel.toggleComplete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    res.json(task);
  },
  
  // Excluir uma tarefa
  deleteTask: (req, res) => {
    const deleted = TaskModel.delete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    res.status(204).end();
  }
};