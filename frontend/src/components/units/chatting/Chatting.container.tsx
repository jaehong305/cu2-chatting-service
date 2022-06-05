import { useState } from 'react';
import ChattingUI from './Chatting.presenter';

export default function Chatting() {
  const [visibleServer, setVisibleServer] = useState(false);
  const [visibleChannel, setVisibleChannel] = useState(false);
  const [visibleUser, setVisibleUser] = useState(false);
  const [visibleCoach, setVisibleCoach] = useState(false);

  const showServerToggle = () => {
    setVisibleServer(!visibleServer);
  };
  const showUserToggle = () => {
    setVisibleUser(!visibleUser);
  };
  const showCoachToggle = () => {
    setVisibleCoach(!visibleCoach);
  };
  const showChannelToggle = () => {
    setVisibleChannel(!visibleChannel);
  };

  return (
    <ChattingUI
      showServerToggle={showServerToggle}
      visibleServer={visibleServer}
      showUserToggle={showUserToggle}
      visibleUser={visibleUser}
      showCoachToggle={showCoachToggle}
      visibleCoach={visibleCoach}
      showChannelToggle={showChannelToggle}
      visibleChannel={visibleChannel}
    />
  );
}
