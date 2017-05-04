import makeInstance from './loading';

let coLoadingInstance = null;
// setInterval timeID
let timer = null;

function getInstance() {
  coLoadingInstance = coLoadingInstance || makeInstance();
  return coLoadingInstance;
}

function update(options) {
  const instance = getInstance();

  instance.update(options);
}

function hide() {
  // 完成之后中间会停留 400 ms
  setTimeout(() => {
    update({ show: false });
    setTimeout(() => {
      update({ percent: 0 });
    }, 200);
  }, 600);
}

function clearTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

export default {
  start() {
    if (timer) return;

    let percent = 0;

    update({
      show: true,
      percent,
      status: 'success',
    });

    timer = setInterval(() => {
      percent += Math.ceil(Math.random() * 6);

      if (percent > 90) {
        clearTimer();
      }

      update({
        show: true,
        percent,
        status: 'success',
      });
    }, 200);
  },
  finish() {
    clearTimer();
    update({
      show: true,
      percent: 100,
      status: 'success',
    });
    hide();
  },
  error() {
    clearTimer();
    update({
      show: true,
      percent: 100,
      status: 'error',
    });
    hide();
  },
  update(percent) {
    clearTimer();
    update({
      show: true,
      percent,
      status: 'success',
    });
  },
  destroy() {
    const instance = getInstance();

    clearTimer();
    coLoadingInstance = null;
    instance.destroy();
  },
};
