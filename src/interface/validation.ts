import Joi from 'joi';


export const registerEmployeeSchema = Joi.object({
  first_name: Joi.string().min(1).max(50).required().messages({
    'string.empty': 'First name is required',
    'string.max': 'First name cannot exceed 50 characters'
  }),
  last_name: Joi.string().min(1).max(50).required().messages({
    'string.empty': 'Last name is required',
    'string.max': 'Last name cannot exceed 50 characters'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required'
  }),
  username: Joi.string().min(3).max(30).required().messages({
    'string.min': 'Username must be at least 3 characters',
    'string.max': 'Username cannot exceed 30 characters',
    'string.empty': 'Username is required'
  }),
  password: Joi.string().min(6).max(100).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required'
  }),
  national_id: Joi.number().integer().positive().required().messages({
    'number.base': 'National ID must be a number',
    'number.positive': 'National ID must be positive'
  }),
  cnas_number: Joi.number().integer().positive().required().messages({
    'number.base': 'CNAS number must be a number',
    'number.positive': 'CNAS number must be positive'
  }),
  birth_date: Joi.date().iso().required().messages({
    'date.base': 'Birth date must be a valid date',
    'date.format': 'Birth date must be in ISO format'
  }),
  hire_date: Joi.date().iso().required().messages({
    'date.base': 'Hire date must be a valid date',
    'date.format': 'Hire date must be in ISO format'
  }),
  contract_Type: Joi.string().valid('FULL_TIME', 'PART_TIME', 'INTERN', 'TEMPORARY').required().messages({
    'any.only': 'Contract type must be one of: FULL_TIME, PART_TIME, INTERN, TEMPORARY'
  }),
  position: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Position is required',
    'string.max': 'Position cannot exceed 100 characters'
  }),
  department: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Department is required',
    'string.max': 'Department cannot exceed 100 characters'
  }),
  work_location: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Work location is required',
    'string.max': 'Work location cannot exceed 100 characters'
  }),
  bank_account: Joi.number().integer().positive().required().messages({
    'number.base': 'Bank account must be a number',
    'number.positive': 'Bank account must be positive'
  }),
  phone: Joi.number().integer().positive().required().messages({
    'number.base': 'Phone must be a number',
    'number.positive': 'Phone must be positive'
  })
});


export const updateEmployeeSchema = Joi.object({
  first_name: Joi.string().min(1).max(50).optional(),
  last_name: Joi.string().min(1).max(50).optional(),
  email: Joi.string().email().optional(),
  username: Joi.string().min(3).max(30).optional(),
  password: Joi.string().min(6).max(100).optional(),
  national_id: Joi.number().integer().positive().optional(),
  cnas_number: Joi.number().integer().positive().optional(),
  birth_date: Joi.date().iso().optional(),
  hire_date: Joi.date().iso().optional(),
  contract_Type: Joi.string().valid('FULL_TIME', 'PART_TIME', 'INTERN', 'TEMPORARY').optional(),
  position: Joi.string().min(1).max(100).optional(),
  department: Joi.string().min(1).max(100).optional(),
  work_location: Joi.string().min(1).max(100).optional(),
  bank_account: Joi.number().integer().positive().optional(),
  phone: Joi.number().integer().positive().optional()
});


export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().min(1).required().messages({
    'string.empty': 'Password is required'
  })
});


export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error, value } = schema.validate(req.body, { 
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        error: 'Validation failed',
        details: errorDetails
      });
    }

    req.body = value;
    next();
  };
};