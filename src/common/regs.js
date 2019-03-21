export default {
  password: {
    reg: /^[a-zA-Z0-9]{6,16}$/,
    msg: '密码必须是6-16位数字或字母',
    blankMsg: '请输入密码'
  },
  name: {
    reg: /^[a-zA-Z\u4e00-\u9fa5]{2,16}$/,
    msg: '名字必须是2-16个中文或英文字符',
    blankMsg: '请输入姓名'
  },
  studentnumber: {
    reg: /[0-9]{6,16}/,
    msg: '学号必须是6-16位数字',
    blankMsg: '请输入学号'
  }
}
