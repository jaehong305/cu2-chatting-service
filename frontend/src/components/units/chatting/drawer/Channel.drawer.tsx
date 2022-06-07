import { Button, Space } from 'antd';
import { useRef, useState } from 'react';
import { DrawerChannelLi, DrawerCustom, DrawerUl, SearchIcon, SearchInput } from './Drawer.styles';

export default function ChannelDrawer(props) {
  const [value, setValue] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  const onClickSearchChannel = () => {
    searchRef.current?.focus();
    setValue(!value);
    if (value) {
      searchRef.current?.focus();
    } else {
      searchRef.current?.blur();
    }
  };
  const onFocusSearchInput = (event) => {
    event.target.setAttribute('placeholder', '채널 이름/소개/태그 검색');
  };
  const onBlurSearchChannel = (event) => {
    event.target.setAttribute('placeholder', '');
  };

  return (
    <DrawerCustom
      title="Channel"
      placement="right"
      closable={false}
      width={500}
      onClose={props.showChannelToggle}
      visible={props.visibleChannel}
      getContainer={false}
      extra={
        <Space style={{ position: 'relative' }}>
          <SearchIcon onClick={onClickSearchChannel} />
          <SearchInput ref={searchRef} onFocus={onFocusSearchInput} onBlur={onBlurSearchChannel} />
        </Space>
      }
    >
      <DrawerUl>
        <DrawerChannelLi>
          <h4>제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목</h4>
          <div>
            설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명
          </div>
          <div>
            #태그1#태그2#태그1#태그2#태그1#태그2#태그1#태그2#태그1#태그2#태그1#태그2#태그1#태그2
          </div>
        </DrawerChannelLi>
        <DrawerChannelLi>
          <h4>제목</h4>
          <div>설명</div>
          <div>#태그1#태그2</div>
        </DrawerChannelLi>
      </DrawerUl>
      <Button size={'small'} style={{ float: 'right', margin: '20px 15px 0 0' }}>
        채널만들기
      </Button>
    </DrawerCustom>
  );
}
