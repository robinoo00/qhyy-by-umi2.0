import {Component} from 'react'
import {Modal,Tabs} from 'antd-mobile'
import Trade1 from './trade1'
import Trade2 from './trade2'
import {connect} from 'dva'

@connect(({trade}) => ({
    show:trade.tradeShow,
    data:trade.data
}))

export default class extends Component{
    constructor(props){
        super(props)
        this.data = this.props.data
    }
    close = () => {
        const {dispatch} = this.props
        dispatch({
            type:'trade/assignTradeShow'
        })
    }
    render() {
        return (
            <Modal
                popup
                visible={this.props.show}
                closable={true}
                maskClosable={true}
                onClose={this.close}
                animationType={'slide-up'}
            >
                <Tabs
                    tabs={[{title:'市价'},{title:'挂单'}]}
                    tabBarBackgroundColor={'#262834'}
                >
                    <Trade1/>
                    <Trade2/>
                </Tabs>
            </Modal>
        )
    }
}
