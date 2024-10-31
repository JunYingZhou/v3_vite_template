<template>
  <a-dropdown>
    <a :style="{ color: '#666' }" class="ant-dropdown-link" @click.prevent>
      <!-- {{ userStore.getUserName }}-{{ userStore.getUserJobNumber }} -->
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;" @click="logout">注销</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { Modal } from "ant-design-vue";
// import { useUserStore } from "@stores/modules/user";
// const userStore = useUserStore();

const logout = () => {
  Modal.confirm({
    title: "注销",
    content: "确认要退出登入？",
    onOk() {
      // userStore.logout();
    },
    onCancel() {},
  });
};
</script>
