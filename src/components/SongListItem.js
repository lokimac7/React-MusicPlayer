import './SongListItem.css';


export const SongListItem = ({ song, isCurrent, onSelect }) => {

  const handleClick = () => {
    onSelect(song);
  };

  return (
    <li onClick={handleClick} className={`SongListItem ${isCurrent ? "selected" : ""}`}>
      {song.title} by {song.artist}
    </li>
  );
};
