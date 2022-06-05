import { StarOutlined } from '@ant-design/icons';
import { ServerIcon, ServerName, Wrapper } from './ServerNameBox.styles';

export default function ServerNameBox(props) {
  return (
    <Wrapper>
      <ServerName>
        <ServerIcon onClick={props.showServerToggle} />
        <span
          style={{
            marginLeft: '5px',
            maxWidth: '155px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          JavaScriptsadsadsadsadasd
        </span>
      </ServerName>
      <StarOutlined style={{ cursor: 'pointer' }} />
    </Wrapper>
  );
}
