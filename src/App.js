import React from "react";
import shortid from "shortid";
import "./App.css";
import FlipMove from "react-flip-move";

export default class App extends React.Component {
  state = {
    items: [],
    text: ""
  };

  handleTextChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  addItem = event => {
    event.preventDefault();
    const newItem = {
      text: this.state.text,
      key: shortid.generate()
    };
    this.setState({
      items: [newItem, ...this.state.items],
      text: ""
    });
  };

  deleteItem = itemID => {
    this.setState({
      items: this.state.items.filter(item => item.key !== itemID)
    });
  };

  render() {
    const items = this.state.items.map(item => {
      return (
        <li onClick={() => this.deleteItem(item.key)} key={item.key}>
          {item.text}
        </li>
      );
    });

    return (
      <div className="appMain">
        <div className="formWrapper">
          <form onSubmit={this.addItem}>
            <input
              placeholder="Enter task: "
              onChange={this.handleTextChange}
              value={this.state.text}
            />
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
        </div>
        <div className="listWrapper">
          <ul>
            <FlipMove duration={250} easing="ease-out">
              {items}
            </FlipMove>
          </ul>
        </div>
      </div>
    );
  }
}
