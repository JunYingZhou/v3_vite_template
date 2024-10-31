<!--
    应用右侧部分的头部菜单
-->
<template>
  <div
    :style="{
      marginRight: collapsed ? '80px' : '200px',
      paddingLeft: '10px',
      paddingRight: '10px',
    }"
  >
    <a-row>
      <a-col :span="12">
        <!--收/放侧边菜单-->
        <div class="left-panel">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="changeCollapse"
          />
          <menu-fold-outlined v-else class="trigger" @click="changeCollapse" />
        </div>
      </a-col>
      <a-col :span="12">
        <!--右侧菜单栏-->
        <div class="right-panel">
          <FullscreenExitOutlined v-if="fullScreen" @click="handFullScreen" />
          <FullscreenOutlined v-else @click="handFullScreen" />
          <ReloadOutlined style="padding: 0 10px" @click="handleRefresh" />
          <Avatar></Avatar>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick } from "vue";
import {
  MenuUnfoldOutlined, //不展开菜单
  MenuFoldOutlined, //展开菜单
  FullscreenOutlined, // 全屏
  FullscreenExitOutlined, //退出全屏
  ReloadOutlined, // 刷新按钮
} from "@ant-design/icons-vue";

import Avatar from "../Avatar/index.vue";

import { useSettingStore } from "@/stores/setting";
import screenfull from "screenfull";
const settingStore = useSettingStore();

const collapsed = computed(() => {
  return settingStore.isCollapse;
});
const fullScreen = computed(() => {
  return settingStore.isFullScreen;
});

const emit = defineEmits(["changeCollapse", "changeFullScreen"]);

const changeCollapse = () => {
  emit("changeCollapse");
};

const handFullScreen = () => {
  if (!screenfull.isEnabled) {
    alert("进入全屏失败");
    return false;
  }
  screenfull.toggle();
  settingStore.changeFullScreen(!fullScreen.value);
};

const handleRefresh = () => {
  settingStore.setRouterView(false);
  nextTick(() => {
    settingStore.setRouterView(true);
  });
};
</script>

<style lang="less" scoped>
.left-panel {
  display: flex;
  align-items: center;
  justify-items: center;
  height: 64px;
  font-size: 16px;
}

.right-panel {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  height: 64px;
  font-size: 16px;
}
</style>
