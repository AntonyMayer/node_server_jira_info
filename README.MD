## Start server ##

 `npm run dev`

## Start mongoDB ##

 `mongod --port 27017 --dbpath=./data`

## DB url ##

 `mongodb://localhost:27017/jiraStat`

### Notes ###

Using **D3** to display data;


## How it works ##

**JiraCLIapp** ---- *POST JSON* -----> **Node Express**
                                   ||
                        *Forwarding JSON to Browser*
                                   ||
**Browser** ======================= **Websocket**
*Display*
*Data*