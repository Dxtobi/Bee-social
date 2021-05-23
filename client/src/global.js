import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
   

  }
  .g-info-board{
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    text-align: center;
    position: fixed;
    height: 100vh;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    z-index:1000
  }
  .message-box{
    position: fixed;
    display: -ms-flexbox;
    display: -ms-flexbox;
    display: flex;
    bottom: 6px;
    padding: .3rem;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    left: 0;
    right: 0;
    width: 98%;
    margin: auto;
    z-index: 888;
    border-radius: 50rem;
  }
  .message-input {
    overflow: hidden;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    width: 70%;
    border: none;
    border-radius: 50px;
    padding: 0.3rem;
    outline: none;
}
  .special_a_tags{
    color: ${({ theme }) => theme.a};
  }
.footer {
    width: 100%;
    position: fixed;
    margin: auto;
    padding-top: 0.8rem;
    padding-bottom: 0.3rem;
    bottom: 0px;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    z-index: 15;
}
  .header-div-name-image-{
    text-decoration: none;
    display: flex;
  }
  .model_custom{
    display: flex;
    font-size: small;
    justify-content: space-between;
    width: 90%;
    margin: auto;
    align-items: center;
    position: fixed;
    top: 10px;
    z-index: 100;
    left: 0px;
    right: 0px;
    height: 50px;
    padding: 0px 10px 0px 10px;
    background: #ff4b4b1a;
    border-radius: 20px;
  }
  .model_custom_message{
    color: violet;
    outline: none;
  }
  .chat-title{
      width: 98%;
      padding: 0.3rem;
      z-index: 888;
      position: fixed;
      display: -ms-flexbox;
      background: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.text};
      display: flex;
      top: 0px;
      align-content: center;
    justify-content: space-between;
    align-items: center;
  }
  .header-text{
    color: #03A9F4;
    font-weight: bold;
    text-transform: capitalize;
    font-family: cursive;
    font-size: 18px;
    margin-left: 8px;
  }
  .header-brand {
    text-decoration: none;
    color:${({ theme }) => theme.nave};
    font-style: inherit;
  }
  .header-text-toggle{
    text-decoration: none;
    color:${({ theme }) => theme.nave};
  }
  .side-bar{
    height: 100%;
   
    position: fixed;
    top:0px;
    left: 0px;
    z-index: 200;
    width: 70%;
    transform:translateX(-100%);
    transform: translate3d();
    -webkit-transform:translateX(-100%);
    -moz-transform:translateX(-100%);
    -ms-transform:translateX(-100%);
    -o-transform:translateX(-100%);
    transition: transform 0.3s ease-out;
    -webkit-transition: transform 0.3s ease-out;
    -moz-transition: transform 0.3s ease-out;
    -ms-transition: transform 0.3s ease-out;
    -o-transition: transform 0.3s ease-out;
}

  .side-bar-container {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    margin-top: 1rem;
    background: ${({ theme }) => theme.body};
    padding: .8rem;
    border-radius: 0px 30px 30px 0px;
     border: 1px solid ${({ theme }) => theme.text};
     border-left: none;
}

.side-bar-container a{
  display: flex;
  color: ${({ theme }) => theme.text};
  justify-content: center;
  align-items: center;
}
a{
  color: ${({ theme }) => theme.text};
}
.side-bar-container div{
  display: flex;
  justify-content: center;
  align-items: center;
}
  .header-div{
    position: fixed;
      top: 0px;
      box-shadow: 0px 2px 20px 0px #0a0a0511;
      width: 100%;
      margin: auto;
      padding: 0.4rem 0.4rem 0rem 0.4rem;
      left: 0%;
      right: 0%;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: row;
      flex-direction: row;
      z-index: 100;
      color: ${({ theme }) => theme.text};
      background-color: ${({theme})=>theme.body};
  }

  .form-text-input {
    height: 25px;
    padding: 5px;
    outline: none;
    color: ${({ theme }) => theme.text};
    background-color: ${({theme})=>theme.body};
    border: .1rem solid ${({theme})=>theme.nave};
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 20rem;
    box-shadow: 0px 2px 5px 0px #0000003d;
}
.form-text-area-input{
  height: 200px;
  width: 100%;
  padding: 5px;
  outline: none;
  color: ${({ theme }) => theme.text};
  background-color: ${({theme})=>theme.body};
  border:none;
  box-shadow: 0px 0px 20px 7px rgba(0, 0, 0, 0.191);
  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -ms-transition: 0.2s;
  -o-transition: 0.2s;
}

.text-area-simple {
  border: none;
  border-bottom: 0.2rem solid ${({theme})=>theme.nave};
  max-height: 10rem;
  min-height: 10rem;
  width: 100% !important;
  color: ${({ theme }) => theme.text};
  background-color: ${({theme})=>theme.body};
  margin-top: .9rem;
  outline: none;
 }
 .search-input{
  width: 90%;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text};
  background-color: ${({theme})=>theme.body};
}
.search{
  margin: auto;
  border: none;
  outline: none;
  background: none;
  color: ${({ theme }) => theme.text};
  background-color: ${({theme})=>theme.body};
}

  `
