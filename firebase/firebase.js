const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = {
  type: process.env.CONFIG_TYPE,
  project_id: process.env.CONFIG_PROJECT_ID,
  private_key_id: process.env.CONFIG_PRIVATE_KEY_ID,
  private_key: process.env.CONFIG_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.CONFIG_CLIENT_EMAIL,
  client_id: process.env.CONFIG_CLIENT_ID,
  auth_uri: process.env.CONFIG_AUTH_URI,
  token_uri: process.env.CONFIG_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.CONFIG_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CONFIG_CLIENT_X509_CERT_URL,
};

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
module.exports = { db };
