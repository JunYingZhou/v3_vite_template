<script setup lang="ts">
import { onMounted } from "vue";
import * as AntdIcons from "@ant-design/icons-vue";

defineProps({
    item: {
        type: Object,
        default: () => {
            return {}
        }
    }
})

onMounted(() => {
    console.log(AntdIcons)
})
</script>

<template>
    <a-menu-item :key="item.path" v-if="!item.children || (item.children && item.children.length == 0)">
        <component v-if="item.icon" :is="AntdIcons[item.icon]"></component>
        <span>
            {{ item.title }}
        </span>
    </a-menu-item>
    <a-sub-menu :key="item.path" v-else>
        <template #icon>
            <component :is="AntdIcons[item.icon]"></component>
        </template>
        <template #title>
            {{ item.title }}
        </template>
        <template v-for="optinon in item.children" :key="optinon.path">
            <template v-if="!optinon.hidden">
                <menu-item :item="optinon" :key="optinon.path"></menu-item>
            </template>
        </template>
    </a-sub-menu>
</template>