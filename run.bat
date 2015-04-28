@ECHO OFF
sc stop ReportServer
start "Wampserver" C:\wamp\wampmanager.exe
set Pathname="%~dp0/Roots"

cd  %Pathname%
grunt watch