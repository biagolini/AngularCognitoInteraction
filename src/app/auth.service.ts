import { Injectable } from '@angular/core';
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { CognitoConfig } from './aws-cognito-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userPool = new CognitoUserPool({
    UserPoolId: CognitoConfig.UserPoolId,
    ClientId: CognitoConfig.ClientId,
  });

  constructor() {}

  authenticateUser(email: string, password: string): Promise<any> {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          console.log('Authentication successful', session);
          localStorage.setItem(
            'accessToken',
            session.getAccessToken().getJwtToken()
          );
          resolve({ status: 'success', session });
        },
        onFailure: (err) => {
          console.error('Authentication failed', err);
          reject(err);
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          delete userAttributes.email_verified;

          // Get these details and call
          resolve({
            status: 'newPasswordRequired',
            cognitoUser,
            userAttributes,
            requiredAttributes,
          });
          // User will be prompted to enter a new password and any required attributes
        },
      });
    });
  }

  changePassword(
    cognitoUser: CognitoUser,
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      cognitoUser.changePassword(oldPassword, newPassword, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
