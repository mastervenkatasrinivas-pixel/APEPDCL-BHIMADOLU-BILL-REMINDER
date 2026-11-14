import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import { requestTeluguReminderCall } from './provider.js';

const app = express();
app.use(helmet());
app.use(express.json({ limit: '20kb' }));

function authenticate(req, res, next) {
  const expected = process.env.API_KEY;
  const supplied = req.header('x-api-key');
  if (!expected || !supplied || supplied !== expected) {
    return res.status(401).json({ status: 'unauthorized' });
  }
  next();
}

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/api/calls', authenticate, async (req, res) => {
  const { serviceNumber, consumerName, mobileNumber, pendingAmount, language, consentConfirmed } = req.body ?? {};
  if (!serviceNumber || !/^[6-9]\d{9}$/.test(String(mobileNumber ?? '')) ||
      !Number.isFinite(Number(pendingAmount)) || Number(pendingAmount) < 0 ||
      language !== 'te' || consentConfirmed !== true) {
    return res.status(400).json({ status: 'invalid_request' });
  }

  // Avoid logging full phone numbers or sensitive consumer data.
  const maskedMobile = `${String(mobileNumber).slice(0, 2)}******${String(mobileNumber).slice(-2)}`;
  console.info('Reminder request received', {
    serviceNumber: String(serviceNumber).slice(0, 24),
    mobile: maskedMobile,
    amount: Number(pendingAmount),
    language: 'te'
  });

  try {
    const result = await requestTeluguReminderCall({
      serviceNumber: String(serviceNumber),
      consumerName: String(consumerName ?? ''),
      mobileNumber: String(mobileNumber),
      pendingAmount: Number(pendingAmount),
      language: 'te'
    });
    return res.status(202).json(result);
  } catch {
    return res.status(502).json({ status: 'provider_error', message: 'Calling provider request failed.' });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Bill Reminder API listening on ${port}`));
