const app = getApp();
var MCaptcha = require ('../../utils/Mcaptcha.js');

Page({
  data: {
    hidden: true,
    btnValue: '',
    btnDisabled: false,
    PhoneNumber: '',
    MCaptchaCode:'',
    MCaptchaClickTimes: 0,
    VerifyCode: ''
  },
  onReady:function(){
    //绘制图形验证码
    this.MCaptcha = new MCaptcha({
      el: 'canvas',
      width: 80,
      height: 35,
      createCodeImg: ""
    });
  },
  onLoad: function () {
  },
  //手机号输入
  bindPhoneInput(e) {
    var val = e.detail.value;
    this.setData({
      PhoneNumber: val
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
  //刷新验证码
  changeImg() {
    var that = this;
    if (that.data.MCaptchaClickTimes < 6) {
      that.setData({ MCaptchaClickTimes: that.data.MCaptchaClickTimes + 1 });
      that.MCaptcha.refresh();
    }
    else {
      //重试次数过多，防止恶意突破强制等待3秒
      /*这里有个BUG，当重复点击速度过快时，mask防点击穿透生效不及时，触发后的第一次点击仍会有次穿透，建议防重试次数不要设置过低
      **该问题PC端开发者工具无法复现，手机端真机调试可见 
      */
      wx.showToast({
        icon: 'none',
        title: '(っ °Д °;)っ神码君跟不上',
        duration: 3000,
        mask: true
      })
      this.setData({ MCaptchaClickTimes: 0 });
    }
  },
  //图形验证码输入
  bindMCaptchaCodeInput(e) {
    this.setData({
      MCaptchaCode: e.detail.value
    })
  },
  //短信验证码输入
  bindVerifyCodeInput(e) {
    this.setData({
      VerifyCode: e.detail.value
    })
  },
  //获取短信验证码
  getCode(e) {
    //图形验证码校验
    var res = this.MCaptcha.validate(this.data.MCaptchaCode);
    if (this.data.MCaptchaCode == '' || this.data.MCaptchaCode==null){
      wx.showToast({
        title: '请输入图形验证码', 
        icon: 'none',
        duration: 1500,
        mask: true       
      })
      return;
    }
    if (!res){
      wx.showToast({
        title: '图形验证码错误',
        icon: 'none',
        duration: 1500,
        mask: true 
      })
      return;
    }
    var that = this;
    wx.cloud.callFunction({
      name: 'SingleSender',
      data: {
        number: that.data.PhoneNumber
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
    if (that.data.PhoneNumber.length == 11 && that.data.VerifyCode.length == 6) {
      wx.cloud.callFunction({
        name: 'CheckCode',
        data: {
          PhoneNumber: that.data.PhoneNumber,
          VerifyCode: that.data.VerifyCode
        }, success: res => {
          if (res.result.VerifyStauts == 1) {
            wx.showToast({
              title: '校验成功',
              icon: 'none',
              duration: 1500
            })
            console.log(that.data.PhoneNumber + 'check success')
          }
          else{
            wx.showToast({
              title: '校验失败',
              icon: 'none',
              duration: 1500
            })
            console.log(that.data.PhoneNumber + 'check faild')
          }
        }     
      })
    }
    else {
      wx.showToast({
        title: '请完整输入11位手机号/6位短信验证码',
        icon: 'none',
        duration: 1500
        })
	return		
      }
   }
})
