// 'use strict';

// /**
//  * survey controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::survey.survey');

const { createCoreController } = require("@strapi/strapi").factories;
// const { parseMultipartData, sanitizeEntity } = require("@strapi/utils");

module.exports = createCoreController("api::survey.survey", ({ strapi }) => ({
  // Method 1: Creating an entirely custom action

  async create(ctx) {
    try {
      console.log("I am running");
      //CODE
      const response = await super.create(ctx);
      console.log("Survey-", response);
      console.log("ctx", ctx);
      const emailResponse = await strapi
        .plugin("email")
        .service("email")
        .send({
          to: "alagup1405@gmail.com",
          from: "alagusuryap19991@outlook.com",
          subject: "Hello Everbody",
          text: `Email from Nodemailer!!!`,
          html: `<h4>Click this link to view the client's landing page http://localhost:3000/clients/surveys/${response.data.attributes.name}</h4>`,
        });
      return emailResponse;
    } catch (e) {
      console.log("ERRORRRRRRRRRR");
      console.log(e);
    }
  },

  // Method 2: Wrapping a core action (leaves core logic in place)
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: "en" };

    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    // some more custom logic
    meta.date = Date.now();

    return { data, meta };
  },

  // Method 3: Replacing a core action
  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi
      .service("api::comment.comment")
      .findOne(id, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
  async update(ctx) {
    // some logic here
    const response = await super.update(ctx);
    // some more logic

    return response;
  },
  async delete(ctx) {
    // some logic here
    const response = await super.delete(ctx);
    // some more logic

    return response;
  },
}));
