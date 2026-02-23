import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { FirebaseAdminService } from './firebase-admin.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly firebaseAdmin: FirebaseAdminService,
  ) {}

  /**
   * Register a new user with email and password
   */
  async register(userData: any) {
    const { email, password, name, firstName, lastName } = userData;
    
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    console.log('Creating user in DB...', { email, name: name || `${firstName} ${lastName}`.trim() });
    
    // Fix: bcrypt.hash in register uses salt generated above
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: firstName || name?.split(' ')[0] || '',
        lastName: lastName || name?.split(' ').slice(1).join(' ') || '',
        role: 'USER' // Default role
      }
    });

    // Generate token
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    console.log('User registered successfully:', user.id);
    
    return {
      access_token: token,
      user: {
        id: user.id,
        name: [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email?.split('@')[0],
        email: user.email,
        image: user.image,
        role: user.role
      }
    };
  }

  /**
   * Login with email and password
   */
  async login(credentials: any) {
    const { email, password } = credentials;
    console.log('Login attempt for:', email);

    // Find user
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      console.warn('Login failed: User not found or has no password');
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn('Login failed: Password mismatch');
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    console.log('Login successful for:', email, 'Role:', user.role);

    return {
      access_token: token,
      user: {
        id: user.id,
        name: [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email?.split('@')[0],
        email: user.email,
        image: user.image,
        role: user.role
      }
    };
  }

  /**
   * Verifies Google ID Token and finds/creates user.
   * @param idToken Firebase ID Token from Google Login
   * @returns User object and JWT access token
   */
  async verifyGoogleToken(idToken: string) {
    try {
      // Verify the Google ID token using Firebase Admin
      const decodedToken = await this.firebaseAdmin.verifyIdToken(idToken);
      
      const { email, name, picture, uid } = decodedToken;

      if (!email) {
        throw new UnauthorizedException('Email not found in Google account');
      }

      // Find or create user with Google account info
      let user = await this.prisma.user.findUnique({ where: { email } });
      
      if (!user) {
        // Create new user with Google account data
        user = await this.prisma.user.create({
          data: {
            email,
            firstName: name?.split(' ')[0] || email.split('@')[0],
            lastName: name?.split(' ').slice(1).join(' ') || '',
            googleId: uid,
            image: picture,
            // Phone is optional for Google OAuth users
          }
        });
      } else if (!user.googleId) {
        // Update existing user with Google ID if they signed up with email/password first
        user = await this.prisma.user.update({
          where: { id: user.id },
          data: { 
            googleId: uid,
            image: picture || user.image,
            firstName: name?.split(' ')[0] || user.firstName,
            lastName: name?.split(' ').slice(1).join(' ') || user.lastName,
          }
        });
      }

      // Generate JWT token for the session
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
        user
      };
    } catch (error) {
      throw new UnauthorizedException(`Google authentication failed: ${error.message}`);
    }
  }

  async getProfile(userId: number) {
      return this.prisma.user.findUnique({
          where: { id: userId },
          include: { addresses: true }
      });
  }

  async updateProfile(userId: number, data: any) {
      return this.prisma.user.update({
          where: { id: userId },
          data: {
              firstName: data.name?.split(' ')[0] || data.firstName,
              lastName: data.name?.split(' ').slice(1).join(' ') || data.lastName,
              phone: data.phone,
              image: data.image
          }
      });
  }

  async getAllUsers() {
      return this.prisma.user.findMany({
          orderBy: { createdAt: 'desc' }
      });
  }

  async updateUserRole(userId: number, role: string) {
      return this.prisma.user.update({
          where: { id: userId },
          data: { role: role as any }
      });
  }
}
