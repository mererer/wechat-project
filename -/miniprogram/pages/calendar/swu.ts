let jsonData = require('../../data/event.js');
Page({ 
  /*页面的初始数据*/
  data: {
      eventsArray:[],
      semesterTitle: ['2020-2021-2','2021-2022-1','2021-2022-2','2022-2023-1', '2022-2023-2'],
      index: 1,//学期选择的索引
      year: 2023, //所要查看的月的所在年
      month: 3, //所要查看的月
      weekArr: ['周','日', '一', '二', '三', '四', '五', '六'],
      dateArr: [], //日期数组，程序中填充     
      theDay: "", //记录当前日期，比如2023123
      firstday:"",//某学期的第一天
	    semester:"",//查看的学期
	    weeks:0, //查看的学期的周数
	    semesters:[['2016-2017-1','2016-9-4',19,6]
        ,['2016-2017-2','2017-2-26',19,8]
        ,['2017-2018-1','2017-9-3',19,7]
        ,['2017-2018-2','2018-3-4',19,7]
        ,['2018-2019-1','2018-9-2',19,5]
        ,['2018-2019-2','2019-2-24',19,7]
        ,['2019-2020-1','2019-9-1',20,5]
        ,['2019-2020-2','2020-2-23',20,8]
        ,['2020-2021-1','2020-9-6',20,5]
        ,['2020-2021-2','2021-2-28',19,8]
        ,['2021-2022-1','2021-9-5',19,6]
        ,['2021-2022-2','2022-2-27',19,7]
        ,['2022-2023-1','2022-8-28',19,6]
        ,['2022-2023-2','2023-2-19',19,9]
        ,['2023-2024-1','2023-9-3',19,6]
	  ],
  },
  addEvents:function(){
	  //月历中填充事件
	  let dateArr1=this.data.dateArr;
	  for (let i = 0; i < this.data.eventsArray.length; i++) {
		  for (let j = 0; j < dateArr1.length; j++){
			  let obj=dateArr1[j];
			  if(this.data.eventsArray[i][0]==obj.isToday){
				  let eventstr=this.data.eventsArray[i][1];
				  let eventsubstr=eventstr.substr(0,4);
          obj.event= obj.event+"\n"+eventsubstr;
          if(obj.eventdetail.length>0)
            obj.eventdetail= obj.eventdetail+"\r\n"+eventstr;
          else
            obj.eventdetail= eventstr;
			  }
			  dateArr1[j]=obj;
		  }
	  }
	  this.setData({
          dateArr: dateArr1
    })
  },
  bindPickerChange: function(e) { 
  //选择学期   
    this.setData({
     index: e.detail.value
    })
	this.getFirstMonth();
	this.refresh();
  },
  lastMonthClick: function () {
	  //上月按钮
    let m=this.data.month;
    let y=this.data.year;
    if(m-1<=0){
      m=12;
      y=y-1;
    }    
    else{
      m=m-1;
    }
    this.setData({
      month: m,
      year:y,
     })
	this.refresh();
	this.setPicker();
  },
  nextMonthClick: function () {
	  //下月按钮
    let m=this.data.month;
    let y=this.data.year;
    if(m+1>12){
      m=1;
      y=y+1;
    }    
    else{
      m=m+1;
    }
    this.setData({
      month: m,
      year:y,
     })
	 this.refresh();
	 this.setPicker();
  },
  todayClick: function () {
	  //处理今日按钮
		let now = new Date();
		this.setData({
			month: now.getMonth()+1,
			year:now.getFullYear(),
		})
		this.refresh();
		this.setPicker();
  },
  dateInit: function (year, month) {
	  //根据年和月，产生日期数据
      let dateArr1 = []; //需要遍历的日历数组数据
      let arrLen = 0; //dateArr的数组长度      
      let startWeek = new Date(year + '/' + month  + '/' + 1).getDay(); //目标月1号对应的星期
      let dayNums = new Date(year, month, 0).getDate(); //获取目标月有多少天
      let obj = {};
      let num = 0;  //日期计数    
      arrLen = startWeek + dayNums;
      arrLen=arrLen+Math.ceil(arrLen/7);
      for (let i = 0; i < arrLen; i++) {
        if(i%8!=0){ //第1列教学周
          if (i > startWeek) {  //2月第1天是星期3，则第一行星期日-星期2，为空
              num +=  1;
			  obj = {
                  isToday: this.getYearStr(year,month,num),
                  dateNum: num,               
              }
          } else 
              obj = {};
        }
        else{
          let d2 = new Date(year + '/' + month  + '/' + (num+1));
          let firstSemesterDay = new Date(this.data.firstday.replace(/-/g,"/"));
          let daydiff=-1;
          let dataNumStr=month>=7 && month<=9?"暑假":"寒假"; 
          let weekNum=0;
          if(d2>=firstSemesterDay){
            daydiff=parseInt(d2.getTime()-firstSemesterDay.getTime())/(1000*60*60*24);
            weekNum=Math.floor(daydiff/7)+1;
            if(weekNum<=this.data.weeks)
              dataNumStr="第"+weekNum+"周";
          }
          obj = {            
            dateNum:dataNumStr
          }      
        }
		obj.event="";
		obj.eventdetail="";
        dateArr1[i] = obj;
      }
      this.setData({
          dateArr: dateArr1
      })
  },
  getSemester:function(){
	  //根据year和month获取所在学期数据
	  let d = new Date(this.data.year + '/' + (this.data.month+1)  + '/' + 1);
      d=d-1;
	  for (let i = 0; i < this.data.semesters.length; i++) {
		  let d1 = new Date(this.data.semesters[i][1].replace(/-/g,"/"));
		  if(d<=d1){
			   this.setData({
				   firstday:this.data.semesters[i-1][1],
				   semester:this.data.semesters[i-1][0],
				   weeks:this.data.semesters[i-1][2],
				});
				break;
		  }
	  };
  },

getFirstMonth:function(){
	//根据学期index设置学期第一月所在年和月
	for (let i = 0; i < this.data.semesters.length; i++) {
		  let s = this.data.semesterTitle[this.data.index];
		  if(s==this.data.semesters[i][0]){
			  let str=this.data.semesters[i][1];
			  let strarray=str.split("-");
			   this.setData({
				   year:1*strarray[0],
				   month:1*strarray[1],				   
				});
				break;
		  }
	  };
},
setPicker:function(){
	//根据学期设置picker的index
	for (let i = 0; i < this.data.semesterTitle.length; i++) 		  
		  if(this.data.semester==this.data.semesterTitle[i]){			  
			   this.setData({
				   index:i,				   
				});
				break;
		  };
},
  
  /**
   * 生命周期函数--监听页面显示
   */
onShow: function () {
	this.getFirstMonth();  //根据学期设置学期第一月所在年和月
    this.refresh();
    let now = new Date(); //记录今日
	this.setData({
        theDay: this.getYearStr(now.getFullYear(),now.getMonth() + 1,now.getDate())
    });
},

getYearStr:function(year,month,day){
	let m=month>9?''+month:'0'+month;
	let d=day>9?''+day:'0'+day;
	return ''+year+m+d;
},


refresh:function(){
	//根据year和month获取所在学期数据、填充月份数据、添加事件
	this.getSemester();
	this.dateInit(this.data.year,this.data.month);
	this.addEvents();
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

bind_publish:function(e){    //点击某个具体的元素，获取到他在数组中的下标，根据下标，将该元素_id值传递给下一个页面
    console.log(e.currentTarget.dataset.id);  
	if(e.currentTarget.dataset.id.length>0)
		wx.showModal({
		  title: '提示',
		  content: e.currentTarget.dataset.id,
		  success: function (res) {
			if (res.confirm) { //这里是点击了确定以后
			  console.log('用户点击确定')
			} else { //这里是点击了取消以后
			  console.log('用户点击取消')
			}
		  }
		});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

//todo
// 封装步骤关系
// 云开发
// 增加、修改、删除事件
// 模态窗口
