# Firebase Setup Instructions

To get the chat working, you need to provide your own "backend" keys. Don't worry, it's free and takes about 2 minutes.

## 1. Create a Project
1.  Go to [console.firebase.google.com](https://console.firebase.google.com/).
2.  Click **Add project** (or "Create a project").
3.  Name it `LinkFit-Chat` (or anything you want).
4.  Disable Google Analytics (not needed) and click **Create Project**.

## 2. Create the App
1.  In your new project dashboard, click the **Web icon** (looks like `</>`) to add an app.
2.  Nickname it `Chat`.
3.  Click **Register app**.
4.  **Copy the `firebaseConfig` object**. It looks like this:
    ```javascript
    const firebaseConfig = {
      apiKey: "AIzaSy...",
      authDomain: "...",
      projectId: "...",
      // ...
    };
    ```
5.  Open `community.html` in your editor and paste these keys into the `firebaseConfig` section (I left a TODO comment there).

## 3. Create the Database
1.  Back in the Firebase Console, go to **Build > Firestore Database** in the left menu.
2.  Click **Create database**.
3.  Select a location (e.g., `us-central1` or `eur3` - closer to you is better).
4.  **IMPORTANT**: Select **Start in test mode**. This allows anyone to read/write for 30 days, which is perfect for testing.
5.  Click **Create**.

## 4. Done!
Refresh your `community.html` page. The "Configuration Missing" error should be gone, and you can now chat!
