/*
 * @Description: 点滴控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */

// 获得点滴页
exports.getGather = async function (ctx) {
    ctx.render("gather.art", {
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        },
        gather: {
            name: "aui",
            tags: ["art", "template", "nodejs"]
        }
    });
};