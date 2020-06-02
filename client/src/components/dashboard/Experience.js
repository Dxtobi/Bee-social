import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
  onDeleteClick(id){
    this.props.deleteExperience(id);
  }
  render() {

  const experience = this.props.experience.map( exp => (
      <div key={exp._id}  className="">
        <div>{exp.company}</div>
        <div>{exp.title}</div>
        <div>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          { exp.to === null ? (' Now') : <Moment format="YYYY/MM/DD">{exp.to}</Moment> }
        </div>
        <div>
            <button
              onClick={ this.onDeleteClick.bind(this, exp._id) }
              className="btn-icon delete-icon"/></div>
      </div>
    ));

    return(
      <div className='experience-div place-at-center'>
        <h4  className="color-blue"> Experience</h4>
        
            

              {experience}

         
      </div>
    )
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);
