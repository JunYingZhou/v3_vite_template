import { fileURLToPath, URL } from 'node:url'

import { visualizer } from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';
//@ts-ignore
import postcsspxtoviewport from 'postcss-px-to-viewport';
import { defineConfig, loadEnv } from 'vite';
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import importToCDN from 'vite-plugin-cdn-import';
import viteCompression from 'vite-plugin-compression';
import { en } from 'element-plus/es/locales.mjs';



// https://vite.dev/config/
export default defineConfig( ({command, mode}) => {

  const envDir: string = path.resolve(__dirname, `./env`); // 设置环境变量的目录
  const envPrefix: string = 'VITE_'; // 设置环境变量的前缀，暴露import.meta.env.VITE_APP_BASE_API
  const env = loadEnv(mode, envDir, envPrefix); // 获取环境变量
  const { VITE_APP_BASE_API, VITE_CSS_PREFIX, VITE_PHONE, VITE_APP_TITLE } = env;
  const outDir = `./dist/${VITE_APP_TITLE}`; // 设置打包和预览目录

  console.log('命令: ', command);
  console.log('环境: ', mode);
  console.log('环境变量: ', env);

  return {
    plugins: [
      vue(),
      visualizer({
        open: true,
        gzipSize: true, // 是否统计gzip大小
      }),
      viteCompression(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      importToCDN({
        modules: [
		      {
		        name:"vue",
		        var:"Vue",
		        path:"https://unpkg.com/vue@3.2.31"
		      },
		      {
		        name:"element-plus",
		        var:"ElementPlus",
		        path:"https://unpkg.com/element-plus@2.1.9",
		        css:"https://unpkg.com/element-plus/dist/index.css"
		      },
		    ], // 配置cdn引入
      })
    ],
    base: './', // 设置打包路径
    mode: mode, // production || development 用于开发的时候使用某个环境的配置，默认development
    clearScreen: true, // 启动时清空控制台
    envPrefix: envPrefix, // 设置环境变量的前缀，暴露import.meta.env.VITE_APP_BASE_API
    envDir: envDir, // 设置环境变量的目录
    cacheDir: path.resolve(__dirname, './cache'), // 设置缓存目录
    server: {
      port: 5173, // 启动端口号
      host: true, // 开启热点ip地址
      open: true, // 启动是否自动打开浏览器预览
      strictPort: false, // 端口被占用时是否直接退出
      cors: true, // 允许跨域
      headers: {}, // 设置请求头
      proxy: {
        '/api': {
          target: VITE_APP_BASE_API, // 代理目标地址
          changeOrigin: true, // 是否开启代理
          rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
        },
      },
    },
    build: {
      rollupOptions: {
        plugins: [visualizer()],
        output: {
          experimentalMinChunkSize: 200 * 1024, // 设置打包时最小打包体积
          chunkFileNames: 'assets/js/[name]-[hash].js', // 设置打包时js文件名
          entryFileNames: 'assets/js/[name]-[hash].js', // 设置打包时入口文件名
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // 设置打包时静态资源文件名
          compact: true, // 设置打包时是否压缩
          manualChunks(id: string) { // 设置打包时拆分文件
            if (id.includes("@ant-design")) {
              return "@ant-design";
            }

            if (id.includes("ant-design-vue")) {
              return "ant-design-vue";
            }

            if (id.includes("@vue")) {
              return "@vue";
            }
          },
        },
      },
      chunkSizeWarningLimit: 1500, // 打包时超过1500kb的提示
      target: 'modules', // 设置打包环境
      outDir: outDir, // 设置打包输出目录
      assetsDir: './assets', // 设置打包输出静态资源目录
      assetsInlineLimit: 1024 * 1024, // 设置打包时静态资源小于1M时，打包成base64格式变成内联样式，只要js加载出来，图片就会加载出来，0延迟
      reportCompressedSize: false, // 打包时是否生成打包体积报告，提升构建速度
    },
    preview: {
      outDir: outDir, // 设置预览输出目录
      port: 4173, // 预览端口号
      host: true, // 预览时是否开启热点ip地址
      open: true, // 预览时是否自动打开浏览器预览
      strictPort: false, // 端口被占用时是否直接退出
      cors: true, // 允许跨域
    },
    css: {
      modules: {
        generateScopedName: `${VITE_CSS_PREFIX}_[hash:base64:5]_[local]`, // 设置css模块化的类名
        globalModulePaths: [], // 代表不想参与到css模块化的路径
      },
      postcss: {
        plugins: [
          ...(VITE_PHONE === 'true'
            ? [
                postcsspxtoviewport({
                  unitToConvert: 'px', // 要转化的单位
                  viewportWidth: 375, // UI设计稿的宽度，pc=1920，phone=375
                  unitPrecision: 6, // 转换后的精度，即小数点位数
                  propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
                  viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
                  fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
                  selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
                  minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
                  mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
                  replace: true, // 是否转换后直接更换属性值
                  // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
                  landscape: false, // 是否处理横屏情况
                }),
              ]
            : []),
          tailwindcss, // 引入后解决tailwindcss与postcsspxtoviewport覆盖问题
          autoprefixer,
        ],
      },
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
} )
