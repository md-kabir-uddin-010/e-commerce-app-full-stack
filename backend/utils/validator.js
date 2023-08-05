const Joi = require("joi");

//signup validator
const signup = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    })
    .lowercase()
    .required(),
  password: Joi.string().min(6).max(32).required(),
  role: Joi.string().min(4).max(7).lowercase(),
});

//signup validator
const signupByAdmin = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    })
    .lowercase()
    .required(),
  password: Joi.string().min(6).max(32).required(),
  role: Joi.string().min(4).max(7).lowercase().required(),
  verifyed: Joi.boolean().required(),
});
//edit by admin validator
const editByAdmin = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  role: Joi.string().min(4).max(7).lowercase().required(),
  verifyed: Joi.boolean().required(),
});

//login validator
const login = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    })
    .lowercase()
    .required(),
  password: Joi.string().min(6).max(32).required(),
  role: Joi.string().min(4).max(7).lowercase().required(),
});

//refresh token validator
const refresh = Joi.object({
  refresh_token: Joi.string().required(),
});

//verifi _id
const IdValidtor = Joi.object({
  id: Joi.string().min(24).hex().required(),
});

//reset password payload (email)
const resetPasswordValidtor = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    })
    .lowercase()
    .required(),
});

//set password payload (userId,token,new_password)
const setPasswordValidtor = Joi.object({
  id: Joi.string().min(24).hex().required(),
  token: Joi.string().required(),
  new_password: Joi.string().min(6).max(32).required(),
});

module.exports = {
  signup,
  login,
  refresh,
  IdValidtor,
  resetPasswordValidtor,
  setPasswordValidtor,
  signupByAdmin,
  editByAdmin,
};
