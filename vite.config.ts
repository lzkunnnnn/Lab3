import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vite.dev/config/
export default defineConfig({
/*   server: {
    proxy: {
      '/front': {
        // front/ad/getAdList  就会拼接下面的target
        target: 'https://mock.apifox.cn/m1/2401164-0-default',
        changeOrigin: true,
      },
      '/boss': {
        target: 'https://mock.apifox.cn/m1/2401164-0-default',
        changeOrigin: true,
      },
    },
  }, */
  server: {
    proxy: {
      '/api/': {
        target: 'http://120.46.159.231:8088/2022212869',
        changeOrigin: true
      }
    }
  },

  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(), // 自动导入图标组件
        IconsResolver(),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
