<script setup lang="ts">
const effects = ref<undefined | "generative-fill" | "remove-background">();
const route = useRoute();

console.log("route", route.query);
const photo = ref(route.query.photo as string);
// const photo = route.query.photo! && "";
</script>
<template>
  <div class="flex flex-col items-center gap-4">
    <button
      class="bg-green-400 text-white rounded p-2"
      @click="$router.push({ path: '/' })"
    >
      Back
    </button>
    <button
      class="bg-green-400 text-white rounded p-2"
      @click="effects = 'generative-fill'"
    >
      Apply Generative Fill
    </button>
    <button
      class="bg-green-400 text-white rounded p-2"
      @click="effects = 'remove-background'"
    >
      Apply Remove Background
    </button>
    <div class="grid gap-2 grid-cols-2">
      <section v-if="$route.query.photo">
        <CldImage
          alt="house"
          crop="thumb"
          width="600"
          height="600"
          :src="photo!"
        />
      </section>
      <section v-if="effects === 'generative-fill'">
        <CldImage
          alt="house"
          crop="thumb"
          width="600"
          height="900"
          :src="photo!"
          fill-background
        />
      </section>
      <section v-if="effects === 'remove-background'">
        <CldImage
          alt="house"
          crop="thumb"
          width="600"
          height="600"
          :src="photo!"
          remove-background
        />
      </section>
    </div>
  </div>
</template>
