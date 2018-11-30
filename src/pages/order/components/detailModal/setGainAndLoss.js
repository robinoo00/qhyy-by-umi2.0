import {PureComponent} from 'react'
import {Flex, Modal,List} from 'antd-mobile'
import {connect} from 'dva'
import DelAndAdd from '@/components/del-input-add/'
import styles from './style.less'
import {getTradeConfigByCode,addNum,getTradeDataByCode,getTradeDetail,modal} from '@/utils/common'

@connect(({routing}) => ({
    code:routing.location.query.code
}))

export default class extends PureComponent {
    constructor(props){
        super(props)
        const config = getTradeConfigByCode(props.code)
        const data = getTradeDataByCode(props.code)
        console.log(data)
        this.wave = config.wave
        this.diff = config.diff
        const price = addNum(data.最新价, -this.wave * 5)
        this.state = {
            price:price,
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
    close = () => {
        const {hide} = this.props
        hide()
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
    submit = () => {
        const {dispatch} = this.props
        const data = getTradeDetail()
        console.log(data)
        dispatch({
            type:'trade/setQuitGainLoss',
            code:data.合约,
            direction:data.方向,
            qty:data.数量,
            tpprice:this.state.priceGain.value,
            slprice:this.state.priceLoss.value,
        }).then(data => {
            modal(data.msg)
        })
    }
    render() {
        const {priceLoss,price,priceGain} = this.state
        const lossMin = addNum(price,-priceLoss.lossMinDiff * this.wave)
        const lossMax = addNum(price,-this.wave)
        const gaiMin = addNum(price,priceGain.gainMinDiff * this.wave)
        const gaiMax = addNum(price,priceGain.gainMaxDiff * this.wave)
        return (
            <Modal
                popup
                visible={this.props.visible}
                maskClosable={true}
                onClose={this.close}
                animationType={'slide-up'}
                footer={[{
                    text: '取消', onPress: () => {
                        console.log('ok');
                        this.close()
                    }
                }, {
                    text: '确认', onPress: this.submit
                }]}
            >
                <div className={styles['gain-loss-wrap']}>
                    <Flex justify={'between'}>
                        <Flex.Item>美原油</Flex.Item>
                        <Flex.Item align={'end'}>￥490.00</Flex.Item>
                    </Flex>
                    <Flex justify={'between'}>
                        <Flex.Item>止损价 60.61 (￥1540)</Flex.Item>
                        <Flex.Item align={'end'}>买入价 60.83</Flex.Item>
                    </Flex>
                    <Flex justify={'between'}>
                        <Flex.Item>止损价 60.61 (￥1540)</Flex.Item>
                        <Flex.Item align={'end'}>买入价 60.83</Flex.Item>
                    </Flex>
                    <Flex justify={'between'}>
                        <Flex.Item>止损（范围{lossMin} ～ {lossMax}）</Flex.Item>
                    </Flex>
                    <Flex justify={'between'}>
                        <Flex.Item>
                            <DelAndAdd
                                value={priceLoss.value}
                                callback={this.assignPriceLoss}
                                diff={this.wave}
                            />
                        </Flex.Item>
                        <Flex.Item align={'end'} data-color={'down'}>￥{priceLoss.loss}</Flex.Item>
                    </Flex>
                    <Flex justify={'between'}>
                        <Flex.Item>止损（范围{gaiMin} ～ {gaiMax}）</Flex.Item>
                    </Flex>
                    <Flex justify={'between'}>
                        <Flex.Item>
                            <DelAndAdd
                                value={priceGain.value}
                                callback={this.assignPriceGain}
                                diff={this.wave}
                            />
                        </Flex.Item>
                        <Flex.Item align={'end'} data-color={'down'}>￥{priceGain.gain}</Flex.Item>
                    </Flex>
                </div>
            </Modal>
        )
    }
}
