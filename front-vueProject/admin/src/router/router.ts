/**
 * @Description: 路由配置
 * @Author: shenxf
 * @Date: 2019-04-20 21:10:19
 */
import VueRouter from 'vue-router';

// 导入对应的路由组件
const login = () => import('../pages/login/login.vue'); // 按需加载组件，懒加载，官方推荐
const Main = () => import('../pages/main/main.vue');
const articleList = () => import('../pages/articleManager/articleList/articleList.vue');
const addArticle = () => import('../pages/articleManager/addArticle/addArticle.vue');
const updateArticle = () => import('../pages/articleManager/updateArticle/updateArticle.vue');
const addCollection = () => import('../pages/collectionManager/addCollection/addCollection.vue');
const updateCollection = () => import ('../pages/collectionManager/updateCollection/updateCollection.vue');
const collectionList = () => import('../pages/collectionManager/collectionList/collectionList.vue');
const addTalk = () => import('../pages/talkManager/addTalk/addTalk.vue');
const updateTalk = () => import('../pages/talkManager/updateTalk/updateTalk.vue');
const talkList = () => import('../pages/talkManager/talkList/talkList.vue');

// 3. 创建路由对象
const router = new VueRouter({
    // mode: 'history',

    // 配置路由规则
    routes: [
        {
            path: '/login',
            component: login,
        },
        {
            path: '/',
            component: Main,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    redirect: '/login',
                },
                {
                    path: 'home',
                    component: articleList,
                },
                {
                    path: 'articleList',
                    component: articleList,
                },
                {
                    path: 'addArticle',
                    component: addArticle,
                },
                {
                    path: 'updateArticle/:id',
                    component: updateArticle,
                },
                {
                    path: 'addCollection',
                    component: addCollection,
                },
                {
                    path: 'collectionList',
                    component: collectionList,
                },
                {
                    path: 'updateCollection/:id',
                    component: updateCollection,
                },
                {
                    path: 'addTalk',
                    component: addTalk,
                },
                {
                    path: 'talkList',
                    component: talkList,
                },
                {
                    path: 'updateTalk/:id',
                    component: updateTalk,
                },
            ],
        },
    ],
    // linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
});

// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

        if (!localStorage.getItem('token')) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next(); // 确保一定要调用 next()
    }
});

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const tmpRouter: any = router;
    const targetPath = tmpRouter.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});

// 把路由对象暴露出去
export default router;
