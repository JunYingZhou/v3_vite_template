import router from "@/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";


NProgress.configure({
  showSpinner: false, // 是否显示螺旋圈
  minimum: 0.3, // 进度条最小百分比
  easing: "ease", // 动画效果
  speed: 500, // 进度条动画时间
  trickleSpeed: 200, // 进度条涓流动画时间
});

router.beforeEach((to, from, next) => {
  NProgress.start();
})


router.afterEach(() => {
  NProgress.done();
})