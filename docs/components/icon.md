# Icon 图标

语义化的矢量图形。

## 图标的命名规范

我们为每个图标赋予了语义化的命名，命名规则如下：

- 实心和描线图标保持同名，用 `-o` 来区分，比如 `question-circle`（实心） 和 `question-circle-o`（描线）
- 命名顺序：`[图标名]-[形状?]-[描线?]-[方向?]`

> `?` 为可选。

<!-- 完整的图标设计规范请访问 [图标规范](https://ant.design/docs/spec/icon-cn)。 -->

## 如何使用

使用 `<co-icon />` 标签声明组件，指定图标对应的 type 属性，示例代码如下：

``` html
<co-icon type="link" />
```

## API

由于图标字体本质上还是文字，可以使用 `style` 和 `class` 设置图标的大小和颜色。

``` html
<co-icon type="question" style="font-size: 16px; color: #08c;" />
```

| 参数 | 说明 | 类型 | 默认值 |
| -- | -- | -- | -- |
| spin | 是否有旋转动画 | boolean | false |
| type | 图标类型 | string | - |
