import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieDetails from '../containers/MovieDetails';
import Search from '../containers/Search';
import FavoritesList from '../containers/FavoritesList';
import * as actions from '../actions';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        tab: 'MovieSearch',
      };
      this.selectViews = this.selectViews.bind(this);
      this.reset = this.reset.bind(this);
  }
  selectViews(event) {
    const view = event.target.id;
    this.setState({ tab: view });
  }
  reset() {
    this.props.clearSearchTerm();
    this.props.clearMovie();
  }

  render() {
    return (
      <div className="container">
        <div className="container-fluid">
          <nav className="navbar navbar-default">
            <div className="navbar-header">
              <a href="/" onClick={this.reset}><h1>FilmFinder</h1></a>
              <div className="navbar-list">
                <div className="navbar-item">
                  <button className="navbar-button" id="MovieSearch" onClick={this.selectViews}>Movie Search</button>
                </div>
                <div className="navbar-item">
                  <button className="navbar-button" id="Favorites" onClick={this.selectViews}>Favorites</button>
                </div>
              </div>
            </div>
          </nav>
          { this.state.tab === 'MovieSearch' ? <Search /> : <div></div> }
          {/* if no movie is present in store then render empty div*/}
          { this.state.tab === 'MovieSearch' && this.props.movie.Title !== undefined ? <MovieDetails /> : <div></div> }
          { this.state.tab === 'Favorites' ? <FavoritesList /> : <div></div> }
        </div>
      </div>
    );
  }
}

function mapStateToProps({ movie }) {
  return { movie };
}

App.propTypes = {
  movie: React.PropTypes.object,
  clearMovie: React.PropTypes.func,
  clearSearchTerm: React.PropTypes.func,
};

export default connect(mapStateToProps, actions)(App);
