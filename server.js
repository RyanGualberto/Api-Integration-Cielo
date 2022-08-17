const cors = require("cors");
const express = require("express");
const app = express();
const port = 3333;
const axios = require("axios");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});
app.get("/produtos", (req, res) => {
  axios
    .get("https://api.cielo.com.br/order-management/v1/orders/", {
      headers: {
        "Client-Id": "IyECZ12tQAhiX8kjsccdib5ubHOu6UaSi04ORJuKqHB5iTWRIk",
        "content-type": "application/json",
        "Access-Token": "3xqcpOWuvi6xJUCylLIxcGJVmY8NrhTE4rpyCryjkNaHQLqXvN",
        "Merchant-Id": "126b6aaa-565a-45eb-8693-b6ea0e3b2228",
      },
    })
    .then(function (response) {
      // manipula o sucesso da requisição
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      // manipula erros da requisição
      console.error(error);
    })
    .then(function () {
      // sempre será executado
    });
});

app.post("/produtos", (req, res) => {
  const produtos = req.body;
  axios({
    method: "post", //you can set what request you want to be
    url: "https://api.cielo.com.br/order-management/v1/orders/",
    headers: {
      "Client-Id": "IyECZ12tQAhiX8kjsccdib5ubHOu6UaSi04ORJuKqHB5iTWRIk",
      "content-type": "application/json",
      "Access-Token": "3xqcpOWuvi6xJUCylLIxcGJVmY8NrhTE4rpyCryjkNaHQLqXvN",
      "Merchant-Id": "126b6aaa-565a-45eb-8693-b6ea0e3b2228",
    },
    data: {
      number: "0992f1d5cee540d9a9648f4d6a9e4aa6",
      reference: produtos.referencia,
      status: "ENTERED",
      items: [
        {
          sku: "55329cda842406e8cv2f5gdf96985152d",
          name: produtos.nome,
          unit_price: produtos.preco,
          quantity: produtos.quantidade,
          unit_of_measure: "EACH",
        },
      ],
      notes: produtos.nota,
      price: 1000,
    },
  });
});

app.listen(port, () => {
  console.log(`funfando na porta localhost:${port}`);
});
