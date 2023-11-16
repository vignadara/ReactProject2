import React from "react";

class UserClass extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        const { name, loc } = this.props;
        return (
            <div>
                <div>{loc}</div>
                <div>{name}</div>
            </div>
            
        )
    }
};

export default UserClass;