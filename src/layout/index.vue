
<template>
    <div class="layout_container">
        <!-- 左侧滑动栏 -->
        <div class="layout_slider">
            <Logo></Logo>
        <!-- 滚动组件 -->
        <el-scrollbar class="scrollbar">
            <!-- 菜单组件-->
            <p v-for="item in [1, 2, 3]" :key="item">滚动组件</p>
            <el-menu
            :collapse="true"
            :default-active="$route.path"
            background-color="#001529"
            text-color="white"
            active-text-color="yellowgreen"
            >
            <!--根据路由动态生成菜单-->
            <!-- <Menu :menuList="userStore.menuRoutes"></Menu> -->
            </el-menu>
        </el-scrollbar>
        </div>
    </div>
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