<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import genesyscloud from '@/services/genesyscloud';
import { onMounted } from 'vue';
import config from '@/config/config';

onMounted(async () => {
  await genesyscloud.loginImplicitGrant();
  history.pushState({}, '', config.redirectUri);
});
</script>
