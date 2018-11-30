import {PureComponent} from 'react'
import Header from './components/header'
import Switch from './components/switch'
import Submit from './components/submit'
import TradeModal from './components/tradeModal/'
import K from './components/k2/'
import {connect} from 'dva'
import {TRADE_CODE} from '@/utils/params'
import {getTradeDataByCode} from '@/utils/common'

@connect(({routing}) => ({
    code: routing.location.query.code
}))

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.sid = 0
    }

    componentDidMount() {
        const code = this.props.code
        this._getData(code)
        this.sid = setInterval(() => {
            this._getData(code)
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.sid)
    }

    _getData = (code) => {
        const data = getTradeDataByCode(code)
        if(data){
            this.assignData(data)
        }
    }
    assignData = data =>{
        const {dispatch} = this.props
        dispatch({
            type:'trade/assignData',
            data:data
        })
    }

    render() {
        const {code} = this.props
        if (!code) return null
        return (
            <>
                <Header code={code}/>
                <Switch code={code}/>
                <K code={code}/>
                <Submit code={code}/>
                <TradeModal code={code}/>
            </>
        )
    }
}
