# sos-somebody-rescue-me-
Owner avatar sos-somebody-rescue-me 

# The Whole system basically mimics an emergency helpline but mainly for campus students.

- The system is designed to operate both offline and online
- This makes sure that the system is fully available to its end users whenever needed.

# architecture
- Whole backend systtem runs a NodeJs runtime that contains a HttpServer
    - Online System
        - Use a Rest Api exposed by the backend of the system
            - Admin dashboard consumes (json)
                - Bootstrap Css(UI)
                    - JQuery , Axios,...
            - Client App consumes (json)
                - Kotlin + Jetpack Compose(UI)
                    - Ktor, Room, Coroutines
    - Offline System
        - Ussd application (Africastalking nodejs sdk)
            - Accompanied with voice services
                - SMS services to convoy messages
                - share live location
                - priority calls

# The Africastalking (at) Api
- So resourceful and easy API offered by africastalking that allows you to access services like ussd, voice and sms. This allows your products to get consumed by a lagger population at anytime (24/7)
- The main system(offline) runs a ussd application. Exposing menus that allow the user to interact with the application. Depending on the menu they are in users might be asked for one or more input  that us then manipualted to generate more output.
- The SMS systems is used to convey important messages that can be used daily for example dosages, reminders, financial reports, health reportss among other tools.
# Live location access online/offline
- Under rapid APIs there are many Apis that allow you to access your live locations and using it in the backend allows for realtime update in the offline application
- for the mobile application it might use a librirary such as google maps api from ``console.cloud.google.com`` whilist showing some of those who dont know how to intergrate it how to do so ```TODO:1```
- for the web application it can fetch eithr using the maps sdk, live API services and the database values. Using this thrree value if there is  a difference we do the average so as to easliy pinpoint the location fo the individual.
# Database services
- The data is stored in a non-relational structure by the use of Collections, Documents and the likes.
- Data is kept in a hireachical manner which makes it easier for the application parameters to grow as the existing nodes can have children.
- Am using a provider ```mongodb``` with the help of an ORM tool ```Mongoose``` that provides access to the datasource by the use of a Link.

# Jetpack Compose 
- modern UI toolkit for creating declarative Ui widgets known as composables and rendering them to the screen.
- I will mainly use Android, and the Kotlin language (as its is the primary language for jetpack).

# Kotlin, Room , Coroutines
- Room is a in-app database that gives you the ability to catch your moslty accessed appp data for future use.
- Coroutines are a way that allows one to achieve asynchronous programming in Kotlin. They are lighter threads, that can exist in various Environments (IO, BACKGROUND,..).
- Kotlin is a modern null safe programming language. designed on top of Java and made powerful with coroutines. Can be used in both web, android and IoS.



# Project is Open to Contributions 