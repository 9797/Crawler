"use strict";
var fs = require("fs")
var iconv = require('iconv-lite')
const ora = require('ora');
const cutString = function (original,before,after,index) {
  index = index || 0;
  if (typeof index === "number") {
    const P = original.indexOf(before, index);
    if (P > -1) {if (after) {
      const f = original.indexOf(after, P + 5);
      return (f>-1)? original.slice(P + before.toString().length, f):console.error("owo [在文本中找不到 参数三 "+after+"]");
    } else {
      return original.slice(P + before.toString().length);}
    } else {
      return null
    }
  } else {
    console.error("owo [sizeTransition:" + index + "不是一个整数!]");
  }
}
{
  let attack = []
  const URL = 'mock/messages.1'
  const startTime = Date.now()
  const spinner = ora(`正在分析文件: ${URL}`).start()
  var buffer = Buffer.from(fs.readFileSync(URL, {encoding:'binary'}),'binary');
  var text = iconv.decode(buffer,'GBK');//使用GBK解码
  text = text.split('\n')
  text.forEach((line) => {
    if (!line.includes('localhost')) {
      if (line.includes('type=ips')) {
        const time = cutString(line, `time=\"`, `" `)
        const msg = cutString(line, `msg=\"`, `"`)
        const src = cutString(line, `src=`, ` `)
        const dst = cutString(line, `dst=`, ` `)
        attack.push(`时间:${time} 来源:${src} 目标:${dst} 行为:${msg}`)
      }
    }
  }, this)
  const endTime = Date.now()
  spinner.stop()
  console.log(`攻击总量:${attack.length},分析耗时:${endTime - startTime}毫秒`)
  console.log(attack)
}
