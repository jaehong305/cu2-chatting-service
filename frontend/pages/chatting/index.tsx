import { useAuth } from '../../src/components/commons/hooks/useAuth';
import Chatting from '../../src/components/units/chatting/Chatting.container';

export default function ChattingPage() {
  const { isLoading } = useAuth();

  if (isLoading) return <></>;
  return <Chatting />;
}
