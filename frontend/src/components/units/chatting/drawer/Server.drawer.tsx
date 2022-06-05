import { MessageFilled } from '@ant-design/icons';
import { DrawerCustom, DrawerLi, DrawerUl } from './Drawer.styles';

export default function ServerDrawer(props) {
  return (
    <DrawerCustom
      title="Server"
      placement="left"
      onClose={props.showServerToggle}
      visible={props.visibleServer}
      getContainer={false}
      style={{ position: 'absolute' }}
      width={300}
    >
      <DrawerUl>
        <DrawerLi>
          <div>
            <MessageFilled /> <span>JAVASCRIPT</span>
          </div>
        </DrawerLi>
        <DrawerLi>
          <div>
            <span>JAVA</span>
          </div>
        </DrawerLi>
      </DrawerUl>
    </DrawerCustom>
  );
}
