const CosmosClient = require('@azure/cosmos').CosmosClient


var config = {}

config.endpoint = 'https://cosmos-db-sensor.documents.azure.com:443/'
config.key = 'IRLJML11f7JaIxVstGsax6qsHX4YteoJ9rBFZby1aH1s2xuB16eOLVtzWCkxOvrlq2lap6GyLRmmpbUaJhdUxg=='

config.database = {
  id: 'iot'
}

config.container = {
  id: 'messages'
}


const url = require('url')

const endpoint = config.endpoint
const key = config.key

const databaseId = config.database.id
const containerId = config.container.id
const partitionKey = { kind: 'Hash', paths: ['/partitionKey'] }

const options = {
      endpoint: endpoint,
      key: key,
      userAgentSuffix: 'CosmosDBJavascriptQuickstart'
    };

const client = new CosmosClient(options)

async function queryContainer() {
    console.log(`Querying container:\n${config.container.id}`)
  
    // query to return all children in a family
    // Including the partition key value of country in the WHERE filter results in a more efficient query
    const querySpec = {
      query: 'SELECT * FROM root r',
      parameters: [
        
      ]
    }
  
    const { resources: results } = await client
      .database(databaseId)
      .container(containerId)
      .items.query(querySpec)
      .fetchAll()
    for (var queryResult of results) {
      let resultString = JSON.stringify(queryResult)
      return resultString
    //   console.log(`\tQuery returned ${resultString}\n`)
    }
}
module.exports = async function (context, req) {
    // context.log('JavaScript HTTP trigger function processed a request.');

    // const name = (req.query.name || (req.body && req.body.name));
    // const responseMessage = name
    //     ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    //     : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    const responseMessage = await queryContainer()
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}