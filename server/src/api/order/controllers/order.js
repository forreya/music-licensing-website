"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, userName, email } = ctx.request.body;
    try {
      // retrieve beat information
      const lineBeats = await Promise.all(
        products.map(async (product) => {
          const beat = await strapi
            .service("api::beat.beat")
            .findOne(product.id);

          return {
            price_data: {
              currency: "ringgit",
              product_data: {
                name: beat.name,
              },
              unit_amount: beat.price * 100,
            },
            quantity: product.count,
          };
        })
      );

      // create a stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "http://localhost:2001/checkout/success",
        cancel_url: "http://localhost:2001",
        line_beats: lineBeats,
      });

      // create the beat
      await strapi
        .service("api::order.order")
        .create({ data: { userName, products, stripeSessionId: session.id } });

      // return the session id
      return { id: session.id };
    } catch (error) {
      ctx.response.status = 500;
      return { error: { message: "There was a problem creating the charge" } };
    }
  },
}));