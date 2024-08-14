### Better Money Invest API

This API aims to simulate a simple investment brokerage system. I created this API to learn NestJS and practice my TypeScript knowledge. The first version of this project is under development.

The primary challenges I've encountered so far relate to user and admin authentication/authorization, as security is paramount in this type of system. Another challenge has been modularizing the application, which required significant effort to distribute responsibilities sensibly across each service and module.

To resume a little this project, we have five modules: admin (broker system admin operations), auth (auth and autorization logic), database (operations in database, typeorm configuration and in the development, the sqlite db file), products (all the investment products and the logic to interact with them) and user (broker users operations). As i described in some of them, we have the business logic related to each of them in their modules.\
The admin can register, login, search all clients, update clients and insert products in the products table of the database. 
The user can register, login, apply/withdraw funds of his account, buy investments, get information of all the broker products, get all his investments, get information of one specific investment and sell investments.\
The product module offers operations to insert products in products table on the database and get all the products.
The database module offers operations to search, save and update entitys, and with the use of generics of the TypeScript, the operations can be used in all the application.\
The auth module offers operation to authenticate, authorized and hash passwords.\
The application used features of the NestJS and some of them was pipes, decorators and Data Transfer Object(DTO) in the requests.

To date, I've learned about NestJS's CRUD operations, security features, and TypeORM integration.

## Contents Table
* [Tools](#Tools)
* [Architecture](#architecture)
* [Features](#features)
* [Instructions](#instructions)

## Tools

In this project, i used NestJS (framework of NodeJS), TypeORM to ORM operations with database, SQLite in the development (It isn't going to be the deployment database), JWT token as the identifier of the user/admin after authentication and TypeScript, bcrypt to hash the passwords before going to database and TypeScript language.

## Architecture

I initially became interested in NestJS due to its use in the backend of my university study group's website, GTHC (Green Team Hacker Club). I appreciated its modular architecture, reminiscent of Angular, which divides the application into smaller, manageable components, promoting clean separation of concerns. As I learned TypeScript basics, I could effectively work with NestJS because of its built-in language support, allowing me to utilize types, interfaces, and decorators.

While exploring the documentation and working with NestJS, I discovered its powerful dependency injection system, which aids in managing the lifecycle of application components and enhances code testability and maintainability. This motivated me to distribute responsibilities optimally to leverage this system. NestJS's use of decorators for routes, middleware, and other functionalities improves code readability and comprehension.

I'm still learning about NestJS, so this is a brief summary of my work thus far. Upon releasing the first version, I'll update this README to provide more details about my NestJS learning journey.

## Features

You can acess the basic swagger documentation by writing down this path on your browser http://localhost:3000/swagger. This feature is still under work. 

## Instructions

To run the API:

Clone this repository\
Execute npm install in the terminal to install the project dependecies\
Create a .env file in the root of the folder project and assing a value to SECRET = "secret for the jwt token"\
Run npm run start to start the project