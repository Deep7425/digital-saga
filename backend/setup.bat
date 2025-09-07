@echo off

REM Install dependencies
npm install

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    (
        echo DB_HOST=localhost
        echo DB_PORT=3306
        echo DB_USERNAME=root
        echo DB_PASSWORD=
        echo DB_DATABASE=digital_saga
        echo NODE_ENV=development
    ) > .env
)

REM Start the application
npm run start:dev 