"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.send('Hello, Studento!');
});
router.get('/:name', (req, res) => {
    let { name } = req.params;
    res.send(`Hello, Student ${name}!`);
});
exports.StudentRoutes = router;
//# sourceMappingURL=students.js.map