import {PureComponent} from 'react'
import styles from '../styles/submit.less'
import {Flex,Button} from 'antd-mobile'
import {TRADE_CONFIRM_DATA} from '@/utils/params'
import {connect} from 'dva'
import {checkModal} from '@/utils/common'

@connect(({trade}) => ({
    data:trade.data
}))

export default class extends PureComponent {
    show = () => {
        const {dispatch} = this.props
        dispatch({
            type:'trade/assignTradeShow'
        })
    }
    ping = () => {
        const {dispatch,data} = this.props
        checkModal('是否平仓?',() => {
            dispatch({
                type:'trade/ping',
                code:data.合约
            }).then(data => {
                alert(data.msg)
            })
        })
    }
    render() {
        const {data} = this.props
        if(!data) return null
        return (
            <Flex className={styles["wrap"]}>
                <Flex.Item className={styles["buy"]} onClick={this.show}>
                    买 {data.买价}
                </Flex.Item>
                <Flex.Item className={styles["ping"]} onClick={this.ping}>
                    平仓
                </Flex.Item>
                <Flex.Item className={styles["sell"]} onClick={this.show}>
                    卖 {data.卖价}
                </Flex.Item>
            </Flex>
        )
    }
}
