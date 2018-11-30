import {PureComponent} from 'react'
import styles from './style.less'
import {Flex} from 'antd-mobile'
import {addNum} from '@/utils/common'

export default class extends PureComponent{
    constructor(props){
        super(props)
        this.diff = props.diff ? props.diff : 1
        this.state = {
            value:props.value ? props.value : 1,
            min:props.min ? props.min : 1,
            max:props.max ? props.max : null
        }
    }
    static getDerivedStateFromProps(props,state){
        if(props.value != state.value){
            return {
                value:props.value ? props.value : 1,
                min:props.min ? props.min : 1,
                max:props.max ? props.max : null
            }
        }else{
            return null
        }
    }
    del = () => {
        const {min} = this.state
        let value = addNum(this.state.value,-this.diff)
        if(value <= min){
            value = min
        }
        this.assignValue(value)
    }
    add = () =>{
        const {max} = this.state
        let value = addNum(this.state.value,this.diff)
        if(value >= max && max){
            value = max
        }
        this.assignValue(value)
    }
    change = (e) => {
        const value = e.target.value
        this.assignValue(value)
    }
    assignValue = value => {
        if(!value || isNaN(value)){
            return
        }
        this.setState({
            value:value
        },() => {
            const {callback} = this.props
            callback(value)
        })
    }
    render(){
        const {value,min,max} = this.state
        const {style} = this.props
        let initialStyle = {
            width:'3rem'
        }
        initialStyle = {
            ...initialStyle,
            ...style
        }
        return(
            <Flex className={styles["num-choose"]} style={initialStyle}>
                <Flex.Item>
                    <div className={styles["del-item"]} data-status={value <= min ? 'off' : 'on'} onClick={this.del}>-</div>
                </Flex.Item>
                <Flex.Item>
                    <div className={styles["num-input"]}>
                        <input type="number" onChange={this.change} value={value}/>
                    </div>
                </Flex.Item>
                <Flex.Item>
                    <div className={styles["add-item"]} data-status={value < max || !null ? 'on' : 'off'} onClick={this.add}>+</div>
                </Flex.Item>
            </Flex>
        )
    }
}
