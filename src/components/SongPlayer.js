import { useRef } from 'react';
import Heading from './Heading';
import './SongPlayer';

export const SongPlayer = ({ showControls = false, song, selectNextSong, selectPreviousSong, isFirstSongOnList, isLastSongOnList}) => {
  const audioRef = useRef();
  console.log(audioRef);
  const { audioUrl, coverUrl } = song;

  const handleNextClick = () => {
    selectNextSong();
  };

  const handlePreviousClick = () => {
    selectPreviousSong();
  };

  return (
    <section className="SongPlayer">
      <Heading title="Music Player" />
      <img width="250" height="250" src={coverUrl} alt="Song cover" />
      <audio ref={audioRef} key={audioUrl} controls={showControls} autoPlay>
        <source src={audioUrl} />
      </audio>
      <div>
      <button onClick={handlePreviousClick} disabled={isFirstSongOnList}>Previous</button>
        <button onClick={() => audioRef.current.play()}>Play</button>
        <button onClick={() => audioRef.current.pause()}>Pause</button>
        <button onClick={handleNextClick} disabled={isLastSongOnList}>Next</button>
      </div>
    </section>
  );
};
