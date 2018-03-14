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


// lists and keys in react
const React = require('react');

const EggList = (props) => {
  const eggs = props.eggs;
  const eggList = eggs.map((egg, i) => <EasterEgg key={i} name={egg} />);
  return <ul>{eggList}</ul>;
};

const EasterEgg = (props) => {
  return <li>{props.name}</li>
};


// hello world in React
const React = require('react');
const Hello=()=> {
  return <h1>Hello</h1>
}
const World=()=> {
  return <h2>World!</h2>
}
class Greet extends React.Component {
  render() {
    return <div><Hello /><World /></div>
  }
}


// a quick simple one today
const zeroFuel = (distanceToPump, mpg, fuelLeft) => {
  return distanceToPump <= mpg*fuelLeft;
};
