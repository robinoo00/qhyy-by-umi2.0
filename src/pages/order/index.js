import {PureComponent} from 'react'
import {Flex, Tabs, Modal} from 'antd-mobile'
import styles from './styles/index.less'
import {connect} from 'dva'
import Header from '@/components/header/'
import List1 from './components/position-list'
import List2 from './components/entry-list'
import router from 'umi/router'
import {alert,modal} from '@/utils/common'

@connect(({order}) => ({
    list: order.listHold
}))

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.pingData = {
            total:0,
            success:0,
            fail:0
        }
        this.state = {
            tabIndex: 0
        }
    }

    pingAll = () => {
        Modal.alert('', '确认全部平仓？', [
            {
                text: '取消', onPress: () => {
                }
            },
            {
                text: '确定', onPress: () => {
                    this._pingAction(this.props.list)
                        .then(this._reGetOrderList)
                        .then(this._pingCallBack)
                }
            }
        ])
    }
    _pingCallBack = () => {
        modal(`共${this.pingData.total}笔,成功${this.pingData.success},失败${this.pingData.fail}笔`,null,'一键平仓')
    }
    _reGetOrderList = () => {
        return new Promise(resolve => {
            const {dispatch} = this.props
            dispatch({
                type: 'order/getOrderList'
            }).then(data => {
                console.log(data)
                dispatch({
                    type: 'order/assignListHold',
                    list: data
                })
                resolve()
            })
        })
    }
    _pingAction = (list) => {
        return new Promise((resolve, reject) => {
            const {dispatch} = this.props
            if (list.length != 0) {
                this.pingData.total = list.length
                this.pingData.success = 0
                this.pingData.fail = 0
                for (let item of list) {
                    dispatch({
                        type: 'trade/ping',
                        code: item.合约
                    }).then(data => {
                        this._assignPingData(data)
                        if(this.pingData.success + this.pingData.fail === this.pingData.total && this.pingData.total != 0){
                            resolve()
                        }
                    })
                }
            } else {
                alert('还未持仓')
                reject()
            }
        })
    }
    _assignPingData = (data) => {
        console.log(data)
        if(data.rs){
            this.pingData.success ++
        }else{
            this.pingData.fail ++
        }
        console.log(this.pingData)
    }

    render() {
        return (
            <div>
                <Header
                    title={'持仓'}
                />
                <div className={styles.header}>
                    <div className={styles.con}>
                        <div className={styles.top}>
                            <div>￥-35.00</div>
                            <Flex>
                                <Flex.Item>总浮动盈亏</Flex.Item>
                            </Flex>
                        </div>
                        <Flex justify={'around'} className={styles.nav}>
                            <Flex.Item onClick={this.pingAll}>一键平仓</Flex.Item>
                            <Flex.Item onClick={() => {
                                router.push('order/history')
                            }}>历史订单</Flex.Item>
                            <Flex.Item>立即充值</Flex.Item>
                        </Flex>
                    </div>
                </div>
                <Tabs
                    tabs={[{title: '持仓中'}, {title: '挂单中'}]}
                    tabBarBackgroundColor={'#262834'}
                    onChange={(tab, index) => {
                        this.setState({tabIndex: index})
                    }}
                >
                    <List1/>
                    <List2
                        tabIndex={this.state.tabIndex}
                    />
                </Tabs>
            </div>
        )
    }
}
