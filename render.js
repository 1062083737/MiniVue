const h = (tag, props, children) => {
  return {
    // vnode最终会返回一个js对象
    tag,
    props,
    children,
  };
};

const mount = (vnode, container) => {
  // vnode转换成element
  // 1.创建dom，vnode上保留一份el
  const el = (vnode.el = document.createElement(vnode.tag));

  // 2.处理props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];
      // 判断是事件还是属性
      if (key.startsWith("on")) {
        el.addEventListener(key.slice(2).toLowerCase, value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }

  // 3.处理children
  if (vnode.children) {
    if (typeof vnode.children === "string") {
      el.textContent = vnode.children;
    } else {
      vnode.children.forEach((item) => {
        mount(item, el); //递归遍历子元素
      });
    }
  }

  // 4.将el挂载到vnode
  container.appendChild(el);
};

const patch = (n1, n2) => {
  if (n1.tag !== n2.tag) {
    const n1ElParent = n1.el.parentElement;
    n1ElParent.removeChild(n1.el);
    mount(n2, n1ElParent);
  } else {
    const el = (n2.el = n1.el);

    // 1.处理props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    for (const key in newProps) {
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      if (newValue !== oldValue) {
        if (key.startsWith("on")) {
          el.addEventListener(key.slice(2).toLowerCase, newValue);
        } else {
          el.setAttribute(key, newValue);
        }
      }
    }
    for (const key in oldProps) {
      if (!key in newProps) {
        if (key.startsWith("on")) {
          const value = oldProps[key];
          el.removeEventListener(key.slice(2).toLowerCase, value);
        } else {
          el.removeAttribute(key);
        }
      }
    }
    // 2.处理children
    const oldChildren = n1.children || [];
    const newChildlren = n2.children || [];
    if (typeof newChildlren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildlren !== oldChildren) {
          el.textContent = newChildlren;
        }
      } else {
        el.innerHTML = newChildlren;
      }
    } else {
      if (typeof oldChildren === String) {
        el.innerHTML = "";
        newChildlren.forEach((item) => {
          mount(item, el);
        });
      } else {
        const commonLength = Math.min(oldChildren.length, newChildlren.length)
        // 相同节点进行patch
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildlren[i])          
        }
        // 新节点更长
        if (oldChildren.length < newChildlren.length) {
          newChildlren.slice(oldChildren.length).forEach(item => {
            mount(item,el)
          })
        }
        // 旧节点更长
        if (oldChildren.length > newChildlren.length) {
          oldChildren.slice(newChildlren.length).forEach(item => {
            el.removeChild(item.el)
          })
        }

      }
    }
  }
};
