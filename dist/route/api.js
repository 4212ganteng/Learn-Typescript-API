"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const contact_controller_1 = require("../controller/contact-controller");
const license_controller_1 = require("../controller/license-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
// user API
exports.apiRouter.get('/api/users/current', user_controller_1.UserController.get);
exports.apiRouter.patch('/api/users/current', user_controller_1.UserController.update);
exports.apiRouter.delete('/api/users/current', user_controller_1.UserController.logout);
// Contact Api
exports.apiRouter.post('/api/contacts', contact_controller_1.ContactController.create);
exports.apiRouter.get('/api/contacts/:contactId(\\d+)', contact_controller_1.ContactController.get); //validasi with regext =>digit +(number only)
exports.apiRouter.put('/api/contacts/:contactId(\\d+)', contact_controller_1.ContactController.update); //validasi with regext =>digit +(number only)
// license API
exports.apiRouter.post('/api/licenses', license_controller_1.LicenseController.generateLicense);
exports.apiRouter.get('/api/licenses/validate', license_controller_1.LicenseController.validateLicense);
