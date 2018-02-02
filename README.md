# fastFashion
YUE时尚小程序wxapp 

## 功能
- [x] 首页
- [x] 订单
- [x] 购物车
- [x] 个人中心
- [x] 服务详情
- [x] 门店详情
- [x] 评价

### 开发环境：

微信web开发者工具 v1.01.1711300

## 运行
需要安装有微信开发者工具。
把项目下载到本地。
在微信开发者工具中打开该项目则可预览。

## 所遇问题记录
- 1、服务器配置每月只有`3`次修改机会；
- 2、域名、备案、https要准备好（微信开发工具开发时可以选择不校验这些，可以用http但`不能用ip`的形式发起网络请求）；
- 3、小程序头像、介绍每月只能修改5次，服务范围每月只能修改1次；
- 4、`小程序名称未上线之前有两次修改机会`，上线之后无法修改（若想修改需要重新进行微信认证300/次）；
- 5、本地资源无法通过 css 获取：background-image：可以使用网络图片，或者 base64，或者使用标签；
- 6、wx.request的post请求后台无法接收到参数，请求时需要设置'content-type': 'application/x-www-form-urlencoded'；
- 7、data-*携带数据，其中*不能是大写，例如data-userId，js中获取为undefined，而写成data-userid可以正常获取；
- 8、当前页面操作影响上一级页面数据，返回上一页面数据没改变，可以用以下方式解决：
```js
	//获取页面栈  
	var pages = getCurrentPages();  
	if (pages.length > 1) {  
	    //上一个页面实例对象  
	    var prePage = pages[pages.length - 2];  
	    //关键在这里,这里面是触发上个界面  
	    prePage.changeData(prePage.data.historyArr) //changeData为上一个页面声明的方法
	} 
```
- 9、wx.navigateTo和wx.redirectTo无法跳转到tabBar里的页面，需要使用wx.switchTab进行跳转：
- 10、wx:for里面嵌套着wx:for，也就是当二维数组或者多维数组时，可以用wx:for-item赋别名：
```js
	//获取页面栈  
	<view wx:for="{{parentList}}"> 
		{{item.id}} 
		
		<view wx:for="{{item.childList}}" wx:for-item="items">
			{{items.name}}{{item.account}}    
		</view> 
	</view> 
```
- 11、获取input内容可以用bindblur：
```html
	<input id="myInput" bindblur="bindBlur" />
```
```js
	var inputContent = {}

	Page({
	  data: {
	    inputContent: {}
	  },
	  bindBlur: function(e) {
	    inputContent[e.currentTarget.id] = e.detail.value
	  }
	}) 
```
- 12、bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。
- 13、同问题8，如果较为复杂，那么我目前选择放在onShow（）里面执行；