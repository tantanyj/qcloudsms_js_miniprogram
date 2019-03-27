const app = getApp();

Page({
  data: {
    hidden: true,
    btnValue: '',
    btnDisabled: false,
    name: '',
    phone: '',
    code: '',
    second: 60
  },
  onLoad: function () {

  },
  //手机号输入
  bindPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
    if (e.detail.value.length == 11) {
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
  //验证码输入
  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取短信验证码
  getCode(e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'SingleSender',
      data: {
        number:that.data.phone
      },
      success(res) {
        console.log(res.result.body),
          wx.showToast({
            title:'验证码已发送',
            icon:'none',
            duration: 1500
          })
      },
      fail: console.error
    })
  },
  //登录
  login(e) {
    var that = this;
    var timestamp = Date.parse(new Date()) / 1000;
    var random = Math.round(Math.random()*99999+10000);
    if(that.data.phone.length==11&&that.data.code.length==6){
    wx.cloud.callFunction({
      name: 'CheckCode',
      data: {
        number:that.data.phone,
        code:that.data.code
      },success:function(res){
        for(var i=0;i<=res.result.data.length;++i){
          var resdata = res.result.data[i]        
          var _number = JSON.parse(JSON.stringify(resdata.number))
          var _code = JSON.parse(JSON.stringify(resdata.code))
          var _time = JSON.parse(JSON.stringify(resdata.time))
        if (that.data.phone==_number&&that.data.code==_code&&timestamp-_time<=300){
          console.log('check success: '+resdata)
          break
        }else{
          wx.showToast({
            title: '校验失败',
            icon: 'none',
            duration: 1500
          })
          console.log('check faild')
          break
        }
      }
      },fail:function(res){
        console.log(res)
      }
    })
  }
  }
})
