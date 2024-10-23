<!-- TaskAction.vue -->
<template>
    <div class="task-actions">
      <button class="btn btn-sm btn-circle btn-outline-secondary me-1" @click="emit('updated')" >
        <IconPencil></IconPencil>
      </button>
      <button class="btn btn-sm btn-circle btn-outline-danger" @click="emit('removed')">
        <IconTrash></IconTrash>
      </button>
    </div>
</template>

<script setup>
import IconPencil from '../icons/IconPencil.vue';
import IconTrash from '../icons/IconTrash.vue';


const emit = defineEmits(['updated','removed'])
</script>