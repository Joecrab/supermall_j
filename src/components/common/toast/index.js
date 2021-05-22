import Toast from './Toast.vue';
const obj = {};
obj.install = function(Vue){
    //1.创建组件构造器，Vue.extend是之前的知识了，组件使用的3个步骤
    const toastConstructor = Vue.extend(Toast);

    //2.根据组件构造器可以创建组件对象
    const toast = new toastConstructor();

    //3.手动将组件对象挂载到一个元素上
    toast.$mount(document.createElement('div'));

    //4.toast.$el对应的就是那个div了
    document.body.appendChild(toast.$el);

    Vue.prototype.$toast = toast;
}

export default obj;

//这是用插件方式去使用组件，如果想用普通方式去用的话，就是在父组件中import 再注册Toast就好了