<template>
  <div class="bg-white px-6 h-32 flex justify-between absolute bottom-0 w-full items-center">
    <div>
      © {{(new Date).getFullYear()}}
      <a
        class="pr-1 text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out"
        href="https://www.fibos123.com/"
      >FIBOS 导航</a>
      |
      <router-link
        to="/about"
        class="pl-1 text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out"
      >BP 信息</router-link>
    </div>
    <div>
      <router-link
        class="text-indigo-500 hover:text-indigo-800 transition duration-150 ease-in-out"
        to="/"
      >返回首页</router-link>
    </div>
  </div>
</template>