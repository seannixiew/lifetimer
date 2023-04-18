
//设置颜色间隔1秒随机变化
var d2=document.getElementById("d2");
var colors = ["aqua","Aquamarine ","BlueViolet ","Chocolate ","black","silver","Fuchsia ","gold","lightgreen","lightpink","red","springgreen"]; 
setInterval(function(){
        var random = Math.floor(Math.random() * colors.length); 
        d2.style.color=colors[random];
    },1000);

//计算两个日期相差的年，月，日
function getDays(day1,day2) {
// 新建日期对象
// 今天日期，数组，同 birthday
let today = [day2.getFullYear(), day2.getMonth() + 1, day2.getDate()];
let birth= [day1.getFullYear(), day1.getMonth() + 1, day1.getDate()];
// 分别计算年月日差值
let days = today.map((value, index) => {
    return value - birth[index];
})
// 当天数为负数时，月减 1，天数加上月总天数
if (days[2] < 0) {
    // 简单获取上个月总天数的方法，不会错
    let lastMonth = new Date(today[0], today[1], 0);
    days[1]--;
    days[2] += lastMonth.getDate();
}
// 当月数为负数时，年减 1，月数加上 12
if (days[1] < 0) {
    days[0]--;
    days[1] += 12;
}
    return days;
}

//“你已经活过了XXX年XXX个月零XXX天”
setInterval(()=>{
                let days=getDays(new Date("1990/01/02"),new Date());
                document.getElementById("s1").innerText=`你已活过了${days[0]}年${days[1]}个月零`;
                document.getElementById("s2").innerText=`${days[2]}`;
                document.getElementById("s3").innerText=`天`;
                setTimeout(()=>{document.getElementById("s2").innerText=null;},1000)
                },2000);//1.2算活过0天
//改变颜色
document.getElementById("middle").onclick=function(){
  if(document.getElementById("middle").style.color =="snow"){
    document.getElementById("middle").style.color="black";
  }else{
    document.getElementById("middle").style.color="snow";
  }
}
//中键控制显示消失，桌面不支持
// document.getElementById("middle").addEventListener("mousedown",function(){
//   if(event.button==1){
//   if(document.getElementById("middle").style.opacity==0){
//     document.getElementById("middle").style.opacity=1;
//   }else{
//     document.getElementById("middle").style.opacity=0;
//   }
//   }},false)

//--------------------------------------------------------------

//画图阵列，以及序号
function draw(id,fontId,fontSize,squareSize,gap,rows,columns,change,sums,
              style1,style2,trans,transparent){

  var canvas = document.getElementById(id);
  var ctx = canvas.getContext("2d");
  var font = document.getElementById(fontId);
  var ft = font.getContext("2d");
  
  // 计算阵列的总宽度和高度
  var width = columns * squareSize * gap+squareSize;
  var height = rows * squareSize * gap+squareSize;
  // 设置canvas元素的宽度和高度
  canvas.width = width;
  canvas.height = height;
  font.width = width;
  font.height = height;
  //设置序号透明
  ft.globalAlpha = trans;
  //设置方块透明
  ctx.globalAlpha = transparent;

  var flag=true;
  var count=0;
  // 循环绘制每个小正方形
  for (var i = 0; i < rows && flag; i++) {
    for (var j = 0; j < columns; j++) {
      // 计算每个小正方形的坐标
      var x = j * squareSize * gap + squareSize/2;
      var y = i * squareSize * gap + squareSize/2;
      if(count>sums){
          flag=false;
          break;
      }
      // 设置小正方形的填充颜色
      if(count<change){
        ctx.fillStyle = style1;
      }else if(count==change){
        //渐变色
        var linearGradient= ctx.createLinearGradient(x,y,x+squareSize,y+squareSize);
        linearGradient.addColorStop(0.3,"SlateGray  ");
        linearGradient.addColorStop(1,"SpringGreen ");
        ctx.fillStyle=linearGradient;
      }else{
        ctx.fillStyle = style2;
        //设置序号文本属性，只对剩余方块计数，画序号
        ft.font=`${fontSize}px fantasy`;
        ft.fillText(count-change, x+0.25*squareSize, y+0.7*squareSize);
        ft.fillStyle="black";
      }
      //绘制方块阴影
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      // 绘制小正方形
      ctx.fillRect(x, y, squareSize, squareSize);
      
      count++;
    }
  }
}

