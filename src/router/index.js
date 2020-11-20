import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
    default: index,
    children: [
      { path: '', name: 'index', component: () => import('../views/index') },
      { path: 'search', name: 'searchlist', component: () => import('../views/searchlist/index') },
      { path: 'person', name: 'personindex', component: () => import('../views/person/personIndex') },
      { path: 'songDetail', name: 'songDetail', component: () => import('../views/song/songDetail') },
      { path: 'sheetDetail', name: 'sheetDetail', component: () => import('../views/song/sheetDetail') },
      { path: 'rank', name: 'rank', component: () => import('../views/rank/rank') },
      { path: 'cloud', name: 'cloud', component: () => import('../views/cloud/index') },
      { path: 'playlist', name: 'playlist', component: () => import('../views/playlist/index') },
      { path: 'artist', name: 'artist', component: () => import('../views/artist/index') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
