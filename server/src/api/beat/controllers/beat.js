'use strict';

/**
 * beat controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::beat.beat');
