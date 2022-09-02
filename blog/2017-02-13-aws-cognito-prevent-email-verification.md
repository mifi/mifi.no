---
slug: aws-cognito-prevent-email-verification
title: 'AWS Cogntio: Prevent email from being sent when email changed'
authors: mifi
tags:
  - open source
  - aws
---
When calling `adminUpdateUserAttributes` to change email address of a user in Cognito User Pools, the attribute `email_verified` will be set to false, and an email will be sent out to the user with a verification code.
If you want to disable this logic and prevent the email from being sent out, include `email_verified=true` in the update attributes request, like so:

```javascript
{
 "UserAttributes": [
  {
   "Name": "email",
   "Value": "new-email@example.com"
  },
  {
   "Name": "email_verified",
   "Value": "true"
  }
 ]
}
```
