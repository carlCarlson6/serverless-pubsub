# SERVERLESS PUBSUB

A service to be able to follow the PubSub pattern on serveless environments. Mainly a copy of [QSTASH](https://upstash.com/docs/qstash/overall/getstarted) by [UPSTASH](https://upstash.com/) for learning and practice propurses.

It is based on two main pieces of code/infrastucture:
1. [ts-node/bus](https://github.com/node-ts/bus) as the messaging library where a custom transport for Azure Storage Account Queues is implemented.
2. [Azure Storage Account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview) as the main infrastructure piece to:
    - publish and store messages (Queues),
    - store configurations and messages delivery status (Tables)

Take the code, modify it, deploy it, play around with it and have fun as you will.