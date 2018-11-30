import {CID} from '@/utils/params'
import {NoNeedCid} from '@/defaultSettings'
import router from 'umi/router'
import {alert} from '@/utils/common'
import {ACCOUNT} from '@/utils/params'

export default class Token{
    constructor(){
        this.cid = localStorage.getItem(CID)
    }
    ifNeddCid(url){
        let port
        if(url.includes('?')){
            let match = ''
            if(url.includes('api/api')){
                match = url.match(/api\/api\/(\S*)\?/);
            }else if(url.includes('/api/')){
                match = url.match(/api\/(\S*)?/);
            }else if(url.includes('/dmapi/')){
                match = url.match(/dmapi\/(\S*)?/);
            }
            port = match[1]
        }else{
            const arr = url.split('/')
            port = arr[arr.length-1]
        }
        if(!NoNeedCid.includes(port)){//需要cid的接口
            return true
        }else{
            return false
        }
    }
    checkCid(){
        if(!this.cid){
            return false
        }else{
            return true
        }
    }
    static setCid(cid){
        localStorage.setItem(CID,cid)
    }
    static clearCid(){
        localStorage.removeItem(CID)
    }
    getCid(){
        return this.cid
    }
    getAccount(){
        const account = localStorage.getItem(ACCOUNT)
        return account
    }
    noCidCallBack(){
        alert('账号过期，请重新登录')
        router.push('/account/login')
        throw new Error("no cid")
    }
}
