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
      path: '/api/admin',
      component: () =>import('@/views/admin/AdminView.vue')
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
          path: '/admin',
          name: 'admin',
          component: () =>import('@/views/admin/AdminView.vue'),
          children : [
            {
              path:'',
              component:()=>import('@/views/admin/UsersView.vue')
            },
            {
            path: 'getUsers',
            name: 'Users',
            component: () => import('@/views/admin/UsersView.vue')
          },
          {
            path: 'addUser',
            name: 'addUser',
            component:()=> import ('@/components/admin/AddUserForm.vue')
          },
          {
            path: 'getLabs',
            name: 'Labs',
            component:()=>import('@/views/admin/LabsViews.vue')
          },
          {
            path: 'getAnnouncements',
            name: 'Announcements',
            component:()=> import('@/views/admin/AnnouncesView.vue')
          }
          ]
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
//路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta?.requiresAuth)) {
    const store = useTokenStore()
    if (!store.token.name) {
      return next({ name: 'login', query: { redirect: to.fullPath } }) // 使用 return
    }
  }

  next() // 仅在没有重定向的情况下调用
})

export default router
