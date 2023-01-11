import * as mongodb from "mongodb";
import { Stock } from "./stock";

export const collections: {
    stocks?: mongodb.Collection<Stock>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("StockDatabase");
    
    await applySchemaValidation(db);

    const stocksCollection = db.collection<Stock>("stocks");
    collections.stocks = stocksCollection;


    
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            additionalProperties: false,
            properties: {
                _id: {},
                v_no: {
                    bsonType: "string",
                    description: "'v_no' is required and is a string",
                },
                p_no: {
                    bsonType: "string",
                    description: "'p_no' is required and is a string",
                },
                s_no: {
                    bsonType: "string",
                    description: "'s_no' is required and is a string",
                },
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                desc: {
                    bsonType: "string",
                    description: "'desc' is required and is a string",
                },
                datePurchase: {
                    bsonType: "string",
                    description: "'datePurchase' is required and is a string",
                },
                year: {
                    bsonType: "string",
                    description: "'year' is the year of purchase",
                },
                purchaseValue: {
                    bsonType: "string",
                    description: "'purchaseValue' is required",
                },
                transfer: {
                    bsonType: "string",
                    description: "'transfer' is required",
                },
                invoice_no: {
                    bsonType: "string",
                    description: "'invoice_no' is required",
                }
            },
        },
    };


    // Try applying the modification to the collection, if the collection doesn't exist, create it 
   await db.command({
        collMod: "stocks",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("stocks", {validator: jsonSchema});
        }
    });
}
