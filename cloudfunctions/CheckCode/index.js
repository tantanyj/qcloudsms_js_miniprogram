// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

var StatusCode = ''
var timestamp = Date.parse(new Date()) / 1000;

// 云函数入口函数
exports.main = async (event, context) => {
  var PhoneNumber = event.PhoneNumber
  var VerifyCode = event.VerifyCode
  await db.collection('SmsDB').where({
    number: PhoneNumber,
  }).get().then(res => {
    for (var i = 0; i < res.data.length; ++i) {
      var resdata = res.data[i]
      if (resdata == '' || resdata == null) {
        console.log('拉取数据库返回空值了，可能该手机号未下发过短信验证码')
        StatusCode = 0
        break
      }
      var _number = JSON.parse(JSON.stringify(resdata.number))
      var _code = JSON.parse(JSON.stringify(resdata.code))
      var _time = JSON.parse(JSON.stringify(resdata.time))
      if (PhoneNumber == _number && VerifyCode == _code) {
        if (timestamp - _time <= 300) {
          console.log(PhoneNumber + '校验成功，返回1至前端')
          StatusCode = 1
          break
        }
        else {
          console.log(PhoneNumber + '校验失败，返回0至前端')
          StatusCode = 0
          break
        }
      }
    }
    })
  return{
    VerifyStauts: StatusCode
  }
}
