<template>
  <div>
    <div class="px-6">
      <div class="pb-4">
        <router-link
          to="/monitor"
          class="bg-indigo-500 transition duration-150 ease-in-out text-white py-2 px-4 rounded cursor-default"
        >出块节点在线状态</router-link>
        <router-link
          to="/monitor/pointer"
          class="ml-4 text-indigo-500 transition duration-150 ease-in-out bg-white py-2 px-4 rounded hover:bg-indigo-500 hover:text-white"
        >接入点状态监测</router-link>
      </div>

      <div class="text-2xl pb-4">出块节点在线状态</div>
      <div v-if="bpStatus">
        <div class="flex flex-wrap gap-4 text-center">
          <div v-for="(item) in card" :key="item.name" class="flex-1 rounded bg-white p-4">
            <h2 class="text-gray-600">{{item.name}}</h2>
            <div class="text-lg h-6 whitespace-no-wrap">{{item.value}}</div>
          </div>
        </div>
      </div>
      <div class="px-4 bg-white mt-4">
        <div class="overflow-x-auto">
          <table class="w-full my-2">
            <thead>
              <tr>
                <th
                  class="px-4 py-2 bg-gray-50 text-left text-xs text-gray-500 tracking-wider"
                  width="50"
                >#</th>
                <th class="px-4 py-2 bg-gray-50 text-left text-xs text-gray-500 tracking-wider">节点名称</th>
                <th class="px-4 py-2 bg-gray-50 text-left text-xs text-gray-500 tracking-wider">状态</th>
                <th class="px-4 py-2 bg-gray-50 text-left text-xs text-gray-500 tracking-wider">生产区块</th>
                <th
                  class="px-4 py-2 bg-gray-50 text-left text-xs text-gray-500 tracking-wider"
                >最终生产时间</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(item, index) in items"
                :key="item.bpname"
                v-bind:class="{'bg-gray-100': index % 2, 'font-bold': item.bpname === bpStatus.head_block_producer}"
                class="hover:bg-gray-200"
              >
                <td
                  class="px-4 py-2 whitespace-no-wrap text-gray-500"
                  v-bind:class="{'text-gray-800': item.bpname === bpStatus.head_block_producer}"
                >{{index + 1}}</td>
                <td class="px-4 py-2 whitespace-no-wrap">
                  <div class="flex items-center">
                    <div class="ml-2">
                      <div class="text-gray-900">{{item.bpname}}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-2 whitespace-no-wrap">
                  <span
                    class="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800"
                    v-if="bpStatus.head_block_num - item.number <= 242"
                  >在线</span>

                  <span
                    class="px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800"
                    v-if="bpStatus.head_block_num - item.number > 242"
                  >离线</span>
                </td>
                <td
                  class="px-4 py-2 whitespace-no-wrap text-gray-500"
                  v-bind:class="{'text-gray-800': item.bpname === bpStatus.head_block_producer}"
                >{{item.numberFormat}}</td>
                <td
                  class="px-4 py-2 whitespace-no-wrap text-gray-500"
                  v-bind:class="{'text-gray-800': item.bpname === bpStatus.head_block_producer}"
                >{{item.date}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import dayjs from "dayjs";
import { getBpStatus } from "../models/monitor";
export default {
  data() {
    return {
      timer: "",
      card: [
        {
          name: "生产者",
          value: "",
        },
        {
          name: "出块时间",
          value: "",
        },
        {
          name: "最新区块",
          value: "",
        },
      ],
      bpStatus: null,
      items: [],
    };
  },
  methods: {
    async getInfo() {
      this.bpStatus = await getBpStatus();
      this.card = [
        {
          name: "生产者",
          value: this.bpStatus.head_block_producer,
        },
        {
          name: "出块时间",
          value: dayjs(this.bpStatus.head_block_time + "Z").format(
            "YYYY-MM-DD HH:mm:ss"
          ),
        },
        {
          name: "最新区块",
          value: parseInt(this.bpStatus.head_block_num).toLocaleString(),
        },
      ];
      this.items = this.bpStatus.rows2.map((item) => {
        item.numberFormat = parseInt(item.number).toLocaleString();
        item.date = dayjs(item.date + "Z").format("YYYY-MM-DD HH:mm:ss");
        return item;
      });
    },
  },

  async created() {
    this.getInfo();
    this.timer = setInterval(this.getInfo, 1000);
  },

  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

