"use strict";
// Created by PUGE on 2016/7/24.

const  owo = {
    wow:{
        isMillisecondStamp:function(num){if(num.length===10){return num*1000;}else if(num.length===13) {return num;}else {console.log(num+"不是一个标准的时间戳！");return false;}},
        ifStringGetElementById:function(target){if(typeof target==="string") {return document.getElementById(target);}else {return target;}},
    },
    text: {
        //分割字符串
        cutString:function(original,before,after,index){index = index || 0;if (typeof index === "number") {const P = original.indexOf(before, index);if (P > -1) {if (after) {const f = original.indexOf(after, P + 1);return (f>-1)? original.slice(P + before.toString().length, f):console.error("owo [在文本中找不到 参数三 "+after+"]");} else {return original.slice(P + before.toString().length);}} else {console.error("owo [在文本中找不到 参数一 " + before + "]");}} else {console.error("owo [sizeTransition:" + index + "不是一个整数!]");}},
        //根据一个基点分割字符串  实例：http://myweb-10017157.cos.myqcloud.com/20161212/%E7%BB%83%E4%B9%A0.zip
        cutStringPoint:function (original,str, before, after,order, index) {index = index || 0;if (typeof index === "number") {const O = original.indexOf(str, index);const P = (order[0]==="1")?original.lastIndexOf(before, O):original.indexOf(before, O);if (P > -1) {if (after) {let f ;switch (order[1]){case "1":f = original.indexOf(after, P + 1);break;case "2":f = original.indexOf(after, O + 1);break;case "3":f = original.lastIndexOf(after, O + 1);break;}return (f>-1)? original.slice(P + before.toString().length, f):console.error("owo [在文本中找不到 参数三 "+after+"]");}else {return original.slice(P + before.toString().length);}}else {console.error("owo [在文本中找不到 参数一 " + before + "]");}} else {console.error("owo [sizeTransition:" + index + "不是一个整数!]");}},
        //分割字符串组
        cutStringArray:function(original,before,after,index){var aa=[],ab=0;while(original.indexOf(before,index)>0){aa[ab]=owo.text.cutString(original,before,after,index);index=original.indexOf(before,index)+1;ab++;}return aa;},
        //返回字符串回文palindrom("123")->321
        palindrom:function (str) {  return str === str.split('').reverse().join('');},
        //找出重复出现次数最多的字母
        findMaxDuplicateChar:function(str){if(str.length === 1) {return str;}let charObj = {};for(let i=0;i<str.length;i++) {if(!charObj[str.charAt(i)]) {charObj[str.charAt(i)] = 1;}else{charObj[str.charAt(i)] += 1;}}let maxChar = '',maxValue = 1;for(var k in charObj) {if(charObj[k] >= maxValue) {maxChar = k;maxValue = charObj[k];}}return maxChar;},
        //随机生成指制定长度的字符串。
        //比如给定 长度 8  输出 4ldkfg9j
        randomString:function(n){const str = 'abcdefghijklmnopqrstuvwxyz9876543210';let tmp = '',i = 0,l = str.length;for (i = 0; i < n; i++) {tmp += str.charAt(Math.floor(Math.random() * l));}return tmp;},
    },
    dom:{
        //在指定元素后追加元素
        insertTagAfter:function (Target,Object){Target=owo.wow.ifStringGetElementById(Target);const parent=Target.parentNode;if(parent.lastChild===Target){parent.appendChild(Object);}else{parent.insertBefore(Object,Target.nextSibling);}},
        //字符串转DOM对象
        stringToDOM:function (str){var a=document.createElement("div");a.innerHTML=str;return a.childNodes;},
        //隐藏/显示 元素
        hideElement:function (Dom){if(Dom.style.display==="none"){Dom.style.display="";}else{Dom.style.display="none";}},
        //纯文本方式更改元素内容
        textContent:function (element,value){var content=element.textContent;if(value===undefined){if(content!==undefined){return content;}else {return element.innerText;}}else{if(content!==undefined){element.textContent=value;}else {element.innerText=value;}}},
        //包裹元素
        package_element:function (Object,Target){Target=owo.wow.ifStringGetElementById(Target);const parent=Target.parentNode;parent.replaceChild(Object,Target);Object.appendChild(Target);},
        //select添加option选项
        addOptions:function (JSON,SelectID){var output=[];for(var key in JSON){output.push('<option value="'+key+'">'+JSON[key]+'</option>');}document.getElementById(SelectID).innerHTML=output.join('');},
    },
    array:{
        //给一个数组添加元素
        appendElement:function(Object,before,command){if(command===0){return(before.concat(Object));}else if(command===1){if(before.indexOf(Object)<0){return(before.concat(Object));}else{return before;}}else{if(before.indexOf(Object)<0){return(before.concat(Object));}else{Array.prototype.remove=function(e){var d=this.indexOf(e);if(d>-1){this.splice(d,1);}};before.remove(Object);return before;}}},
        //数组排序
        array_sort:function(arr){return(arr.sort(function(a,b){return a-b;}));},
        //去掉一组整型数组重复的值
        removeDuplicate:function(arr){let hashTable = {};let data=[];for(let i=0,l=arr.length;i<l;i++) {if(!hashTable[arr[i]]) {hashTable[arr[i]] = true;data.push(arr[i]);}}return data;},
        //快速排序
        quickSort:function(arr){if(arr.length<=1){return arr;}let leftArr=[];let rightArr=[];let q=arr[0];for(let i=1,l=arr.length;i<l;i++){if(arr[i]>q){rightArr.push(arr[i]);}else{leftArr.push(arr[i]);}}return[].concat(owo.array.quickSort(leftArr),[q],owo.array.quickSort(rightArr));},
        //随机打乱数组
        upsetArray:function(arr){return arr.sort(() => {return Math.random() - 0.5;});},

    },
    check:{
        //检查字符串是否仅包含中文
        chinese:function(fieldValue){return/[\u4e00-\u9fa5]/.test(fieldValue);},
        //检测字符串是否为邮箱格式
        email:function(fieldValue){return!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(fieldValue);},
        //检测字符串是否为手机号格式
        phone:function(fieldValue){return!(/^1[34578]\d{9}$/.test(fieldValue));},
        //检测字符串是否为固定电话号码格式
        telephone:function(fieldValue){return!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(fieldValue);},
        //检测字符串是否为身份证(15位)格式
        IDcard:function(fieldValue){return/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(fieldValue);},
        //检测字符串是否为身份证(18位)格式
        idcard:function(fieldValue){return/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(fieldValue);},
    },
    extract:{
        //提取字符串中的ip地址
        ip:function(fieldValue){return fieldValue.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/g);},
        //提取字符串中的网络链接
        link:function(fieldValue){return fieldValue.match(/(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?/g);},
        //提取字符串中的邮件地址
        mail:function(fieldValue){return fieldValue.match(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g);},
        //提取字符串中的图片链接
        imglink:function(fieldValue){return fieldValue.match(/(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?/g);},
        //提取字符串中的整数
        integer:function(fieldValue){return fieldValue.match(/\d+/g);},
        //提取字符串中的浮点数
        decimal:function(fieldValue){return fieldValue.match(/(-?\d*)\.?\d+/g);},
        //提取字符串中的任何数字
        number:function(fieldValue){return fieldValue.match(/(-?\d*)(\.\d+)?/g);},
        //提取字符串中的中文字符串
        chinese:function(fieldValue){return fieldValue.match(/[\u4e00-\u9fa5]*/g);},
        //提取字符串中的双字节字符串 (汉字)
        dchinese:function(fieldValue){return fieldValue.match(/[^\x00-\xff]*/g);},
    },
	time:{
		//转换标准时间为时间戳
		getDateTimeStamp:function(dateStr){return Date.parse(dateStr.replace(/-/gi,"/"));},
		//把时间戳转化为几天前,几小时前，几分钟前 console.log(getDateDiff(getDateTimeStamp("2016/1/20 19:59:30"))); ->9月前
        timeoutDetection:function(){const nowTime=new Date().getTime();if(nowTime-DATA.Timestamp>7200000){if(DATA.Timestamp===null){return false}window.location.href="#/TimeOut";return true}DATA.Timestamp=nowTime;return false},		//时间戳转时间 2016/11/14 下午4:28 
		//时间戳转时间 2016/11/14 下午4:28
        TSToLocalTime:function(nS) {const a =owo.wow.isMillisecondStamp(nS);if(a){return new Date(parseInt(a)).toLocaleString().replace(/:\d{1,2}$/,' ');}},
        //时间戳转时间 2016年11月14日 4:30:55
        TSToLocalTime2:function(nS) {const now=new Date(parseInt(nS)); return now.getFullYear()+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日"+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds(); },  
	},
    parameter:{
        //根据参数名获取URL中的参数
        GetQueryString:function (name){const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");const r = window.location.search.substr(1).match(reg);if(r!==null){return  decodeURI(r[2]);} return null;},

    },
    salt:{
        //生成指定长度，包含指定字符的字符串 咕.com/demo/randomstring
        randomString:function (len, charSet) {charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';let randomString = '';for (let i = 0; i < len; i++) {let randomPoz = Math.floor(Math.random() * charSet.length);randomString += charSet.substring(randomPoz,randomPoz+1);}return randomString;}
    },
    ajax:{
        get: function (url,fn){
            const obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
            obj.open('GET',url,true);
            obj.onreadystatechange=function(){
                if (obj.readyState === 4 && obj.status === 200 || obj.status === 304) { // readyState==4说明请求已完成
                    fn.call(this, obj.responseText);  //从服务器获得数据
                }
            };
            obj.send(null);
        },
        post: function (url, data, callback, onError) {
	    const request = new XMLHttpRequest();
	    request.onreadystatechange = function() {
		if (request.readyState != 4 || request.status != 200) { return; }
		var body = JSON.parse(request.responseText);
		if (body.error) {
		    onError(body.error);
		}
		else {
            callback(body);
		}
	    };
	    request.open("POST", url, true);
	    request.setRequestHeader("Content-type", "application/json");
	    request.send(JSON.stringify(data));
        }
    }
};

if(owo){console.log("加载成功！-----by PUGE");}else{console.log("加载失败!");}
