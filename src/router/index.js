import ProductList from '../components/ProductList.vue'
import ProductDetail from '../components/ProductDetail.vue'
import Wishlist from '../components/Wishlist.vue'

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true,
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
  },
]

export default routes 