"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "express service with swagger",
            version: "1.0.0",
            description: "a rest api using swagger and express.",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./routes/api/**/*.ts"],
};
exports.default = options;
//# sourceMappingURL=swagger.option.js.map