import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware';
import { UserController } from '../controller/user-controller';
import { ContactController } from '../controller/contact-controller';
import { LicenseController } from '../controller/license-controller';

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// user API
apiRouter.get('/api/users/current', UserController.get);
apiRouter.patch('/api/users/current', UserController.update);
apiRouter.delete('/api/users/current', UserController.logout);

// Contact Api
apiRouter.post('/api/contacts', ContactController.create);
apiRouter.get('/api/contacts/:contactId(\\d+)', ContactController.get); //validasi with regext =>digit +(number only)
apiRouter.put('/api/contacts/:contactId(\\d+)', ContactController.update); //validasi with regext =>digit +(number only)

// license API
apiRouter.post('/api/licenses', LicenseController.generateLicense);
apiRouter.get('/api/licenses/validate', LicenseController.validateLicense);
