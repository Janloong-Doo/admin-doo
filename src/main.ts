import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import store from './store'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./assets/js/AxiosInterceptor.js";

const app = createApp(App)
// app.config.productionTip = false;
app.use(Antd);
app.use(router)
app.use(store)
app.mount('#app')