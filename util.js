const Joi = require('joi');

const isValid = (obj) => {
  const schema = Joi.object({
    greeting: Joi.string().alphanum().trim().label('Invalid [greeting] input'),
    who: Joi.string().alphanum().trim().label('Invalid [who] input'),
    color: Joi.string().alphanum().trim().label('Invalid [color] input'),
    width: Joi.number().integer().greater(0).label('Invalid [width] input'),
    height: Joi.number().integer().greater(0).label('Invalid [height] input'),
    size: Joi.number().integer().greater(0).label('Invalid [size] input'),
  });

  const result = schema.validate(obj);
  if (result.error) {
    console.log(result.error.message);
  }
  return !result.error;
};

module.exports = {
  isValid,
};
