import { Component } from '@angular/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  newPassword: string = '';
  cognitoUser: CognitoUser | undefined;
  userAttributes: any;
  showNewPasswordForm: boolean = false;
  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.authenticateUser(this.email, this.password).then(
      (result) => {
        if (result.status === 'success') {
          console.log('Login successful', result.session);
          this.showNewPasswordForm = false;
        } else if (result.status === 'newPasswordRequired') {
          console.log('New password required');
          this.cognitoUser = result.cognitoUser;
          this.showNewPasswordForm = true;
        }
      },
      (error) => {
        console.error('Login failed', error);
        this.showNewPasswordForm = false;
      }
    );
  }

  completeNewPasswordChallenge(): void {
    if (!this.cognitoUser) {
      console.error(
        'No Cognito User available for completing password challenge.'
      );
      return;
    }
    const newPassword = this.newPassword;
    const requiredAttributes = {};
    this.cognitoUser.completeNewPasswordChallenge(
      newPassword,
      requiredAttributes,
      {
        onSuccess: (session) => {
          console.log(
            'User authentication successful after password change.',
            session
          );
        },
        onFailure: (err) => {
          console.error('Failed to complete new password challenge.', err);
        },
      }
    );
  }
}
