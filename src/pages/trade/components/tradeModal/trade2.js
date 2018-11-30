import {PureComponent} from 'react'
import {Modal} from 'antd-mobile'
import {connect} from 'dva'
import {modal,addNum,getTradeConfigByCode} from '@/utils/common'
import router from 'umi/router'
import Comp from './trade2Comp'

@connect(({routing, personal, trade}) => ({
    code: routing.location.query.code,
    money: 0,
    data: trade.data,
    // money: personal.data.可用资金
}))

export default class extends PureComponent {
    constructor(props) {
        super(props)
        const config = getTradeConfigByCode(props.code)
        this.diff = config.diff
        this.wave = config.wave
        const data = props.data
        const price = addNum(data.最新价, -this.wave * 5)
        this.state = {
            num: 1,
            price: {
                value: price
            },
            priceLoss:{
                value:addNum(price,-this.wave * config.lossMinDiff),
                loss:config.lossMinDiff * this.diff,
                lossMinDiff:config.lossMinDiff
            },
            priceGain:{
                value:addNum(price,this.wave * config.gainMinDiff),
                gain:config.gainMinDiff *  this.diff,
                gainMinDiff:config.gainMinDiff,
                gainMaxDiff:config.gainMaxDiff
            }
        }
    }

    assignPrice = val => {
        const now_price = this.state.price.value
        const diff = addNum(-now_price,val)
        this.setState({
            price: {
                ...this.state.price,
                value: val
            },
            priceLoss:{
                ...this.state.priceLoss,
                value:addNum(this.state.priceLoss.value,diff)
            },
            priceGain:{
                ...this.state.priceGain,
                value:addNum(this.state.priceGain.value,diff)
            }
        })
    }
    assignPriceLoss = val => {
        const priceLoss = this.state.priceLoss
        const diff = addNum(val,-priceLoss.value)
        const mulriple = diff / this.wave
        this.setState({
            priceLoss:{
                ...this.state.priceLoss,
                value:val,
                loss:mulriple * this.diff + priceLoss.loss
            }
        })
    }
    assignPriceGain = val => {
        const priceGain = this.state.priceGain
        const diff = addNum(val,-priceGain.value)
        const mulriple = diff / this.wave
        this.setState({
            priceGain:{
                ...this.state.priceGain,
                value:val,
                gain:mulriple * this.diff + priceGain.gain
            }
        })
    }
    assignNum = val => {
        const num = this.state.num
        const multiple = val / num
        this.setState({
            num: val,
            priceLoss:{
                ...this.state.priceLoss,
                loss:this.state.priceLoss.loss * multiple
            },
            priceGain:{
                ...this.state.priceGain,
                gain:this.state.priceGain.gain * multiple
            }
        })
    }
    _buy = () => {
        this._order('买入')
            .then(() => {
                // this._setQuitGainLoss('买入')
            })
    }
    _sell = () => {
        this._order('卖出')
            .then(() => {
                // this._setQuitGainLoss('卖出')
            })
    }
    _order = (direction) => {
        return new Promise((resolve, reject) => {
            const {dispatch, code} = this.props
            dispatch({
                type: 'trade/order',
                direction: direction,
                code: code,
                num: this.state.num,
                price_type: '限价',
                price: this.state.price.value
            }).then(data => {
                if (data) {
                    if (data.rs) {
                        resolve()
                        this._successCallBack(data.msg)
                    } else {
                        modal(data.msg)
                        reject()
                    }
                } else {
                    reject()
                }
            })
        })
    }
    _successCallBack = (msg) => {
        const {dispatch} = this.props
        Modal.alert('', msg, [
            {text: '取消'},
            {
                text: '查看', onPress: () => {
                    router.push('order')
                    dispatch({
                        type: 'trade/assignTradeShow'
                    })
                }
            }
        ])
    }
    _setQuitGainLoss = (direction) => {
        const {dispatch, code, data} = this.props
        dispatch({
            type: 'trade/setQuitGainLoss',
            code: code,
            direction: direction,
            qty: this.state.num,
            tpprice: tpprice,
            slprice: slprice
        }).then(data => {
            if (data) {
                console.log(data)
                // modal(data.msg)
            }
        })
    }

    render() {
        const {price,num,priceLoss,priceGain} = this.state
        const {money, data} = this.props
        return (
            <Comp
                price={price}//挂单价格
                wave={this.wave}//波动单位
                num={num}//交易手数
                priceLoss={priceLoss}//止损价（值，预计亏损）
                priceGain={priceGain}//止盈价（值，预计盈利）
                money={money}//账户余额
                data={data}//股票数据
                assignPrice={this.assignPrice}//赋值挂单价格
                assignNum={this.assignNum}//赋值交易手数
                assignPriceLoss={this.assignPriceLoss}//赋值止损价
                assignPriceGain={this.assignPriceGain}//赋值止盈价
                buy={this._buy}
                sell={this._sell}
            />
        )
    }
}
