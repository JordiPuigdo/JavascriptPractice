import { URL, FORM_IDS } from '../utils/constants.js';
import TasksService from './services/tasksService.js';
import LocalStorageService from './services/localStorageService.js';


const localStorageService = new LocalStorageService('tasks');

const tasksService = new TasksService(URL.ENDPOINT_TASKS);
tasksService.fetchInitialTasks().then(() => {
    tasksService.renderTasks();
});

const taskForm = document.getElementById(FORM_IDS.TASK_FORM);
taskForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();

    const taskTitle = document.getElementById(FORM_IDS.TASK_TITLE).value;
    const taskPriority = document.getElementById(FORM_IDS.TASK_PRIORITY).value;

    const newId = tasksService.tasks.length > 0 ? tasksService.tasks[tasksService.tasks.length - 1].id + 1 : 1;

    const newTask = {
        id: newId,
        titulo: taskTitle,
        prioridad: taskPriority
    };

    tasksService.tasks.push(newTask);
    tasksService.renderTasks();

    localStorageService.setData(tasksService.tasks);

    clearFormFields();
}

function clearFormFields() {
    document.getElementById(FORM_IDS.TASK_TITLE).value = "";
    document.getElementById(FORM_IDS.TASK_PRIORITY).value = "alta";
    document.getElementById(FORM_IDS.TITLE_FILTER).value = "";
    document.getElementById(FORM_IDS.PRIORITY_FILTER).value = "";
}

const titleFilterInput = document.getElementById("titleFilter");
const priorityFilterInput = document.getElementById("priorityFilter");

titleFilterInput.addEventListener("input", handleFilterChange);
priorityFilterInput.addEventListener("change", handleFilterChange);

function handleFilterChange() {
  const titleFilterValue = titleFilterInput.value.trim().toLowerCase();
  const priorityFilterValue = priorityFilterInput.value;

  const filteredTasks = tasksService.tasks.filter((tarea) => {
    const titleMatch = tarea.titulo.toLowerCase().includes(titleFilterValue);
    const priorityMatch = priorityFilterValue === "" || tarea.prioridad === priorityFilterValue;

    return titleMatch && priorityMatch;
  });

  tasksService.renderTasks(filteredTasks);
}