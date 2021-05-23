import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { Link } from 'react-router-dom';

class Login extends Component {

  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: { }
    }

    this.onChange = this.onChange.bind( this );
    this.onSubmit = this.onSubmit.bind( this );
  }

  onChange( e ){
    this.setState( { [e.target.name]: e.target.value } );
  }

  componentDidMount(){
    if( this.props.auth.isAuthenticated ){
      this.props.history.push( '/feed' );
    }
  }

  componentWillReceiveProps( nextProps ){

    if( nextProps.auth.isAuthenticated ){
        this.props.history.push( '/feed' );
    }

    if( nextProps.errors ){
      this.setState( { errors: nextProps.errors } );
    }
  }

  onSubmit( e ){
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser( userData );
  }

  render() {

    const { errors } = this.state;

        return (
          <div className="login Contents_App">
              <div className="container">
                <div className="">
                  <div className="">
                    <h1>Log In</h1><br/>
                    <form noValidate onSubmit={ this.onSubmit }>
                    <TextFieldGroup
                      name="email"
                      placeholder="Email address"
                      value={ this.state.email }
                      error={ errors.email }
                      type="email"
                      onChange={ this.onChange }
                      />
                      <TextFieldGroup
                        name="password"
                        placeholder="Password"
                        value={ this.state.password }
                        error={ errors.password }
                        type="password"
                        onChange={ this.onChange }
                        />
                      <input type="submit" value = 'Login' className="btn-submit" />
                      <Link className="" to="/register"> Or Register</Link>
                    </form>
                  </div>
                  
                  
                </div>
              </div>
            </div>
        )
    }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = ( state ) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect( mapStateToProps, { loginUser } )( Login );
