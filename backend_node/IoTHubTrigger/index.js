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

async function createFamilyItem(itemBody) {
    const { item } = await client
      .database(databaseId)
      .container(containerId)
      .items.upsert(itemBody)
    console.log(`Created family item with id:\n${itemBody.id}\n`)
}
  
module.exports = function (context, IoTHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array: ${IoTHubMessages}`);
    
    IoTHubMessages.forEach(message => {
        context.log(`Processed message: ${message}`);
        createFamilyItem(message)
    });

    context.done();
};