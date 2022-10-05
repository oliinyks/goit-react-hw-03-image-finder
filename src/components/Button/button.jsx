import React, { Component } from 'react';
import './button.scss';

class Button extends Component {
  state = {
    page: 1,
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
	 this.props.onClick(this.state.page)
  };
  render() {
    return (
      <button onClick={this.loadMore} className="button-more" type="button">
        Load more
      </button>
    );
  }
}
export default Button;
