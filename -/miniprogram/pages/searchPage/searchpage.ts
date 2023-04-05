// pages/searchPage/searchpage.ts
let jsonData = require('../../data/event.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:"",
    ans:"",
    eventsArray:[],
    searchResult:[],//搜索的结果列表
  },
  submint_ans:function(){
    let names=this.data.word;
    var end="";
    if(names==""){
      this.setData({
        ans:"无结果"
      })
    }
    else{
    for (let i = 0; i < this.data.eventsArray.length; i++) {
      let eventsname=this.data.eventsArray[i][1];
      if(eventsname.includes(names))
      {
        console.log("满足条件的有 " + eventsname);
        end=end+"时间: "+this.data.eventsArray[i][0]+" 日程: "+eventsname+"\n";
        this.setData({
          ans:end
        })
      }
    }
  }
    
  },
  InputAction: function (options) {
    //获取输入框输入的内容
    let value = options.detail.value;
    //console.log("输入框输入的内容是 " + value)
    if(value){this.data.word = value;}
    else{this.data.word = "";}
    //console.log("输入框输入的内容是 " + this.data.word)
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //装入Json事件数据
    this.setData({
      eventsArray: jsonData.eventsList[0].eventsArray      
    });
    let x=this.data.year;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})