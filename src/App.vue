<template>
  <div id="app" :class="$route.path.replace('/', '')">
    <div class="bg-gray-100 mx-auto min-h-screen relative pb-32">
      <Header />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    Footer,
    Header,
  },
};
</script>


<style src="./assets/tailwind.css"></style>
<style src="./assets/about.css"></style>