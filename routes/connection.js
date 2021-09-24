const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router()


//CREATE

router.post('/', (req, res) => {

    async function main() {


        const uri = "mongodb+srv://root:OCULTED@coletaseletiva.kbpm7.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

        const client = new MongoClient(uri, { useUnifiedTopology: true });

        try {
            // Connect to the MongoDB cluster
            await client.connect();

            // Create a single new listing
            await createListing(client, {
                name: req.name,
                address: req.body.address,
                long: req.body.long,
                lat: req.body.lat
            }
            );
            return res.send(`New place ${req.body.name} created`);

        } finally {
            // Close the connection to the MongoDB cluster
            await client.close();
        }
    }
    main().catch(console.error);

    /**
     * Create a new Airbnb listing
     * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
     * @param {Object} newListing The new listing to be added
     */
    async function createListing(client, newListing) {
        // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne for the insertOne() docs
        const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
        console.log(`New listing created with the following id: ${result.insertedId}`);
    }

});

//READ

router.get('/', async (req, res) => {

    async function main() {

        const uri = "mongodb+srv://root:1234@coletaseletiva.kbpm7.mongodb.net/sample_airbnb?retryWrites=true&w=majority";


        const client = new MongoClient(uri);

        try {
            // Connect to the MongoDB cluster
            await client.connect();

            await findByName(client, req.body.name);

            return res.send(result);

        } finally {
            // Close the connection to the MongoDB cluster
            await client.close();
        }
    }

    main().catch(console.error);

    /**
     * Print an Airbnb listing with the given name
     * Note: If more than one listing has the same name, only the first listing the database finds will be printed.
     * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
     * @param {String} name The name of the listing you want to find
     */
    async function findByName(client, name) {
        const result = await client.db("sample_airbnb").collection("places").findOne({ name: name });

        if (result) {
            return res.send(result);
        } else {
            console.log(`No listings found with the name '${name}'`);
        }
    }

});

//UPDATE

router.put('/', async (req, res) => {

    async function main() {

        const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/sample_airbnb?retryWrites=true&w=majority";

        const client = new MongoClient(uri);

        try {
            // Connect to the MongoDB cluster
            await client.connect();

            // Make the appropriate DB calls

            // UPDATE
            // Print the Infinite Views listing
            await findListingByName(client, "Infinite Views");
            // Update the Infinite Views listing to have 6 bedrooms and 8 beds 
            await updateListingByName(client, "Infinite Views", { bedrooms: 6, beds: 8 });
            // Print the updated Infinite Views listing
            await findListingByName(client, "Infinite Views");


        } finally {
            // Close the connection to the MongoDB cluster
            await client.close();
        }
    }

    main().catch(console.error);

    /**
     * Update an Airbnb listing with the given name
     * Note: If more than one listing has the same name, only the first listing the database finds will be updated.
     * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
     * @param {string} nameOfListing The name of the listing you want to update
     * @param {object} updatedListing An object containing all of the properties to be updated for the given listing
     */
    async function updateListingByName(client, nameOfListing, updatedListing) {
        const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({ name: nameOfListing }, { $set: updatedListing });

        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
}),


    // DELETE

    router.delete('/', async (req, res) => {

        async function main() {
            const uri = "mongodb+srv://root:1234@coletaseletiva.kbpm7.mongodb.net/coletaSeletiva?retryWrites=true&w=majority";


            const client = new MongoClient(uri);

            try {
                // Connect to the MongoDB cluster
                await client.connect();

                // DELETE ONE
                // Delete the "Cozy Cottage" listing
                await deleteByName(client, req.body.name);


            } finally {
                // Close the connection to the MongoDB cluster
                await client.close();
            }
        }

        main().catch(console.error);

        /**
         * Delete an Airbnb listing with the given name.
         * Note: If more than one listing has the same name, only the first listing the database finds will be deleted.
         * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
         * @param {string} nameOfListing The name of the listing you want to delete
         */
        async function deleteByName(client, nameOfListing) {
            const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteOne({ name: nameOfListing });
            console.log(`${result.deletedCount} document(s) was/were deleted.`);
        }



    })

module.exports = router;


