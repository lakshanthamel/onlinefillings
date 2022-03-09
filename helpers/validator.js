import { checkSchema } from 'express-validator';
import { validationResult } from 'express-validator';

// parallel processing of validations
const validate = validations => {
    return async (req, res, next) => {
      await Promise.all(validations.map(validation => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
    };
  };

export default {
    // task validations
    taskValidations(idCheck){
        if(idCheck === undefined){
            idCheck = true;
        }
        return validate(checkSchema({
            id: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (idCheck && !req.body.id) {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'ID Field is Required'
                },
            },            
            name: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (idCheck && req.body.name === undefined ) {
                            return true;
                        }

                        if (req.body.name.trim() === '') {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'Name is Required'
                }
            },
            status: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (idCheck && req.body.status === undefined ) {
                            return true;
                        }

                        if (!(req.body.status === 0 || req.body.status === 1)) {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'Status is Required'
                },
                isInt: true,
            },
            start_date: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (idCheck && req.body.start_date === undefined ) {
                            return true;
                        }

                        if (req.body.start_date.trim() === '') {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'Start Date is Required'
                }
            },
            due_date: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (idCheck && req.body.due_date === undefined ) {
                            return true;
                        }

                        if (req.body.due_date.trim() === '') {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'Due Date is Required'
                }
            },
            done_date: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (idCheck && req.body.done_date === undefined ) {
                            return true;
                        }

                        if (req.body.done_date === undefined) {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'Done Date Field is Required'
                },
            },                        
        }));
    },

    validationIdOnly(){
        return validate(checkSchema({
            id: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (!req.body.id) {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'ID Field is Required'
                },
            },                       
        }));
    },

    taskValidationStatusOnly(){
        return validate(checkSchema({
            status: {
                isInt: true,
                toInt: true,
                custom: {
                    options: (value, { req, location, path }) => {
                        if (!(req.body.status === 0 || req.body.status === 1)) {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'Status can only be either 0 or 1'
                },
            },                       
        }));
    },

    validationNameOnly(){
        return validate(checkSchema({
            name: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (req.body.name.trim() === '') {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'Name is Required'
                }
            },                       
        }));
    },

    validationDatesOnly(all){
        if(all === undefined){
            all = true;
        }
        
        return validate(checkSchema({
            order: {
                custom: {
                    options: (value, { req, location, path }) => {
                        const order = req.body.order.trim();
                        const conditionsArray = [
                            'asc', 
                            'desc'
                        ]

                        if (conditionsArray.indexOf(order) === -1) {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'Order can only be either asc or desc'
                }
            },
            orderBy: {
                custom: {
                    options: (value, { req, location, path }) => {
                        const orderBy = req.body.orderBy.trim();
                        const conditionsArray = [
                            'start_date', 
                            'due_date',
                            
                        ];

                        if(all === true){
                            conditionsArray.push('done_date');   
                        }
                        if (conditionsArray.indexOf(orderBy) === -1) {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'OrderBy can only be start_date, due_date or done_date'
                }
            },                      
        }));
    },

    projectValidations(idCheck){
        if(idCheck === undefined){
            idCheck = true;
        }
        return validate(checkSchema({
            id: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (idCheck && !req.body.id) {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'ID Field is Required'
                },
            },            
            name: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (idCheck && req.body.name === undefined ) {
                            return true;
                        }

                        if (req.body.name.trim() === '') {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'Name is Required'
                }
            },
            start_date: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (idCheck && req.body.start_date === undefined ) {
                            return true;
                        }

                        if (req.body.start_date.trim() === '') {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'Start Date is Required'
                }
            },
            due_date: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (idCheck && req.body.due_date === undefined ) {
                            return true;
                        }

                        if (req.body.due_date.trim() === '') {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'Due Date is Required'
                }
            }                        
        }));
    },

    validationIdsOnly(){
        return validate(checkSchema({
            projectId: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (!req.body.projectId) {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'projectId Field is Required'
                },
            }, 
            taskId: {
                custom: {
                    options: (value, { req, location, path }) => {
                        if (!req.body.taskId) {
                            return false;
                        }
                        
                        return true;
                    },
                    errorMessage: 'taskId Field is Required'
                },
            },                       
        }));
    },
}