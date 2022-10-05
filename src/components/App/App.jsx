import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import './App.scss';

class App extends React.Component {
  state = {
    photoName: '',
  };

  handlerFormSubmit = photoName => {
    this.setState({ photoName });
  };

  render() {
    const { photoName, page } = this.state;
    return (
      <section className="section">
        <h1 className="headerTitle">
          Photo <span>Gallery</span>
        </h1>
        <Searchbar onSubmit={this.handlerFormSubmit} />
        <ImageGallery photoName={photoName} page={page}/>
        <ToastContainer theme="dark" autoClose={3000} />
      </section>
    );
  }
}
export default App;
