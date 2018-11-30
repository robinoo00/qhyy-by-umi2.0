import {PureComponent} from 'react'
import {Flex, List, Button} from 'antd-mobile'
import {connect} from 'dva'
import Comp from './components/detail'
import {getTradeDataByCode} from '@/utils/common'
import Modal from './components/detailModal/'

@connect(({routing}) => ({
    code:routing.location.query.code
}))

export default class extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            data:getTradeDataByCode(this.props.code),
            whichShow:null
        }
    }
    componentDidMount(){

    }
    showAdd = () => {
        this.setState({
            whichShow:'add'
        })
    }
    showPingAndAdd = () => {
        this.setState({
            whichShow:'pingAndAdd'
        })
    }
    showGaiAndLoss = () => {
        this.setState({
            whichShow:'gaiAndLoss'
        })
    }
    hide = () => {
        this.setState({
            whichShow:null
        })
    }
    render() {
        const {data,whichShow} = this.state
        return (
            <>
                <Comp
                    data={data}
                    showAdd={this.showAdd}
                    showPingAndAdd={this.showPingAndAdd}
                    showGaiAndLoss={this.showGaiAndLoss}
                />
                <Modal
                    whichShow={whichShow}
                    hide={this.hide}
                    data={data}
                />
            </>
        )
    }
}
