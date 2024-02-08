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

const { data, refresh } = useFetch("/api/cloud");
const router = useRouter();

function goToEdit(public_id: string) {
  router.push(`/edit?photo=${encodeURIComponent(public_id)}`);
}

function refreshPics() {
  console.log("closed");
  refresh();
}
</script>

<template>
  <section class="flex flex-col gap-6 items-center">
    <h1 class="text-4xl font-extrabold">Select Photo To Edit!</h1>
    <CldUploadWidget
      v-slot="{ open }"
      :onUpload="onUpload"
      uploadPreset="f3cjc61q"
      :onClose="refreshPics"
    >
      <button
        type="button"
        @click="open()"
        class="bg-blue-300 p-4 text-white rounded w-48"
        disabled
      >
        Upload an Image
      </button>
    </CldUploadWidget>
  </section>
  <!-- <div v-if="imageInfo?.info"> -->
  <!-- <CldImage
      alt="house"
      crop="thumb"
      width="400"
      height="400"
      :src="imageInfo.info.public_id"
    />
  </div> -->
  <div
    class="p-4 grid grid-cols-3 grid-rows-3 gap-3 w-3/5 m-auto border-2 border-green-300 mt-4"
  >
    <!-- <div class="w-full"> -->
    <div
      v-for="picture in data?.resources"
      @click="goToEdit(picture.public_id)"
      class="cursor-pointer"
    >
      <CldImage
        alt="house"
        crop="auto"
        width="600"
        height="600"
        :src="picture.public_id"
      />
      <!-- </div> -->
    </div>
  </div>
</template>
