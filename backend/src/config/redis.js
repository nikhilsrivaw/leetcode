const {createClient} = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS ,
    socket: {
        host: 'redis-15834.c74.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 15834
    }
});

module.exports= redisClient; 