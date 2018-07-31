<markdown>

# Menu 导航菜单

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

更多布局和导航的使用可以参考：[通用布局](/components/layout.html)

## 代码演示

</markdown>

<demo-menu-MenuHorizontal />

<demo-menu-MenuSubmenu />

<markdown>

## API

```html
<co-menu>
  <co-menu-item>菜单项</co-menu-item>
  <co-sub-menu>
    <template slot="title">子菜单</template>
    <co-menu-item>子菜单项</co-menu-item>
  </co-sub-menu>
</co-menu>
```

### co-menu <Badge type="component" vertical="middle" text="component" />

| 参数                 | 说明                                                                                            | 类型     | 默认值   |
| -------------------- | ----------------------------------------------------------------------------------------------- | -------- | -------- |
| defaultOpenNames     | 初始展开的 co-sub-menu 菜单项 name 数组                                                         | string[] | -        |
| defaultSelectedNames | 初始选中的菜单项 name 数组                                                                      | string[] | -        |
| inlineIndent         | inline 模式的菜单缩进宽度                                                                       | number   | 24       |
| mode                 | 菜单类型，现在支持垂直、水平、和内嵌模式三种，`vertical` `vertical-right` `horizontal` `inline` | string   | vertical |
| multiple             | 是否允许多选                                                                                    | boolean  | false    |
| openNames            | 当前展开的 co-sub-menu 菜单项 name 数组                                                         | string[] | -        |
| selectable           | 是否允许选中                                                                                    | boolean  | true     |
| selectedNames        | 当前选中的菜单项 name 数组                                                                      | string[] | -        |

</markdown>
