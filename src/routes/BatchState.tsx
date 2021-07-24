import React from "react";
export default class BatchState extends React.Component {
  state = { number: 0 };
  handleClick = () => {
    const { number } = this.state;
    this.setState({
      number: this.state.number + 1,
    });
    console.log(this.state); //同步模式：0；批量模式：0
    this.setState({
      number: this.state.number + 1,
    });
    console.log(this.state); //同步模式：0；批量模式：0
    setTimeout(() => {
      this.setState({
        number: this.state.number + 1,
      });
      console.log(this.state); //同步模式：2；批量模式：1
      this.setState({
        number: this.state.number + 1,
      });
      console.log(this.state); //同步模式：3；批量模式：1
    });
  };
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
