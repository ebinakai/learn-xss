const admin = require('firebase-admin');

const serviceAccount = {
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email is required' }),
      };
    }

    await db.collection('emails').add({ email });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email added successfully' }),
    };
  } catch (error) {
    console.error('Error adding email to Firestore:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
