# Offline TestFlight demo

The mobile app uses its bundled October sample records and answers demo chat questions on the device. It does not need the Node server or `EXPO_PUBLIC_API_URL`. The `mobile/.env` file is ignored by Git and has no effect on this offline app.

## Build and submit

1. Join the [Apple Developer Program](https://developer.apple.com/programs/) and sign in to [App Store Connect](https://appstoreconnect.apple.com/). The Account Holder must accept any pending Apple Developer Program agreement before new apps can be submitted.
2. Check the iOS bundle identifier in `app.json`: `com.incaptiv.offlinedemo2026`. Registration happens in the separate [Apple Developer account](https://developer.apple.com/account/), under **Certificates, Identifiers & Profiles → Identifiers**, rather than on App Store Connect's Apps page. Choose **+ → App IDs → App → Explicit App ID**, enter the identifier, and register it. The Account Holder or Admin must do this. If Apple says the identifier is unavailable, change it before the first build. Once a build is uploaded, keep the identifier stable for updates.
3. From `mobile`, sign in to Expo with `npx eas-cli login` and link the project with `npx eas-cli init`. Follow the prompts to configure iOS signing credentials.
4. Run `npx eas-cli build --platform ios --profile production`. The production profile increments `ios.buildNumber` before each build, so a new upload does not reuse an Apple build number. Keep the updated `app.json` after each build.
5. Run `npx eas-cli submit --platform ios --profile production --latest`. Follow the prompts to select or create the matching App Store Connect app.
6. In App Store Connect, complete the required TestFlight information and add internal testers. External testing may require Apple's beta review.

If submission reports **Increment Build Number**, the latest build has a number Apple already used for version `1.0.0`. From `mobile`, run step 4 again and wait for the new build to finish, then run step 5. `submit --latest` selects an existing build; it does not create one or increment its number. With the current local version source and production `autoIncrement`, a build starting from `ios.buildNumber: "6"` should use build number 7. Check the build details before submitting and keep the updated `app.json` so the next build starts from the new number.

The Expo account, Apple account, signing credentials, App Store Connect record and TestFlight upload must be completed by someone with access to those accounts.
