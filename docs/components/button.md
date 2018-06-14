# Button 按钮

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`

按钮属性说明如下：

| 属性     | 说明                                                                                                                                 | 类型    | 默认值 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------ |
| ghost    | 幽灵属性，使按钮背景透明                                                                                                             | boolean | false  |
| href     | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致                                                                                | string  | -      |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string  | button |
| icon     | 设置按钮的图标类型                                                                                                                   | string  | -      |
| loading  | 设置按钮载入状态                                                                                                                     | boolean | false  |
| disabled | 按钮失效状态                                                                                                                         | boolean | false  |
| shape    | 设置按钮形状，可选值为 `circle` 或者不设                                                                                             | string  | -      |
| size     | 设置按钮大小，可选值为 `small` `large` 或者不设                                                                                      | string  | -      |
| target   | 相当于 a 链接的 target 属性，href 存在时生效                                                                                         | string  | -      |
| type     | 设置按钮类型，可选值为 `primary` `dashed` `danger` 或者不设                                                                          | string  | -      |

> `<co-button>Hello world!</co-button>` 会被渲染为 `<button><span>Hello world!</span></button>`，内容被标签包裹的则不会。  
> `<co-button href="http://example.com">Hello world!</co-button>` 则会渲染为 `<a href="http://example.com"><span>Hello world!</span></a>`。
