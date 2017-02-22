export default {
  methods: {
    // 根据宽度属性设置列宽，如果没有宽度属性则应用平均宽度
    setStyles(width) {
      const styles = {
        width: `${this.colWidth}px`,
      };

      if (width !== undefined) {
        styles.width = `${width}px`;
      }

      return styles;
    },
  },
};
