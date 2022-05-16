var aws = require('aws-sdk')
var ddb = new aws.DynamoDB()

exports.handler = async (event, context) => {
    let date = new Date()
    console.log(date)
    if (event.request.userAttributes.sub) {
        let params = {
            Item: {
                'UserId': {S: event.request.userAttributes.sub},
                '__typename': {S: 'User'},
                'username': {S: event.userName},
                'email': {S: event.request.userAttributes.email},
                'photo':{S:""},
                'createdAt': {S: date.toISOString()},
                'updatedAt': {S: date.toISOString()},
            },
            TableName: "Users"
        }

        try {
            console.log(params)
            await ddb.putItem(params).promise()
            console.log("Success")
            console.log("AFTER SUCCESS")
        } catch (err) {
            console.log("THERE IS AN ERROR")
            console.log("Error", err)
        }
        console.log("AFFTER TRY")
        console.log("Success: Everything executed correctly")
        context.done(null, event)

    } else {
        console.log("Error: Nothing was written to DynamoDB")
        context.done(null, event)
    }
};