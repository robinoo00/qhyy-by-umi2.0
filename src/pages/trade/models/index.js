import {getKData, CreateOrder, SetQuitGainLoss,getOffect} from '@/services/api'
import {alert} from '@/utils/common'

export default {
    namespace: 'trade',
    state: {
        code: null,
        tradeShow: false,
        data: null
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/trade') {
                    dispatch({
                        type: 'assignCode',
                        code: query.code
                    })
                }
            })
        },
    },
    reducers: {
        assignData(state, {data}) {
            return {
                ...state,
                data: data
            }
        },
        assignCode(state, {code}) {
            return {
                ...state,
                code: code
            }
        },
        assignTradeShow(state) {
            return {
                ...state,
                tradeShow: !state.tradeShow
            }
        }
    },
    effects: {
        * getKData({params}, {call}) {
            const data = yield call(getKData, params)
            return data
        },
        * order({direction, code, price = 0, num = 0, price_type = '市价'}, {call}) {
            const post_data = {
                symbol: code,
                Buysell: direction,
                Qty: num,
                Price: price,
                Ordertype: price_type
            }
            const data = yield call(CreateOrder, post_data);
            return data
        },
        * setQuitGainLoss({code, direction, qty = 1, tpprice = 0, slprice = 0}, {call}) {
            const post_data = {
                symbol: code,
                buysell: direction,
                qty: qty,
                tpprice: tpprice,
                slprice: slprice,
            }
            const data = yield call(SetQuitGainLoss, post_data)
            return data
        },
        * ping({code}, {put, call}) {
            const data = yield call(getOffect,{symbol: code});
            if (data) {
                if (data.手数 === 0) {
                    alert('还未持仓');
                } else {
                    return yield put({
                        type: 'order',
                        direction: data.方向 === "买入" ? "卖出" : "买入",
                        num:data.手数,
                        code:code
                    })
                }
            } else {

            }
        }
    }
}
