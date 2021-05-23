import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from '../common/Spinner';
//import getImage from "../../utils/getImage";
import {  makeASearch} from "../../actions/search";
import {FaUsers } from "react-icons/fa";
import {  IoIosSearch} from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdRssFeed } from "react-icons/md";
import{ Avatar} from '@material-ui/core'
//import Search from './search'
import  './search.css'
import PostItem from '../posts/PostItem'
let searchResult
//let result

class MainSearch extends Component {
  state = {
    initialSearch: [],
    selectedResult: [],
    searchtext:[],
    searchValue:''
  };

  componentDidMount() {
    //this.props.getSearch();

    
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.initialSearch.length <= 0) {
      this.setState({ initialSearch: nextProps.search });
    }
    else {
      this.setState({ selectedResult: [] });
    }
    console.log(nextProps)
  }
/**
 *
 */
  // FUNCTIONS
  searchResults = (data)=>{
    if(data.length === 0 && this.state.searchValue.length>0){
      return  (<div style={{textAlign:'center'}}>No Match found for your search</div>)
    }
     return data.map((data, i) => {
      
      if(data.is === 'Post'){
        return (<PostItem key={i} post={data.post} />)
      }else{
     return (<Link to={data.handle_link} className='search_list' key={i}>
        <Avatar src={data.image} alt={data.name} />
        <div className='handle_and_name'>
          
        <small>@{data.handle}</small>
          <div>{data.name}</div>
          
        </div>
        
        <div>
          {this.statusfunc(data.is)}
        </div>
      </Link>)}
    })
   
  }
  showSearch = async(searchtext) => {
    
    if (this.state.initialSearch.length > 0) {
      console.log(this.state.initialSearch)
      searchResult =  this.state.initialSearch.filter((data, i) => {
        const regex = new RegExp(`^${searchtext.target.value}`, 'gi');
        console.log(data)
        return data.handle.match(regex) //|| data.handle.match(regex)
      });
      if(searchtext.target.value.length !== ''){
        this.setState({
          searchtext : searchResult
        })
      }else{
        this.setState({
          searchtext :''
        })
      }
     
      //this.searchResults(searchResult)
      console.log('====================================');
      console.log(searchResult);
      console.log('====================================');
    } else {
      return (
        <Spinner/>
      );
    }
  };
  statusfunc = (e) => {
    if(e ===  'Group'){
      return(
        <div  className='search-is'>
          <small><FaUsers/> Group</small>
        </div>
      )
    }else if(e === 'Post'){
      return(
        <div className='search-is'>
           <small ><MdRssFeed/> Post</small>
        </div>
      )
    }else{
      return(
        <div className='search-is'>
           <small >profile</small>
        </div>
      )
    }
  }
  onchangeinput=(e)=>{
    this.setState( { [e.target.name]: e.target.value } );
  }
  serarch=()=>{
    this.props.makeASearch(this.state.searchValue)
  }
  render() {
    
    return (
      <div>
        <div>
        <div>
          <div className="scontainer">
            <input name='searchValue' value={   this.state.searchValue} className="search-input" type="text" placeholder="Search..." onChange={this.onchangeinput} />
            <button onClick = {this.serarch} className="search"><IoIosSearch className="icons"/></button>
          </div>
        </div>
        </div>
        <div className="sresult">
          {this.searchResults(this.props.search)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search: state.SEARCH.search
});

export default connect(mapStateToProps,{  makeASearch })(MainSearch);
