export const sizeMap = {
  small: 'small',
  large: 'large',
  get sm() {
    return this.small;
  },
  get lg() {
    return this.large;
  },
};

export const SIZE = ['small', 'large', 'sm', 'lg'];

export const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

// popper 窗口的方位参数
export const placements = [
  'top', 'top-start', 'top-end',
  'right', 'right-start', 'right-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
];
