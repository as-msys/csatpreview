module.exports = {
  async afterCreate(event) {
    // Connected to "Save" button in admin panel
    const { result } = event;

    try {
      await strapi.plugins["email"].services.email.send({
        to: "valid email address",
        from: "aperiyakaruppan@msystechnologies.com", // e.g. single sender verification in SendGrid
        subject: "The Strapi Email plugin worked successfully",
        text: `${result.name}`, // Replace with a valid field ID
        html: "Hello world!",
      });
    } catch (err) {
      console.log(err);
    }
  },
};
