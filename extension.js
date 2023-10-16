// Imports
const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Soup = imports.gi.Soup;
const GLib = imports.gi.GLib ;
const Clutter = imports.gi.Clutter
const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const PanelMenu = imports.ui.panelMenu;

// Constants
const Me = ExtensionUtils.getCurrentExtension();
const uid = GLib.getenv("APP_UID")
const secret = GLib.getenv("APP_SECRET")
const url = "https://api.intra.42.fr/v2/oauth/token"
const params = `?grant_type=client_credentials&client_id=${uid}&client_secret=${secret}`

let debounceTimeout = null;

class Extension {
	constructor() {}

	// This is called when extension is enabled
	enable() {
		log(`enabling ${Me.metadata.name}`);

		// Fetch user data
		let token = _getToken();
		let data = _reqData("/users/" + GLib.getenv("LOGNAME"), token.access_token, "GET")

		// Create and add label element to the toolbar
		let label = new St.Label({ text: data.location, y_align: Clutter.ActorAlign.CENTER })
		Main.panel._centerBox.add_child(label);
	}

	// REMINDER: It's required for extensions to clean up after themselves when
	// they are disabled. This is required for approval during review!
	disable() {
		log(`disabling ${Me.metadata.name}`);
	}
}

function _getToken() {
	let out
	let soupSyncSession = new Soup.SessionSync();
	let message = Soup.Message.new("POST", url + params)
	let responseCode = soupSyncSession.send_message(message)

	log (`Response code: ${responseCode}`)
	if (responseCode == 200) {
		try {
			log("token grab: OK")
			out = JSON.parse(message['response-body'].data)
		} catch(e) {
			log(e, "Error ocurred")
			out = "Error"
		}
	}
	log(`token out is`)
	log(out)
	return out
}

function _reqData(endpoint, token, method='GET') {
	log("Token:" + token)
	log("Endpoint" + endpoint)
	
	let soupSyncSession = new Soup.SessionSync();
	let message = Soup.Message.new(method, 'https://api.intra.42.fr/v2' + endpoint)
	message.request_headers.append(
		'Authorization',
		`Bearer ${token}`
	)
	message.request_headers.set_content_type("application/json", null)
	
	let responseCode = soupSyncSession.send_message(message)
	let out
	log("Response")
	log (responseCode)
	if (responseCode == 200) {
		try {
			log(message['response-body'].data)
			out = JSON.parse(message['response-body'].data)
		} catch(e) {
			log(e)
		}
	}
	return out
}

function init() {
	log(`initializing ${Me.metadata.name}`);

	return new Extension();
}
