import {GetOrderList,GetNoDealList,orderCancel,getHistoryOrderList,getGainLossList} from '@/services/api'

export default {
    namespace: 'order',
    state: {
        listHold:null
    },
    subscriptions: {},
    reducers: {
        assignListHold(state,{list}){
            return {
                ...state,
                listHold:[...list]
            }
        }
    },
    effects: {
        * getOrderList(_,{call}){
            const data = yield call(GetOrderList)
            return data.data
        },
        * GetNoDealList(_,{call}){
            const data = yield call(GetNoDealList)
            return data.data
        },
        *orderCancel({orderid},{call}){
            const data = yield call(orderCancel,{orderID:orderid})
            return data
        },
        *history(_,{call}){
            const data = yield call(getHistoryOrderList)
            return data.data
        },
        *getGainLossList({code},{call}){
            const data = yield call(getGainLossList,{symbol:code})
            console.log(data)
            return data
        }
    }
}
