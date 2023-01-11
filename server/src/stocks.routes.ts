import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const stockRouter = express.Router();
stockRouter.use(express.json());

stockRouter.get("/", async (_req, res) => {
    console.log("Get all stocks");
    try {
        const stocks = await collections.stocks.find({}).toArray();
        res.status(200).send(stocks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


stockRouter.get("/year/:yr", async (req, res) => {
    console.log("Get all stocks in a particular year");
    const yr= req?.params?.yr;
    try {
        const stocks = await collections.stocks.find({"year": yr}).toArray();
        console.log(stocks);
        res.status(200).send(stocks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

stockRouter.get("/volume/:vol", async (req, res) => {
    console.log("Get all stocks in a particular year");
    const vol= req?.params?.vol;
    try {
        const stocks = await collections.stocks.find({"v_no": vol}).toArray();
        console.log(stocks);
        res.status(200).send(stocks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

stockRouter.get("/invoice/:inv", async (req, res) => {
    console.log("Get all stocks in a particular year");
    const inv= req?.params?.inv;
    try {
        const stocks = await collections.stocks.find({"invoice_no": inv}).toArray();
        console.log(stocks);
        res.status(200).send(stocks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


stockRouter.get("/name/:nam", async (req, res) => {
    console.log("Get all stocks with a particular name");
    const nam= req?.params?.nam;
    try {
        const stocks = await collections.stocks.find({"name": nam}).toArray();
        console.log(stocks);
        res.status(200).send(stocks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

stockRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const stock = await collections.stocks.findOne(query);

        if (stock) {
            console.log("Get success");
            res.status(200).send(stock);
        } else {
            console.log("Get failed");
            res.status(404).send(`Failed to find an stock: ID ${id}`);
        }
    } catch (error) {
        console.log("Get success");
        res.status(404).send(`Failed to find an stock: ID ${req?.params?.id}`);
    }
});

stockRouter.post("/", async (req, res) => {
    console.log("Create new stock");
    console.log(req.body);
    try {
        const stock = req.body;
        const date= req.body.datePurchase;
        stock.year= date.substring(0, 4);
        console.log(stock);
        const result = await collections.stocks.insertOne(stock);

        if (result.acknowledged) {
            res.status(201).send(`Created a new stock: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new stock.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

stockRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const stock = req.body;
        const date= req.body.datePurchase;
        stock.year= date.substring(0, 4);
        console.log(stock);
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.stocks.updateOne(query, { $set: stock });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an stock: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an stock: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an stock: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

stockRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.stocks.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an stock: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an stock: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an stock: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
