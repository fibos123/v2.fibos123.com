<template>
  <div class="cursor-default">
    <div
      class="text-white py-20 text-center bg-cover bg-center bg-black"
      style="background-image: url('/bg.jpg');"
    >
      <div class="text-4xl pb-1">FIBOS 导航</div>
      <div>一个收录 FIBOS 网址及资源的小导航</div>
    </div>
    <div class="p-2 sm:p-6 text-center sm:text-left">
      <section v-for="(item) in sites" :key="item.name" class="bg-white p-4 rounded mb-4">
        <div class="border-b text-lg pb-4 sm:pl-2">
          <i :class="item.icon" class="pr-1" v-if="item.icon"></i>
          {{item.name}}
        </div>

        <div v-for="(item) in item.sub" :key="item.name" class="sm:flex relative">
          <header
            v-if="item.name"
            class="text-center border-dotted text-lg flex-grow-0 flex-shrink-0 justify-center items-center sm:flex sm:border-r sm:w-32 sm:mr-4 border-b sm:border-b-0 py-4"
          >
            <h2>{{item.name}}</h2>
          </header>

          <ul class="flex flex-wrap sm:gap-x-4 pt-4">
            <li
              v-for="(item) in item.child"
              :key="item.name"
              class="w-1/2 relative border-dotted border-r sm:pr-4 sm:w-64 border-b sm:border-b-0"
            >
              <a
                :href="item.url"
                target="_blank"
                class="hover:bg-indigo-100 block pt-3 px-1 sm:px-4 rounded transition duration-150 ease-in-out h-32 sm:h-24"
              >
                <p class="pb-1 text-blue-600">
                  <i v-if="item.icon" :class="item.icon"></i>
                  {{item.name}}
                </p>
                <p class="text-sm text-gray-600">{{item.desc}}</p>
              </a>

              <p v-if="item.more" class="absolute top-0 right-0 mt-2 sm:mr-6 mr-2">
                <a
                  :href="item.more.url"
                  target="_blank"
                  class="text-xs rounded bg-blue-600 py-1 px-2 text-white block"
                >
                  <i v-if="item.more.icon" :class="item.more.icon"></i>
                  {{item.more.name}}
                </a>
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import { getSites } from "../models/home";

export default {
  data() {
    return {
      sites: [],
    };
  },
  async created() {
    this.sites = await getSites();
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  li:nth-child(even) {
    border-right: 0;
  }
  li:nth-child(odd):last-child {
    width: 100%;
    border-right: 0;
  }
}
</style>