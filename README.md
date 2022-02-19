## Deploy
### To Test It Locally

* Run ```npm install``` to install all the necessary dependencies.
* Run ```npm run local``` use serverless offline to test locally. 

### Deploy on AWS, simply run:

```
$ npm run deploy

# or

$ serverless deploy
```

it will result something like this:
```
  POST - https://xxxxxx.execute-api.eu-west-2.amazonaws.com/dev/questions
  GET - https://xxxxxx.execute-api.eu-west-2.amazonaws.com/dev/questions
  GET - https://xxxxxx.execute-api.eu-west-2.amazonaws.com/dev/questions/{id}
  PUT - https://xxxxxx.execute-api.eu-west-2.amazonaws.com/dev/questions/{id}
```


## Usage

You can create, retrieve, update, or delete questions with the following commands:

### Create a Todo

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/questions --data '{ "text": "Learn Serverless" }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"answered":false,"updatedAt":1479138570824}%
```

### List all questions

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/questions
```

Example output:
```bash
[{"text":"Deploy my first service","id":"ac90feaa11e6-9ede-afdfa051af86","answered":true,"updatedAt":1479139961304},{"text":"Learn Serverless","id":"206793aa11e6-9ede-afdfa051af86","createdAt":1479139943241,"answered":false,"updatedAt":1479139943241}]%
```

### Get one Todo

```bash
# Replace the <id> part with a real id from your questions table
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/questions/<id>
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"answered":false,"updatedAt":1479138570824}%
```

### Update a Todo

```bash
# Replace the <id> part with a real id from your questions table
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/questions/<id> --data '{ "text": "Learn Serverless", "answered": true }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"answered":true,"updatedAt":1479138570824}%
```
