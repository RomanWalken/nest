"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifficultyLevel = exports.PaymentMethod = exports.PaymentStatus = exports.CourseType = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["STUDENT"] = "student";
    UserRole["MODERATOR"] = "moderator";
    UserRole["ADMIN"] = "admin";
    UserRole["SUPERADMIN"] = "superadmin";
})(UserRole || (exports.UserRole = UserRole = {}));
var CourseType;
(function (CourseType) {
    CourseType["FITNESS"] = "fitness";
    CourseType["VIDEO"] = "video";
    CourseType["COOKING"] = "cooking";
    CourseType["CUSTOM"] = "custom";
})(CourseType || (exports.CourseType = CourseType = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["COMPLETED"] = "completed";
    PaymentStatus["FAILED"] = "failed";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["WAYFORPAY"] = "wayforpay";
    PaymentMethod["STRIPE"] = "stripe";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel["BEGINNER"] = "beginner";
    DifficultyLevel["INTERMEDIATE"] = "intermediate";
    DifficultyLevel["ADVANCED"] = "advanced";
})(DifficultyLevel || (exports.DifficultyLevel = DifficultyLevel = {}));
//# sourceMappingURL=index.js.map