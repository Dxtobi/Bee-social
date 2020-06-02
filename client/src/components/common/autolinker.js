import React from 'react';
import Autolinker from "autolinker";

export default function autolink(input) {
    var linkedText = Autolinker.link( input, {
                 replaceFn : function( match ) {
                     console.log( "href = ", match.getAnchorHref() );
                     console.log( "text = ", match.getAnchorText() );
        
                     switch( match.getType() ) {
                         case 'url' :
                             let url =  match.getUrl()
                             console.log( "url: ", url );
                                // var tag = match.buildTag();  // returns an `Autolinker.HtmlTag` instance, which provides mutator methods for easy changes
                                // tag.addClass( 'external-link' );
                                 return `<a href="http://newplace.to.link.hashtag.handles.to/">  ${url} </a>`  // let Autolinker perform its normal anchor tag replacement
                         case 'email' :
                             var email = match.getEmail();
                             console.log( "email: ", email );
        
                             if( email === "my@own.address" ) {
                                 return false;  // don't auto-link this particular email address; leave as-is
                             } else {
                                 return;  // no return value will have Autolinker perform its normal anchor tag replacement (same as returning `true`)
                             }
        
                         case 'phone' :
                             var phoneNumber = match.getPhoneNumber();
                             console.log( phoneNumber );
        
                             return '<a href="http://newplace.to.link.phone.numbers.to/">' + phoneNumber + '</a>';
        
                         case 'hashtag' :
                             var hashtag = match.getHashtag();
                             console.log( hashtag );
        
                             return `<a href="http://newplace.to.link.hashtag.handles.to/">  ${hashtag} </a>`;
        
                         case 'mention' :
                             var mention = match.getMention();
                             console.log( mention );
        
                             return '<a href="http://newplace.to.link.mention.to/">' + mention + '</a>';
                         default :
                             return '<a href="http://newplace.to.link.mention.to/">' + match + '</a>';
                        }
                 }
             } );

             return linkedText
}