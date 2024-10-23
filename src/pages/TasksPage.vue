<!-- TasksPage.vue -->
<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask @added="handleAddedTask"></NewTask>

          <!-- List of uncompleted task -->
          <Tasks
            :tasks="uncompletedTask"
            @updated="handleUpdatedTask"
            @completed="handleCompletedTask"
            @removed="handleRemovedTask"
          ></Tasks>

          <!-- show toggle button -->
          <div class="text-center my-3" v-show="showToggleCompletedBtn">
            <button
              class="btn btn-sm btn-secondary"
              @click="($event) => (showCompletedTask = !showCompletedTask)"
            >
              <span v-if="!showCompletedTask">Show Completed</span>
              <span v-else>Hide Completed</span>
            </button>
          </div>

          <!-- list of completed task -->
          <Tasks
            :tasks="completedTask"
            :show="completeTaskIsVisible && showCompletedTask"
            @updated="handleUpdatedTask"
            @completed="handleCompletedTask"
            @removed="handleRemovedTask"
          ></Tasks>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  allTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
} from "../http/task-api";
import Tasks from "@/components/tasks/Tasks.vue";
import { computed } from "vue";
import NewTask from "@/components/tasks/NewTask.vue";
import { useTaskStore } from "@/stores/task";
import { storeToRefs } from "pinia";

const tasks = ref([]);
const store = useTaskStore();
const { completedTask, uncompletedTask } = storeToRefs(store);
const { fetchAllTasks } = store;

onMounted(async () => {
  // const { data } = await allTasks();
  // tasks.value = data.data;
  await fetchAllTasks();
});

const showToggleCompletedBtn = computed(
  () => uncompletedTask.value.length > 0 && completedTask.value.length > 0
);
const completeTaskIsVisible = computed(
  () => uncompletedTask.value.length === 0 || completedTask.value.length > 0
);
const showCompletedTask = ref(false);

const handleAddedTask = async (newTask) => {
  const { data } = await createTask(newTask);
  // console.log("New task created:", data);
  tasks.value.unshift(data);
};

const handleUpdatedTask = async (task) => {
  const { data } = await updateTask(task.id, {
    name: task.name,
  });
  // const currentTask = tasks.value.find(item => item.id === task.id)
  // currentTask.name = data.name
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
// const handleAddedTask = async (newTask) => {
//   const { data: createTask } = await createTask(newTask);
//   tasks.value.unshift(createTask.data);
// };
</script>
