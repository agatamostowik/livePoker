# Live Casino Hold'em

![](./image.png)

Casino Hold'em is a thrilling version of five-card Poker where player compete against the house. The objective is to surpass the dealer's hand by forming the strongest possible five-card hand using the two cards dealt to the player and the five community cards.

See a short demo on YouTube:

[![YouTube demo](https://img.youtube.com/vi/zySDPhSpRvg/1.jpg)](https://www.youtube.com/watch?v=zySDPhSpRvg)

### How to use it?

The application can be used from two perspectives (depending on the user's role - dealer or player).

As a Dealer:

1. Go to: [https://livepoker-production.up.railway.app/](https://livepoker-production.up.railway.app/).
2. Signin with credentials:
   email: `dealer@example.com`
   password: `qwerty`
3. Create a Room.

As a Player:

1. Go to: [https://livepoker-production.up.railway.app/](https://livepoker-production.up.railway.app/).
2. Signin with credentials:
   email: `player@example.com`
   password: `qwerty`
3. Wait for dealer to create room

### How do I start the app locally?

1. Run npm install in the root folder. It will create a monorepo for both client and server.

```
npm run install
```

3. Start project in the root folder.

```
npm run dev
```

### Stack

- Typescript
- React
- Styled-Components
- Redux Toolkit
- Node.js
- WebRTC
- WebSockets
