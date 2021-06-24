import React from 'react';
import {getGroupAll} from '../../actions/groupActions'
import { connect } from 'react-redux';


class GroupAll extends React.Component {
    constructor(){
      super();
   this.state = { 
       
         groups : [],
         
      }
     // this.mRef = React.createRef()
     //const messagesEnd = React.createRef()
     }
    
     componentWillReceiveProps(nextProps) {
       
         console.log(nextProps)
         
            this.setState({ groups :nextProps.group.group})
          
            
          // this.scrollBottom()
           //
           
         
       }
     
 componentDidMount() {
      
        // this.props.getGroupMessages(this.props.match.params.id);
      this.props.getGroupAll();
    //  this.scrollBottom();
     //let sokio = socket.connect(`/${this.state.group._id}`)
 }
 
 
     render() {
           const {group, isloading,messagetxt, messages} = this.state
           
          
         return (
            <div>
                All Groups
            </div>
         );
     }
 }

   
   const mapStateToProps = state => ({
     auth: state.auth,
     group : state.groups.groups
   });
 export default connect(mapStateToProps, { getGroupAll })(GroupAll);