## API

### tree props

属性 | 说明 | 类型 | 默认值
-------- | -------
data | 生成 tree 的数据 | Array | []
props | 配置数据的关键属性 | Object |
nodeKey | 指定节点对象中的一个属性为唯一标识，并且应该在整个树中是唯一的 | String |
multiple | 是否支持多选（节点本身） | Boolean | false
checkable | 节点是否可被选择 | Boolean | false
indent | 相邻节点之间缩进的距离，单位像素 | Number | 18
defaultExpandAll | 是否默认展开所有节点 | Boolean | false
defaultExpandKeys | 默认展开的节点 | Array |
autoExpandParent | 否自动展开父节点 | Boolean | true
defaultCheckedKeys | 默认选中的节点 | Array |


### props

属性 | 说明 | 类型 | 默认值
-------- | -------
label | 指定节点表现为节点对象的某个属性 | String | label
children | 指定子树节点为节点对象的某个属性 | String | children
