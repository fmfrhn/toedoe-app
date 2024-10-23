import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import {
  allTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
} from "../http/task-api";

const tmp = {
  state: () => ({
    tasks: [],
  }),

  getters: {
    // completedTask: (state) => state.tasks.filter((task) => task.is_completed),
    // uncompletedTask(state) {
    //   return state.tasks.filter((task) => !task.is_completed);
    // },
  },
  actions: {
    // async fetchAllTasks() {
    //   const { data } = await allTasks();
    //   this.tasks = data.data;
    // },
  },
};

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

  return {
    tasks,uncompletedTask,completedTask,fetchAllTasks
  }
});
