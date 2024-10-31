/**
 * 路由数据
 */
import { defineStore } from "pinia";
import { convertRouter } from "@/utils/handleRoute";
import { constantRouters } from "@/config/router.config";
import { ref, computed } from "vue";

export const useRoutesStore = defineStore('RoutesStore', () =>{
    const routes = ref<any[]>([]);
    const keepAliveRoutes = ref<any[]>([]);
    
    // getter,计算属性
    const getRoutes =computed(() => routes.value);

    const setRoutes = (routers: any[]) => {
        // 获取路由数据（api）
        routes.value = constantRouters.concat(convertRouter(routers));
    }

    // const getRoutes = () => {
    //     return routes.value;
    // }

    const getConstantRoutes = () => {
        return constantRouters;
    }

    return {
        routes,
        setRoutes,
        getRoutes,
        getConstantRoutes,
        keepAliveRoutes
}
})