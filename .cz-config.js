module.exports = {
  types: [
    { value: 'init', name: 'init:     初始提交' },
    { value: 'feat', name: 'feat:     增加新功能' },
    { value: 'fix', name: 'fix:      修复bug' },
    { value: 'ui', name: 'ui:       更新UI' },
    { value: 'refactor', name: 'refactor: 代码重构' },
    { value: 'release', name: 'release:  发布' },
    { value: 'deploy', name: 'deploy:   部署' },
    { value: 'docs', name: 'docs:     修改文档' },
    { value: 'test', name: 'test:     测试' },
    { value: 'chore', name: 'chore:    更改配置文件' },
    { value: 'style', name: 'style:    样式修改不影响逻辑' },
    { value: 'revert', name: 'revert:   版本回退' },
    { value: 'add', name: 'add:      添加依赖' },
    { value: 'minus', name: 'minus:    版本回退' },
    { value: 'del', name: 'del:      删除代码/文件' }
  ],
  scopes: [
    { name: '组件' },
    { name: '工具函数' },
    { name: '样式' },
    { name: 'deps' },
    { name: '配置' },
    { name: '测试' },
    { name: '其他' }
  ],
  messages: {
    type: '选择更改类型:\n',
    // 如果allowcustomscopes为true，则使用
    scope: '选择一个 scope（可选）：\n',
    customScope: '请输入自定义的 scope：',
    subject: '简短描述:\n',
    body: '详细描述. 使用"|"换行:\n',
    confirmCommit: '确认提交?'
  },
  allowCustomScopes: true
}
