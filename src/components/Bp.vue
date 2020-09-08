<template>
  <div>
    <div class="px-6">
      <div class="text-2xl pb-4">节点列表</div>

      <div class="flex flex-wrap gap-4 text-center">
        <div v-for="(item) in card" :key="item.name" class="flex-1 rounded bg-white p-4">
          <h2 class="text-gray-600">{{item.name}}</h2>
          <div class="text-lg h-6 whitespace-no-wrap">{{item.value}}</div>
        </div>
      </div>
    </div>
    <div class="px-6 bg-white mt-6">
      <div class="overflow-x-auto">
        <table class="w-full my-2">
          <thead>
            <tr>
              <th
                class="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 tracking-wider"
                width="50"
              >#</th>
              <th
                class="py-3 bg-gray-50 text-center text-xs text-gray-500 tracking-wider"
                width="100"
              >节点标识</th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 tracking-wider">节点名称</th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 tracking-wider">状态</th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 tracking-wider">得票率</th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 tracking-wider">每日收益</th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 tracking-wider">未领取收益</th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 tracking-wider">网址</th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs text-gray-500 tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(item, index) in bpList"
              :key="index"
              v-bind:class="{'bg-gray-100': index % 2}"
              class="hover:bg-gray-200"
            >
              <td class="px-6 py-4 text-gray-500">{{index+1}}</td>
              <td class="px-2 py-2 text-center">
                <img class="h-12 w-12 inline-block" :src="item.logo" alt />
              </td>
              <td class="px-6 py-4">
                <div class="text-gray-900">{{item.candidate_name}}</div>
                <div class="text-gray-500">{{item.owner}}</div>
              </td>
              <td class="px-6 py-4">
                <span
                  v-if="index+1 <= 21"
                  class="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800"
                >当选节点</span>
                <span
                  v-if="index+1 > 21"
                  class="px-2 inline-flex text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                >待机节点</span>
              </td>
              <td class="px-6 py-4">
                <div class="text-gray-900">{{item.weight_percent}} %</div>
                <div class="text-gray-500 text-sm">{{item.staked}} FO</div>
              </td>
              <td class="px-6 py-4 text-gray-500">{{item.claim_rewards_total}} FO</td>
              <td
                class="px-6 py-4"
                v-bind:class="{ 'text-gray-500': item.claim_rewards_unreceived === '0', 'text-green-500 font-bold': item.claim_rewards_unreceived !== '0' }"
              >{{item.claim_rewards_unreceived}} FO</td>
              <td class="px-6 py-4 text-gray-500">
                <a
                  :href="item.urlFull"
                  target="_blank"
                  class="text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out"
                >{{item.urlSimple}}</a>
              </td>
              <td class="px-6 py-4">
                <router-link
                  :to="'/bp/'+item.owner"
                  class="text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out"
                >详情</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import Bp from "../models/bp";
import dayjs from "dayjs";

export default {
  data() {
    return {
      bp: "",
      timer: "",
      bpList: [],
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
        {
          name: "不可逆区块",
          value: "",
        },
      ],
    };
  },
  methods: {
    async getInfo() {
      this.card = [
        {
          name: "生产者",
          value: this.bp.info.head_block_producer,
        },
        {
          name: "出块时间",
          value: dayjs(this.bp.info.head_block_time + "Z").format(
            "YYYY-MM-DD HH:mm:ss"
          ),
        },
        {
          name: "最新区块",
          value: this.bp.info.head_block_num.toLocaleString(),
        },
        {
          name: "不可逆区块",
          value: this.bp.info.last_irreversible_block_num.toLocaleString(),
        },
      ];
    },
  },

  async created() {
    this.bp = new Bp();
    await this.bp.getInfo();
    this.getInfo();
    await this.bp.init();
    this.bpList = this.bp.bpList;
    this.timer = setInterval(this.getInfo, 1000);
  },

  beforeUnmount() {
    this.bp.unmount();
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
th,
td {
  white-space: nowrap;
}
</style>