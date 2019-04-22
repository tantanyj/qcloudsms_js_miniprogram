# 腾讯云短信 小程序短信验证码Demo
此Demo仅供示例参考

版本迭代详见[UpdateList](https://github.com/tantanyj/qcloudsms_js_miniprogram/blob/master/UpdateList.md)

## 注意&使用指引：
- [0] 使用前请先在[腾讯云控制台](https://console.cloud.tencent.com/sms/smslist)上申请好签名和模板。模板正文建议直接申请"{1}为您的短信验证码，请在5分钟内填写。"
- [1] 因目前不支持直接导入云函数，需项目内创建同名文件夹'SingleSender'，'CheckCode'后，复制文档中的index.js 进行调用
- [2] 需手动创建云数据库，命名为'SmsDB'
- [3] 本地测试前需在对应路径安装云函数sdk (npm install --save wx-server-sdk@latest) 
- [4] SingleSender云函数中，为了减少安装问题 协助普通开发者快速接入，CryptoJS加密是直接复制的加密方法，此处亦可采用require的方式(完整链接可见参考文档) 
- [5] 【重要】Demo仅供示例参考，实际生产环境调用中，需要增设图形防刷措施，防止接口被恶意请求造成短信轰炸，导致费用被无辜使用，手机用户被骚扰(预防短信轰炸措施可见参考文档)

## 参考文档
[云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

[云短信API接口说明](https://cloud.tencent.com/document/product/382/5976)

[CyrptoJS加密方法](https://code.google.com/archive/p/crypto-js/downloads)

[预防短信轰炸](https://cloud.tencent.com/document/product/382/13303#.E5.A6.82.E4.BD.95.E9.A2.84.E9.98.B2.E7.9F.AD.E4.BF.A1.E8.BD.B0.E7.82.B8.EF.BC.9F)




