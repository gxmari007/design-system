import CoIcon from 'components/icon';

export default {
  functional: true,
  props: {
    status: {
      type: String,
      default: 'process',
    },
    finishStatus: {
      type: String,
      default: 'finish',
    },
    processStatus: {
      type: String,
      default: 'process',
    },
    index: {
      type: Number,
      default: 1,
    },
  },
  render(h, { props }) {
    const { status, processStatus, finishStatus, index } = props;

    function renderIcon(statusType) {
      if (statusType === 'finish') {
        return (
          <co-icon
            class="co-steps__icon-inner"
            type="android-done"
            key="finish"></co-icon>
        );
      } else if (statusType === 'error') {
        return (
          <co-icon
            class="co-steps__icon-inner"
            type="android-close"
            key="error"></co-icon>
        );
      }

      return <span>{index}</span>;
    }

    function renderContent() {
      switch (status) {
        case 'process':
          return renderIcon(processStatus);
        case 'finish':
          return renderIcon(finishStatus);
        default:
          return <span>{index}</span>;
      }
    }

    return (
      <transition name="co-fade" mode="out-in">
        {renderContent()}
      </transition>
    );
  },
  components: {
    CoIcon,
  },
};
