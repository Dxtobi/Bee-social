const isEmpty = require( './is-empty' );
const Validator = require( 'validator' );

module.exports = function validateGroup( data ){
    
    let errors = { };
    //console.log(data)
    data.gname = !isEmpty( data.gname ) ? data.gname : '';
    data.ginfo = !isEmpty( data.ginfo) ? data.ginfo : '';

    
    if( Validator.isEmpty( data.ginfo ) ){
        errors.Info = 'Info field is required!';
    }
    
    if( Validator.isEmpty( data.gname ) ){
        errors.Name = 'Name field is required!';
    }
    
    
    
    
    return {
        errors,
        isValid: isEmpty( errors )
    };
}