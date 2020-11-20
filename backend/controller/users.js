import { SQL } from '../config/db.js';
import Users from '../models/User.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../middleware/error.js';

/*
 * @desc     Get All Users
 * @route    GET /api/v1/users
 * @access   Public
 */

const getUsers = asyncHandler(async (req, res, next) => {
    const users = await Users.findAll({
        attributes: [
            'id',
            'email',
            'firstName',
            'lastName',
            'password',
            'userType',
            'foodPreference',
        ],
    });

    if (!users) {
        return next(new ErrorResponse(`No User found!`, 404));
    }
    res.status(200).json({ success: true, data: users });
});

/*
 * @desc     Get user with id
 * @route    GET /api/v1/users/:id
 * @access   Public
 */

const getUser = asyncHandler(async (req, res, next) => {
    //? We can fire direct SQL query as the below line
    // const user = await SQL.query(`select * from users;`);
    const user = await Users.findAll({
        attributes: [
            'id',
            'email',
            'firstName',
            'lastName',
            'password',
            'userType',
            'foodPreference',
        ],
        where: {
            email: req.params.id,
        },
    });

    if (!user || user.length == 0) {
        console.log(`User Not Found with id ${req.params.id}`);
        return res.status(404).json({
            success: false,
            error: `User Not Found with id '${req.params.id}'`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: user }));
});

/*
 * @desc     Validate user login id
 * @route    POST /api/v1/users//login
 * @access   Public
 */

const AuthenticateUser = asyncHandler(async (req, res, next) => {
    const user = await Users.findAll({
        attributes: [
            'id',
            'email',
            'firstName',
            'lastName',
            'password',
            'userType',
            'foodPreference',
        ],
        where: {
            email: req.body.email,
            password: req.body.password,
        },
    });

    console.log(user);

    if (!user || user.length == 0) {
        console.log(`User Not Found with email ${req.body.email}`);
        return res.status(404).json({
            success: false,
            error: `User Not Found with id '${req.body.email}'`,
        });
    }
    console.log(req.params.id);
    return next(res.status(200).json({ success: true, data: user }));
});

/*
 * @desc     Create user in Db
 * @route    GET /api/v1/users/
 * @access   Public
 */

const createUser = asyncHandler(async (req, res, next) => {
    // Validate Body is not empty
    if (!req.body.email || !req.body.password) {
        return next(
            res.status(400).send({
                message: 'Content can not be empty!',
            })
        );
    }

    const user = await Users.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        userType: req.body.userType,
        foodPreference: req.body.foodPreference,
    });

    if (!user || user.length == 0) {
        console.log(`User Not Found with id ${res}`);
        return res.status(500).json({
            success: false,
            error: `"Some error occurred while creating the User.`,
        });
        // return next(
        // 	new ErrorResponse(`User not found with ID of: ${req.params.id}`, 404)
        // );
    }

    res.status(200).json({ success: true, data: user });
});

export { AuthenticateUser, getUsers, getUser, createUser };
