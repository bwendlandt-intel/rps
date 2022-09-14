import ClientResponseMsg from '../utils/ClientResponseMsg'
import { devices } from '../WebSocketListener'

const invokeWsmanCall = async (context: any): Promise<void> => {
  let { message, clientId, xmlMessage } = context
  const clientObj = devices[clientId]
  message = context.httpHandler.wrapIt(xmlMessage, clientObj.connectionParams)
  const responseMessage = ClientResponseMsg.get(clientId, message, 'wsman', 'ok')
  devices[clientId].ClientSocket.send(JSON.stringify(responseMessage))
  clientObj.pendingPromise = new Promise<any>((resolve, reject) => {
    clientObj.resolve = resolve
    clientObj.reject = reject
  })
  return await clientObj.pendingPromise
}

export { invokeWsmanCall }
