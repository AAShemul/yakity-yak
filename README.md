# Yakity-yak
Yakity-yak is an anonymous group chat room utilizing Node.js, JavaScript, WebSocket, HTML, jQueryUI, and CSS. 

## Overview
What is an anonymous chat room? It is chat like back in the day: no valid e-mail address required...just enter a screen name in and go. Chat with whoever is in the room at the time (following all normal safety precautions that go with anonymous conversation: no personally identifiable numerical information...phone numbers, credit cards, etc. should be given to anyone at anytime). Now that the disclaimers are out of the way, lets talk design! Yakity-yak has been designed to mimic the look and general feel of a ~Windows 95 desktop. A user can double click on desktop icons, move-minimize-maximize windows, set a desktop background, and open the few files available ont he system. Any changes made to user configuration (screen name, chat color, and desktop background) will be saved client side in local storage so that they will be remembered upon return. Lastly, there is a clock in the bottom right, just like on the actual windows 95 start bar. It should be cilent system accurate (if your computer's time is wrong, yakity-yak's time will be wrong).

## Structure
The app, as running on the [live-site demo](http://brianmevans.com/projects/yakity-yak/), is running on an Apache2 web server with a Node.js server handling the WebSocket. 

### Future Ideas
More desktop interactables/apps! Perhaps the ability to open a notetaking "application" and save notes to the desktop or home folder. Ideally these notes would then get saved in localStorage for future session recall...or perhaps in a serverside database.
