import {PureComponent} from 'react'
import {Flex} from 'antd-mobile'
import {connect} from 'dva'
import Add from './add'
import PingAndAdd from './pingAndAdd'
import GainAndLoss from './setGainAndLoss'

@connect()

export default class extends PureComponent {
    render() {
        const {whichShow,hide,data} = this.props
        return (
            <>
                <Add
                    visible={whichShow === 'add' ? true : false}
                    hide={hide}
                    price={data.最新价}
                />
                <PingAndAdd
                    visible={whichShow === 'pingAndAdd' ? true : false}
                    hide={hide}
                    price={data.最新价}
                />
                <GainAndLoss
                    visible={whichShow === 'gaiAndLoss' ? true : false}
                    hide={hide}
                    price={data.最新价}
                />
            </>
        )
    }
}
