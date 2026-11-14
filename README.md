# APEPDCL BHIMADOLU BILL REMINDER (Starter Project)

A starter Android app + cloud API for authorised Telugu bill-reminder calls.

## Included
- Android app (Kotlin + Jetpack Compose)
- Manual consumer/service entry (operator enters the mobile number)
- Consent confirmation before requesting a call
- Cloud API request and call-status display
- Node.js/Express backend starter with a provider adapter placeholder

## Important
This project is a development starter, not a production-ready calling service.
It does **not** make real calls until an authorised cloud telephony provider is selected
and its API integration is completed. Do not upload or use APEPDCL consumer data unless
you have department approval and lawful access. Follow applicable TRAI/DLT, privacy,
consent, caller-ID and Do-Not-Disturb requirements.

## Android setup
1. Open the `android` folder in Android Studio (recent stable version).
2. Let Gradle sync.
3. In `android/app/src/main/java/in/apepdcl/billreminder/MainActivity.kt`,
   set `API_BASE_URL` to your secured backend URL. For local emulator testing use
   `http://10.0.2.2:3000/`; for a real phone use your server's HTTPS URL.
4. Run the app on an Android device.

## Backend setup
1. Install Node.js 20+.
2. In `backend`, run `npm install`.
3. Copy `.env.example` to `.env` and set a strong `API_KEY`.
4. Run `npm start`.
5. The `/api/calls` endpoint currently validates and logs the request, then returns
   `provider_not_configured`. Implement `provider.js` for the telephony provider
   approved by your department.

## API
`POST /api/calls`

Headers:
- `Content-Type: application/json`
- `x-api-key: <API_KEY>`

Body:
```json
{
  "serviceNumber": "1234567890",
  "consumerName": "Consumer",
  "mobileNumber": "9XXXXXXXXX",
  "pendingAmount": 1250,
  "language": "te",
  "consentConfirmed": true
}
```

The backend intentionally refuses to place a call until the provider integration is
configured. Add authentication per employee, audit logs, rate limits, encryption,
retention controls and role-based access before deployment.
