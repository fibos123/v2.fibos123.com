<template>
  <div class="px-6">
    <div class="bg-white p-6 rounded">
      <div class="border-b pb-4">
        <h1 class="text-2xl">{{id}} 节点详情</h1>
        <a
          v-if="item"
          :href="item.urlFull"
          target="_blank"
          class="text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out h-6 block"
        >{{item.urlFull}}</a>
      </div>
      <div v-if="item" class="overflow-x-auto">
        <h2 class="text-xl py-4">基本信息</h2>
        <table class="w-full">
          <tr>
            <th class="p-4 text-right" width="150">创建时间</th>
            <td>{{account.created}}</td>
          </tr>
          <tr>
            <th class="p-4 text-right">排名</th>
            <td>{{rank+1}}</td>
          </tr>
          <tr>
            <th class="p-4 text-right">得票率</th>
            <td>{{item.weight_percent}} %</td>
          </tr>
          <tr>
            <th class="p-4 text-right">有效票数</th>
            <td>{{item.staked}} FO</td>
          </tr>
          <tr>
            <th class="p-4 text-right">得票权重</th>
            <td>{{item.total_votes}}</td>
          </tr>
          <tr>
            <th class="p-4 text-right">公钥</th>
            <td>{{item.producer_key}}</td>
          </tr>
        </table>

        <h2 class="text-xl py-4">收益信息</h2>
        <table class="w-full">
          <tr>
            <th class="p-4 text-right" width="150">每日收益</th>
            <td>{{item.claim_rewards_total}} FO</td>
          </tr>
          <tr>
            <th class="p-4 text-right">未领取收益</th>
            <td>{{item.claim_rewards_unreceived}} FO</td>
          </tr>
          <tr>
            <th class="p-4 text-right">未支付块</th>
            <td>{{item.unpaid_blocks}}</td>
          </tr>
          <tr>
            <th class="p-4 text-right">上次领取时间</th>
            <td>{{item.last_claim_time}}</td>
          </tr>
        </table>

        <h2 class="text-xl py-4">JSON 信息</h2>
        <span v-if="!item.json">节点未提交 JSON</span>
        <div v-if="item.json">
          <table class="w-full">
            <tr v-for="(value, key) in item.json.org" :key="key">
              <th class="p-4 text-right" width="150">{{key}}</th>
              <td>{{value}}</td>
            </tr>
          </table>

          <h2 class="text-xl py-4">接入点信息</h2>
          <table class="w-full">
            <tr>
              <th class="p-4 text-right" width="150">producer</th>
              <td class="p-4">
                <b>国家或地区：</b>
                {{producer.location.name}}, {{producer.location.country}}
              </td>
            </tr>
            <tr>
              <th class="p-4 text-right">full</th>
              <td class="p-4">
                <p>
                  <b>国家或地区：</b>
                  {{full.location.name}}, {{full.location.country}}
                </p>
                <p>
                  <b>接入点地址：</b>
                </p>
                <p>{{full.api_endpoint}}</p>
                <p>{{full.ssl_endpoint}}</p>
              </td>
            </tr>
            <tr>
              <th class="p-4 text-right">seed</th>
              <td class="p-4">
                <p>
                  <b>国家或地区：</b>
                  {{seed.location.name}}, {{seed.location.country}}
                </p>
                <p>
                  <b>接入点地址：</b>
                </p>
                <p>{{seed.p2p_endpoint}}</p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="py-6">
      <router-link
        to="/bp"
        class="text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out"
      >返回列表</router-link>
    </div>
  </div>
</template>

<script>
import Bp from "../models/bp";
import dayjs from "dayjs";

export default {
  props: {
    id: String,
  },
  data() {
    return {
      bp: "",
      item: null,
      account: null,
      rank: 0,
      producer: {},
      full: {},
      seed: {},
    };
  },
  async created() {
    this.bp = new Bp();
    this.account = await this.bp.getAccount(this.id);
    if (this.account) {
      this.account.created = dayjs(this.account.created + "Z").format(
        "YYYY-MM-DD HH:mm:ss"
      );
      await this.bp.init();
      this.item = this.bp.bpList.find((item) => item.owner === this.id);
      this.item.unpaid_blocks = parseInt(
        this.item.unpaid_blocks
      ).toLocaleString();
      this.item.last_claim_time = dayjs(
        this.item.last_claim_time / 1000
      ).format("YYYY-MM-DD HH:mm:ss");
      this.item.total_votes = parseInt(this.item.total_votes).toLocaleString();
      this.rank = this.bp.bpList.findIndex((item) => item.owner === this.id);
      if (this.item.json) {
        this.producer = this.item.json.nodes.find(
          (item2) => item2.node_type === "producer"
        );
        this.full = this.item.json.nodes.find(
          (item2) => item2.node_type === "full"
        );
        this.seed = this.item.json.nodes.find(
          (item2) => item2.node_type === "seed"
        );
      }
    }
  },
};
</script>

<style scoped>
tr:nth-child(even) {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}
th,
td {
  white-space: nowrap;
}
</style>
