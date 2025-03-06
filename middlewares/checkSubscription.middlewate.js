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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSubscription = void 0;
const subscription_model_1 = __importDefault(require("../modules/subscription/subscription.model"));
// export const checkSubscription = async (req: AuthRequest, res: Response, next: NextFunction) => {
//     try {
//         if (!req.user || !req.user.id) {
//             return res.status(400).json({ success: false, message: "User authentication failed." });
//         }
//         const subscription = await Subscription.findOne({ userId: req.user.id });
//         if (!subscription) {
//             return res.status(404).json({ success: false, message: "No active subscription found." });
//         }
//         const currentDate = new Date();
//         if (subscription.endDate < currentDate) {
//             subscription.active = false;
//             await subscription.save();
//             return res.status(403).json({
//                 success: false,
//                 message: "Your subscription has expired. Please renew your plan."
//             });
//         }
//         next(); // Subscription is valid, proceed
//     } catch (error: any) {
//         return res.status(500).json({
//             success: false,
//             message: "Server error while checking subscription.",
//             error: error.message
//         });
//     }
// };
const checkSubscription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user.id) {
            res.status(400).json({ success: false, message: "User authentication failed." });
            return;
        }
        console.log(req.user.id);
        const subscription = yield subscription_model_1.default.findOne({ userId: req.user.id });
        if (!subscription) {
            res.status(404).json({ success: false, message: "No active subscription found." });
            return;
        }
        const currentDate = new Date();
        if (subscription.endDate < currentDate) {
            subscription.active = false;
            yield subscription.save();
            res.status(403).json({
                success: false,
                message: "Your subscription has expired. Please renew your plan."
            });
            return;
        }
        next(); // Subscription is valid, proceed
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error while checking subscription.",
            error: error.message
        });
    }
});
exports.checkSubscription = checkSubscription;
