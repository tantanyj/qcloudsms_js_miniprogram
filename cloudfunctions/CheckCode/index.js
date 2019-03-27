// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

//utils
var timestamp = Date.parse(new Date()) / 1000;

// 云函数入口函数
exports.main = async (event, context) => {
  var number = event.number
  var code = event.code
  db.collection('SmsDB').where({
      number : number,
      code : code
    }).get()

}