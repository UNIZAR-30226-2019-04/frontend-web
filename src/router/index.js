import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../views/Hello'
import About from '../views/About'
import Login from '../views/pages/Login'
import Register from '../views/pages/Register'
import Profile from '../views/pages/Profile'
import Search from '../views/pages/Search'
import EditProfile from "../views/pages/EditProfile";
import ProductPage from '@/components/ProductPage/ProductPage'
import UploadProduct from "../views/pages/UploadProduct"; // Ruta absoluta. Habrá que cambiar las rutas de arriba que son relativas
import PruebaProducto from "../views/pages/PruebaProducto";
import CompraProducto from "../components/CompraProducto";
import store from "../store"
import Dashboard from "../views/pages/Dashboard";
import Chat from "../views/pages/Chat";
import Confirmacion from "../views/pages/Confirmacion";


// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
// const Dashboard_coreui = () => import('@/views/Dashboard_coreui')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
// const Login = () => import('@/views/pages/Login')
// const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users');
const User = () => import('@/views/users/User');


Vue.use(Router);

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  beforeEach: {

  },
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/login',
      name: 'LogIn',
      component: Login,
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          next('/Profile');
        } else {
          next();
        }
      }
    },
    {
      path: '/Sign',
      name: 'Sign',
      component: Register
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile,
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          next();
        } else {
          next('/Login');
        }
      }
    },
    {
      path: '/EditProfile',
      name: 'EditProfile',
      component: EditProfile,
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          next();
        } else {
          next('/Login');
        }
      }
     },
    {
      path: '/ProductPage',
      name: 'ProductPage',
      component: ProductPage,
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          next();
        } else {
          next('/Login');
        }
      }
    },
    {
      path: '/PruebaProducto',
      name: 'PruebaProducto',
      component: PruebaProducto
    },
    {
      path: '/UploadProduct',
      name: 'UploadProduct',
      component: UploadProduct,
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          next();
        } else {
          next('/Login');
        }
      }
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search

    },
    {
      path: '/CompraProducto',
      name: 'CompraProducto,',
      component: CompraProducto
    },
    {
      path: '/Chat',
      name: 'Chat,',
      component: Chat,
      beforeEnter(to, from, next) {
        if (store.getters.isLoggedIn) {
          next();
        } else {
          next('/Login');
        }
      }
    },
    {
      path: '/pages',
      redirect: '/pages/login',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      }
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/Confirmacion',
      name: 'Confirmacion',
      component: Confirmacion
    }
  ]
})
