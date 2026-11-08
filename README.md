# Incaptiv — React Native + Node.js

The mobile demo now runs fully offline, including its prepared chat answers. To build it for TestFlight, see [mobile/TESTFLIGHT.md](mobile/TESTFLIGHT.md). The Node server and LAN API instructions below describe the optional original demo backend; the current mobile app does not call it.

A native JavaScript recreation of the existing Incaptiv mobile prototype, with a separate Node.js API. This is a runnable demo foundation, not a production service. It retains the green/cream palette, screen copy, October sample records, bottom navigation, rounded workspace menu and compact chat introduction. Native layout is adapted rather than pixel-identical to the HTML original.

## 1. Install the tools

Install Node.js LTS (22 or newer) from https://nodejs.org/en/download and VS Code from https://code.visualstudio.com. Install Expo Go on your phone. Restart VS Code after installing Node.

In VS Code choose File → Open Folder and open the extracted `incaptiv` folder. Choose Terminal → New Terminal and check:

```sh
node -v
npm -v
```

JavaScript does not need separate installation. Node runs JavaScript; npm installs dependencies. The supplied mobile/package.json initializes the Expo/React Native project, and server/package.json initializes the backend. Do not run npm init over these files.

## 2. Start the Node.js backend

In a terminal at the incaptiv folder:

```sh
cd server
npm install
npm start
```

Leave this terminal running. Open http://localhost:3001/health on your computer; it should return `{"ok":true,"storage":"fixture"}`. The backend runs on port 3001 and reads the included sample records. PostgreSQL is optional for this initial demo.

## 3. Connect the mobile app

Open a second VS Code terminal at the incaptiv folder:

```sh
cd mobile
npm install
```

Create a file named `.env` in `mobile` by copying `.env.example`. Set:

```dotenv
EXPO_PUBLIC_API_URL=http://YOUR_COMPUTER_LAN_IP:3001
```

Use your computer's local IPv4 address, for example `http://192.168.1.100:3001`. On Windows, run `ipconfig` and use your Wi-Fi adapter's IPv4 address. On macOS, find Wi-Fi → Details → TCP/IP in System Settings. A physical phone cannot reach your computer through `localhost`.

Connect your computer and phone to the same Wi-Fi. If prompted, allow Node through your firewall on your private network. Open `http://YOUR_COMPUTER_LAN_IP:3001/health` in your phone's browser to check connectivity.

Then run:

```sh
npx expo start
```

Scan the QR code using the iPhone Camera or Expo Go on Android. If Expo Go reports an unsupported SDK, update Expo Go or use an Expo development build matching this project. Expo's setup guide: https://docs.expo.dev/get-started/create-a-project/

For an Android emulator use `http://10.0.2.2:3001`. For the iOS simulator on the same Mac, use `http://localhost:3001`.

After changing `.env`, stop Expo with Ctrl+C and restart with `npx expo start --clear`. Expo's tunnel mode tunnels the development bundle, not your separate Node API.

## 4. Folder guide

| File or folder | Purpose |
| --- | --- |
| mobile/App.js | App shell, bottom tabs, workspace menu, record detail modal and persisted preferences |
| mobile/src/screens/HomeScreen.js | Executive dashboard |
| mobile/src/screens/ZonesScreen.js | Zones, profitability filter and report sharing |
| mobile/src/screens/EventsScreen.js | Event cards and links to details/chat |
| mobile/src/screens/ChatScreen.js | Chat introduction, prompts, messages and composer |
| mobile/src/screens/RevenueScreen.js | Revenue intelligence |
| mobile/src/screens/VisitorsScreen.js | Visitor metrics, activity heatmap and movements |
| mobile/src/screens/InsightsScreen.js | Recommendations and review list |
| mobile/src/screens/ManagementScreen.js | Venue display name, example sources and roles |
| mobile/src/screens/MoreScreen.js | Additional screen navigation |
| mobile/src/screens/SettingsScreen.js | Local preferences |
| mobile/src/screens/HelpScreen.js | Methodology and help |
| mobile/src/ui.js | Shared components, colours, chart and typography |
| mobile/src/api.js | HTTP requests to Node |
| mobile/src/demo.json | Offline fallback records |
| server/index.js | Node HTTP API and optional PostgreSQL access |
| server/answers.js | Prepared demo chat responses |
| server/data.json | Authoritative API sample records |
| server/seed.js | Optional PostgreSQL demo seeding |
| reference/original-prototype.html | Original website source for comparison, not used as a WebView |

## 5. Optional PostgreSQL connection

Install PostgreSQL and create an empty database called `incaptiv` using pgAdmin or `createdb incaptiv`. Copy `server/.env.example` to `server/.env`, then set your connection string:

```dotenv
PORT=3001
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/incaptiv
```

From the server folder:

```sh
npm run seed
npm start
```

Stop an already-running server before restarting. `/health` will now identify `postgresql` storage. The seed stores the demo snapshot in a JSONB table and updates only the `glasshouse` record when rerun. It is deliberately a demo persistence path, not the final relational schema for session telemetry, permissions or transactions. Keep database credentials exclusively in server/.env. EXPO_PUBLIC variables are visible to the app.

## 6. What works, and what remains

All eleven screens have native components. Navigation, record details, zone filters, sharing a CSV-formatted report through the native share sheet, chat HTTP requests, review toggles and saved preferences are implemented. Larger text increases shared body text. Reduce motion is stored; the app already uses no animated transitions. The venue display name saves locally.

The Node API implements GET /health, GET /api/dashboard and POST /api/chat with a JSON body such as {"message":"Which zone is losing money?"}. Chat is explicitly rule-based, not live AI. When the API is unreachable, analytics display bundled sample records and chat shows a retryable error.

The app uses one complete October 2026 dataset. It does not manufacture daily/week figures or pretend that another venue is connected. Charts and heatmap are illustrative. Live Wi-Fi/POS feeds, true venue switching, date-range queries, authentication, enforced team permissions, push notifications, production hosting and an AI provider still need implementation. Do not expose this unauthenticated local demo API as a production service.

## 7. Verification

Completed checks: JavaScript/JSX syntax validation, three backend unit tests, HTTP API smoke checks (dashboard, chat and invalid input), and successful Expo exports for both iOS and Android. PostgreSQL connection and device-level visual testing were not run.

Run backend checks with:

```sh
cd server
npm test
```

Manual check on your phone: open each bottom tab; open More and every extra screen; filter zones; open a record; send a suggested chat question; open/close the rounded menu; toggle a preference and restart the app; stop the API and confirm the offline state/error message. This package has not been visually verified on a physical iPhone or Android device.

## Starting from scratch instead

If you prefer to learn the initialization process, use a NEW empty parent directory:

```sh
mkdir incaptiv
cd incaptiv
npx create-expo-app@latest mobile --template blank
cd mobile
npx expo install react-native-svg react-native-safe-area-context @react-native-async-storage/async-storage @expo/vector-icons
```

Copy the supplied App.js and src folder into that generated mobile directory, replacing App.js. Copy the supplied server directory alongside mobile. Keep the generated Expo package versions matched to one another. The blank template is documented at https://docs.expo.dev/more/create-expo/.
