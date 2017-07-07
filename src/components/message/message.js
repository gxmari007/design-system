import Vue from 'vue';
import CoMessage from './message.vue';

let instance = null;
const message = {};
const messages = [];
const MessageConstructor = Vue.extend(CoMessage);

const Message = (options) => {
  if (Vue.prototype.$isServer) return null;

  let opts = options || {};

  if (typeof opts === 'string') {
    opts = {
      content: opts,
    };
  }

  instance = new MessageConstructor({ data: options });

  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  messages.push(instance);

  return instance;
};

['info', 'success', 'error', 'warning'].forEach((type) => {
  message[type] = (options) => {
    let opts = options;

    if (typeof opts === 'string') {
      opts = {
        message: opts,
      };
    }

    opts.type = type;

    return Message(opts);
  };
});

message.closeAll = () => {
  messages.forEach((message) => {
    message.close();
  });
};

export default message;
