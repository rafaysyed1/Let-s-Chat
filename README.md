VChat Application

VChat is a real-time chat application built using Socket.IO. It provides a simple yet effective platform for users to communicate instantly with each other.

Features

- Real-time Communication: VChat uses Socket.IO to enable real-time, bidirectional communication between clients and the server.
- Typing Indicator: If a user is typing a message, a typing indicator is displayed to notify other users that the sender is composing a  message.
- Long message typing Indicator: If a user is typing a long message more than 50 words, a typing indicator is displayed to notify other users that the sender is composing a lengthy message.
- Online Indication : If a user is just connected but not typing it says User is online
- Username Change : A user can change his name seamlessly
- Confusion Detection: For fun, VChat incorporates a feature to detect when a user is cutting and pasting several times in succession, displaying a "User is confused" message.

Usage

To use VChat, follow these steps:

1. Clone the repository:

git clone https://github.com/rafaysyed1/VChat.git

2. Install dependencies:
   You can install the dependencies by running the command : npm i

3. Start the server:
  You can start the server by running the command : npm run dev

4. Open your browser and navigate to `http://localhost:4000` to access the VChat application.

Upcoming Features
- Seperate Frontend and Backed as React as Frontend.
- Seperate one to one chat feature
- Chat saving functionality(Database Attachment)
- User Profile Management


Contributors

- Syed Muhammad Rafay Hassni (GitHub: [rafaysyed1](https://github.com/rafaysyed1))
