/* eslint-disable no-undef */
'use strict';

const buildCorsResponse = (origin, allowedOrigins) => {
  const response = new Twilio.Response();
  response.appendHeader('Vary', 'Origin');
  response.appendHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.appendHeader('Access-Control-Max-Age', '86400');
  if (origin && allowedOrigins.includes(origin)) {
    response.appendHeader('Access-Control-Allow-Origin', origin);
  }
  response.appendHeader('Content-Type', 'application/json; charset=utf-8');
  return response;
};

const readHeaders = (event) => {
  const req = event && event.request ? event.request : null;
  const headersFromReq = req && req.headers ? req.headers : null;
  const headers = headersFromReq || event.headers || {};
  return headers || {};
};

const normalizeE164 = (raw) => {
  const input = String(raw || '').trim();
  if (!input) return null;

  if (input.startsWith('+')) {
    const digits = input.slice(1).replace(/\D/g, '');
    if (!digits) return null;
    return `+${digits}`;
  }

  const digits = input.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  if (digits.length >= 11) return `+${digits}`;
  return null;
};

const upsertSyncMapItem = async ({ client, serviceSid, mapName, key, data }) => {
  const map = client.sync.v1.services(serviceSid).syncMaps(mapName);
  try {
    return await map.syncMapItems(key).update({ data });
  } catch (err) {
    const status = err && err.status;
    if (status !== 404) throw err;
    return await map.syncMapItems.create({ key, data });
  }
};

exports.handler = async function handler(context, event, callback) {
  const allowedOrigins = String(
    context.ALLOWED_ORIGINS || 'https://michaelako.com,https://www.michaelako.com'
  )
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const headers = readHeaders(event);
  const origin = headers.origin || headers.Origin;
  const method = (event.request && event.request.method) || event.httpMethod || 'POST';
  const response = buildCorsResponse(origin, allowedOrigins);

  if (method.toUpperCase() === 'OPTIONS') {
    response.setStatusCode(204);
    return callback(null, response);
  }

  if (origin && !allowedOrigins.includes(origin)) {
    response.setStatusCode(403);
    response.setBody(JSON.stringify({ ok: false }));
    return callback(null, response);
  }

  try {
    const name = String(event.name || '').trim();
    const phone = normalizeE164(event.phone);
    const consent = String(event.consent || '').toLowerCase() === 'true';
    const disclosureVersion = String(event.disclosureVersion || '').trim();
    const disclosureText = String(event.disclosureText || '').trim();

    if (!name || name.length > 120) {
      response.setStatusCode(400);
      response.setBody(JSON.stringify({ ok: false }));
      return callback(null, response);
    }

    if (!phone) {
      response.setStatusCode(400);
      response.setBody(JSON.stringify({ ok: false }));
      return callback(null, response);
    }

    if (!consent) {
      response.setStatusCode(400);
      response.setBody(JSON.stringify({ ok: false }));
      return callback(null, response);
    }

    if (!disclosureVersion || !disclosureText) {
      response.setStatusCode(400);
      response.setBody(JSON.stringify({ ok: false }));
      return callback(null, response);
    }

    const now = new Date().toISOString();
    const ua = headers['user-agent'] || headers['User-Agent'] || null;
    const ip =
      (headers['x-forwarded-for'] || headers['X-Forwarded-For'] || '')
        .split(',')[0]
        .trim() || null;

    const client = context.getTwilioClient();
    const syncServiceSid = context.SYNC_SERVICE_SID;
    const syncMapName = context.SYNC_MAP_NAME || 'sms_optins';

    if (!syncServiceSid) {
      response.setStatusCode(500);
      response.setBody(JSON.stringify({ ok: false }));
      return callback(null, response);
    }

    await upsertSyncMapItem({
      client,
      serviceSid: syncServiceSid,
      mapName: syncMapName,
      key: phone,
      data: {
        phone,
        name,
        status: 'subscribed',
        subscribedAt: now,
        consent: {
          capturedAt: now,
          disclosureVersion,
          disclosureText,
          origin: origin || null,
          ip,
          userAgent: ua,
        },
        updatedAt: now,
      },
    });

    const body =
      context.CONFIRMATION_MESSAGE ||
      'Michaela Kotarba Yoga Updates: Thanks for subscribing! Up to 4 msgs/month. Msg & data rates may apply. Reply HELP for help, STOP to cancel.';

    const msg = { to: phone, body };
    if (context.MESSAGING_SERVICE_SID) {
      msg.messagingServiceSid = context.MESSAGING_SERVICE_SID;
    } else if (context.FROM_NUMBER) {
      msg.from = context.FROM_NUMBER;
    } else {
      response.setStatusCode(500);
      response.setBody(JSON.stringify({ ok: false }));
      return callback(null, response);
    }

    await client.messages.create(msg);

    response.setStatusCode(200);
    response.setBody(JSON.stringify({ ok: true }));
    return callback(null, response);
  } catch (err) {
    response.setStatusCode(500);
    response.setBody(JSON.stringify({ ok: false }));
    return callback(null, response);
  }
};

