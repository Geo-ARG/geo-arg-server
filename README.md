# Alternate-Reality-Game
A game based on React Native and Redux where you can socialize with others at certain area and certain time

## User Stories
* Game Master
    * I can create an event to make the public come and interact with others and set it's rewards
    * I can create one or more quests in the event
    * I can verify whenever users accomplish the quest (or event)
* User
    * I can login to the app using my Facebook or Google+ account
    * I want to know the app features on home screen
    * I want to know the list of available events and it's detailed informations
    * I want to know the events near my current location
    * I want to get information about the list of events that I already completed
    * I want to know the list of quests in the event that I need to accomplished in order to complete the event
    * I want to know the current progress of the event that I joined, so I know how far I am until it's finished
    * I can find another players nearby who also participate in same event, so I can ask and get help from them
    * I want to get notified whenever I enter an event
    * I want to get notified whenever another players are around me

## Endpoints

| Endpoint              |  HTTP  | Description                                            |
|-----------------------|:------:|--------------------------------------------------------|
| /auth/google          |  POST  | Register user via Google                               |
| /auth/facebook        |  POST  | Register user via Facebook                             |
| /auth/users           |   GET  | Get all users data (including location and event)      |
| /auth/users/:id       |   GET  | Get user by UserId (including location and event)      |
| /auth/users           |  POST  | Create new user                                        |
| /auth/users/:id       |   PUT  | Update an user by UserId                               |
| /auth/users/:id       | DELETE | Delete an user by UserId                               |
| /api/event            |   GET  | Get list of events (including quest and user)          |
| /api/event/:id        |   GET  | Get event by EventId (including quest and user)        |
| /api/event            |  POST  | Create new event                                       |
| /api/event/:id        |   PUT  | Update an event by EventId                             |
| /api/event/:id        | DELETE | Delete an event by EventId                             |
| /api/location         |   GET  | Get all locations data (including user)                |
| /api/location/:id     |   GET  | Get location by LocationId (including user)            |
| /api/location         |  POST  | Create new location                                    |
| /api/location/:id     |   PUT  | Update a location by LocationId                        |
| /api/location/:id     | DELETE | Delete a location by LocationId                        |
| /api/quest            |   GET  | Get all quests data                                    |
| /api/quest/:id        |   GET  | Get quest by QuestId                                   |
| /api/quest            |  POST  | Create new quest                                       |
| /api/quest/:id        |   PUT  | Update a quest by QuestId                              |
| /api/quest/:id        | DELETE | Delete a quest by QuestId                              |
| /api/userevent        |   GET  | Get all userevents data                                |
| /api/userevent/:id    |   GET  | Get userevent by UserEventId                           |
| /api/userevent        |  POST  | Create new userevent                                   |
| /api/userevent/:id    |   PUT  | Update an userevent by UserEventId                     |
| /api/userevent/:id    | DELETE | Delete an userevent by UserEventId                     |
| /api/userlocation     |   GET  | Get all userlocations data                             |
| /api/userlocation/:id |   GET  | Get userlocation by UserLocationId                     |
| /api/userlocation     |  POST  | Create new userlocation                                |
| /api/userlocation/:id |   PUT  | Update an userlocation by UserLocationId               |
| /api/userlocation/:id | DELETE | Delete an userlocation by UserLocationId               |
| /api/admin            |   GET  | Get list of admins                                     |
| /api/admin/:id        |   GET  | Get admin data by AdminId                              |
| /api/admin            |  POST  | Create new admin                                       |
| /api/admin/:id        |   PUT  | Update an admin by AdminId                             |
| /api/admin/:id        | DELETE | Delete an admin by AdminId                             |

## Models

![Schema](https://raw.githubusercontent.com/Geo-ARG/geo-arg-server/fadly/assets/ARG-Schema-Ver2.png)
