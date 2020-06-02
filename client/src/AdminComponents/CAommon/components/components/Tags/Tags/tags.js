import React, { Component } from 'react';
import Tag from "./tags/tagitems";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllTags, addTags, deleteTags } from "../../../../../../actions/adminActions";
import TextFieldGroup from "../../../../../../components/common/TextFieldGroup";
//import { Popper } from '@material-ui/core';
//import SimpleReactValidator from 'simple-react-validator';

class Tags extends Component {

    state = { 

        tags:[],

        tag:''

     }

     componentDidMount(){

         this.props.getAllTags()
        //console.log(  'mounted tags')
     }

     componentWillReceiveProps(newProps){
        
        console.log(newProps.tags,  'tags')
        if(newProps.tags){ 
        
            this.setState({tags : newProps.tags})
        
        }
        
     }


     deletetag=(e)=>{
        this.props.deleteTags(e)
        this.props.getAllTags()
     }

     addnewtag = ()=>{
        ///^[A-Z0-9_-]*$/i
        const {tag} = this.state


        const rgx = /^[A-Z0-9_-]*$/ig
       // console.log(tag.match(rgx))
        let _match = tag.match(rgx)
        _match ? this.props.addTags(tag) : window.alert('use only valid words')
        //
        this.setState({tag:''})
     }


     onchangeinput = (e) =>{
        this.setState( { [e.target.name]: e.target.value.trim() } );
     }

    render() {
        return (
            <div>
                <div className='a-inline-form'>
                   <TextFieldGroup type='text' name='tag' value={this.state.tag} onChange={this.onchangeinput} placeholder='add new tags'/>
                   <button  className='btn-submit' onClick={this.addnewtag}>Add new tag</button>
                </div>
                
                <Tag delete={this.deletetag} tags={this.state.tags}/>
            </div>
        );
    }
}

Tags.propTypes = {
    getAllTags: PropTypes.func.isRequired,
    addTags:PropTypes.func.isRequired,
    deleteTags:PropTypes.func.isRequired
  }
  
const mapStateToProps = state => ({
    tags: state.post.tags
  })
export default connect(mapStateToProps, {addTags, deleteTags, getAllTags })(Tags);