# WebTech Source Code

This repository contains the solution for a Webbased-Technologies class. In this class, basic technologies related to web development, such as html, css, javascript, webframeworks and backend systems, are taught.

The execises solved can be found in the specification folder. For each exercise this repository has a seperate branch named `prak/no-...`, which serves as a possible solution. The main-branch incorporates all changes.

## Infos

For execise 3: dummy data can be found in the dummy_users.json file. The API documentation can be found under https://online-lectures-cs.thi.de/chat/dummy.

For execise 4: The API documentation can be found under https://online-lectures-cs.thi.de/chat/full.

## Execises
The overall goal is to create a web-based chat-app consisting of frontend and backend, using html, css, js and php.

### No.1 - HTML 
Creation of HTML documents forming the foundation and views of the app.  
Including views should be: Login, Logout, Register, Friends, Chat, Settings, Profile.

### No.2 - CSS
Realisation of a fundamental layout for the app using one central css file.

### No.3 - JavaScript
Realisation of dynamic behaviour through JavaScript for chatting, form-validation and search suggestions.

### No.4 - Angular
Realisation of the Chat-App using the Angular Framework. 

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Build Docker Image

execute 
`docker build -t wtp-chat-angular .`