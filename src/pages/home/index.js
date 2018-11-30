import Search from './components/search'
import {PureComponent } from 'react'
import Banner from './components/banner'
import Nav from './components/nav'
import Futures from './components/futures'

export default class extends PureComponent{
    render(){
        return(
            <>
                <Search/>
                <Banner/>
                <Nav/>
                <Futures/>
            </>
        )
    }
}
