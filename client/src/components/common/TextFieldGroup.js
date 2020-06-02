import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
//{ info && <small className="form-alart">{ info }</small>}
const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  onFocus
}) => {
  return (
    <div className="form-group-txf">
      <input
        type={ type }
        className={ classnames('form-text-input', {
          'is-invalid': error
        } ) }
        placeholder={ placeholder }
        name={ name }
        value={ value }
        onChange={ onChange }
        disabled={ disabled }
        onFocus={onFocus}
        />
        
        { error && ( <div className="danger-text">{ error }</div> ) }
    </div>
  )
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value:PropTypes.string.isRequired,
  label:PropTypes.string,
  error:PropTypes.string,
  info:PropTypes.string,
  type:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
  onFocus:PropTypes.func,
  disabled:PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;
