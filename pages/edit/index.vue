<script setup lang="ts">
  const route = useRoute();
  const opacitySlider = ref(100);
  const fontSlider = ref(55);
  const blurSlider = ref(0);
  const text = ref("Hello");

  const photo = ref(route.query.photo as string);
  const blurSliderComputed = computed(() => blurSlider.value * 20);

  const attributes = reactive({
    effect: {
      alt: "house",
      width: "500",
      height: "500",
      src: photo,
      opacity: opacitySlider,
      blur: blurSliderComputed,
      overlays: [
        {
          position: {
            gravity: "south",
            y: 5,
          },
          text: {
            color: "blue",
            fontFamily: "Source Sans Pro",
            fontSize: fontSlider,
            fontWeight: "black",
            text: text || " ",
          },
        },
      ],
    },
  });
</script>
<template>
  <div class="flex flex-col items-center gap-4 w-3/4 m-auto">
    <h1 class="font-extrabold text-4xl">Select Customizations</h1>

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
        <ImageSlider v-model="opacitySlider" class="border-purple-300"
          >Opacity</ImageSlider
        >
        <ImageSlider v-model="fontSlider" class="border-green-300"
          >Font Size</ImageSlider
        >
        <ImageSlider v-model="blurSlider" class="border-orange-300"
          >Blur</ImageSlider
        >

        <section class="flex items-center justify-center gap-4">
          <AttributeButton
            class="bg-blue-500"
            v-model="attributes"
            effect="remove-background"
            >Remove Background</AttributeButton
          >
          <AttributeButton
            class="bg-green-500"
            v-model="attributes"
            effect="grayscale"
            >Grayscale</AttributeButton
          >
          <AttributeButton
            class="bg-purple-500"
            v-model="attributes"
            effect="pixelate"
            >Pixelate</AttributeButton
          >
        </section>
      </section>
      <!--End of controls-->
      <!--Photos-->
      <div class="flex w-full">
        <section v-if="$route.query.photo" class="w-full flex justify-center">
          <CldImage v-bind="attributes.effect" />
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
