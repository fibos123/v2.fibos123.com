<template>
  <div>
    <div class="px-6">
      <div class="pb-4">
        <router-link
          to="/monitor"
          class="text-indigo-500 transition duration-150 ease-in-out bg-white py-2 px-4 rounded hover:bg-indigo-500 hover:text-white"
        >出块节点在线状态</router-link>
        <router-link
          to="/monitor/pointer"
          class="ml-4 bg-indigo-500 transition duration-150 ease-in-out text-white py-2 px-4 rounded cursor-default"
        >接入点状态监测</router-link>
      </div>

      <div class="flex justify-between">
        <div class="text-2xl">接入点状态监测</div>
        <a
          class="text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out cursor-pointer"
          @click="isOpen = !isOpen"
        >可用接入点列表</a>
      </div>

      <div class="px-6 bg-white mt-4">
        <div class="overflow-x-auto">
          <table class="w-full my-2">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 tracking-wider"
                  width="50"
                >#</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 tracking-wider">节点账户</th>
                <th
                  class="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 tracking-wider"
                >HTTPS 状态</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(item, index) in items"
                :key="index"
                v-bind:class="{'bg-gray-100': !(index % 2)}"
                class="hover:bg-gray-200"
              >
                <td class="px-6 py-4 whitespace-no-wrap text-gray-500">{{index+1}}</td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="flex items-center">
                    <div class="text-gray-900">{{item.owner}}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <span
                    v-if="item.status==='waiting'"
                    class="px-2 inline-flex text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                  >获取中</span>

                  <span
                    v-if="item.status==='success'"
                    class="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800"
                  >{{item.number}} ( {{item.version}} )</span>

                  <span
                    v-if="item.status==='fail'"
                    class="px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800"
                  >无法访问</span>

                  <span
                    v-if="item.status==='notset'"
                    class="px-2 inline-flex text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                  >未设置</span>

                  <a
                    target="_blank"
                    :href="item.ssl_endpoint + '/v1/chain/get_info'"
                    class="ml-4 text-indigo-500"
                    title="打开新窗口查看接入点"
                  >
                    <i class="fas fa-link"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="fixed z-10 inset-0 overflow-y-auto" :class="isOpen ? 'block' : 'hidden'">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900 pb-2">可用接入点列表</h3>
            <div class="sm:flex sm:items-start">
              <pre class="h-64 w-full overflow-auto text-sm">{{accessPoints}}</pre>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                @click="isOpen = !isOpen"
              >关闭</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Pointer from "../models/pointer";
export default {
  data() {
    return {
      timer: "",
      isOpen: false,
      pointer: "",
      items: [],
      accessPoints: {
        "p2p-peer-address": [],
        "http-api-address": [],
        "https-api-address": [],
      },
    };
  },
  methods: {
    async getInfo() {
      this.items = this.pointer.list;
      const successList = this.items.filter(
        (item) => item.status === "success"
      );
      this.accessPoints["p2p-peer-address"] = successList
        .filter((item) => item.p2p_endpoint)
        .map((item) => item.p2p_endpoint);

      this.accessPoints["http-api-address"] = successList
        .filter((item) => item.api_endpoint)
        .map((item) => item.api_endpoint);

      this.accessPoints["https-api-address"] = successList
        .filter((item) => item.ssl_endpoint)
        .map((item) => item.ssl_endpoint);
    },
  },

  async created() {
    this.pointer = new Pointer();
    this.pointer.getProducerJson();
    this.getInfo();
    this.timer = setInterval(this.getInfo, 100);
  },

  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
