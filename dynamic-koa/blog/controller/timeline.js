/*
 * @Description: 归档控制
 * @Author: shenxf
 * @Date: 2019-03-28 16:22:17
 */

// 获得归档页
exports.getTimeline = async function (ctx) {
    await ctx.render("timeline.art", {
        ...ctx.res.$initValue,
        common: {
            hasBanner: false
        }
    });
};