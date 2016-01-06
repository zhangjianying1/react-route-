import React from 'react';
import {Link} from 'react-router';
class App extends React.Component{
    render(){
        return(
            <div>
                <Link to="/login">login</Link>
                <Link to="/toast">toast</Link>
                {this.props.children}
            </div>
            )
    }
}
export default App;