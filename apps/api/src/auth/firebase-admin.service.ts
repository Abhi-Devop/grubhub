import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAdminService {
  private app: admin.app.App;

  constructor() {
    // Initialize Firebase Admin SDK
    // For development, you can use a service account key file
    // For production, use environment variables or Google Cloud default credentials
    
    if (!admin.apps.length) {
      // Check if running in Google Cloud (will use default credentials)
      if (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.FIREBASE_CONFIG) {
        this.app = admin.initializeApp();
      } else {
        // For local development with service account key
        // You can also initialize without credentials for testing
        // but token verification will fail
        console.warn('Firebase Admin: No credentials found. Token verification may fail.');
        this.app = admin.initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID || 'your-project-id',
        });
      }
    } else {
      this.app = admin.app();
    }
  }

  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new Error(`Failed to verify Firebase token: ${error.message}`);
    }
  }

  getAuth(): admin.auth.Auth {
    return admin.auth();
  }
}
