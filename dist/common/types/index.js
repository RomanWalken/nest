"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifficultyLevel = exports.PaymentMethod = exports.PaymentStatus = exports.TariffStatus = exports.DietaryCategory = exports.LessonType = exports.CoursePublicationStatus = exports.CourseCategory = exports.CourseKind = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["STUDENT"] = "student";
    UserRole["TEACHER"] = "teacher";
    UserRole["MODERATOR"] = "moderator";
    UserRole["ADMIN"] = "admin";
    UserRole["SUPERADMIN"] = "superadmin";
})(UserRole || (exports.UserRole = UserRole = {}));
var CourseKind;
(function (CourseKind) {
    CourseKind["REGULAR"] = "regular";
    CourseKind["FITNESS"] = "fitness";
})(CourseKind || (exports.CourseKind = CourseKind = {}));
var CourseCategory;
(function (CourseCategory) {
    CourseCategory["VIDEO"] = "video";
    CourseCategory["COOKING"] = "cooking";
    CourseCategory["PROGRAMMING"] = "programming";
    CourseCategory["DESIGN"] = "design";
    CourseCategory["BUSINESS"] = "business";
    CourseCategory["LANGUAGE"] = "language";
    CourseCategory["MUSIC"] = "music";
    CourseCategory["ART"] = "art";
    CourseCategory["FITNESS_TRAINING"] = "fitness_training";
    CourseCategory["YOGA"] = "yoga";
    CourseCategory["PILATES"] = "pilates";
    CourseCategory["NUTRITION"] = "nutrition";
    CourseCategory["WELLNESS"] = "wellness";
    CourseCategory["CUSTOM"] = "custom";
})(CourseCategory || (exports.CourseCategory = CourseCategory = {}));
var CoursePublicationStatus;
(function (CoursePublicationStatus) {
    CoursePublicationStatus["DRAFT"] = "draft";
    CoursePublicationStatus["COMING_SOON"] = "coming_soon";
    CoursePublicationStatus["PUBLISHED"] = "published";
})(CoursePublicationStatus || (exports.CoursePublicationStatus = CoursePublicationStatus = {}));
var LessonType;
(function (LessonType) {
    LessonType["VIDEO"] = "video";
    LessonType["TEXT"] = "text";
    LessonType["PRESENTATION"] = "presentation";
    LessonType["QUIZ"] = "quiz";
})(LessonType || (exports.LessonType = LessonType = {}));
var DietaryCategory;
(function (DietaryCategory) {
    DietaryCategory["VEGAN"] = "vegan";
    DietaryCategory["VEGETARIAN"] = "vegetarian";
    DietaryCategory["OMNIVORE"] = "omnivore";
    DietaryCategory["PESCATARIAN"] = "pescatarian";
    DietaryCategory["KETO"] = "keto";
    DietaryCategory["PALEO"] = "paleo";
    DietaryCategory["GLUTEN_FREE"] = "gluten_free";
    DietaryCategory["DAIRY_FREE"] = "dairy_free";
    DietaryCategory["LOW_CARB"] = "low_carb";
    DietaryCategory["HIGH_PROTEIN"] = "high_protein";
})(DietaryCategory || (exports.DietaryCategory = DietaryCategory = {}));
var TariffStatus;
(function (TariffStatus) {
    TariffStatus["ACTIVE"] = "active";
    TariffStatus["INACTIVE"] = "inactive";
    TariffStatus["SOLD_OUT"] = "sold_out";
})(TariffStatus || (exports.TariffStatus = TariffStatus = {}));
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