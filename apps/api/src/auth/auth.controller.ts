import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: any) {
    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() credentials: any) {
    return this.authService.login(credentials);
  }

  @Post('google-login')
  async googleLogin(@Body('idToken') idToken: string) {
    return this.authService.verifyGoogleToken(idToken);
  }

  @Post('me')
  async getProfile(@Body('userId') userId: string) {
      // In a real app, use @UseGuards(JwtAuthGuard) and @Request() req.user
      return this.authService.getProfile(Number(userId));
  }

  @Post('me/update')
  async updateProfile(@Body() body: any) {
      const { userId, ...data } = body;
      return this.authService.updateProfile(Number(userId), data);
  }

  @Post('users')
  async getAllUsers() {
      return this.authService.getAllUsers();
  }

  @Put('users/:id/role')
  async updateUserRole(@Param('id') id: string, @Body('role') role: string) {
      return this.authService.updateUserRole(Number(id), role);
  }
}
