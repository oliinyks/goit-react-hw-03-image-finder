import { Component } from 'react';
import PropTypes from 'prop-types';

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
          <img src={this.props.url} alt='' />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
	url: PropTypes.string.isRequired,
	closeModal: PropTypes.func.isRequired,
 };

export default Modal;