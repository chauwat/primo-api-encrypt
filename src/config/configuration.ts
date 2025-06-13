export default () => ({
  encryption: {
    rsaPrivateKey: process.env.RSA_PRIVATE_KEY,
    rsaPublicKey: process.env.RSA_PUBLIC_KEY,
    aesKeyLength: parseInt(process.env.AES_KEY_LENGTH!, 10) || 32,
  },
}); 