import {RealName} from '@/services/api'
import {modal} from '@/utils/common'
import router from 'umi/router'

export default {
    namespace: 'certification',
    state: {
        name: '',
        idnum: '',
        address: '',
        IDFront: {
            src: null,
            file: null
        },
        IDBack: {
            src: null,
            file: null
        }
    },
    subscriptions: {},
    reducers: {
        assignID(state, {payload}) {//赋值身份证
            if(payload.type === 'front'){
                return {
                    ...state,
                    IDFront:{
                        ...state.IDFront,
                        src:payload.src,
                        file:payload.file
                    }
                }
            }
            if(payload.type === 'back'){
                return {
                    ...state,
                    IDBack:{
                        ...state.IDBack,
                        src:payload.src,
                        file:payload.file
                    }
                }
            }
        },
        assignData(state, {datas}) {
            return {
                ...state,
                ...datas
            }
        }
    },
    effects: {
        *submit({payload},{call}){
            let formData = new FormData();
            const keys = Object.keys(payload)
            for(let key of keys){
                formData.append(key,payload[key])
            }
            const data = yield call(RealName,formData)
            if(data){
                modal(data.msg,() => {
                    if(data.rs && data.msg === '已认证'){
                        router.push('/personal')
                    }
                })
            }
        }
    }
}
