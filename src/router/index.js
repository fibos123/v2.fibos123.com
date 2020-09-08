import { createRouter, createWebHashHistory } from "vue-router"

import Home from "@/components/Home"
import Bp from "@/components/Bp"
import BpInfo from "@/components/BpInfo"
import Monitor from "@/components/Monitor"
import About from "@/components/About"
import Pointer from "@/components/Pointer"

const routerHistory = createWebHashHistory()

const router = createRouter({
  history: routerHistory,
  mode: "hash",
  routes: [
    {
      path: "/",
      component: Home,
      meta: {
        title: "FIBOS 导航"
      }
    },
    {
      path: "/bp",
      component: Bp,
      meta: {
        title: "节点列表 | FIBOS 导航"
      }
    },
    {
      path: "/bp/:id",
      component: BpInfo,
      props: true,
      meta: {
        title: "节点信息 | FIBOS 导航"
      }
    },
    {
      path: "/monitor",
      component: Monitor,
      meta: {
        title: "节点监控 | FIBOS 导航"
      }
    },
    {
      path: "/monitor/pointer",
      component: Pointer,
      meta: {
        title: "节点监控 | FIBOS 导航"
      }
    },
    {
      path: "/about",
      component: About,
      meta: {
        title: "BP 信息 | FIBOS 导航"
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  window.scrollTo(0, 0)
  next()
})


export default router
