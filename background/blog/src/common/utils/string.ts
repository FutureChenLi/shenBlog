/*
 * @Description:  html符号转换工具类
 * @Author: shenxf
 * @Date: 2019-04-10 21:29:15
 */
export let escape2Html = function(str: String) {
    const arrEntities: any = {
        'lt': '<',
        'gt': '>',
        'nbsp': ' ',
        'amp': '&',
        'quot': '"'
    };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
        return arrEntities[t];
    });
};