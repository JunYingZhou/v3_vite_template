<!--
    应用框架Logo模板部分
-->
<template>
  <div class="logo-wrapper">
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.png"
      width="30"
      height="30"
      style="margin: 4px"
    />
    <span class="logo-title" style="color: #dcdcdc" v-if="!collapsed">
      签证后台管理系统
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useSettingStore } from "@/stores/setting";
const settingStore = useSettingStore();

const collapsed = computed(() => {
  return settingStore.isCollapse;
});
</script>

<style lang="less">
.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid gray;
  height: 60px;
}
</style>
