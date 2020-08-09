
import React, { Component } from "react";
class category extends Component {
    constructor(props) {
      super(props);
      console.log('query',this.props.match.params.id)
    }
    render(){
        return(
        <div className="h-100">id-{this.props.match.params.id}</div>);
    };
}
category.propTypes = {}
    export default category;