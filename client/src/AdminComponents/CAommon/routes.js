import { 
    IoMdListBox,
    IoIosPricetags,
    IoIosText
 } from "react-icons/io";
 
 import { GiTv } from "react-icons/gi";
 import { 
    TiUser,
    TiUserAdd,

 } from "react-icons/ti";

 import Tags from "./components/components/Tags/Tags/tags";
 import Posts from "./components/components/Tags/Tags/posts";
 import Users from "./components/components/Tags/Tags/users";


export const sidebarlinks = [
    {
        path: "/advert/request/all",
        name: "Advert",
        icon: IoMdListBox,
      component:Tags},
      {
        path: "/users/list/all",
        name: "Users",
        icon: TiUser,
        component:Tags
      },
      {
        path: "/posts/list/all",
        name: "Posts",
        icon: IoIosText,
        component:Posts
      },
      {
        path: "/primume/user/all",
        name: "Primume Users",
        icon: TiUserAdd,
        component:Users
      },
      {
        path: "/user/tvs/all",
        name: "Tv's",
        icon: GiTv,
        component:Tags
      },
      {
        path: "/tags/edit",
        name: "Tags",
        icon: IoIosPricetags,
        component:Tags
      },
      
  ];