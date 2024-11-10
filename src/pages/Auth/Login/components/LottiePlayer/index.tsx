import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react';

interface LottiePlayerProps {
  src: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = (props) => {
  return (
    <div>
      <Player
        autoplay
        loop
        background="transparent"
        src={props.src}
        style={{ height: '500px', width: '500px' }}
      />
    </div>
  );
};

export default LottiePlayer;
