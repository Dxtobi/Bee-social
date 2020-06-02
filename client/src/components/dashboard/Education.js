import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

  onDeleteClick(id){
    this.props.deleteEducation(id);
  }

  render() {

  const education = this.props.education.map( edu => (
      <div key={edu._id}>
        <div>{edu.school}</div>
        <div>{edu.degree}</div>
        <div>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          { edu.to === null ? (' Now') : <Moment format="YYYY/MM/DD">{edu.to}</Moment> }
        </div>
        <div><button
              onClick={ this.onDeleteClick.bind(this, edu._id) }
              className="btn-icon delete-icon"/></div>
      </div>
    ));

    return(
      <div className='experience-div place-at-center'>
        <h4  className="color-blue"> Exducation</h4>
        
              { education }
         
      </div>
    )
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education);
