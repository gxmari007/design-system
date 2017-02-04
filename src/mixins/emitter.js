/**
 * 非父子组件通信
 */

function broadcast(componentName, eventName, ...params) {
  this.$children.forEach((child) => {
    const name = child.$options.componentName;

    if (name === componentName) {
      child.$emit(eventName, ...params);
    } else {
      broadcast.call(child, componentName, eventName, ...params);
    }
  });
}

export default {
  methods: {
    // 事件冒泡，向父级组件冒泡事件
    dispatch(componentName, eventName, ...params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }

      if (parent) {
        parent.$emit(eventName, ...params);
      }
    },
    // 事件派发，向子级组件派发事件
    broadcast(componentName, eventName, ...params) {
      broadcast.call(this, componentName, eventName, ...params);
    },
  },
};
