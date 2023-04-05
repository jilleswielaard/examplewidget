<template>
  <Switch v-model="enabled" as="template" v-slot="{ checked }">
    <button class="relative inline-flex h-6 w-11 items-center rounded-full" :class="checked ? 'bg-primary' : 'bg-inactive'">
      <span
        :class="checked ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block h-4 w-4 transform rounded-full bg-white transition"
      />
    </button>
  </Switch>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Switch } from '@headlessui/vue';

const enabled = ref(false);
</script>
