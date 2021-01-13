import { getGobalUser, setGobalUser } from "./store/index";
export default ({
    Vue, // 当前 VuePress 应用所使用的 Vue 版本
    options, // 根 Vue 实例的选项
    router, // 应用程序的路由实例
    siteData // 网站元数据
}) => {
    Vue.prototype.$getGobalUser = getGobalUser;
    Vue.prototype.$setGobalUser = setGobalUser;
};
