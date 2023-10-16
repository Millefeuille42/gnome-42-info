# Gnome 42 School Info Extension

This Gnome extension allows you to fetch and display information from the 42 API directly in the Gnome toolbar. This can be useful for users who are affiliated with 42 or developers who want to learn how to create similar extensions.

## Features

- Displays user information from the 42 API in the Gnome toolbar.
- Information displayed includes the user's location.

## Installation

1. Make sure you have Gnome Shell installed on your system.
2. Download the extension code.
3. Place the code in your Gnome extensions directory (usually `~/.local/share/gnome-shell/extensions/`) in a directory named `gnome-42-info@millefeuille`.
4. Create an API app on the 42 Intra and put your app's credentials in `~/.gnomerc`, along with these env variables:
    ```
    export USER=<your 42 login>
    export GROUP=<your 42 login>
    export MAIL="$USER@student.42.fr"
    export LOGNAME="$USER"
    export APP_UID="<your API app UID>"
    export APP_SECRET="<your API app SECRET>"
    ```
5. Restart the Gnome Shell using Alt+F2 and enter 'r' or log out and back in (the latter being recommended on 42 computers).

## Usage

Once the extension is installed and activated, you'll see your 42 information (only the location in this case) in the Gnome toolbar.

## Developer Information

This extension is a simple example of how to create a Gnome extension that interacts with an external API. It fetches information from the 42 API and displays it in the toolbar. However, note that due to the lack of proper documentation and the fact that I did it quickly when I was bored, the code isn't really great... There is **LOT** of room for improvement.

Here's a brief overview of the code:

- The extension is written in JavaScript and uses the Gnome Shell's JavaScript-based extension system.
- It utilizes several Gnome libraries for various tasks, such as making HTTP requests with Soup and manipulating the user interface with St and Clutter.
- The `_getToken` function is responsible for obtaining an access token from 42 OAuth API.
- The `_reqData` function is used to send requests to the 42 API with the access token and retrieve user information.
- The `enable` method is called when the extension is enabled and adds the user's location to the Gnome toolbar.
- The `disable` method is called when the extension is disabled but currently doesn't have any specific cleanup tasks.

Please note that this extension is a basic example and may not be suitable for production use as-is. It's intended for use inside of 42 schools and as a starting point for building more complex Gnome extensions.

**I'm not responsible for anything that happens to your computer or session !**

## License

This extension is available under the MIT license. Please refer to the code for more details on the licensing terms.

## Support and Contributions

For support or contributions to this extension, you can check the GitHub repository or contact me directly at mlabouri@student.42.fr or via Slack (mlabouri).

## Credits

This extension was created by [Millefeuille](https://github.com/millefeuille42).

