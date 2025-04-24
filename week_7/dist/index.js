"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const vehicles = [];
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get('/hello', (req, res) => {
    res.send('Hello world');
});
app.post('/vehicle/add', (req, res) => {
    // add vehicle to vehicles list
    let currentLength = vehicles.length;
    if (req.body.length == undefined) {
        const { model, color, year, power, bodyType, wheelCount, draft, wingspan } = req.body;
        const newVehicle = { model, color, year, power, bodyType, wheelCount, draft, wingspan };
        vehicles.push(newVehicle);
    }
    else {
        for (let vehicleCount = 0; vehicleCount < req.body.length; vehicleCount++) {
            const { model, color, year, power, bodyType, wheelCount, draft, wingspan } = req.body[vehicleCount];
            const newVehicle = { model, color, year, power, bodyType, wheelCount, draft, wingspan };
            vehicles.push(newVehicle);
        }
    }
    // check if vehicle was added successfully
    if (vehicles.length > currentLength) {
        res.status(201).send('Vehicle added');
    }
    else {
        res.status(400).send('Vehicle not added');
    }
});
app.get('/vehicle/search/:model', (req, res) => {
    const reqModel = String(req.params.model);
    console.log(reqModel);
    // search vehicles list for model
    const vehicle = vehicles.find(result => result.model == reqModel);
    console.log(vehicle);
    if (vehicle) {
        res.status(200).send(vehicle);
        console.log("\nVehicle found\n");
        console.log(vehicle);
    }
    else {
        res.status(404).send('Vehicle not found');
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
