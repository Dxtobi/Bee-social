import React from 'react';

class Cheap extends React.Component {
  state = { 
     clicked : false
   }

   handleClickCheap = () => {
    this.props.onClick(this.props.name)
    
   // console.info('You clicked the Chip.', clicked);
    this.setState({clicked :!this.state.clicked})
  }
  render() {
    return (
      <div onClick={this.handleClickCheap} className={`chip ${this.state.clicked=== true? `clicked`: null}`}>
        {this.props.name}
      </div>
    );
  }
}

export default Cheap;



