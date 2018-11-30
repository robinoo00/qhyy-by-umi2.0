import {PureComponent} from 'react'
import styles from '../styles/switch.less'
import {Flex, Button} from 'antd-mobile'
import router from 'umi/router'
import {TRADE_CODE} from '@/utils/params'
import {alert, modal} from '@/utils/common'
import {connect} from 'dva'

@connect(({trade}) => ({
    data:trade.data
}))

export default class extends PureComponent {
    render() {
        const {data} = this.props
        if (!data) return null
        const increase = data.最新价 - data.开盘价
        const percents = (increase / data.开盘价).toFixed(2)
        const color = increase > 0 ? 'up' : 'down'
        return (
            <Flex justify={'between'} className={styles.container} data-color={color}>
                <Flex.Item>
                    <div>{data.最新价}</div>
                    <Flex>
                        <Flex.Item data-arrow={color}>{increase.toFixed(2)}</Flex.Item>
                        <Flex.Item>{percents}%</Flex.Item>
                        <Flex.Item>卖量 {data.卖量}</Flex.Item>
                        <Flex.Item>买量 {data.买量}</Flex.Item>
                    </Flex>
                </Flex.Item>
                <Flex.Item onClick={() => {
                    router.push('order')
                }}>
                    <Button
                        type={'primary'}
                        size={'small'}
                    >
                        持仓
                    </Button>
                </Flex.Item>
            </Flex>
        )
    }
}
