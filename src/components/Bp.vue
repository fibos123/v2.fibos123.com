<template>
  <div>
    <div class="px-6">
      <div class="text-2xl pb-4">节点列表</div>

      <div class="flex flex-wrap gap-4 text-center">
        <div v-for="(item) in card" :key="item.name" class="flex-1 rounded bg-white p-4">
          <h2 class="text-gray-600">{{item.name}}</h2>
          <div class="text-lg">{{item.value}}</div>
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
              v-for="i in 100"
              :key="i"
              v-bind:class="{'bg-gray-100': !(i % 2)}"
              class="hover:bg-gray-200"
            >
              <td class="px-6 py-4 whitespace-no-wrap text-gray-500">{{i}}</td>
              <td class="px-6 py-4 whitespace-no-wrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="/public/images/logo_256.png" alt />
                  </div>
                  <div class="ml-4">
                    <div class="text-gray-900">FIBOS123</div>
                    <div class="text-gray-500">fibos123comm</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap">
                <span
                  class="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800"
                >当选节点</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap">
                <div class="text-gray-900">7.230 %</div>
                <div class="text-gray-500 text-sm">229,398,953 FO</div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap text-gray-500">1,862 FO</td>
              <td class="px-6 py-4 whitespace-no-wrap text-gray-500">0 FO</td>
              <td class="px-6 py-4 whitespace-no-wrap text-gray-500">
                <a
                  href
                  class="text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out"
                >https://www.fibos123.com</a>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap">
                <router-link
                  to="/bp/fibos123comm"
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
export default {
  data() {
    return {
      card: [
        {
          name: "生产者",
          value: "chinafibosbp",
        },
        {
          name: "最新区块",
          value: "126,648,550",
        },
        {
          name: "不可逆区块",
          value: "126,648,224",
        },
        {
          name: "出块时间",
          value: "2020-09-07 23:37:20",
        },
      ],
    };
  },
};
</script>
