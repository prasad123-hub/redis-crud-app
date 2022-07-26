# REDIS TUTORIAL

## STEPS TO FOLLOW

- npm init -y
- make "type" : "model" in `package.json`
- install packages
  - express
  - nodemon
  - cores
  - redis-om
- connecting to redis cloud
- created new database with redis stack on redis cloud

## RediSearch

- in terminal type -[ redis-cli -u `<endpoint>`] (endpoint from redis cloud)
- redisSerach for querying the DB
- FT.CREATE myIndex ON JSON PREFIX 1 User: SCHEMA name TEXT email TEXT active NUMERIC
  8] FT.SEARCH myIndex

## RedisInsight GUI

we can see all about our DB in GUI. Just take url from endpoint and Port no from endpoint as well
