/* eslint-disable no-undef */
'use strict';

const normalizeKeyword = (raw) =>
  String(raw || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, ' ');

const normalizeE164 = (raw) => {
  const input = String(raw || '').trim();
  if (!input) return null;
  if (input.startsWith('+')) return `+${input.slice(1).replace(/\D/g, '')}`;
  const digits = input.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  if (digits.length >= 11) return `+${digits}`;
  return null;
};

const upsertSyncMapItem = async ({ client, serviceSid, mapName, key, patch }) => {
  const map = client.sync.v1.services(serviceSid).syncMaps(mapName);
  const now = new Date().toISOString();

  try {
    const existing = await map.syncMapItems(key).fetch();
    const next = { ...(existing.data || {}), ...patch, updatedAt: now };
    return await map.syncMapItems(key).update({ data: next });
  } catch (err) {
    const status = err && err.status;
    if (status !== 404) throw err;
    return await map.syncMapItems.create({ key, data: { ...patch, updatedAt: now } });
  }
};

exports.handler = async function handler(context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();

  try {
    const from = normalizeE164(event.From);
    const body = normalizeKeyword(event.Body);

    if (!from) {
      return callback(null, twiml);
    }

    const client = context.getTwilioClient();
    const syncServiceSid = context.SYNC_SERVICE_SID;
    const syncMapName = context.SYNC_MAP_NAME || 'sms_optins';
    const supportEmail = context.SUPPORT_EMAIL || 'michaelakotarba@gmail.com';
    const programName = context.PROGRAM_NAME || 'Michaela Kotarba Yoga Updates';

    if (!syncServiceSid) {
      return callback(null, twiml);
    }

    const stopWords = new Set(['STOP', 'STOPALL', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT']);
    const helpWords = new Set(['HELP', 'INFO']);
    const startWords = new Set(['START', 'UNSTOP']);

    if (stopWords.has(body)) {
      await upsertSyncMapItem({
        client,
        serviceSid: syncServiceSid,
        mapName: syncMapName,
        key: from,
        patch: { phone: from, status: 'unsubscribed', unsubscribedAt: new Date().toISOString() },
      });
      twiml.message(`${programName}: You have been unsubscribed and will no longer receive messages.`);
      return callback(null, twiml);
    }

    if (helpWords.has(body)) {
      twiml.message(
        `${programName}: For support, email ${supportEmail}. Reply STOP to cancel. Msg & data rates may apply.`
      );
      return callback(null, twiml);
    }

    if (startWords.has(body)) {
      await upsertSyncMapItem({
        client,
        serviceSid: syncServiceSid,
        mapName: syncMapName,
        key: from,
        patch: { phone: from, status: 'subscribed', resubscribedAt: new Date().toISOString() },
      });
      twiml.message(`${programName}: You are subscribed. Reply STOP to cancel.`);
      return callback(null, twiml);
    }

    return callback(null, twiml);
  } catch (err) {
    return callback(null, twiml);
  }
};

