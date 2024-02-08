<script setup lang="ts">
const route = useRoute();
const slider = ref(100);
const fontSlider = ref(55);
const blurSlider = ref(0);
const text = ref("Hello");

console.log("route", route.query);
const photo = ref(route.query.photo as string);

const attributes = reactive({ effect: {} });
</script>
<template>
  <div class="flex flex-col items-center gap-4 w-3/4 m-auto">
    <h1 class="font-extrabold text-4xl">Select Customizations to Text</h1>

    <div class="grid grid-cols-2 gap-4">
      <!--Controls-->
      <section class="flex flex-col gap-4 w-full">
        <div class="border-2 border-blue-300 p-4 flex flex-col gap-4 rounded">
          <h2 class="text-3xl">Enter Text To Add To Image</h2>
          <input
            type="text"
            v-model="text"
            class="bg-gray-200 p-4 rounded"
            placeholder="Enter Text"
          />
        </div>
        <section
          class="border-2 border-orange-300 p-4 flex flex-col items-center w-full"
        >
          <label
            for="default-range"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Opacity Slider</label
          >
          <input
            id="default-range"
            type="range"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            v-model="slider"
          />
          {{ slider }}
        </section>
        <section
          class="border-2 border-green-300 p-4 flex flex-col items-center w-full"
        >
          <label
            for="default-range"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Font Size</label
          >
          <input
            id="default-range"
            type="range"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            v-model="fontSlider"
          />
          {{ fontSlider }}
        </section>
        <section
          class="border-2 border-green-300 p-4 flex flex-col items-center w-full"
        >
          <label
            for="default-range"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Blur</label
          >
          <input
            id="default-range"
            type="range"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            v-model="blurSlider"
          />
          {{ blurSlider }}
        </section>
        <section class="flex items-center justify-center gap-4">
          <button
            class="bg-yellow-400 text-white rounded p-2"
            @click="
              attributes.effect = {
                ...attributes.effect,
                'remove-background': true
              }
            "
          >
            Remove Background
          </button>
          <button
            class="bg-yellow-400 text-white rounded p-2"
            @click="
              attributes.effect = {
                ...attributes.effect,
                grayscale: true
              }
            "
          >
            Grayscale
          </button>
          <button
            class="bg-yellow-400 text-white rounded p-2"
            @click="
              attributes.effect = {
                ...attributes.effect,
                pixelate: true
              }
            "
          >
            Pixelate
          </button>
        </section>
      </section>
      <!--End of controls-->
      <!--Photos-->
      <div class="flex w-full">
        <section v-if="$route.query.photo" class="w-full flex justify-center">
          <CldImage
            alt="house"
            width="500"
            height="auto"
            :src="photo!"
            :opacity="slider"
            :blur="blurSlider * 20"
            :overlays="[
              {
                position: {
                  gravity: 'south',
                  y: 60
                },
                text: {
                  color: 'blue',
                  fontFamily: 'Source Sans Pro',
                  fontSize: fontSlider,
                  fontWeight: 'black',
                  text: text || ' '
                }
              }
            ]"
            v-bind="attributes.effect"
          />
        </section>
      </div>
    </div>
    <button
      class="bg-green-400 text-white rounded p-2 w-3/5 mt-4 hover:bg-green-900"
      @click="$router.push({ path: '/' })"
    >
      Back
    </button>
  </div>
</template>
