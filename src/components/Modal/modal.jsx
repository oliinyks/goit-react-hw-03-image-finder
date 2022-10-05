import { Component } from 'react';

class Modal extends Component {
	handleKeyDown = e => {
		if (e.code === 'Escape') {
			 this.props.closeModal();
		}
  }

  handleBackdropClick = e => {
		if(e.currentTarget === e.target) {
			 this.props.closeModal();
		}
  }

  componentDidMount () {
		window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
		window.removeEventListener('keydown', this.handleKeyDown)
  }
  render() {
    return (
      <div className="overlay" onClick={this.handleBackdropClick}>
        <div className="modal">
          <img src={this.props.url} />
        </div>
      </div>
    );
  }
}
export default Modal;
