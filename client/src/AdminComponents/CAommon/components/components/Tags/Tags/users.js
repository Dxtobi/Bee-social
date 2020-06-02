import React, { Component } from 'react';
import {UserDisplay} from "./users/users";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAdminProfile , editProProfile, createAdminProfile, editAdminProfile} from "../../../../../../actions/profileActions";
import TextFieldGroup from "../../../../../../components/common/TextFieldGroup";
//import { Popper } from '@material-ui/core';
//import SimpleReactValidator from 'simple-react-validator';

class UsersAdmin extends Component {
    state = { 
        profiles:[],
        firstname:'',
        secondname:'',
        password:'',
        password2:'',
        handle:'',
        email:'',
        errors:{ }
     }

     componentDidMount(){

         this.props.getAdminProfile()

     }

     componentWillReceiveProps(nextProps) {
         //console.log(nextProps.posts)
         if(nextProps.profiles > 0){ 
             this.setState({
                profiles : nextProps.profiles
                })
        }
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
           }
     }

     editAdmin=(id)=>{
        //console.log(id)
        this.props.editAdminProfile(id)
     }
     aproveProProfile=(id)=>{
       //console.log(id)
       this.props.editProProfile(id)
     }

     createAdmin=()=>{
         
        let data = {
                firstname:this.state.firstname,
                secondname:this.state.secondname,
                password:this.state.password,
                password2:this.state.password2,
                handle:this.state.handle,
                email:this.state.email,
              }

        this.props.createAdminProfile(data)
        this.setState({
                firstname:'',
                secondname:'',
                password:'',
                password2:'',
                handle:'',
                email:'',
                errors:{ }
        })
     }

     onChangeHandler = ( e ) =>{

        this.setState( { [e.target.name]: e.target.value } );
     
    }

    render() {
        const { errors } = this.state;

        return (
            <div className=''>
                <div>
                    <div className=''>
                        <TextFieldGroup
                            placeholder='First Name'
                            name='firstname'
                            value={this.state.firstname}
                            onChange={this.onChangeHandler} 
                            error={ errors.firstname }
                        />
                        <TextFieldGroup
                            name='secondname'
                            value={this.state.secondname}
                            onChange={this.onChangeHandler} 
                            placeholder='Second Name'
                            error={ errors.secondname }
                        />
                        <TextFieldGroup
                            placeholder='Handle'
                            name='handle'
                            value={this.state.handle}
                            onChange={this.onChangeHandler} 
                            error={ errors.handle }
                        />
                        <TextFieldGroup
                            placeholder='Email'
                            name='email'
                            value={this.state.email}
                            onChange={this.onChangeHandler} 
                            error={ errors.email }
                        />
                        <TextFieldGroup
                            name='password'
                            value={this.state.password}
                            onChange={this.onChangeHandler} 
                            placeholder='Password'
                            label='Password'
                            error={ errors.password }
                        />
                        <TextFieldGroup
                            name='password2'
                            value={this.state.password2}
                            onChange={this.onChangeHandler} 
                            placeholder='Confarm Password'
                            error={ errors.password2 }
                        />
                     </div>
                  <button  className='btn-submit' onClick={this.createAdmin}>Add new Admin</button>
                </div>
                <UserDisplay editAdmin={this.editAdmin} approveProProfile={this.aproveProProfile} users={this.props.profiles.profiles}/>
            </div>
        );
    }
}
UsersAdmin.propTypes = {
    getAdminProfile: PropTypes.func.isRequired,
    editProProfile:PropTypes.func.isRequired,
    createAdminProfile:PropTypes.func.isRequired,
    editAdminProfile:PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  }
const mapStateToProps = state => ({
    profiles: state.profile,
    errors: state.errors
  })

export default connect(mapStateToProps, {getAdminProfile, editProProfile, createAdminProfile, editAdminProfile})(UsersAdmin);