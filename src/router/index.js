import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import MohanPlcView from '../views/MohanPlcView.vue'
import MohanInternationalView from '../views/MohanInternationalView.vue'
import VinaTradeView from '../views/VinaTradeView.vue'
import MohanWireView from '../views/MohanWireView.vue'
import CsrView from '../views/CsrView.vue'
import NewsView from '../views/NewsView.vue'
import NewsInvestEthiopiaView from '../views/NewsInvestEthiopiaView.vue'
import NewsTaxRecognitionView from '../views/NewsTaxRecognitionView.vue'
import DdfTzOperationsView from '../views/DdfTzOperationsView.vue'
import CatalogView from '../views/CatalogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/mohan-plc',
      name: 'mohan-plc',
      component: MohanPlcView
    },
    {
      path: '/mohan-international',
      name: 'mohan-international',
      component: MohanInternationalView
    },
    {
      path: '/vina-trade-and-industry',
      name: 'vina-trade-and-industry',
      component: VinaTradeView
    },
    {
      path: '/mohan-wire-industries',
      name: 'mohan-wire-industries',
      component: MohanWireView
    },
    {
      path: '/csr',
      name: 'csr',
      component: CsrView
    },
    {
      path: '/ddftz-operations',
      name: 'ddftz-operations',
      component: DdfTzOperationsView
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView
    },
    {
      path: '/news/time-to-invest-in-ethiopia',
      name: 'news-invest-ethiopia',
      component: NewsInvestEthiopiaView
    },
    {
      path: '/news/federal-taxpayers-recognition-ceremony',
      name: 'news-tax-recognition',
      component: NewsTaxRecognitionView
    }
  ]
})

export default router
