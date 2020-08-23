# Device Tracking Application with Node.js and MongoDB

## Prerequisites

Make sure you have installed prerequisites on your machine:

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Install

    $ cd track_device/
    $ npm install

## Running Node.js Application

    $ node app.js

## Responses

An invalid request is submitted, or some other error occurs, it returns a JSON response in the following format:

```json
{
  "message": string,
  "success": 0
}
```

If a request is successfully submitted, it returns a JSON response in the following format:

```json
{
  "data": data,
  "success": 1
}
```

The `message` attribute contains a message commonly used to indicate errors or, in the case of successful or not.
The `success` attribute describes if the transaction was successful or not.
The `data` attribute contains data associated with the response.

## Usage

- Requests will be made to the Restful API.
- Port: 7001

### 01 `GET` /login

API for login: `http://localhost:7001/api/v1/login`
Request Headers:

- account: `account`
- app_key: `app_key`

Response body:

```json
{
  "success": 1,
  "message": "Authentication successful!",
  "token": "eyJhbGciOiJIUzI1NiIsXVCJ9.eyKNdodnnfjsisdbvkgJ"
}
```

### 02 `GET` /devices

API to get all devices: `http://localhost:7001/api/v1/devices`.

```json
{
  "success": 1,
  "data": [
    {
      "_id": "5c4592a043ecb6530de638ae",
      "id": "A451",
      "imei": "000011112222",
      "sim": "21",
      "tel": "9706",
      "createdAt": "2019-01-21T09:36:32.077Z",
      "client": "flipp"
    }
  ]
}
```

Response body (If device is not present):

```json
{
  "success": 1,
  "data": []
}
```

### 03 `GET` /devices/locations

API to get device's locations: `http://localhost:7001/api/v1/devices/locations?device_id=A451&page_number=1`.

```json
{
  "success": 1,
  "halt_count": 2,
  "data": [
    {
      "_id": "5ed01261a8e5315b06d0cc31",
      "input": "78780b2380017504000202bb7af70d0a",
      "tag": "Packet",
      "case": "23",
      "time": "2020-05-28T19:34:57.819Z",
      "terminalInfo": {
        "ignition": false,
        "gps_tracking": false,
        "charging": false,
        "acc": false,
        "defense": false
      },
      "voltage": 3.73,
      "battery": 20,
      "gsmStrength": "Strong signal",
      "language": "English",
      "info_serial_no": 699,
      "output": "7878052302026e740d0a",
      "imei": "889535",
      "socket": "::ffff:223.180.221.35:44929",
      "device": "A451",
      "client": "plus",
      "gps": [29.79506888888889, 77.94141333333333],
      "createdAt": "2020-05-28T19:34:57.822Z"
    }
  ]
}
```

Response body (If device is not present):

```json
{
  "success": 0,
  "message": "Please check the device id"
}
```
