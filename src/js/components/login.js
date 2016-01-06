import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Dialog from './dialog';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg: '',
            show: 'hide'
        }
    }
    subForm(e){
        e.preventDefault();
        let user = ReactDOM.findDOMNode(this.refs.user);
console.log(user)
        if (!user.value) {
            this.setState({
                msg: '用户不能为空',
                show: 'diplay'
            })
        }
    }
    render(){
        return (
            <div class="login">
                <form onSubmit={(e) => this.subForm(e)} method="post">
                    <input type="text" name="user" ref="user" />
                    <input type="password" name="password" ref="password" />
                    <button>登录</button>
                </form>
                <Dialog msg={this.state.msg} show={this.state.show}/>
            </div>
            )
    }
}
export default Login;