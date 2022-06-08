import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: /.+/ })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() public server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  afterInit(server: Server) {
    console.log('=== websocket server init ===');
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    console.log('connected', socket.nsp.name);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnected', socket.nsp.name);
  }
}
