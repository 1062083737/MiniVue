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


<!-- ## 响应式
vue将data初始化为一个Observer，然后使用Object.defineProperty或proxy对对象中的每个值重写了get、set
data中的每一个key，都有一个Dep，Dep方法的作用是收集依赖
在get中，向Dep添加了监听
在实例挂载时，实现了一个watcher，将Dep的目标指向Watcher
在data值发生变更时，触发set，触发了Dep中的所有监听的更新，来触发Watcher.update -->