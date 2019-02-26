@echo off

echo.
echo Loading App ^& Installing Packages...
echo.

cd app\ && call yarn

echo.
echo _______________________________________________
echo.
echo Packages Installed Successfully.
echo.
echo _______________________________________________
echo.
echo Start the app using the following command:
echo cd app && yarn start
echo.
echo _______________________________________________
echo.

pause
