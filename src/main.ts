import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import store from './store'
import router,{setupRouter} from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./assets/js/AxiosInterceptor.js";
import { setupI18n } from '/@/setup/i18n';

const app = createApp(App)
// app.config.productionTip = false;
setupRouter(app)
app.use(Antd);
setupI18n(app);
app.use(setupI18n)
app.mount('#app')