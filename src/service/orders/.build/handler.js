"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.listOrder = exports.updateOrder = exports.createOrder = void 0;
var controller_1 = require("./controller");
var ordersController = new controller_1.OrdersController();
exports.createOrder = function (event, context) {
    return ordersController.create(event, context);
};
exports.updateOrder = function (event) { return ordersController.update(event); };
exports.listOrder = function (event) { return ordersController.list(); };
exports.getOrder = function (event, context) {
    return ordersController.get(event);
};
//# sourceMappingURL=handler.js.map