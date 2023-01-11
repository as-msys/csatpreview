module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        service: "Hotmail",
        auth: {
          user: env("EMAIL_SMTP_USER"),
          pass: env("EMAIL_SMTP_PASS"),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "alagusuryap19991@outlook.com",
        defaultReplyTo: "alagup1405@gmail.com",
      },
    },
  },
  // ...
});
