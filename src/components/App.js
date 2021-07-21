import './App.css';
import { useState, useEffect } from 'react';
import Heading from './Heading';
import { Songs } from './Songs';
import { SongListItem } from './SongListItem';
import { SongPlayer } from './SongPlayer';


function App() {
  const URL = "https://examples.devmastery.pl/songs-api/songs";
  const [songs, setSongs] = useState([]);
  const [isLastSongOnList, setIsLastSongOnList] = useState(false);
  const [isFirstSongOnList, setIsFirstSongOnList] = useState(true);


  useEffect(() => {
    fetch(URL).then((response) => {
      if (response.ok) {
        response.json().then(setSongs);
      }
    })
  }, [URL])
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];
  console.log("app", currentSongIndex);
  const handleSelectSong = (selectedSong) => {
    const audioIndex = songs.findIndex((song) => song.audioUrl === selectedSong.audioUrl);
    if (audioIndex >= 0) {
      setCurrentSongIndex(audioIndex);
    }
  };

  const selectNextSong = () => {
    const maxSongIndex = songs.length;

    if (currentSongIndex === maxSongIndex - 1) {
      setIsLastSongOnList(true);
      //return;
    }
    else {
      setCurrentSongIndex((prevCurrentSongIndex) => prevCurrentSongIndex + 1);
      console.log("currentSongIndex in selectNextSong function " + currentSongIndex)
      setIsFirstSongOnList(false);
      setIsLastSongOnList(currentSongIndex === maxSongIndex - 1 ? true : false);
      console.log("isLastSongOnList " + isLastSongOnList)
    }
  };

  const selectPreviousSong = () => {
    if (currentSongIndex === 0) {
      setIsFirstSongOnList(true);
      //return;
    }
    else {
      setCurrentSongIndex(prevCurrentSongIndex => prevCurrentSongIndex - 1);
      console.log("currentSongIndex in selectPreviousSong function " + currentSongIndex)
      setIsLastSongOnList(false);
      setIsFirstSongOnList(currentSongIndex === 0 ? true : false);
      console.log("isFirstSongOnList " + isFirstSongOnList)
    }
  }

  return (
    <div className="App">
      {songs.length === 0 ? "Loading..." : (
        <>
          <SongPlayer
            showControls={false}
            song={currentSong}
            selectNextSong={selectNextSong}
            selectPreviousSong={selectPreviousSong}
            isFirstSongOnList={isFirstSongOnList}
            isLastSongOnList={isLastSongOnList} />
          <Songs>
            <Heading title="Songs" />
            <ul>
              {songs.map(song =>
                <SongListItem
                  key={song.audioUrl}
                  song={song}
                  isCurrent={currentSong.audioUrl === song.audioUrl}
                  onSelect={handleSelectSong}
                />
              )}
            </ul>
          </Songs>
        </>
      )}
    </div>
  );
}

export default App;
