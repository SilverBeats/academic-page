import '@/assets/css/main.css'
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import {loadFile} from "@/utils/tools.js"
import {createRouter, createWebHistory} from 'vue-router'

String.prototype.title = function () {
    return this.replace(/\w\S*/g, function (word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
};


const app = createApp(App)
app.use(ElementPlus)

app.provide('windowWidth', window.innerWidth)
app.provide('isMobile', window.innerWidth <= 992)

loadFile('config.json').then(result => {
    const websiteConfig = JSON.parse(result)
    app.provide('websiteConfig', websiteConfig)
    const routes = [
        {name: 'postView', path: '/post', component: () => import('@/views/PostView.vue')},
    ]
    // 配置路由信息
    for (let key in websiteConfig['navInfo']) {
        routes.push({
            name: key + 'View',
            path: websiteConfig['navInfo'][key],
            component: () => import(`@/views/${key.title()}View.vue`)
        })
    }
    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL), routes: routes
    })
    app.use(router)
}).finally(_ => {
    app.mount('#app')
})
