import { createRouter, createWebHistory } from 'vue-router'

import vMainPage from '../components/pages/vMainPage'
import vCatalogPage from '../components/pages/vCatalogPage'
import vPaidOrder from '../components/pages/vPaidOrder'
import vHelpPage from '../components/pages/vHelpPage'
import vItem from '../components/pages/vItem'
import vAdminPage from '../components/pages/vAdminPage'
import vSetKey from '../components/pages/vSetKey'

const routes = [
  {
    path: '/',
    name: 'vMainPage',
    component: vMainPage
  },
  {
    path: '/catalog',
    name: 'vCatalogPage',
    component: vCatalogPage
  },
  {
    path: '/order/:orderId',
    name: 'vPaidOrder',
    component: vPaidOrder
  },
  {
    path: '/help',
    name: 'vHelpPage',
    component: vHelpPage
  },
  {
    path: '/admin',
    name: 'vAdminPage',
    component: vAdminPage
  },
  {
    path: '/item/:itemId',
    name: 'vItem',
    component: vItem
  },
  {
    path: '/setKey',
    name: 'vSetKey',
    component: vSetKey
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
