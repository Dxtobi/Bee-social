import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {

  componentDidMount(){
    if( this.props.auth.isAuthenticated ){
      this.props.history.push( '/feed' );
    }
  }

    render() {
        return (
              <div className="landing">
                <div className="dark-overlay landing-inner ">
                  <div className="container">
                    <div className="row">
                      <div className="textAlign-center">
                        <h1 className="display-3 mb-4">9ype
                        </h1>
                        <div className="lead" style={{margin: 20}}> Chat and shear moments with friends, family and funny people</div>
                        <div className='signinbbtn' style={{marginBottom : 12}}>
                            <Link to="/register" className="btn-normal">Sign Up</Link>
                      
                            <Link to="/login" className="btn-normal">Login</Link>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        )
    }
}

Landing.propTypes =  {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state )=> ({
  auth: state.auth
});

export default connect( mapStateToProps )( Landing );
