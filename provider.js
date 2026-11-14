/**
 * Replace this adapter only after the department approves a cloud telephony vendor.
 * Use the vendor's official API, verified caller ID, Telugu audio/TTS, webhook callbacks,
 * DLT registration/templates where applicable, consent controls and suppression list.
 */
export async function requestTeluguReminderCall(_consumer) {
  // Intentionally no real call is placed by this starter project.
  return {
    status: 'provider_not_configured',
    message: 'Configure an approved cloud telephony provider before placing calls.'
  };
}
