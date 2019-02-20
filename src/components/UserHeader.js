import React from 'react';
import { connect } from 'react-redux';

class UserHeader extends React.Component {

    render() {
        const { user } = this.props; //structure user out of this.props so we can use it as user
        if (!user) {
            return null;
        }

        return <div className="header">{user.name}</div>;
    }
}
//ownProps is the props of the component or rather the props that are about to go in
//mapstate to props should be for data selection logic
const mapStateToProps = (state, ownProps) => {
   return {user: state.users.find(user => user.id === ownProps.userId) };
};
export default connect(mapStateToProps)(UserHeader);