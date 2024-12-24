"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenseController = void 0;
const license_service_1 = require("../service/license-service");
class LicenseController {
    // generate license
    static generateLicense(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield license_service_1.LicenseService.createLicense(request);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // validate license
    static validateLicense(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const licenseKey = req.query.licenseKey;
                const hwid = req.query.hwid;
                console.log(req.query);
                yield license_service_1.LicenseService.validateLicense(licenseKey, hwid);
                res.status(200).json({
                    message: 'License is valid',
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // deactivate license
    static deactivateLicense(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const licenseKey = req.query.licenseKey;
                yield license_service_1.LicenseService.deactivateLicense(licenseKey);
                res.status(200).json({
                    message: 'License is deactivated',
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.LicenseController = LicenseController;