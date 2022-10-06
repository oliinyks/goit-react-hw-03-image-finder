import { Component } from 'react';
import PropTypes from 'prop-types';
import './modal.scss'

class Modal extends Component {
	state = {
		url: this.props.url,
	};


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
          <img className='img' src={this.state.url} alt='' />
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
