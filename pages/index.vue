<script setup lang="ts">
const text = ref("hi");
const imageInfo = ref<Result | null>(null);
interface Result {
  info: {
    public_id: string;
  };
}
function onUpload(result: Ref<Result>) {
  imageInfo.value = result.value;
  console.log("upoad", result.value.info);
}

const { data } = await useFetch("/api/hello");
const router = useRouter();

function goToEdit(public_id: string) {
  router.push(`/edit?photo=${public_id}`);
}
</script>

<template>
  <h1>Hello World</h1>
  <CldUploadWidget
    v-slot="{ open }"
    :onUpload="onUpload"
    uploadPreset="f3cjc61q"
  >
    <button type="button" @click="open">Upload an Image</button>
  </CldUploadWidget>
  <input type="text" v-model="text" />
  <div v-if="imageInfo?.info">
    <CldImage
      alt="house"
      crop="thumb"
      width="400"
      :text="{ text: text || ' ', fontSize: '22', color: 'blue' }"
      height="400"
      :src="imageInfo.info.public_id"
    />
  </div>
  <div class="p-4 grid grid-cols-3 grid-rows-3 gap-3 w-3/5 m-auto">
    <!-- <div class="w-full"> -->
    <div
      v-for="picture in data?.resources"
      @click="goToEdit(picture.public_id)"
      class="cursor-pointer"
    >
      <CldImage
        alt="house"
        crop="thumb"
        width="600"
        height="600"
        :src="picture.public_id"
        :overlays="[
          {
            position: {
              gravity: 'south',
              y: 60
            },
            text: {
              color: 'blue',
              fontFamily: 'Source Sans Pro',
              fontSize: 62,
              fontWeight: 'black',
              text: text || ' '
            }
          }
        ]"
      />
      <!-- </div> -->
    </div>
  </div>
</template>
