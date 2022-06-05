import { Alarm, ChannelName, CollapseCustom, Li, Wrapper } from './ChannelDMBox.styles';
import { Collapse } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

export default function ChannelDMBox(props) {
  const genExtra = (show) => (
    <>
      <PlusOutlined
        style={{ color: '#888', fontSize: '14px' }}
        onClick={(event) => {
          event.stopPropagation();
          show();
        }}
      />
    </>
  );

  return (
    <Wrapper>
      <CollapseCustom defaultActiveKey={['1', '2']} ghost>
        <Panel
          style={{ fontSize: '16px' }}
          header="Channel"
          key="1"
          extra={genExtra(props.showChannelToggle)}
        >
          <ul style={{ fontSize: '13px' }}>
            <Li>
              <ChannelName>
                네스트방네스트방네스트방네스트방네스트방네스트방방방방바바바sdsd
              </ChannelName>
              <Alarm>7</Alarm>
            </Li>
            <Li>
              <span>네스트방</span>
              <Alarm>7</Alarm>
            </Li>
          </ul>
        </Panel>
        <Panel
          style={{ fontSize: '16px' }}
          header="DM"
          key="2"
          extra={genExtra(props.showCoachToggle)}
        >
          <ul style={{ fontSize: '13px' }}>
            <Li>
              <span>코치이름</span>
              <Alarm>7</Alarm>
            </Li>
          </ul>
        </Panel>
      </CollapseCustom>
    </Wrapper>
  );
}
