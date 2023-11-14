<script setup lang="ts">
onMounted(async () => {
  const JSConfetti = await import("js-confetti").then((r) => r.default);
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti();
});

useServerSeoMeta({
  title: "Nuxt on Amplify",
});

const img = useImage()
const catURL = img("/cat.png", { width: 640 });
console.log(catURL);
</script>

<style scoped>
main {
  background-repeat: no-repeat;
  background-size: contain;
}
</style>

<template>
  <main
    class="flex flex-col justify-center2 items-center h-screen w-screen p-8"
    :style="`background-image: url('${catURL}')`"
  >
    <h1 class="text-5xl">Nuxt app successfully deployed on AWS Amplify!</h1>
  </main>
</template>
