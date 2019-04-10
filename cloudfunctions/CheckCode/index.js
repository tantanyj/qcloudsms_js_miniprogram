// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var number = event.number
try {
  return await db.collection('SmsDB').where({
    number: number,
  }).get()
} catch (e) {
  console.error(e)
}
}
