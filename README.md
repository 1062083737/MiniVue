# MiniVue
实现一个简易的vue,主要实现三个模块：
* 渲染系统模块(runtime)
* 可响应式系统模块(reactivity)
* 应用程序入口模块
之所以不实现complier模块是因为我又菜又懒

## Runtime模块
* h函数，用于返回vnode <br>
* mount函数，用于将vnode挂载到dom <br>
* patch函数，用于将两个vnode进行对比，处理新的vnode <br>
