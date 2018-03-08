// Didn't want the file to just get too big.
// square a number w/o Math, *, or + operators
sq=x=>x/(1/x)- -.5|0


//Apparently there are react Kata's so that's cool:
const React = require('react');

class States extends React.Component {
  constructor() {
    super();
    this.state = {united: false}
  }
  unite() {
    this.setState({united: true});
  }
  render() {
    const united = this.state.united;
    let text = united ? 'Code for everyone' : 'Make America code again';
    return <div className="status">{text}</div>
  }
}
