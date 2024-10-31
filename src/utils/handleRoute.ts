import { dynamicRouters } from "@/config/router.config";
import { el } from "element-plus/es/locales.mjs";

/**
 * 将后端路由转换为前端路由
 * @param routers 后端路由
 * @returns 转换后路由
 */
export const convertRouter = (routers: any) => {
    console.log("开始转换routers", routers);
    const validRouters = [] as any[];
    routers.filter((route: any) => {
        // 递归处理子路由,将后端路由转换为前端路由
        const itemRouter = setRoutes(route, dynamicRouters);
        if (itemRouter) {
            validRouters.push(itemRouter);
        }
    })
    return validRouters;
}





/**
 * 构建后端路由成前端路由
 * @param {*}route 后端路由
 * @param {*}list 前端动态路由配置项
 * @returns {*}
 */

const setRoutes = (route: any, list: any) => {
    let validFilter = 0;
    list.filter((item: any) => {
        if(item.name === route.name){
            validFilter = 1;
            item.path = route.path;
            item.component = route.component;
            item.meta = route.meta;
            item.name = route.name;
            item.icon = route.icon;
            item.redirect = route.redirect;
            item.hidden = route.hidden;
            if (route.children && route.children.length > 0 && item.children && item.children.length > 0) {
                const children = [] as any[];
                route.children.filter((options: any[]) => {
                    // 作用是过滤掉没有权限的子路由
                    const childRoute = setRoutes(options, item.children);
                    if (childRoute) {
                        children.push(childRoute);
                    }
                });
                route.children = children;
            }else {
                route.children = null;
            }
        }
    });
    return validFilter === 1 ? route : null;
}

