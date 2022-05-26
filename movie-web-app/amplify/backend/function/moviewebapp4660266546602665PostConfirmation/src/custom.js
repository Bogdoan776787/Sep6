var aws = require('aws-sdk')
var ddb = new aws.DynamoDB()

exports.handler = async (event, context) => {
    let date = new Date()
    
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
            
            await ddb.putItem(params).promise()
            
            
        } catch (err) {
            
            
        }
        
        
        context.done(null, event)

    } else {
        
        context.done(null, event)
    }
};