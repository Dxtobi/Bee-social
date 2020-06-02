import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
//import SimpleReactValidator from 'simple-react-validator';
class Register extends Component {

    constructor(){
      super();
      this.state = {
        firstname: '',
        secondname: '',
        email: '',
        handle: '',
        password: '',
        password2: '',
        errors: { }
      }
     // this.validator = new SimpleReactValidator();
      this.onChange = this.onChange.bind( this );
      this.onSubmit = this.onSubmit.bind( this );
    }

    componentDidMount(){
      if( this.props.auth.isAuthenticated ){
        this.props.history.push( '/feed' );
      }
    }

    componentWillReceiveProps( nextProps ){
      if(nextProps.errors){
       this.setState({errors: nextProps.errors});
      }
    }

    onChange( e ){
      this.setState( { [e.target.name]: e.target.value } );
    }

    onSubmit( e ){
      e.preventDefault();
      const newUser = {
        firstname: this.state.firstname,
        secondname: this.state.secondname,
        email: this.state.email,
        handle: this.state.handle,
        password: this.state.password,
        password2: this.state.password2,
      }
    //  console.log( newUser );
      if (newUser.firstname === '' || newUser.secondname === '') {
        return
      }else{
        console.log( newUser )
        this.props.registerUser( newUser, this.props.history );
        
        //this.forceUpdate();
      }
     
    }

    render() {

      const { errors } = this.state;

        return (
          <div className="register Contents_App">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Pipe </h1>
                    <p className="lead text-center">Sign Up</p>
                    <form noValidate onSubmit={ this.onSubmit }>
                    <TextFieldGroup
                      name="firstname"
                      placeholder="First Name"
                      value={ this.state.firstname }
                      error={ errors.secondname }
                      onChange={ this.onChange }
                      reqired
                      />
                      
                      <TextFieldGroup
                      name="secondname"
                      placeholder="Second Name"
                      value={ this.state.secondname }
                      error={ errors.second }
                      onChange={ this.onChange }
                      reqired
                      />
                      
                      
                      <TextFieldGroup
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={ this.state.email }
                        error={ errors.email }
                        onChange={ this.onChange }
                        info=""
                        reqired
                        />
                      
                       <TextFieldGroup
                        type="text"
                        name="handle"
                        placeholder="Uniqe handle"
                        value={ this.state.handle }
                        error={ errors.handle }
                        onChange={ this.onChange }
                        info=""
                        />

                      <TextFieldGroup
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={ this.state.password }
                        error={ errors.password }
                        onChange={ this.onChange }
                        />
                      <TextFieldGroup
                        type="password"
                        name="password2"
                        placeholder="Confirm Password"
                        value={ this.state.password2 }
                        error={ errors.password2 }
                        onChange={ this.onChange }
                        />
                      <input type="submit" className="btn-submit" />
                    </form>
                  </div>
                </div>
              </div>
            </div>

        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = ( state ) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect( mapStateToProps, { registerUser } )( withRouter( Register ) );
