import {Login,SendSmsCode,Register,ForgotPass,GID} from '@/services/api'
import router from 'umi/router'
import Token from '@/utils/token'
import {alert} from "@/utils/common";

export default {
    namespace: 'account',
    state: {},
    subscriptions: {},
    reducers: {},
    effects: {
        *login({account,password},{call}){
            const data = yield call(Login,{account: account, password: password})
            if(data.rs){
                Token.setCid(data.cid)
            }else{
                alert(data.msg)
            }
            return data.rs
        },
        *sendCode({phone},{call}){
            const data = yield call(SendSmsCode,{phone:phone})
            alert(data.msg)
        },
        *register({formData},{call}){
            const data = yield call(Register,formData)
            console.log(data)
            alert(data.msg)
            if(data && data.rs){
                Token.setCid(data.data.cid)
                router.push('/personal')
            }
        },
        *forget({payload},{call}){
            const data = yield call(ForgotPass,payload)
            alert(data.msg)
            if(data && data.rs){
                router.goBack()
            }
        },
        *validateGID({param},{call}){
            const data = yield call(GID,{param:param})
            return data
        }
    }
}
