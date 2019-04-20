const app = getApp();

Page({
  data: {
    hidden: true,
    btnValue: '',
    btnDisabled: false,
    phone: '',
    VerifyCode: ''
  },
  onReady:function(){
  },
  onLoad: function () {
  },
  //手机号输入
  bindPhoneInput(e) {
    var val = e.detail.value;
    this.setData({
      phone: val
    })
    //强制要求输入11位
    if (val.length == 11) {
      this.setData({
        hidden: false,
        btnValue: '获取验证码'
      })
    } else {
      this.setData({
        hidden: true
      })
    }
  },
  //短信验证码输入
  bindVerifyCodeInput(e) {
    this.setData({
      VerifyCode: e.detail.value
    })
  },
  //获取短信验证码
  getCode(e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'SingleSender',
      data: {
        number: that.data.phone
      },
      success(res) {
        console.log(res.result.body),
          wx.showToast({
            title: '验证码已发送',
            icon: 'none',
            duration: 1500
          })
      },
      fail: console.error
    })
  },
  //登录
  login(e) {
    var that = this;
    //验证码校验
      wx.cloud.callFunction({
        name: 'CheckCode',
        data: {
          PhoneNumber: that.data.phone,
          VerifyCode: that.data.VerifyCode
        }, success: res => {
          if (res.result.VerifyStauts == 1) {
            wx.showToast({
              title: '校验成功',
              icon: 'none',
              duration: 1500
            })
            console.log(that.data.phone + 'check success')
          }
          else{
            wx.showToast({
              title: '校验失败',
              icon: 'none',
              duration: 1500
            })
            console.log(that.data.phone + 'check faild')
          }
        }     
      })    
  }
})