//控制序号显示或消失
var trans0=0;
var trans1=0;
var trans2=0;
document.getElementById("font0").onclick=function(){
  if(trans0==0){
    trans0=1;
  }else{
    trans0=0;
  }}
document.getElementById("font1").onclick=function(){
  if(trans1==0){
    trans1=1;
  }else{
    trans1=0;
  }}
document.getElementById("font2").onclick=function(){
  if(trans2==0){
    trans2=1;
  }else{
    trans2=0;
  }}
//控制所有方块显示或消失
  var transparent=1;

setInterval(()=>{
                  var old=getDays(new Date(),new Date("2030/01/02"));
                  document.getElementById("d0").innerText=`距离你40岁还有${old[0]*12+old[1]}个月${old[2]}天`;
                  var passed=12*40-old[0]*12-old[1]-1;
                  draw("canvas0","font0",8,10,1.2,20,24,passed,9999,
                      "SlateGray   ","SpringGreen   ",trans0,transparent);
                },2000)//天数没毛病
//改变颜色
document.getElementById("d0").onclick=function(){     
                  if(document.getElementById("d0").style.color=="black"){
                    document.getElementById("d0").style.color="snow";
                  }else{
                    document.getElementById("d0").style.color="black";
                  }
                }      
//--------------------------------------------------------------
setInterval(()=>{
                  // 获取当前日期
                  var today = new Date();
                  // 获取当前年份
                  var year = today.getFullYear();
                  // 计算当前日期是该年的第几天
                  var dayOfYear = Math.ceil((new Date(year,0,2) - new Date(year, 0, 1)) / 86400000);
                  // 计算当年剩余天数
                  var daysRemaining = Math.ceil((new Date(year, 11, 31) - today) / 86400000);
                  // 计算当年剩余周数
                  var weeksRemaining = Math.floor((daysRemaining + 1) / 7);
                  document.getElementById("d1").innerText="今年还";
                  document.getElementById("s4").innerText="剩";
                  document.getElementById("s5").innerText="下";
                  document.getElementById("s6").innerText=` ${weeksRemaining} `;
                  document.getElementById("s7").innerText="周";
                  var passed=52-weeksRemaining-1;

                  draw("canvas1","font1",10,20,1.2,13,4,passed,52,
                    "SlateGray   ","SpringGreen   ",trans1,transparent);
                },2000)
//改变颜色
document.getElementById("d1").onclick=function(){
                  if(document.getElementById("rightDown").style.color=="black"){
                    document.getElementById("rightDown").style.color="snow";
                  }else{
                    document.getElementById("rightDown").style.color="black";
                  }
                }       
//--------------------------------------------------------------
setInterval(()=>{
              var today = new Date();
              var curMonth = today.getMonth(); //当前月份 需要加1
              today.setMonth(curMonth + 1); 
              today.setDate(0) //关键
              var allDays=today.getDate(); //计算的当月总天数
              var daysRemaining=today.getDate()-new Date().getDate() // new Date().getDate()当前几号  总天数-当前即可
              var passed=allDays-daysRemaining;

              //计算剩余时分秒
              var hours=today.getHours();
              var minutes=today.getMinutes();
              var seconds=today.getSeconds();

              document.getElementById("d2").innerText=`本月还剩下 ${daysRemaining} 天零：${24-hours-1}:${60-minutes}:${60-seconds}`;
              draw("canvas2","font2",10,20,1.2,5,7,passed,allDays,
              "SlateGray   ","SpringGreen   ",trans2,transparent);
            },1000)//不算当天
