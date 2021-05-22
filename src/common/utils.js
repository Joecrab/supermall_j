export function debounce(func, delay){//防抖函数，这里可减少图片加载的次数，就是的多点图片一起到再加载
    let timer = null;

    return function(...args){
      if(timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    }
  }

export function formateDate(date, fmt){
  if(/(y+)/.test(fmt)){ //y+ +表示至少有一个y .test(fmt)是否符合匹配
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    //(date.getFullYear() + '') 将数字转化为字符串
    //substr截取substr（length）截取几位，若是substr（2），把前两位截掉
    //RegExp.$1 好像是第一个捕获组
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),  //h是12小时制 H是24小时制
    //'H+': date.toLocaleString('chinese', { hour12: false }),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for(let item in o){
    if(new RegExp(`(${item})`).test(fmt)){//RegExp(`(${item})`) 相当于 (/（M+）/) (/（d+）/)..
      let str = o[item] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));//这里的RegExp.$1.length是指fmt里的那个格式的长度，不是str！
    }
  }
  return fmt;
}

function padLeftZero(str){//若不足两位，补上00 ，这里是对了2位的来写的，若传进来的str只有1位
                          //例如 传进来的是月份M 为1 则先补上00  即001 然后截掉str.length 即1 截掉第一位 就变成了 01
  return ('00' + str).substr(str.length);
}