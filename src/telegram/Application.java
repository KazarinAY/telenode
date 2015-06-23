package telegram;

import io.socket.IOAcknowledge;
import io.socket.IOCallback;
import io.socket.SocketIO;
import io.socket.SocketIOException;

import org.json.JSONException;
import org.json.JSONObject;

public class Application implements IOCallback {
	private SocketIO socket;

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		try {
			new Application();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Application() throws Exception {
		socket = new SocketIO();
		socket.connect("http://89.108.79.137:7777/", this);

		// Sends a string to the server.
		//socket.send("Hello Server");
/*
		// Sends a JSON object to the server.
		socket.send(new JSONObject().put("key", "value").put("key2",
				"another value"));
*/
		// Emits an event to the server.
		socket.emit("my event", "argument1");
	}

	@Override
	public void onMessage(JSONObject json, IOAcknowledge ack) {
		try {
			System.out.println("Server said:" + json.toString(2));
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void onMessage(String data, IOAcknowledge ack) {
		System.out.println("Server said: " + data);
	}

	@Override
	public void onError(SocketIOException socketIOException) {
		System.out.println("an Error occured");
		socketIOException.printStackTrace();
	}

	@Override
	public void onDisconnect() {
		System.out.println("Connection terminated.");
	}

	@Override
	public void onConnect() {
		System.out.println("Connection established");
	}

	@Override
	public void on(String event, IOAcknowledge ack, Object... args) {
		System.out.println("Server triggered event '" + event + "'");
	}
}
