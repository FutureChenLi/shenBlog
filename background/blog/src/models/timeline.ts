/*
 * @Description: 慢生活模型
 * @Author: shenxf
 * @Date: 2019-04-10 22:08:51
 */
import db from './db';

export let getTimeline = async (current: number = 1, count: number = 30, category: number = 0) => {

    const sqls = [
        'select id, theme from category where status = 1'
    ];

    let sql = '';
    const field = 'article.id, title, created_at';

    if (category == 0) {
        sql = `select ${field} from article where article.status = 1
			order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
        sqls.push(sql);

        sql = 'select count(*) as total from article where status = 1';
        sqls.push(sql);
    } else {
        sql = `select ${field} from article where category = ${+category} and article.status = 1
			order by created_at desc limit ${(+current - 1) * +count}, ${+count}`;
        sqls.push(sql);

        sql = `select count(*) as total from article where status = 1 and category = ${+category}`;

        sqls.push(sql);
    }

    const ps = [];

    for (sql of sqls) {
        ps.push(
            db.query(sql)
        );
    }

    try {
        const p = await Promise.all(ps);
        return result(p);
    } catch (error) {
        return {'status': 0, 'msg': '系统异常'};
    }
};

const result = (out: any) => {
    return {
        status: 1,
        categories: out[0],
        items: out[1],
        total: out[2][0]['total']
    };
};