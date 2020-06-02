import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
//{ info && <small className="form-text text-muted">{ info }</small>}
const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  onFocus
}) => {
  return (
    <div className="form-group-txf">
      <textarea
        className={ classnames('text-area-simple', {
          'is-invalid': error
        } ) }
        placeholder={ placeholder }
        name={ name }
        value={ value }
        onFocus={onFocus}
        onChange={ onChange }
        />
        
        { error && ( <div className="invalid-feedback">{ error }</div> ) }
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus:PropTypes.func
}

export default TextAreaFieldGroup;
