import pianoNotes from '../Assets/audio/pianoNotes.mp3';

export const toggleExpandMenu = function(
  hasAudioPlayed:boolean,
  setHasAudioPlayed:Function,
  isExpanded:boolean,
  setIsExpanded:Function
){
  //menu audio has not played yet in the current session
  if (!hasAudioPlayed) {
    //play the audio
    const audio = new Audio(pianoNotes);
    audio.play();
    //update the state so the audio doesn't play twice in a single user browsing session
    setHasAudioPlayed(true);
  };
  //expand the menu
  setIsExpanded(isExpanded===true ? false : true);
};
