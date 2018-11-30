import {Toast,Modal} from 'antd-mobile'
import {TRADE_LIST,TRADE_DETAIL} from '@/utils/params'

export async function alert(content,duration = 1,onClose,mask = false){
    Toast.info(content,duration,null,mask)
}

export async function modal(content,callback,title=''){
    Modal.alert(title,content,[
        {text:'我知道了',onPress:callback}
    ])
}
export async function checkModal(content,callback){
    Modal.alert('',content,[
        {text:'取消',onPress:null},
        {text:'确定',onPress:callback}
    ])
}

//获取时间
export function getFormatTime(stampTime = (new Date()).getTime(),string = 'yyyy-MM-dd'){
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,         //月份
            "d+": this.getDate(),          //日
            "h+": this.getHours(),          //小时
            "m+": this.getMinutes(),         //分
            "s+": this.getSeconds(),         //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()       //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
                    ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    return new Date(stampTime).Format(string);
}

/*获取高度*/
export function getHeight(exclude = []) {
    let hei = document.body.offsetHeight
    for(let id of exclude){
        hei -= document.getElementById(id).clientHeight
    }
    return hei
}
/*验证手机号
* 参数 phone
* */
export function validatePhone(phone){
    var phoneReg = /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6])|(17[1-8])|(18[0-9])|(19[8-9]))\d{8}$/;
    return phoneReg.test(phone)
}
/*获取页面缩放比例（绘图需要）*/
export function getDPR(){
    const dpr = document.getElementsByTagName('html')[0].getAttribute("data-dpr");
    return dpr
}
/*获取股票列表*/
export function getTradeList(){
    const data = sessionStorage.getItem(TRADE_LIST)
    const list = JSON.parse(data)
    return list
}
/*通过股票代码获取股票信息*/
export function getTradeDataByCode(code){
    const list = getTradeList()
    const item = list.filter(item => item.合约 === code)[0]
    return item
}
/*数值相加*/
export function addNum (num1, num2) {
    var sq1,sq2,m;
    try {
        sq1 = num1.toString().split(".")[1].length;
    }
    catch (e) {
        sq1 = 0;
    }
    try {
        sq2 = num2.toString().split(".")[1].length;
    }
    catch (e) {
        sq2 = 0;
    }
    m = Math.pow(10,Math.max(sq1, sq2));
    return (num1 * m + num2 * m) / m;
}
/*通过股票代码获取股票波动单位及汇率*/
export function getTradeConfigByCode(code){
    const data = [
        {prefix:'CL',wave:0.01,diff:7},
        {prefix:'GC',wave:0.1,diff:7},
        {prefix:'HG',wave:0.0005,diff:7},
        {prefix:'NG',wave:0.001,diff:7},
        {prefix:'NQ',wave:0.25,diff:7},
        {prefix:'SI',wave:0.005,diff:7},
        {prefix:'HSI',wave:1,diff:0.9},
        {prefix:'HHI',wave:1,diff:0.9},
        {prefix:'FDAX',wave:0.5,diff:8},
    ];
    const item = data.filter(item => code.includes(item.prefix))[0]
    return {
        wave:item.wave,
        diff:item.diff,
        lossMinDiff:40,
        gainMinDiff:120,
        gainMaxDiff:150
    }
}

/*获取银行LOGO*/
export function getBankLogo(name){
    let prefix = 'http://47.100.236.123:6601//dianmai/images/'
    let src = ''
    switch (name){
        case '工商银行' || '中国工商银行':
            src = '20171228101805.jpg'
            break
        case '农业银行' || '中国农业银行':
            src = '20171228101943.jpg'
            break
        case '中国银行':
            src = '20171228102035.jpg'
            break
        case '建设银行' || '中国建设银行':
            src = '20171228101914.jpg'
            break
        case '光大银行':
            src = '20171228101841.jpg'
            break
        case '华夏银行' || '中国华夏银行':
            src = '20171228101848.jpg'
            break
        case '北京银行':
            src = '20171228101826.jpg'
            break
        case '交通银行' || '中国交通银行':
            src = '20171228101930.jpg'
            break
        case '上海银行':
            src = '20171228102012.jpg'
            break
        case '中国邮政' || '中国邮政储蓄银行':
            src = '20171228102020.jpg'
            break
        case '招商银行' || '中国招商银行':
            src = 'timg.jpg'
            break
        default:
            src = 'icon_big.png'
    }
    return prefix + src
}
/*获取持仓单股票缓存数据*/
export function getTradeDetail(){
    const data = sessionStorage.getItem(TRADE_DETAIL)
    return JSON.parse(data)
}
