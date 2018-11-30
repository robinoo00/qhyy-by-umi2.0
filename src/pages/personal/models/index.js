import {Userinfo,GetCloseOrderList,GetOrderList,CapitalFlow} from '@/services/api'
import {alert} from '@/utils/common'
import router from 'umi/router'
import {ACCOUNT} from '@/utils/params'

export default {
    namespace: 'personal',
    state: {
        data:null,
        finishDetail:{}
    },
    subscriptions: {},
    reducers: {
        assignData(state,{data}){
            return {
                ...state,
                data:data
            }
        },
        assignFinishDetail(state,{data}){
            return {
                ...state,
                finishDetail:data
            }
        }
    },
    effects: {
        *getInfo(_,{call,put,select}){
            try{
                const account = localStorage.getItem(ACCOUNT)
                const data = yield call(Userinfo,{account:account})
                if(data){
                    yield put({
                        type:'assignData',
                        data:data
                    })
                }else{
                    alert('账号过期，请重新登录')
                    router.push('/account/login')
                }
            }catch(e){
                console.log(e)
            }
        },
        *getCloseOrders(_,{call}){
            const data =  yield call(GetCloseOrderList)
            if(data && data.rs){
                return data.datas
            }
        },
        *getOrderList(_,{call,put,select}){
            try{
                const data = yield call(GetOrderList)
                if(data){
                    if(data.rs){
                        return data.datas
                    }
                }else{

                }
            }catch(e){
                console.log(e)
            }
        },
        *getCapitalFlow(_,{call}){
            const data = yield call(CapitalFlow)
            return data.data
        }
    }
}
