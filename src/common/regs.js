export default {
  password: {
    reg: /^[a-zA-Z0-9]{6,16}$/,
    msg: '密码必须是6-16位数字或字母',
    blankMsg: '请输入密码'
  },
  name: {
    reg: /^([u4e00-u9fa5·s]{1,20}|[a-zA-Z.s]{1,20})$/,
    msg: '名字不符合规范',
    blankMsg: '请输入姓名'
  },
  studentnumber: {
    reg: /[0-9]{6,16}/,
    msg: '学号必须是6-16位数字',
    blankMsg: '请输入学号'
  }
}
