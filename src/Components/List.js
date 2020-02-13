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
      if (this.state.active_item <= i + 1) {
        item.current.classList.add("left-hidden");
        if (i + 1 === this.state.active_item) {
          item.current.classList.add("active", "to-left");
        }
      } else if (this.state.active_item >= i + 1) {
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
        } else if (
          prev_active_index >= i + 1 &&
          this.state.active_item < i + 1
        ) {
          item.current.classList.add("active");
          crossed_items.push(item.current);
        }
      } else if (this.state.active_item > prev_active_index) {
        isToLeft = true;
        item.current.classList.add("left-hidden");
        if (i + 1 === this.state.active_item) {
          item.current.classList.add("active");
          clicked_item = item.current;
        } else if (
          prev_active_index <= i + 1 &&
          this.state.active_item >= i + 1
        ) {
          item.current.classList.add("active");
          crossed_items.push(item.current);
        }
      }
    });

    orderd_animation_items = [...crossed_items, clicked_item];

    function animateItem(items, direction, speed) {
      let steps = orderd_animation_items.length,
        ms = 0,
        item_transition_speed = speed / steps;

      if (direction === "right") {
        crossed_items = crossed_items.reverse();
        items = [...crossed_items, clicked_item];
      }
      items.forEach((item, i) => {
        item.style.transitionDuration = item_transition_speed + "px";
        setTimeout(() => {
          item.classList.add("to-" + direction);
          if (i + 1 !== items.length) {
            setTimeout(() => {
              item.classList.add("transition-none");
              item.classList.remove("to-" + direction, "active");
            }, item_transition_speed);
          }
        }, ms - ms / steps);
        ms += item_transition_speed;
      });
    }
    if (isToLeft) {
      animateItem(orderd_animation_items, "left", 1400);
    } else if (!isToLeft) {
      animateItem(orderd_animation_items, "right", 1400);
    }
  }

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
          <div className="bg-layer"></div>

          <div className="content">line 1</div>
        </li>
        <li
          key="2"
          className="list-item item-2"
          onClick={() => this.itemClick(2)}
          ref={this.item_2}
        >
          <div className="bg-layer"></div>
          <div className="content">line 2</div>
        </li>
        <li
          key="3"
          className="list-item item-3"
          onClick={() => this.itemClick(3)}
          ref={this.item_3}
        >
          <div className="bg-layer"></div>
          <div className="content">line 3</div>
        </li>
        <li
          key="4"
          className="list-item item-4"
          onClick={() => this.itemClick(4)}
          ref={this.item_4}
        >
          <div className="bg-layer"></div>
          <div className="content">line 4</div>
        </li>
        <li
          key="5"
          className="list-item item-5"
          onClick={() => this.itemClick(5)}
          ref={this.item_5}
        >
          <div className="bg-layer"></div>
          <div className="content">line 5</div>
        </li>
      </ul>
    );
  }
}

export default List;
