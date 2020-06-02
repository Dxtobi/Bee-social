import React from 'react'
import {sidebarlinks} from './CAommon/routes';
import './sidebar.css'
import ListLink  from "./CAommon/Common/common/ListLink";
export default (props) => {
    return(
        <div className='a-sidebar'>
           {sidebarlinks.map(link=>{
               return (
                   <ListLink key={link.path} changeFun={props.changeComp} content={link}/>
               )
           })}
        </div>
    )
}
