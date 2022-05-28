import { useState } from 'react';
import { Collapse, Space, Button } from 'antd';
import {
  MessageFilled,
  StarOutlined,
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  UserAddOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import * as S from '../../src/components/units/chatting/Chatting.styles';

const { Panel } = Collapse;

export default function ChattingPage() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const showToggle = () => {
    setVisible(!visible);
  };
  const showUserToggle = () => {
    setVisible2(!visible2);
  };
  const showCoachToggle = () => {
    setVisible3(!visible3);
  };

  const genExtra = () => (
    <>
      <PlusOutlined
        style={{ color: '#888', fontSize: '14px', marginRight: '7px' }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
      <SearchOutlined
        style={{ fontSize: '14px', color: '#888' }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    </>
  );
  const genExtra2 = () => (
    <>
      <PlusOutlined
        style={{ color: '#888', fontSize: '14px', marginRight: '7px' }}
        onClick={(event) => {
          event.stopPropagation();
          showCoachToggle();
        }}
      />
      <SearchOutlined
        style={{ fontSize: '14px', color: '#888' }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    </>
  );

  return (
    <S.Wrapper>
      <S.ChattingWrapper>
        <S.DrawerCustom
          title="Server"
          placement="left"
          onClose={showToggle}
          visible={visible}
          getContainer={false}
          style={{ position: 'absolute' }}
          width={300}
        >
          <S.DrawerUl>
            <S.DrawerLi>
              <div>
                <MessageFilled /> <span>JAVASCRIPT</span>
              </div>
            </S.DrawerLi>
            <S.DrawerLi>
              <div>
                <span>JAVA</span>
              </div>
            </S.DrawerLi>
          </S.DrawerUl>
        </S.DrawerCustom>

        <S.ChattingSidebar>
          <S.ServerNameBox>
            <S.ServerName>
              <S.ServerIcon onClick={showToggle} />
              <span
                style={{
                  marginLeft: '5px',
                  width: '155px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                JavaScriptsadsadsadsadasd
              </span>
            </S.ServerName>
            <StarOutlined style={{ cursor: 'pointer' }} />
          </S.ServerNameBox>
          <S.ChannelDMBox>
            <S.Collapse2 defaultActiveKey={['1', '2']} ghost>
              <Panel style={{ fontSize: '16px' }} header="Channel" key="1" extra={genExtra()}>
                <ul style={{ fontSize: '13px' }}>
                  <S.Li>
                    <span>
                      네스트방네스트방네스트방네스트방네스트방네스트방방방방바바바
                      <span>(88)</span>
                    </span>
                    <S.Alarm>7</S.Alarm>
                  </S.Li>
                  <S.Li>
                    <span>
                      네스트방
                      <span>(92)</span>
                    </span>
                    <S.Alarm>7</S.Alarm>
                  </S.Li>
                </ul>
              </Panel>
              <Panel style={{ fontSize: '16px' }} header="DM" key="2" extra={genExtra2()}>
                <ul style={{ fontSize: '13px' }}>
                  <S.Li>
                    <span>코치이름</span>
                    <S.Alarm>7</S.Alarm>
                  </S.Li>
                </ul>
              </Panel>
            </S.Collapse2>
          </S.ChannelDMBox>
        </S.ChattingSidebar>

        <S.ChattingBox>
          <S.ChattingHeader>
            <span style={{ cursor: 'pointer' }}>네스트방</span>
            <div>
              <UserOutlined onClick={showUserToggle} style={{ fontSize: '17px' }} />
              <SearchOutlined style={{ marginLeft: '7px', cursor: 'pointer', fontSize: '17px' }} />
            </div>
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
            <S.ImageBox>
              <S.ImageButton size={'small'}>
                <CameraOutlined />
                사진첨부
              </S.ImageButton>
              <div style={{ width: '720px', overflow: 'auto' }}>
                <span style={{ color: '#999', margin: '0px 5px' }}>sdsdsd.png</span>
              </div>
            </S.ImageBox>
          </S.ChattingSendBox>
        </S.ChattingBox>

        <S.DrawerCustom
          title="User"
          placement="right"
          closable={false}
          width={300}
          onClose={showUserToggle}
          visible={visible2}
          getContainer={false}
          extra={
            <Space>
              <UserAddOutlined style={{ cursor: 'pointer', fontSize: '18px', color: '#888' }} />
            </Space>
          }
        >
          <S.DrawerUl>
            <S.DrawerLi>
              <div>
                <S.Img src="/image/okitokiyo.gif" />
                <span>유저</span>
              </div>
              <Button size={'small'}>내보내기</Button>
            </S.DrawerLi>
            <S.DrawerLi>
              <div>
                <S.DefaultPofile />
                <span>코치2</span>
              </div>
              <Button size={'small'}>내보내기</Button>
            </S.DrawerLi>
            <S.DrawerLi>
              <div>
                <S.DefaultPofile />
                <span>코치2</span>
              </div>
              <Button size={'small'}>내보내기</Button>
            </S.DrawerLi>
            <S.DrawerLi>
              <div>
                <S.DefaultPofile />
                <span>코치2</span>
              </div>
              <Button size={'small'}>내보내기</Button>
            </S.DrawerLi>
            <S.DrawerLi>
              <div>
                <S.DefaultPofile />
                <span>코치2</span>
              </div>
              <Button size={'small'}>내보내기</Button>
            </S.DrawerLi>
            <S.DrawerLi>
              <div>
                <S.DefaultPofile />
                <span>코치2</span>
              </div>
              <Button size={'small'}>내보내기</Button>
            </S.DrawerLi>
            <S.DrawerLi>
              <div>
                <S.DefaultPofile />
                <span>코치2</span>
              </div>
              <Button size={'small'}>내보내기</Button>
            </S.DrawerLi>
            <S.DrawerLi>
              <div>
                <S.DefaultPofile />
                <span>코치2</span>
              </div>
              <Button size={'small'}>내보내기</Button>
            </S.DrawerLi>
            <S.DrawerLi>
              <div>
                <S.DefaultPofile />
                <span>코치2</span>
              </div>
              <Button size={'small'}>내보내기</Button>
            </S.DrawerLi>
          </S.DrawerUl>
          <Button size={'small'} style={{ float: 'right', margin: '24px 15px 0 0' }}>
            나가기
          </Button>
        </S.DrawerCustom>

        <S.DrawerCustom
          title="Coach"
          placement="right"
          closable={false}
          width={300}
          onClose={showCoachToggle}
          visible={visible3}
          getContainer={false}
        >
          <S.DrawerUl>
            <S.DrawerLi>
              <div>
                <S.Img src="/image/크기.jpeg" />
                <span>코치1</span>
              </div>
              <Button size={'small'}>등록</Button>
            </S.DrawerLi>
            <S.DrawerLi>
              <div>
                <S.DefaultPofile />
                <span>코치2</span>
              </div>
              <Button size={'small'}>등록</Button>
            </S.DrawerLi>
          </S.DrawerUl>
        </S.DrawerCustom>
      </S.ChattingWrapper>
    </S.Wrapper>
  );
}
