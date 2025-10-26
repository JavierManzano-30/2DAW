@echo off
echo ============================================
echo  Deteniendo WordPress con Docker
echo ============================================
echo.

docker-compose down

echo.
echo Contenedores detenidos correctamente.
echo.
echo Si deseas eliminar también los datos (volúmenes), usa:
echo   docker-compose down -v
echo.
pause
