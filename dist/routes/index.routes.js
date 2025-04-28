"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_routes_1 = __importDefault(require("./dashboard.routes"));
const search_routes_1 = __importDefault(require("./search.routes"));
const report_routes_1 = __importDefault(require("./report.routes"));
exports.default = (app) => {
    app.use(`/dashboard`, dashboard_routes_1.default);
    app.use(`/search`, search_routes_1.default);
    app.use(`/reports`, report_routes_1.default);
};
//# sourceMappingURL=index.routes.js.map