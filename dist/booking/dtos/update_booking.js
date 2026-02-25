"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_booking_1 = require("./create_booking");
class UpdateBookingDto extends (0, mapped_types_1.PartialType)(create_booking_1.CreateBookingDto) {
}
exports.UpdateBookingDto = UpdateBookingDto;
//# sourceMappingURL=update_booking.js.map