const Joi  = require('joi');

const postSchema = Joi.object({
  title: Joi.string().min(2).max(139).required(),
  content: Joi.string().min(10).required(),
  category: Joi.string().required(),
  published: Joi.boolean()
})

const updatePostSchema = Joi.object({
  title: Joi.string().min(2).max(139),
  content: Joi.string().min(10),
  category: Joi.string(),
  published: Joi.boolean(),
});

module.exports = { updatePostSchema, postSchema }