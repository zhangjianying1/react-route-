import React from 'react';
import {render} from 'react-dom'
class Dialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: {
                display: 'hide'
            }
        }
    }
    componentWillMount(){
        this.setState({
            display: {
                display: this.props.show
            }
        })
    }
    clickHandle(){
        this.setState({
            display: {
                display: 'hide'
            }
        })
    }
    render(){
        console.log(this.state.display)
        return (
            <div style={this.state.display}>{this.props.msg}<div><button onClick={() => this.clickHandle()}></button></div></div>
            )
    }
}
export default Dialog;
