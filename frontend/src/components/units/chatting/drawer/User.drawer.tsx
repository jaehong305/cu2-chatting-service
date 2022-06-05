import { UserAddOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { DefaultPofileImage, ProfileImage } from '../Chatting.styles';
import { DrawerCustom, DrawerLi, DrawerUl } from './Drawer.styles';

export default function UserDrawer(props) {
  return (
    <DrawerCustom
      title="User"
      placement="right"
      closable={false}
      width={300}
      onClose={props.showUserToggle}
      visible={props.visibleUser}
      getContainer={false}
      extra={
        <Space>
          <UserAddOutlined style={{ cursor: 'pointer', fontSize: '18px', color: '#888' }} />
        </Space>
      }
    >
      <DrawerUl>
        <DrawerLi>
          <div>
            <ProfileImage src="/image/okitokiyo.gif" />
            <span>유저</span>
          </div>
          <Button size={'small'}>내보내기</Button>
        </DrawerLi>
        <DrawerLi>
          <div>
            <DefaultPofileImage />
            <span>코치2</span>
          </div>
          <Button size={'small'}>내보내기</Button>
        </DrawerLi>
      </DrawerUl>
      <Button size={'small'} style={{ float: 'right', margin: '24px 15px 0 0' }}>
        나가기
      </Button>
    </DrawerCustom>
  );
}
