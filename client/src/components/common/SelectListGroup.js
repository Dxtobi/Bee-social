import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
//{ info && <small className="form-text text-muted">{ info }</small>}
const SelectListGroup = ({
  name,
  value,
  error,
  info,
  onChange,
  options
}) => {

  const selectOptions = options.map( option =>(
    <option key={ option.label } value={ option.value } >
      { option.label }
    </option>
  ))

  return (
    <div className="form-group-txf">
      <select
        className={ classnames('form-text-input', {
          'is-invalid': error
        } ) }
        name={ name }
        value={ value }
        onChange={ onChange }>
          { selectOptions }
        </select>
        
        { error && ( <div className="invalid-feedback">{ error }</div> ) }
    </div>
  )
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectListGroup;
