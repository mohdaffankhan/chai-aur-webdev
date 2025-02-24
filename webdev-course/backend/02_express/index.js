import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;


const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

//add tea to the array
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(200).send(newTea);
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(201).send(teaData);
});
//get tea by id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) return res.status(404).send("Tea not found");
  return res.status(201).send(tea);
});

//update the tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) return res.status(404).send("Tea not found");
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(teaData);
});

//delete the tea from array
app.delete("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) return res.status(404).send("Tea not found");
  teaData.splice(tea.id, 1);
  return res.status(202).send("Deleted");
});

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
); 