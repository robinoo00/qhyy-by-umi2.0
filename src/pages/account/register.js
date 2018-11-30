import {PureComponent} from 'react'
import styles from './styles/register.less'
import {Flex, InputItem, WhiteSpace, Button} from 'antd-mobile'
import Header from '@/components/header/'
import {createForm} from 'rc-form'
import {connect} from 'dva'
import router from 'umi/router'
import {alert,validatePhone} from '@/utils/common'
import CountDown from '@/components/countDown/'
import tp1 from '@/assets/tp1.png'
import tp2 from '@/assets/tp2.png'
import tp3 from '@/assets/tp3.png'
import tp4 from '@/assets/tp4.png'

@createForm()
@connect()

export default class extends PureComponent {
    state = {
        agree:true,
        pic_list:[
            {title:'身份证正面',key:'c11',file:null,data:null,src:tp1},
            {title:'身份证背面',key:'c12',file:null,data:null,src:tp2},
            {title:'手持身份证',key:'c13',file:null,data:null,src:tp3},
            {title:'银行卡正面',key:'c14',file:null,data:null,src:tp4}
        ]
    }
    _submit = () => {
       this._validateInputs()
           .then(this._validatePics)
           .then(this._upload)
    }
    _upload = data => {
        console.log(data)
        const keys = Object.keys(data)
        let formData = new FormData()
        for(let key of keys){
            formData.append(key,data[key])
        }
        const pic_list = this.state.pic_list
        for(let item of pic_list){
            formData.append(item.key,item.data)
        }
        const {dispatch} = this.props
        dispatch({
            type:'account/register',
            formData:formData
        })
    }
    _validateInputs = () => {
        return new Promise((resolve,reject) => {
            const {form, dispatch} = this.props
            form.validateFields({forcpae: true}, (error) => {
                if (!error) {
                    let value = form.getFieldsValue();
                    resolve(value)
                } else {
                    const errors = Object.values(error);
                    alert(errors[0]['errors'][0]['message']);
                    reject()
                }
            });
        })
    }
    _validatePics = (value) => {
        return new Promise((resolve,reject) => {
            const list = this.state.pic_list
            for(let item of list){
                if(!item.data){
                    alert('请上传' + item.title)
                    reject()
                    return false
                }
            }
            resolve(value)
        })
    }
    _sendCode = () => {
        const phone = this.props.form.getFieldValue('c2')
        if(validatePhone(phone)){
            const {dispatch} = this.props
            dispatch({
                type:'account/sendCode',
                phone:phone
            })
        }else{
            alert('手机号码有误')
        }
    }
    validateGID = (rule, value, callback) => {
        const len = value.length
        if (len != 6) {
            callback('推荐码不正确')
        } else {
            const {dispatch} = this.props
            dispatch({
                type: 'account/validateGID',
                param: value
            }).then(data => {
                if (data.rs) {
                    callback(data.msg)
                } else {
                    callback()
                }
            })
        }
    }

    validatePhone = (rule, value, callback) => {
        if (validatePhone(value)) {
            callback();
        } else {
            callback('手机号码有误!');
        }
    }
    _agreeProtocol = () => {
        this.setState({
            agree:!this.state.agree
        })
    }
    _uploadPic = (index) => (e) => {
        let list = this.state.pic_list
        const file = e.target.files[0]
        console.log(index)
        list[index]['src'] = window.URL.createObjectURL(file)
        list[index]['data'] = file
        this.setState({
            piclist:[...list]
        })
    }
    _renderUploadPic = (list) => {
        return(
            <Flex className={styles["pics"]} justify={"around"}>
                {list.map((item,index) => (
                    <Flex.Item key={item.title} className={styles["item"]}>
                        <input type="file" className={styles["file"]} onChange={this._uploadPic(index)}/>
                        <div className={styles["con"]}>
                            <img src={item.src}/>
                            <div className={styles["title"]}>{item.title}</div>
                        </div>
                    </Flex.Item>
                ))}
            </Flex>
        )
    }
    render() {
        const {form} = this.props
        const {agree,pic_list} = this.state
        const list = [
            {title: '推荐号', key: 'c1', placeholder: '请输入推荐号', validator: this.validateGID},
            {title: '手机号', key: 'c2', placeholder: '请输入手机号', validator: this.validatePhone},
            {title: '真实姓名', key: 'c3', placeholder: '请输入真实姓名', validator: null},
            {title: '身份证号', key: 'c4', placeholder: '请输入身份证号', validator: null},
            {title: '详细地址', key: 'c6', placeholder: '请输入详细地址', validator: null},
            {title: '开户银行', key: 'c7', placeholder: '请输入开户银行', validator: null},
            {title: '开户行', key: 'c8', placeholder: '请输入开户行', validator: null},
            {title: '银行卡号', key: 'c9', placeholder: '请输入银行卡号', validator: null},
            {title: '卡人姓名', key: 'c10', placeholder: '请输入卡人姓名', validator: null}
        ]
        return (
            <>
            <Header
                title={'注册'}
            />
            <WhiteSpace size={'xl'}/>
            <div className={styles["inputs"]}>
                {list.map(item => (
                    <InputItem
                        key={item.key}
                        placeholder={item.placeholder}
                        {...form.getFieldProps(item.key, {
                            rules: [{
                                required: true, message: item.placeholder,
                            }, {
                                validator: item.validator
                            }],
                        })}
                    >{item.title}</InputItem>
                ))}
                {this._renderUploadPic(pic_list)}
                <InputItem
                    placeholder={'请输入短信验证码'}
                    extra={<div className={styles["send-code"]}>
                        <CountDown
                            callBack={this._sendCode}
                        />
                    </div>}
                    {...form.getFieldProps('c11', {
                        rules: [{
                            required: true, message: '请输入短信验证码',
                        }],
                    })}
                />
            </div>
            <Flex className={styles["agreement"]} justify={'center'}>
                <input
                    type="checkbox"
                    checked={agree}
                    onChange={this._agreeProtocol}
                />
                <label>
                    我已阅读并同意
                    <a
                        href="javascript:;"
                        onClick={this._agreeProtocol}
                        style={{color: '#5B78C0'}}
                    >《平台网站服务协议》</a>
                </label>
            </Flex>
            <div className={styles["submit"]}>
                <Button
                    type={'primary'}
                    onClick={this._submit}
                >提交</Button>
                <p className={styles["tip"]}>
                    点击下一步，即同意<span>用户服务协议</span>
                </p>
            </div>
            <div className={styles["extra"]}>
                已有账户，去 <span onClick={() => {
                router.push('/account/login')
            }}>登录</span>
            </div>
            </>
        )
    }
}
