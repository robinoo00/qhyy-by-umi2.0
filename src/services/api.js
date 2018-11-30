import request from '@/utils/request';
import {kPort} from '@/defaultSettings'

export async function GetNews(params) {
    return request(`api/newslist`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}

export async function MarketPrice() {
    return request(`app/MarketPrice`,{
        method: 'POST'
    });
}
/*
* 搜索 code(关键词)
* */
export async function Search(params) {
    return request(`dmapi/Search`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
// 添加自选 code
export async function SelectedStockAdd({code}) {
    return request(`app/SelectedStockAdd?code=${code}`);
}
/*
* 自选 收藏 列表
* */
export async function SelectedStockList() {
    return request(`app/SelectedStockList`);
}
//删除自选
export async function SelectedStockDel({code}) {
    return request(`app/SelectedStockDel?code=${code}`);
}
//调序
export async function SelectedStockSort({content}) {
    return request(`app/SelectedStockSort?content=${content}`);
}

export async function Login(params) {
    return request(`api/login`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*
* 发送短信 phone
* */
export async function SendSmsCode(params) {
    return request(`api/regcode`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*
* 发送修改银行卡验证码
* */
export async function SendModifyCardCode() {
    return request(`app/SendModifyCardCode `,{
        method: 'POST'
    });
}
/*发送修改密码验证码*/
export async function SendForgotSmsCode(params) {
    return request(`app/SendForgotSmsCode`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*
*  修改银行卡
* */
export async function ModifyCard(params) {
    return request(`app/ModifyCard `,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*注册*/
export async function Register(params) {
    return request(`api/regact`,{
        method: 'POST',
        body: params
    });
}
/*校验推荐号*/
export async function GID(params) {
    return request(`api/GID`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}

export async function ForgotPass(params) {
    return request(`app/ForgotPass`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}

export async function Userinfo(params) {
    return request(`api/getinfo`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}

/*
* 实名认证
* */
export async function RealName(params) {
    return request(`app/RealName`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*
* 获取K线数据
* */
export async function getKData(params){
    return request(kPort + `api/api/getk?contract=${params.contract}&&type=${params.type}&&time=${params.time}`);
}
/*创建订单*/
export async function CreateOrder(params) {
    return request(`api/order`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*资金明细*/
export async function CapitalFlow(params) {
    return request(`api/crjlist`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*我的持仓*/
export async function GetOrderList(params) {
    return request(`api/holding`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*挂单列表*/
export async function GetNoDealList(params) {
    return request(`api/nodeal`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*设置止损止盈*/
export async function SetQuitGainLoss(params) {
    return request(`api/addtpsi`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*
* 止损止盈列表
* */
export async function getGainLossList(params) {
    return request(`api/gettpsllist`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*获取帮助详情*/
export async function GetNewContent(params) {
    return request(`app/GetNewContent`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*平仓*/
export async function CloseOrder(params) {
    return request(`dmapi/closeorder`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*结算单*/
export async function GetCloseOrderList(params) {
    return request(`dmapi/GetCloseOrderList`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*提现*/
export async function withdraw(params) {
    return request(`app/withdraw`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*
* 平仓接口说明
*findchichang
* key
* pz 品种
* fx 方向 0 买 1 卖
* 返回结果 ret.今仓 == true  ret.昨仓 == false
* 今仓 true offset 为1
* 今仓 false offset 为3
* */
export function getOffect(params){
    return request(`api/holdingcoms`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*撤单（挂单中的）
* orderID
* */
export function orderCancel(params){
    console.log(params)
    return request(`api/chedan`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
/*
* 历史订单
* page pageIndex
* */
export async function getHistoryOrderList(params) {
    return request(`api/lishichenjiao`,{
        method: 'POST',
        body: {
            ...params,
        }
    });
}
