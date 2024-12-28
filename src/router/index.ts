import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import IndexView from '@/views/indexView.vue'
import { useTokenStore } from '@/stores/mytoken'
//const store = useTokenStore()
//import LoginView from '@/views/login/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
    },
    {
      path: '/',
      name: '',
      component: AppLayout,
      meta: { requiresAuth: true }, //是否需要登录验证
      children: [
        //孩子路径 都显示在右边的大方框里
        {
          path: '',
          name: 'home',
          component: IndexView,
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          //懒加载 执行的时候才导入
          component: () => import('../views/AboutView.vue'),
        },
        {
          path: '/:xxx(.*)*',
          name: 'ErrorPage',
          component: () => import('@/views/ErrorPage.vue'),
        },
      ],
    },
  ],
})
//路由守卫 不管用？
router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta?.requiresAuth)) {
    const store = useTokenStore()
    if (!store.token.id) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    }
  }

  next()
})

export default router
