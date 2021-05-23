import React, {Component} from 'react'
import { getPeopleYouKnow } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';
import Following from './following';
import './followers.css'
import Followers from './followers';

class PeopleYouKnow extends Component {
    state = { 
       showfollower:true,
       followers:[],
       following:[]
     }

    componentDidMount() {
        this.props.getPeopleYouKnow();
      //  console.log('mounted...')
    }

    componentWillReceiveProps(np){
        if(np.profile.profile.followers|| np.profile.profile.following){
          /*  let ids=[]
            let lnt = np.profile.profile.following.lenght
            np.profile.profile.following.map(u=>{
                ids.push(u.user.id)
                lnt--
            })*/
          console.log(np.profile)
          this.setState({following:np.profile.profile.following, followers:np.profile.profile.followers})

        }
    }

    handlegoback = ()=>{
        //  this.setState({isloading : true, messages :[],  profile : {} })
          this.props.history.goBack()
        }
        
        handletugletofollowing=()=>{
            this.setState({ showfollower: true})
          }

          handletugletofollowers=()=>{
            this.setState({ showfollower: false})
          }

    render() {
        console.log(this.state)
        return (
            <div>
                <div style={{textAlign:'center', display: 'flex'}} >
                    <IoIosArrowBack onClick = {this.handlegoback} className='icons title-div'/>Go Back
                </div>

                   <div style={{marginTop: 20, marginBottom: 20}} className="msg-top-nav">
                      <div onClick = {this.handletugletofollowing} className={`fswitch ${this.state.showfollower?'active':null}`} >following</div>
                      <div style={{marginLeft: 45}}/>
                      <div onClick = {this.handletugletofollowers} className={`fswitch ${!this.state.showfollower?'active':null}`}>followers</div>
                      <div className='spacer'/>
                   </div>
                <div>

                    {this.state.showfollower ?
                    
                    this.state.following.map((u, i) =>{
                      ///  console.log(u)
                       return  <Following key={i} img={u.user.userImageData} id={u.user._id} handle={u.user.handle}/>
                    }):
                    this.state.followers.map((u, i) =>{

                       return  <Followers key={i} following={this.state.following} img={u.user.userImageData} id={u.user._id} handle={u.user.handle}/>

                    })
                  }
                </div>
            </div>
        );
    }
}

PeopleYouKnow.propTypes = {
    getPeopleYouKnow: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect( mapStateToProps, { getPeopleYouKnow } )( PeopleYouKnow );
