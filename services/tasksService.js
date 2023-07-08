import { ERROR_MESSAGES } from '../utils/constants.js';

export default class TasksService {
  constructor(url) {
    this.url = url;
    this.tasks = [];
    this.taskListElement = document.getElementById('taskList');
  }

  async fetchInitialTasks() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new TaskServiceError(ERROR_MESSAGES.FETCH_INITIAL_TASKS, response.status);
      }
      const data = await response.json();
      this.tasks = data.tareas;
    } catch (error) {
      this.handleError(error);
    }
  }

  renderTasks(filteredTasks = null) {
    this.clearTaskList();

    const tasksToRender = filteredTasks || this.tasks;

    tasksToRender.forEach((tarea) => {
      const listItem = this.createTaskListItem(tarea);
      this.taskListElement.appendChild(listItem);
    });
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(tarea => tarea.id !== id);
  }

  clearTaskList() {
    this.taskListElement.innerHTML = '';
  }

  createTaskListItem(tarea) {
    const listItem = document.createElement('tr');
    listItem.classList.add(`task-priority-${tarea.prioridad}`);

    listItem.innerHTML = `
      <td class="border border-gray-300 p-3">${tarea.titulo}</td>
      <td class="border border-gray-300 p-3 task-priority">${tarea.prioridad}</td>
      <td class="border border-gray-300 p-3">
        <button class="w-full h-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" data-id="${tarea.id}">Eliminar</button>
      </td>
    `;
  
    const deleteButton = listItem.querySelector('button[data-id]');
    deleteButton.addEventListener('click', () => {
      this.deleteTask(Number(deleteButton.dataset.id));
      this.renderTasks();
    });
  
    const priorityTd = listItem.querySelector('.task-priority');
    priorityTd.classList.add(`task-priority-${tarea.prioridad}`);
  
    return listItem;
  }
  

  handleError(message, error) {
    console.error(message, error);
  }
}