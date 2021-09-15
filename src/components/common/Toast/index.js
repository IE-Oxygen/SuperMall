import Toast from './Toast'

const obj = {}

obj.install = function (Vue){
    //1.创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    //2.使用组件构造器，new一个组件对象
    const toast = new toastContrustor();
    //3.将组件对象，手动挂载到某一元素上
    toast.$mount(document.createElement('div'));
    //4.taost.$el 对应的就是新创建组件对象toast的div，把它添加到全局网页上
    document.body.appendChild(toast.$el);
    //添加到Vue的原型上（注意小写）
    Vue.prototype.$toast = toast;
}

export default obj