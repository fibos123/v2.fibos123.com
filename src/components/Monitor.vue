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

      <div class="flex flex-wrap gap-4 text-center">
        <div v-for="(item) in card" :key="item.name" class="flex-1 rounded bg-white p-4">
          <h2 class="text-gray-600">{{item.name}}</h2>
          <div class="text-lg">{{item.value}}</div>
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
              <th class="px-4 py-2 bg-gray-50 text-left text-xs text-gray-500 tracking-wider">最终生产时间</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="i in 21"
              :key="i"
              v-bind:class="{'bg-gray-100': !(i % 2)}"
              class="hover:bg-gray-200"
            >
              <td class="px-4 py-2 whitespace-no-wrap text-gray-500">{{i}}</td>
              <td class="px-4 py-2 whitespace-no-wrap">
                <div class="flex items-center">
                  <div class="ml-2">
                    <div class="text-gray-900">fibos123comm</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-2 whitespace-no-wrap">
                <span
                  class="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800"
                >在线</span>
              </td>
              <td class="px-4 py-2 whitespace-no-wrap text-gray-500">126,660,844</td>
              <td class="px-4 py-2 whitespace-no-wrap text-gray-500">2020-09-08 01:19:59</td>
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
