import React, {Component} from 'react';
import Howl from 'howler';
import Player from './Player';

const audio = document.createElement('audio');


export default class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistSearch: '',
      selectedSong: 'https://storage.googleapis.com/juke-1379.appspot.com/juke-music/Dexter%20Britain/Creative%20Commons%20Volume%202/01%20The%20Tea%20Party.mp3',
      playing: false
    };
    this.handleArtistSearch = this.handleArtistSearch.bind(this)
    this.playSong = this.playSong.bind(this)
  }
  handleArtistSearch(){
    console.log(this.state)
  }

  playSong(url, songId) {
    //Stop any currently playing song
    audio.pause();

    //Play newly selected song
    audio.src = this.state.selectedSong;
    this.setState({
      playing: true
    });
    audio.load();
    audio.play();
  }

  render() {
    return (
      <div>
        <Player />
        <br />
        <form>
          <input type="text"
                value = {this.state.artistSearch}
                onChange={(event) =>{this.setState({artistSearch: event.target.value})}}
          placeholder="search for artist" />
          <button type="button" onClick={this.handleArtistSearch}>Search</button>
        </form>
        <br />
        <br />
        <audio src={this.state.selectedSong} onClick={this.playSong} controls id="audio" />
      </div>
    );
  }
}
