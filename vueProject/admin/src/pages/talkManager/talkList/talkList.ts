/**
 * @Description: 说说管理主处理
 * @Author: shenxf
 * @Date: 2019-04-30 19:03:06
 */
import { Component, Vue  } from 'vue-property-decorator';
import { Table, Popconfirm, Spin, message } from 'ant-design-vue';
import TaskBar from '../../../components/taskBar.vue';
Vue.use(Table);
Vue.use(Popconfirm);
Vue.use(Spin);

@Component({
    components: {
        TaskBar,
    },
})
export default class TalkList extends Vue {

    spinning: boolean = false;
    dataSource: any[] = [];
    columns: any[] = [{
        title: 'ID',
        dataIndex: 'id',
    }, {
        title: '详细',
        dataIndex: 'detail',
        scopedSlots: {
            customRender: 'detail',
        },
    }, {
        title: '创建时间',
        dataIndex: 'created_at',
    }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: {
            customRender: 'operation',
        },
    }];

    private created(): void {
        this.getTalks();
    }

    /**
     * @description: 取得说说列表
     * @param {boolean} isLoad - 是否要加载
     */
    private getTalks(isLoad: boolean = true): void {
        // 设置加载
        if (isLoad) {
            this.spinning = true;
        }

        // 请求表格数据
        this.$axios.get('get-gossip').then((res: any) => {
            if (res.data.status === 1) {
                this.dataSource = res.data.info;
            }
        }).catch((resion: any) => {
            message.error('数据取得异常');
        }).finally(() => {
            if (isLoad) {
                this.spinning = false;
            }
        });
    }

    /**
     * @description: 删除
     * @param {string} key - 删除行key
     */
    private onDelete(id: string): void {
        this.spinning = true;
        this.$axios.get(`gossip-delete/${id}`)
            .then((res: any) => {

                if (res.data.status === 1) {
                    const dataSource = [...this.dataSource];
                    this.dataSource = dataSource.filter(item => item.key !== id);
                    // 数据再取得
                    // this.getCollection(false);
                }

            }).catch((resion: any) => {
                message.error('数据删除异常');
            }).finally(() => {
                this.spinning = false;
            });
    }
}