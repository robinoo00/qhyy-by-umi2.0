import {TradeConfig, GetShares} from '@/services/api'
import {isTradeTime,getTradeList} from '@/utils/common'

export default {
    namespace: 'base',
    state: {
        config: null,
        canTrade: false,
        back: false,
    },
    subscriptions: {},
    reducers: {
        assignBack(state, {bool}) {
            return {
                ...state,
                back: bool
            }
        },
        assignConfig(state, {config}) {
            return {
                ...state,
                config: config
            }
        },
        assignCanTrade(state, {config}) {
            return {
                ...state,
                canTrade: isTradeTime(config)
            }
        }
    },
    effects: {
        * goBack(_, {put}) {
            yield put({
                type: 'assignBack',
                bool: true
            })
        }
    }
}