//显示或消失所有图片外的元素
document.getElementById("d2").onclick=function(){
  if(transparent==1){
    document.getElementById("middle").style.opacity=0;
    document.getElementById("d0").style.opacity=0;
    document.getElementById("d2").style.opacity=0;
    transparent=0;
  }else{
    document.getElementById("middle").style.opacity=1;
    document.getElementById("d0").style.opacity=1;
    document.getElementById("d2").style.opacity=1;
    transparent=1;
  }       
}
//--------------------------------------------------------------
var body=document.getElementById("body");

//魔法图片
var imgxs=[
"bg1.png","bg2.jpg","bg3.png","bg4.png","bg5.jpg",
"bg6.jpg","bg7.png","bg8.jpg","bg9.jpg","bg10.png",
"bg11.jpg","bg12.png","bg13.png","bg14.png","bg15.png",
"bg16.png","bg17.png","bg18.png","bg19.png","bg20.png",
"bg21.png","bg22.png","bg23.png","bg24.png","bg25.png",
"bg26.png","bg27.png","bg28.png","bg29.png","bg30.png",
"bg31.jpg","bg32.png","bg33.png","bg34.png","bg35.jpg",
"bg36.jpg","bg37.jpg","bg38.jpg","bg39.jpg"];
var imgx=0;
var randomFunc;
var serialSwitch="off";
var randomSwitch="off";
//正向遍历
document.getElementById("s5").onclick=function(){
  if(randomSwitch=="on"){//如果当前在随机轮播，那么清除
    clearInterval(randomFunc);
    randomSwitch="off";
  }
    imgx=imgx % 39; //图片数量
    body.background=`imgx/${imgxs[imgx]}`;
    imgx++;
}
//反向遍历图片
document.getElementById("s4").onclick=function(){
  if(randomSwitch=="on"){//如果当前在随机轮播，那么清除
    clearInterval(randomFunc);
    randomSwitch="off";
  }
    serialSwitch="off";
    randomSwitch="off";
    imgx=(imgx+38) % 39; //图片数量
    body.background=`imgx/${imgxs[imgx]}`;
  }

//顺序轮播开/关
document.getElementById("s6").onclick=function(){
    if(serialSwitch=="off"){
      //顺序轮播
      clearInterval(randomFunc);
      randomSwitch="off" //随即轮播置关
      randomFunc=setInterval(()=>{imgx++;
      imgx=imgx % 39;//图片数量
      body.background=`imgx/${imgxs[imgx]}`;},5000);
      serialSwitch="on";
    }else{
      clearInterval(randomFunc);
      serialSwitch="off"
    }
  }
//随机轮播开/关
document.getElementById("s7").onclick=function(){
    if(randomSwitch=="off"){
      //随机轮播
      clearInterval(randomFunc);
      serialSwitch="off";//顺序轮播置关
      randomFunc=setInterval(()=>{imgx=Math.floor(Math.random()*39);//图片数量
                      body.background=`imgx/${imgxs[imgx]}`;},5000);
      randomSwitch="on";
    }else{
      clearInterval(randomFunc);
      randomSwitch="off";
    }
}

//无聊图片
var imgs=[
"1.jpg","2.jpg","3.jpg","4.jpg",
"5.jpg","6.jpg","7.jpg","8.jpg","9.jpg",
"10.jpg","11.jpg","12.jpg","13.jpg","14.jpg",
"15.jpg","16.jpg","17.jpg","18.jpg","19.jpg",
"20.jpg","21.jpg","22.jpg","23.jpg","24.jpg",
"25.jpg"];
var img=0;
//正向遍历
document.getElementById("s3").onclick=function(){
    clearInterval(randomFunc);
    serialSwitch="off";
    randomSwitch="off";
    img=img % 25; //图片数量
    body.background=`img/${imgs[img]}`;
    img++;
}

