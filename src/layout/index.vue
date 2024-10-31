
<template>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import Logo from '@/layout/logo/index.vue'

</script>


<style scoped lang="scss">
.layout-container {
    width: 100%;
    height: 100vh;
    background-color: #f0f2f5;

    .layout_slider {
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        transition: all 0.3s;

        .scrollbar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);
        .el-menu {
            border-right: none;
        }
        }
    }
}
</style>