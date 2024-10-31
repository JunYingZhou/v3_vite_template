<!--
   应用模板，用于渲染路由页面数据
-->
<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="[`product-list`]">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>
