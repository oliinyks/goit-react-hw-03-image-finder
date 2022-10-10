import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import './searchbar.scss'

class Searchbar extends Component {
  state = {
    searchName: '',
  };
  handleNameChange = e => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };
  handleSearch = e => {
    e.preventDefault();

    if (this.state.searchName.trim() === '') {
      return toast.error('Please select an image');
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: ''});
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSearch}>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleNameChange}
          />
          <button type="submit" className="button">
            <AiOutlineSearch />
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
	onSubmit: PropTypes.func.isRequired,
 };

export default Searchbar;
