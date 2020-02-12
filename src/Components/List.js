import React, { Component } from "react";

class List extends Component {
  constructor(props) {
    super(props);
    this.item_1 = React.createRef();
    this.item_2 = React.createRef();
    this.item_3 = React.createRef();
    this.item_4 = React.createRef();
    this.item_5 = React.createRef();
    this.itemClick = this.itemClick.bind(this);
    this.state = {
      active_item: 1,
      items: [this.item_1, this.item_2, this.item_3, this.item_4, this.item_5]
    };
  }

  componentDidMount() {
    let items = this.state.items;
    items.forEach((item, i) => {
      if (this.state.active_item < i + 1) {
        item.current.classList.add("left-hidden");
        if (i + 1 === this.state.active_item) {
          item.current.classList.add("active", "to-left");
        }
      } else if (this.state.active_item > i + 1) {
        item.current.classList.add("right-hidden");
        if (i + 1 === this.state.active_item) {
          item.current.classList.add("active", "to-right");
        }
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let items = this.state.items;
    let prev_active_index = prevState.active_item;
    let clicked_item;
    let crossed_items = [];
    let orderd_animation_items;
    let isToLeft;
    items.forEach((item, i) => {
      if (this.state.active_item < prev_active_index) {
        isToLeft = false;
        item.current.classList.add("right-hidden");
        if (i + 1 === this.state.active_item) {
          item.current.classList.add("active");
          clicked_item = item.current;
          /*
          setTimeout(() => {
            item.current.classList.add("to-right");
          }, 400);
	  */
        } else if (
          prev_active_index >= i + 1 &&
          this.state.active_item < i + 1
        ) {
          item.current.classList.add("active");
          crossed_items.push(item.current);
          /*
          setTimeout(() => {
            item.current.classList.add("to-right");
          }, 400);
	  */
        }
      } else if (this.state.active_item > prev_active_index) {
        isToLeft = true;
        item.current.classList.add("left-hidden");
        if (i + 1 === this.state.active_item) {
          item.current.classList.add("active");
          clicked_item = item.current;
          /*
          setTimeout(() => {
            item.current.classList.add("to-left");
          }, 400);
	  */
        } else if (
          prev_active_index <= i + 1 &&
          this.state.active_item >= i + 1
        ) {
          item.current.classList.add("active");
          crossed_items.push(item.current);
          /*
          setTimeout(() => {
            item.current.classList.add("to-left");
          }, 400);
	  */
        }
      }
    });

    if (isToLeft) {
      orderd_animation_items = [...crossed_items, clicked_item];
      let ms = 0;
      orderd_animation_items.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add("to-left");
          if (i + 1 !== orderd_animation_items.length) {
            setTimeout(() => {
              item.classList.add("transition-none");
              item.classList.remove("to-left");
            }, 400);
          }
        }, ms);
        ms += 350;
      });
    } else if (!isToLeft) {
      crossed_items = crossed_items.reverse();
      orderd_animation_items = [...crossed_items, clicked_item];
      let ms = 0;
      orderd_animation_items.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add("to-right");
          if (i + 1 !== orderd_animation_items.length) {
            setTimeout(() => {
              item.classList.add("transition-none");
              item.classList.remove("to-right");
            }, 400);
          }
        }, ms);
        ms += 350;
      });
    }
  }

  /*
  componentDidUpdate(prevProps, prevState) {
    let prev_active_index = prevState.active_item;
    let items = this.state.items;
    items.forEach((item, i) => {
      if (prev_active_index < this.state.active_item) {
        item.current.classList.add("to-left");
        if (i + 1 === this.state.active_item) {
          item.current.classList.add("active", "to-left");
        }
      }
    });
  }
  */

  itemClick = value => {
    let index = value;
    if (this.state.active_item !== index) {
      [...Array(5)].forEach((e, i) => {
        let items = this.state.items;
        items[i].current.classList.remove(
          "active",
          "to-left",
          "to-right",
          "left-hidden",
          "right-hidden",
          "transition-none"
        );
        if (i === index - 1) {
          this.setState({ active_item: index });
        }
      });
    }
  };

  render() {
    return (
      <ul className="menu-list">
        <li
          key="1"
          className="list-item item-1"
          onClick={() => this.itemClick(1)}
          ref={this.item_1}
        >
          <div className="bg-layer"></div> line 1
        </li>
        <li
          key="2"
          className="list-item item-2"
          onClick={() => this.itemClick(2)}
          ref={this.item_2}
        >
          <div className="bg-layer"></div> line 2
        </li>
        <li
          key="3"
          className="list-item item-3"
          onClick={() => this.itemClick(3)}
          ref={this.item_3}
        >
          <div className="bg-layer"></div> line 3
        </li>
        <li
          key="4"
          className="list-item item-4"
          onClick={() => this.itemClick(4)}
          ref={this.item_4}
        >
          <div className="bg-layer"></div>line 4
        </li>
        <li
          key="5"
          className="list-item item-5"
          onClick={() => this.itemClick(5)}
          ref={this.item_5}
        >
          <div className="bg-layer"></div>line 5
        </li>
      </ul>
    );
  }
}

export default List;
