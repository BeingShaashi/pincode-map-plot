import React, { Component } from "react";

class SearchBox extends Component {
  state = { value: "" };

  delay = 200;
  timer = null;

  onChange(e) {
    let v = e.target.value;
    this.setState({ value: v });

    if (!this.props.onChange) return;

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.props.onChange(v);
    }, this.delay);
  }

  render() {
    const {
      onChange,
      state: { value },
    } = this;

    return (
      <input
        value={value}
        onChange={onChange.bind(this)}
        placeholder="Search"
      />
    );
  }
}

export default SearchBox;
