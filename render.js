const h = (tag,props,children) => {

    return {
        // vnode最终返回一个js对象
        tag,
        props,
        children
    }
}

const mount = (vnode, container) => {
    // vnode转换成element
    // 1.创建dom，vnode上保留一份el
    const el = vnode.el = document.createElement(vnode.tag)

    // 2.处理props
    if (vnode.props) {
        for(const key in vnode.props) {
            const value = vnode.props[key]
            // 判断是事件还是属性
            if (key.startsWith('on')) {
                el.addEventListener(key.slice(2).toLocaleLowerCase, value)
            } else {
                el.setAttribute(key, value)
            }
        }
    }

    // 3.处理children
    if (vnode.children) {
        if (typeof vnode.children === 'string') {
            el.textContent = vnode.children
        } else {
            vnode.children.forEach(item => {
                mount(item, el) //递归遍历子元素
            })
        }
    }

    // 4.将el挂载到vnode
    container.appendChild(el)
}