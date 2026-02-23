# Firebase Setup Guide for Google OAuth

## Prerequisites

- Google account
- Firebase project (or create a new one)

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Enable Google Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click on **Google** provider
3. Toggle **Enable**
4. Add your support email
5. Click **Save**

## Step 3: Register Your Web App

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the **Web** icon (`</>`)
4. Register your app with a nickname (e.g., "GrubHub Web")
5. Copy the Firebase configuration object

## Step 4: Configure Frontend

1. Create a `.env` file in the `client` directory:

   ```bash
   cp client/.env.example client/.env
   ```

2. Fill in your Firebase credentials in `client/.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## Step 5: Configure Backend (Firebase Admin SDK)

### Option A: For Development (Service Account Key)

1. In Firebase Console, go to **Project Settings** → **Service accounts**
2. Click **Generate new private key**
3. Download the JSON file
4. Save it securely (e.g., `apps/api/firebase-service-account.json`)
5. Add to `.gitignore` to prevent committing secrets
6. Set environment variable:
   ```env
   GOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account.json
   ```

### Option B: For Production (Environment Variables)

Set the `FIREBASE_PROJECT_ID` environment variable:

```env
FIREBASE_PROJECT_ID=your_project_id
```

For Google Cloud deployment, the default credentials will be used automatically.

## Step 6: Add Authorized Domains

1. In Firebase Console, go to **Authentication** → **Settings** → **Authorized domains**
2. Add your domains:
   - `localhost` (for development)
   - Your production domain (e.g., `yourdomain.com`)

## Step 7: Test the Integration

1. Start your development servers:

   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/login`
3. Click "Continue with Google"
4. Select a Google account
5. Verify successful login and redirect to home page

## Troubleshooting

### "Popup blocked" error

- Allow popups for localhost in your browser settings

### "auth/unauthorized-domain" error

- Add your domain to Authorized domains in Firebase Console

### "Firebase Admin: No credentials found" warning

- This is expected in development without service account key
- Token verification will still work with just PROJECT_ID for testing
- For production, use proper credentials

### TypeScript errors about firebase-admin

- Run `npm install` in the `apps/api` directory
- Restart your TypeScript server

## Security Notes

⚠️ **Never commit Firebase credentials to version control**

- Add `.env` files to `.gitignore`
- Use environment variables in production
- Rotate keys if accidentally exposed

## Next Steps

After setup is complete:

1. Test the complete OAuth flow
2. Verify user data is stored correctly in database
3. Test logout functionality
4. Verify session persistence across page refreshes
