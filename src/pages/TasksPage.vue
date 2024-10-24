<!-- TasksPage.vue -->
<template>
  <main style="min-height: 50vh; margin-top: 2rem">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask></NewTask>

          <!-- List of uncompleted task -->
          <Tasks :tasks="uncompletedTask" 
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
          ></Tasks>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Tasks from "@/components/tasks/Tasks.vue";
import { computed } from "vue";
import NewTask from "@/components/tasks/NewTask.vue";
import { useTaskStore } from "@/stores/task";
import { storeToRefs } from "pinia";

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

// const handleAddedTask = async (newTask) => {
//   const { data: createTask } = await createTask(newTask);
//   tasks.value.unshift(createTask.data);
// };
</script>
