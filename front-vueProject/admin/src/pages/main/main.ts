/**
 * @Description: 主框架
 * @Author: shenxf
 * @Date: 2019-05-07 19:49:12
 */
import { Layout, Menu, Icon, LocaleProvider } from 'ant-design-vue';
import { Vue, Component, Watch } from 'vue-property-decorator';
// 这里吐槽一句，vue的antd按需加载真特么丑陋，
// 一点也不优雅，还浪费了我大把的时间。感觉全部直接引用更好
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(LocaleProvider);

@Component
export default class App extends Vue {

    private collapsed = false;
    private username = '';
    private current = '/articleList';

    private created(): void {
        this.username = 'shenxf';
        this.current = this.$route.path;
    }

    /**
     * @description: 点击左侧tab事件
     * @param {any} e - event
     */
    private handleClick(e: any): void {
        this.$router.push(e.key);
    }

    /**
     * @description: 注销处理
     */
    private logout(): void {

        // 删除token
        this.$store.commit('removeToken');

        // 取到登录页面
        this.$router.push('/login');
    }

    /**
     * @description: 监视路由变化，如果有变化就把当前的选择tab改成对应的tab
     * @param {any} val - 变化后路由
     * @param {any} oldVal - 变化前路由
     */
    @Watch('$route')
    private onChildChanged(val: any, oldVal: any): void {
        this.current = val.path;

        // 如果是添加画面，就把content的值清空
        if (this.current.includes('add')) {
            this.$store.commit('saveContent', '');
        }
    }
}
