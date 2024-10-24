<script setup>
import Navbar from "./components/Navbar.vue";
// import TasksPage from './pages/TasksPage.vue';
import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar></Navbar>
  <!-- <TasksPage></TasksPage> -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <Footer></Footer>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
