<template>
  <main>
    <TheWelcome />
    <button
      type="button"
      class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      @click="getMe()"
    >
      Me
    </button>
    <p>{{ me }}</p>
  </main>
</template>

<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue';
import genesyscloud from '@/services/genesyscloud';
import { ref, type Ref } from 'vue';
import type platformClient from 'purecloud-platform-client-v2';
import { onMounted } from 'vue';
import config from '@/config/config';

let me: Ref<platformClient.Models.UserMe | null> = ref(null);

onMounted(async () => {
  await getMe();
  console.log(me.value?.division?.name);
  let dataTableGroups: string[] = [];
  if (me.value?.division?.name) dataTableGroups = await getGroupsFromDataTable(me.value?.division?.name);
  console.log(dataTableGroups);
});

const getMe = async () => {
  console.log('get me');
  const response = await genesyscloud.getMe();
  console.log(response);
  me.value = response;
};

const getGroupsFromDataTable = async (rowId: string): Promise<string[]> => {
  console.log('get groups from data table');
  const response = await genesyscloud.getDataTableRow(config.datatableId, rowId);
  const groups = response.Groups.split(';');
  return groups;
};
</script>
