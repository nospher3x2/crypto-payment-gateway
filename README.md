# Crypto Payment Gateway

A simple payment gateway for the most common cryptocurrencies (BTC, ETH, LTC). It allows users to make payments using their cryptocurrency wallets.

## Installation

```bash
$ pnpm install
```

Rename the `.env.example` file to `.env` and fill in the required environment variables.

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Usage
The server is available at `http://localhost:3000`  (Or in the port that you set in the `.env` file).

### Enums:
#### Currency
 - `BTC`: Bitcoin
 - `ETH`: Ethereum
 - `LTC`: Litecoin

#### OrderStatus
 - `PENDING`: The payment is pending.
 - `PROCESSING`: The money was received but waiting for confirmations.
 - `PARTIAL_RECEIVED`: The money was received but it's not the full amount. The user can still pay the remaining amount.
 - `COMPLETED`: The payment was successful.
 - `EXPIRED`: The payment is expired.
 - `FAILED`: The payment is failed.

### Endpoints:
All endpoints require `X-API-KEY` header with the value `API_KEY` that is defined in the `.env` file.

- #### GET /api/orders
Get a list of all the orders.

Parameters:
- `page`: The page number to retrieve. Defaults to 1.
- `limit`: The number of orders to retrieve per page. Defaults to 10.
- `currency`: Optional. The currency to filter by.
- `status`: Optional. The status to filter by.
#### Example response:
```json
[
  {
    "order": {
      "id": "random-uuid",
      "status": "PENDING", 
      "currency": "BTC", 
      "amount": 1000,
      "confirmations": 2,
      "description": "Buy some coffee",
      "address": "wallet address to send the payment to",
      "expiresAt": 1234567890,
      "externalId": "order-12345"
    },
    "payment": {
      "confirmations": 1,
      "received": 0,
      "transactions": [
        {
          "txid": "txid",
          "confirmations": 1,
          "amount": 1000,
          "from": "wallet address",
        }
      ]
    }
  }
]
```

- #### POST /api/orders
Create a new order.
##### Example body:
```json
{
  "currency": "BTC",
  "amount": 1000,
  "confirmations": 2,
  "description": "Buy some coffee",
  "expiresAt": 1234567890,
  "externalId": "order-12345"
}
```

##### Example response:
```json
{
  "id": "random-uuid",
  "status": "PENDING",
  "currency": "BTC",
  "amount": 1000,
  "confirmations": 2,
  "description": "Buy some coffee",
  "address": "wallet address to send the payment to",
  "expiresAt": 1234567890,
  "externalId": "order-12345"
}
```

- #### GET /api/orders/:id
Get an order by its ID.
##### Example response:
```json
{
  "id": "random-uuid",
  "status": "PENDING",
  "currency": "BTC",
  "amount": 1000,
  "confirmations": 2,
  "description": "Buy some coffee",
  "address": "wallet address to send the payment to",
  "expiresAt": 1234567890,
  "externalId": "order-12345",
  "payment": {
    "confirmations": 1,
    "received": 0,
    "transactions": [
      {
        "txid": "txid",
        "confirmations": 1,
        "amount": 1000,
        "from": "wallet address",
      }
    ]
  }
}
```

- #### PATCH /api/orders/:id/status/:status
Update the status of an order.

Parameters:
- `id`: The ID of the order to update.
- `status`: The new status of the order.

If the order is already in the new status, the request will be ignored. 

- #### DELETE /api/orders/:id
Cancel an order by its ID.

Parameters:
- `id`: The ID of the order to cancel.

The order will be marked as `CANCELED` and the payment will be cancelled.


## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.