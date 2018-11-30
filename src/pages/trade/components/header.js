import {PureComponent} from 'react'
import Header from '@/components/header/'
import router from 'umi/router'
import {getTradeDataByCode} from '@/utils/common'

export default class extends PureComponent {
    render() {
        const {code} = this.props
        const data = getTradeDataByCode(code)
        return (
            <Header
                title={`${data.名称} ${data.合约}`}
                rightText={<div onClick={() => {router.push('trade/rule')}}>规则</div>}
            />
        )
    }
}
