import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AdminRoute = ( { component: Component, auth, ...res } ) =>(
  <Route
    { ...res }
    render = { props =>
      auth.user.admin=== true ? (
        <Component { ...props } />
      ) : (
        <Redirect to="/feed" />
      )
    }
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect( mapStateToProps )( AdminRoute )
