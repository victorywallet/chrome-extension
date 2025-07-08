export class WebSocketClient {
    constructor(url) {
        this.wssUrl = url;
        this.pendingRequests = new Map(); // Track request callbacks
        this.subscriptions  = new Map(); // Track Subscription 
        this.isConnected = false;
        this.internalId = 1
    }


    connect() {
        this.ws = new WebSocket(this.wssUrl);

        // Handle connection open
        this.ws.onopen = () => {
            this.isConnected = true;
            console.log('WebSocket connected');
        };

        // Handle incoming messages
        this.ws.onmessage = (event) => {
            try {
                const response = JSON.parse(event.data);
                //console.log(response)

                if(response.method=="eth_subscription"){
                    
                    const subId = response.params.subscription

                    if(this.subscriptions.has(subId)) {
                        this.subscriptions.get(subId).callback(subId, response.params.result)
                    }
                    else {
                        console.log("subscription NOT FOUND")
                    }
                }
                else {
                    const requestId = Array.isArray(response) ? response[0].id : response.id; // Assume server includes requestId

                    if (this.pendingRequests.has(requestId)) {
                        const { resolve } = this.pendingRequests.get(requestId);
        
                        if(Array.isArray(response)) {

                        }
                        else {
                            response.id = requestId.split("-")[0] // to original id
                        }
                        resolve(response);
                        this.pendingRequests.delete(requestId);
                    }
                    else {
                        console.log("requestId NOT FOUND")
                    }
                }

            } catch (error) {
                console.error('Failed to parse response:', error);
            }
        };

        // Handle errors
        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.pendingRequests.forEach(({ reject }) => reject(new Error('WebSocket error')));
            this.pendingRequests.clear();
        };

        // Handle connection close
        this.ws.onclose = () => {
            this.isConnected = false;
            console.log('WebSocket disconnected');
            this.pendingRequests.forEach(({ reject }) => reject(new Error('WebSocket disconnected')));
            this.pendingRequests.clear();
        };
    }


    disconnect() {
        this.subscriptions.forEach((v,k)=> 
            this.request({
                method: "eth_unsubscribe",
                params: [k]              
            }))
    }

    // Function to send request
    request(message) {

        return new Promise(async (resolve, reject) => {

            if(Array.isArray(message) && message.length>0) {
                message[0].id = (message[0].id ?? this.internalId) + "-" + (this.internalId++)
                this.pendingRequests.set(message[0].id, { resolve, reject });
            }
            else {
                message.id = (message.id ?? this.internalId) + "-" + (this.internalId++)
                this.pendingRequests.set(message.id, { resolve, reject });
            }

            if (!this.isConnected) {
                this.connect();
            }
            
            // wait connection
            while(this.ws.readyState != WebSocket.OPEN) {
                console.log("wait cnx",this.ws.readyState)
                await new Promise(r => setTimeout(r, 50));
            }

            // Send request to api/test endpoint
            this.ws.send(JSON.stringify(message));            
        });
    }

    subscribe(params, callback) {
        return new Promise(async (resolve, reject) => {
            this.request({
                method: "eth_subscribe",
                params              
            })
            .then(p => {
                console.log(p)
                this.subscriptions.set(p.result,{callback})
                resolve(p)
            })
            .catch(e=>console.log(e))
        })
    }

    // Optional: Method to close the connection manually
    close() {
        this.ws.close();
    }
}

