import express, {Express, Request, Response} from 'express'

const app: Express = express()
const port: number = 3000

interface Vehicle {
    model: string,
    color: string,
    year: number,
    power: number
    bodyType?: string,
    wheelCount?: number,
    draft?: number,
    wingspan?: number
}
const vehicles: Vehicle[] = []

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/hello', (req: Request, res: Response) => {
    res.send('Hello world')
})

app.post('/vehicle/add', (req: Request, res: Response) => {
    // add vehicle to vehicles list
    let currentLength = vehicles.length
    if (req.body.length == undefined) {
        const {model, color, year, power, bodyType, wheelCount, draft, wingspan} = req.body
        const newVehicle: Vehicle = {model, color, year, power, bodyType, wheelCount, draft, wingspan}
        vehicles.push(newVehicle)
    } else {
        for (let vehicleCount = 0; vehicleCount < req.body.length; vehicleCount++) {
            const {model, color, year, power, bodyType, wheelCount, draft, wingspan} = req.body[vehicleCount]
            const newVehicle: Vehicle = {model, color, year, power, bodyType, wheelCount, draft, wingspan}
            vehicles.push(newVehicle)
        }
    }
    // check if vehicle was added successfully
    if (vehicles.length > currentLength) {
        res.status(201).send('Vehicle added')
    } else {
        res.status(400).send('Vehicle not added')
    }
})

app.get('/vehicle/search/:model', (req: Request, res: Response) => {
    const reqModel: string = String (req.params.model)
    console.log(reqModel)
    // search vehicles list for model
    const vehicle: Vehicle | undefined = vehicles.find(result => result.model == reqModel)
    console.log(vehicle)
    if (vehicle) {
        res.status(200).send(vehicle)
        console.log("\nVehicle found\n")
        console.log(vehicle)
    } else {
        res.status(404).send('Vehicle not found')
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})