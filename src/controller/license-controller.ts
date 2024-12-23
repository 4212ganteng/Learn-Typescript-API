import { NextFunction, Request, Response } from 'express';
import { CreateLicenseRequest } from '../model/license-model';
import { LicenseService } from '../service/license-service';

export class LicenseController {
  // generate license
  static async generateLicense(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: CreateLicenseRequest = req.body as CreateLicenseRequest;

      const response = await LicenseService.createLicense(request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  // validate license
  static async validateLicense(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const licenseKey = req.query.licenseKey as string;
      const hwid = req.query.hwid as string;

      await LicenseService.validateLicense(licenseKey, hwid);
      res.status(200).json({
        message: 'License is valid',
      });
    } catch (error) {
      next(error);
    }
  }

  // deactivate license
  static async deactivateLicense(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const licenseKey = req.query.licenseKey as string;

      await LicenseService.deactivateLicense(licenseKey);
      res.status(200).json({
        message: 'License is deactivated',
      });
    } catch (error) {
      next(error);
    }
  }
}
