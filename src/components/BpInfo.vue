<template>
  <div class="px-6">
    <div class="bg-white p-6 rounded">
      <div class="border-b pb-4">
        <h1 class="text-2xl">{{id}} 节点详情</h1>
        <a
          href
          class="text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out"
        >https://www.fibos123.com</a>
      </div>
      <h2 class="text-xl py-4">基本信息</h2>
      <table class="w-full">
        <tr>
          <th class="p-4 text-right" width="150">创建时间</th>
          <td>2018-08-28 16:59:01 +0900</td>
        </tr>
        <tr class="bg-gray-100">
          <th class="p-4 text-right">排名</th>
          <td>1</td>
        </tr>
        <tr>
          <th class="p-4 text-right">得票率</th>
          <td>7.230 %</td>
        </tr>
        <tr class="bg-gray-100">
          <th class="p-4 text-right">有效票数</th>
          <td>229,398,953 FO</td>
        </tr>
        <tr>
          <th class="p-4 text-right">得票权重</th>
          <td>4,045,422,083,566,628,400</td>
        </tr>
      </table>
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
export default {
  props: {
    id: String,
  },
};
</script>
