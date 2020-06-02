import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import Cheap from "../common/cheap";
import './ads.css'
import { IoIosSend } from 'react-icons/io';
import { Avatar } from '@material-ui/core';
import Prv from './Prv'
import {addAds} from '../../actions/postsActions'



let formData = new FormData();
const someItems = [
                {name :'Grapics And Designs'}, {name :'Politics'}, {name :'Travil'}, {name :'Movies'}, 
                {name :'Music'}, {name :'IT and Communication'},{name :'School'},{name :'Services'},{name :'Housing'}
    ];



class Adsform extends Component {
    constructor(props){
    super(props);
    this.state = { 
        companyName:'',
        webSites:'',
        info:'',
        errors:'',
        tags:[],
        ads_media:'',
        priimg:'',
        showprv:false
     }

     this.onChangeImg = this.onChangeImg.bind(this);
     this.submitFormg = this.submitForm.bind(this);
    }

     componentWillReceiveProps(newProps) {
        if(newProps.errors){
          this.setState({errors: newProps.errors});
        }
      //  console.log(newProps)
        //this.setState({tags : newProps.tags})
      }
     componentDidMount(){
        
        console.log(this.state)
        this.clearFORMDATA()
      //  return formData
     }
     changeText =(e)=>{
         this.setState({[e.target.name]: e.target.value})
     }
     handleClick=(e)=>{
        const {tags} = this.state
        let all = tags
      //  console.log(tags)
      //formData.append('tags', e)
        if(tags.length >0){
            tags.filter((tag) => {
                
              if(tag === e){
                    //console.log('match')
                    all.pop(e)
                    this.setState({tags : all})
                     
                }else{
                    //console.log('not match')
                    this.setState({tags : [...this.state.tags, e]})
                    
                }
                return all
            })
        }else{
            this.setState({tags : [...this.state.tags, e]})
        }
     }
     onChangeImg =(e)=>{
        this.setState({
            priimg : URL.createObjectURL(e.target.files[0]),
            ads_media:e.target.files[0]
          })
          formData.append('ads_media', e.target.files[0])
          console.log(formData)
          return formData
     }
     submitForm=  (e)=>{

        e.preventDefault()
        
        
      //  formData.append('add_media', this.state.add_media);
        
        formData.append('companyName', this.state.companyName)
        
        formData.append('tags', this.state.tags)
        
        formData.append('webSites', this.state.webSites)

        formData.append('info', this.state.info)


        this.props.addAds(formData, this.props.history)
       // console.log(e )
        console.log(formData )
       // this.props.history.push('/feed')
     }
     showPreviewForm=()=>{
        this.setState({showprv : !this.state.showprv})
     }
      clearFORMDATA= ()=>{
    
        
        formData.delete('companyName')
        formData.delete('tags')
        formData.delete('webSites')
        formData.delete('ads_media');
        formData.delete('info');
        
      }
      
    render() {
        const { companyName, webSites, tags, info, error, showprv} =this.state
       console.log(tags)
        return (
            <section className='section-ads Contents_App '>
                {showprv ? <Prv state={this.state} close={this.showPreviewForm} submit ={this.submitForm}/>:null}
                <form onSubmit={this.submitForm} encType='multipart/form-data'>
                            <div className='ads-form'>
                                <TextFieldGroup type='text' value={companyName} name='companyName' placeholder='COMPANY NAME' onChange={this.changeText} error={error}/>
                            </div>
                            <div className='ads-form'>
                                <TextFieldGroup type='text' value={webSites} name='webSites' placeholder='WEB SITE' onChange={this.changeText} error={error}/>
                            </div>
                            <div className='ads-form'>
                                <TextAreaFieldGroup type='text' value={info} name='info' placeholder='SELL YOUR PRODUCT IN LESS THAN 300 WORDS' onChange={this.changeText} error={error}/>
                            </div>
                            <div className='ads-cips-group'>
                                {someItems.map((item)=>{
                                    return(
                                        <Cheap key={item.name} name={item.name} onClick={this.handleClick}/>
                                    )
                                })}
                                
                            </div>
                            <div  className="post-input-buttons">
                            <label className="">
                                <input type="file" className="file-input"  name='ads_media'
                                onChange={(e)=>this.onChangeImg(e, 'multer')}/>
                                <div className='post-preview-img'>
                                    <Avatar variant ='rounded'  src={this.state.priimg} alt='img'/>
                                </div>
                            </label>

                            <button   className="btn-submit"><IoIosSend className='icons-xx'/></button>
                        </div>
                </form>
                
            </section>
        );
    }
}
Adsform.propTypes = {
    addAds: PropTypes.func.isRequired,
   
    //tags : PropTypes.array.isRequired
    
  };
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
  });
 
export default connect(mapStateToProps, {addAds})(Adsform);