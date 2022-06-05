import { UserOutlined } from '@ant-design/icons';
import * as S from './Chatting.styles';
import UserDrawer from './drawer/User.drawer';
import CoachDrawer from './drawer/Coach.drawer';
import ServerDrawer from './drawer/Server.drawer';
import ServerNameBox from './sidebar/server-name-box/ServerNameBox';
import ChannelDMBox from './sidebar/channel-dm-box/ChannelDMBox';
import ChannelDrawer from './drawer/Channel.drawer';

export default function ChattingUI(props) {
  return (
    <S.Wrapper>
      <S.ChattingWrapper>
        <S.ChattingSidebar>
          <ServerNameBox showServerToggle={props.showServerToggle} />
          <ServerDrawer
            showServerToggle={props.showServerToggle}
            visibleServer={props.visibleServer}
          />
          <ChannelDMBox
            showChannelToggle={props.showChannelToggle}
            showCoachToggle={props.showCoachToggle}
          />
          <ChannelDrawer
            showChannelToggle={props.showChannelToggle}
            visibleChannel={props.visibleChannel}
          />
          <CoachDrawer showCoachToggle={props.showCoachToggle} visibleCoach={props.visibleCoach} />
        </S.ChattingSidebar>

        <S.ChattingBox>
          <S.ChattingHeader>
            <span style={{ cursor: 'pointer' }}>네스트방</span>
            <UserOutlined onClick={props.showUserToggle} style={{ fontSize: '17px' }} />
          </S.ChattingHeader>
          <S.ChattingContent>zaa</S.ChattingContent>
          <S.ChattingSendBox>
            <S.ChattingInputBox>
              <S.ChattingTextAreaBox>
                <textarea
                  rows={1}
                  style={{ width: '100%', fontSize: '16px', padding: '5px 8px' }}
                />
              </S.ChattingTextAreaBox>
              <S.SendButton size={'large'}>전송</S.SendButton>
            </S.ChattingInputBox>
          </S.ChattingSendBox>
        </S.ChattingBox>
        <UserDrawer showUserToggle={props.showUserToggle} visibleUser={props.visibleUser} />
      </S.ChattingWrapper>
    </S.Wrapper>
  );
}
