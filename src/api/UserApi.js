export default {
  logout (that) {
    that.axios.get(that.URLS.dochubapi + '/users/logout').then((response) => {
      if (response.data.status === '1') {
        that.$message('注销成功，即将跳转到登录页面')
        /** 这里采用箭头函数的方式，箭头函数和function定义的函数有些区别，this的指向不同 */
        setTimeout(() => that.$router.push('/main/login'), 1000)
      } else {
        that.$message('注销失败')
      }
    })
  }
}
