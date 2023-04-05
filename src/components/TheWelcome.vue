<template>
  <h1 class="text-3xl font-bold underline">This the welcome component</h1>
  <hui-switch v-model="enabled" />
  <p>{{ enabled }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HuiSwitch from '@/components/HuiSwitch.vue';

const enabled = ref(false);
</script>
