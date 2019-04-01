/*
 * @Description: 文章控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */

// 获得文章页
exports.getArticle = function (req, res) {
    res.render('article.art', {
        common: {
            hasBanner: false,
        },
        article: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
};

exports.getArticleDetail = function (req, res) {
    console.log(req.params.id);
    res.render('article-detail.art', {
        common: {
            hasBanner: false,
        },
        articleDetail: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
}