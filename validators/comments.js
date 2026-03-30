const Joi = require('joi');

const commentSchema = Joi.object({
  author: Joi.string().required(),
  content: Joi.string().min(5).required()
})

module.exports = commentSchema;