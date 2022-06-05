import { Button } from 'antd';
import { DefaultPofileImage, ProfileImage } from '../Chatting.styles';
import { DrawerCustom, DrawerLi, DrawerUl } from './Drawer.styles';

export default function CoachDrawer(props) {
  return (
    <DrawerCustom
      title="Coach"
      placement="right"
      closable={false}
      width={300}
      onClose={props.showCoachToggle}
      visible={props.visibleCoach}
      getContainer={false}
    >
      <DrawerUl>
        <DrawerLi>
          <div>
            <ProfileImage src="/image/크기.jpeg" />
            <span>코치1</span>
          </div>
          <Button size={'small'}>등록</Button>
        </DrawerLi>
        <DrawerLi>
          <div>
            <DefaultPofileImage />
            <span>코치2</span>
          </div>
          <Button size={'small'}>등록</Button>
        </DrawerLi>
      </DrawerUl>
    </DrawerCustom>
  );
}
