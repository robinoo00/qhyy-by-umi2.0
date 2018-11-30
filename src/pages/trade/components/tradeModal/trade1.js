import {PureComponent} from 'react'
import styles from '../../styles/tradeModal.less'
import {Flex, Modal, Tabs, List, Button} from 'antd-mobile'
import DelInputAdd from '@/components/del-input-add'
import {connect} from 'dva'
import {modal,getTradeConfigByCode} from '@/utils/common'
import router from 'umi/router'

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
        this.state = {
            num: 1,
            loss: [
                {value: 15, choose: true},
                {value: 22, choose: false},
                {value: 30, choose: false},
                {value: 40, choose: false},
                {value: 55, choose: false}
            ],
            gain: [
                {value: 45, choose: true},
                {value: 75, choose: false},
            ]
        }
    }

    chooseLoss = val => () => {
        const list = this._chooseList(this.state.loss, val)
        this.setState({
            loss: [...list]
        })

    }
    chooseGain = val => () => {
        const list = this._chooseList(this.state.gain, val)
        this.setState({
            gain: [...list]
        })

    }
    _chooseList = (list, val) => {
        for (let item of list) {
            item.choose = false
            if (item.value === val) {
                item.choose = true
            }
        }
        return list
    }
    assignNum = val => {
        console.log(val)
        this.setState({
            num: val
        })
    }
    _buy = () => {
        this._order('买入')
            .then(() => {
                this._setQuitGainLoss('买入')
            })
    }
    _sell = () => {
        this._order('卖出')
            .then(() => {
                this._setQuitGainLoss('卖出')
            })
    }
    _order = (direction) => {
        return new Promise((resolve, reject) => {
            const {dispatch, code} = this.props
            dispatch({
                type: 'trade/order',
                direction: direction,
                code: code,
                num: this.state.num
            }).then(data => {
                if (data) {
                    if (data.rs) {
                        this._successCallBack(data.msg)
                        resolve()
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
        let tpprice = this.state.loss.filter(item => item.choose)[0]['value']
        let slprice = this.state.gain.filter(item => item.choose)[0]['value']
        tpprice = direction === '买入' ? data.买价 + tpprice : data.卖价 + tpprice
        slprice = direction === '买入' ? data.买价 - slprice : data.卖价 - slprice
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
        const {loss, gain,num} = this.state
        const {money, data} = this.props
        return (
            <div className={styles['list-wrap']}>
                <List
                    renderHeader={() => <div className={styles.header}>账户余额：{money}</div>}
                >
                    <List.Item>
                        <Flex className={styles.item}>
                            <Flex.Item>
                                交易手数
                            </Flex.Item>
                            <Flex.Item>
                                <DelInputAdd
                                    style={{width:'3rem'}}
                                    callback={val => this.assignNum(val)}
                                    value={num}
                                />
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                    <List.Item>
                        <Flex className={styles.item}>
                            <Flex.Item>
                                触发止损
                            </Flex.Item>
                            <Flex.Item>
                                <Flex>
                                    {loss.map(item => (
                                        <Button
                                            onClick={this.chooseLoss(item.value)}
                                            key={item.value}
                                            inline
                                            type={item.choose ? 'primary' : 'ghost'}
                                            size={'small'}
                                        >{item.value * this.diff}</Button>
                                    ))}
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                    <List.Item>
                        <Flex className={styles.item}>
                            <Flex.Item>
                                触发止盈
                            </Flex.Item>
                            <Flex.Item>
                                <Flex>
                                    {gain.map(item => (
                                        <Button
                                            onClick={this.chooseGain(item.value)}
                                            key={item.value} key={item.value}
                                            inline
                                            type={item.choose ? 'primary' : 'ghost'}
                                            size={'small'}
                                        >{item.value * this.diff}</Button>
                                    ))}
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                </List>
                <Flex className={styles.submit}>
                    <Flex.Item className={styles.btn}>
                        <Button type={'primary'} onClick={this._buy}>买 {data.买价}</Button>
                    </Flex.Item>
                    <Flex.Item className={styles.btn}>
                        <Button type={'primary'} onClick={this._sell}>卖 {data.卖价}</Button>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}
