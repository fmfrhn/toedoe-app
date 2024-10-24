// task.js
import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import {
  allTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
} from "../http/task-api";

export const useTaskStore = defineStore("taskstore", () => {
  const tasks = ref([]);
  const task = reactive({
    id: null,
    name: null,
    is_completed: false,
  });

  const uncompletedTask = computed(() =>
    tasks.value.filter((task) => !task.is_completed)
  );
  const completedTask = computed(() =>
    tasks.value.filter((task) => task.is_completed)
  );

  const fetchAllTasks = async () => {
    const { data } = await allTasks();
    tasks.value = data.data;
  };

  const handleAddedTask = async (newTask) => {
    const { data } = await createTask(newTask);
    // console.log("response dari api:", data);
    tasks.value.unshift(data.data);
  };

  const handleUpdatedTask = async (task) => {
    const { data } = await updateTask(task.id, {
      name: task.name,
    });
  };

  const handleCompletedTask = async (task) => {
    const { data } = await completeTask(task.id, {
      is_completed: task.is_completed,
    });

    const currentTask = tasks.value.find((item) => item.id == task.id);
    if (currentTask) {
      currentTask.is_completed = data.is_completed;
    }
  };

  const handleRemovedTask = async (task) => {
    await deleteTask(task.id);
    const index = tasks.value.findIndex((item) => item.id === task.id);
    tasks.value.splice(index, 1);
  };

  return {
    tasks,
    uncompletedTask,
    completedTask,
    fetchAllTasks,
    handleAddedTask,
    handleCompletedTask,
    handleRemovedTask,
    handleUpdatedTask,
  };
});

// const tmp = {
//   state: () => ({
//     tasks: [],
//   }),

//   getters: {
//     completedTask: (state) => state.tasks.filter((task) => task.is_completed),
//     uncompletedTask(state) {
//       return state.tasks.filter((task) => !task.is_completed);
//     },
//   },
//   actions: {
//     async fetchAllTasks() {
//       const { data } = await allTasks();
//       this.tasks = data.data;
//     },
//   },
// };
