import Vue from 'vue';
import CoMessage from './message.vue';

let instance = null;
let seed = 0;
const message = {};
const messages = [];
const MessageConstructor = Vue.extend(CoMessage);

const Message = (options) => {
  if (Vue.prototype.$isServer) return null;

  let opts = options || {};
  const id = `message_${seed += 1}`;

  if (typeof opts === 'string') {
    opts = {
      message: opts,
    };
  }

  const userOnClose = opts.onClose;

  opts.onClose = () => {
    message.close(id, userOnClose);
  };

  instance = new MessageConstructor({ data: opts });

  instance.id = id;
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

message.close = (id, userOnClose) => {
  for (let i = 0, len = messages.length; i < len; i += 1) {
    if (id === messages[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(messages[i]);
      }

      messages.splice(i, 1);
      break;
    }
  }
};

message.closeAll = () => {
  messages.forEach((message) => {
    message.close();
  });
};

export default message;
