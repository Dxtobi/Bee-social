const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');

router.get( '/test', ( req, res ) =>  res.json({ message: 'Users works!' }) );

router.post( '/register', ( req, res ) => {
    User.findOne({ email : req.body.email })
        .then( user => {
        if( user ){
            return res.status( 400 ).json({ email: 'email already exists' });
        }else{
            const avatar = gravatar.url( req.body.email, {
                s: '200',//size    
                r: 'pg',//rating    
                d: 'mm',//default
            });
            
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
            });
            
            bcrypt.genSalt( 10, ( err, salt ) => {
                bcrypt.hash( newUser.password, salt, ( err, hash ) => {
                    if( err ) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then( user => res.json( user ) )
                        .catch( err => console.log( err ) );
                })
            })
        }
    });
});

router.post( '/login', ( req, res ) => {
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({ email })
        .then( user => {
        //check for user
        if(!user){
            return res.status( 404 ).json({ email: 'User not found!' });
        }
        
        //check pass
        bcrypt.compare( password, user.password )
            .then( isMatch => {
            if( isMatch ){
                //create JWT payload
                const payload = { id: user.id, name: user.name, avatar: user.avatar }
                
                jwt.sign(
                    payload, 
                    keys.secretKey, 
                    { expiresIn: 3600 }, 
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer '+token
                        });    
                });
                
            } else {
                return res.status( '400' ).json({ password: 'Password incorrect!' });
            }
        });
    });
});

router.get( '/current', passport.authenticate( 'jwt', { session: false } ), ( req, res ) => {
    //res.json( req.user );
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;