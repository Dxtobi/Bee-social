const isEmpty = require( './is-empty' );
const Validator = require( 'validator' );

module.exports = function validatePostInput( data ){
    
    let errors = { };
    //console.log(data)
    data = !isEmpty( data ) ? data : '';
     
    if( !Validator.isLength( data.text, { min: 0, max: 300 } ) ){
        errors.text = 'Post must be between 0 and 300 characters!';
       // console.log(errors)
    }
    
    if(data.text === ' ' || data.text === '  ' || data.text === '   ' || data.text === '    '|| data.text === '     '){
        errors.text = 'Text field is required!';
       // console.log(errors)
    }
    
    
    return {
        errors,
        isValid: isEmpty( errors )
    };
}