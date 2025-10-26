@echo off
echo ============================================
echo  Despliegue de WordPress con Docker
echo ============================================
echo.

REM Verificar que Docker está corriendo
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker no está corriendo o no está instalado.
    echo Por favor inicia Docker Desktop y vuelve a intentar.
    pause
    exit /b 1
)

echo [1/5] Verificando Docker...
echo Docker está funcionando correctamente.
echo.

echo [2/5] Creando red Docker personalizada...
docker network create wordpress_network 2>nul
if %errorlevel% equ 0 (
    echo Red 'wordpress_network' creada exitosamente.
) else (
    echo La red ya existe o hubo un error.
)
echo.

echo [3/5] Desplegando MariaDB...
docker-compose up -d db
if %errorlevel% neq 0 (
    echo ERROR al desplegar MariaDB.
    pause
    exit /b 1
)
echo.

echo [4/5] Esperando a que MariaDB esté listo...
timeout /t 10 /nobreak >nul
echo.

echo [5/5] Desplegando WordPress...
docker-compose up -d wordpress
if %errorlevel% neq 0 (
    echo ERROR al desplegar WordPress.
    pause
    exit /b 1
)
echo.

echo ============================================
echo  Despliegue completado!
echo ============================================
echo.
echo WordPress está disponible en: http://localhost:8080
echo.
echo Comandos útiles:
echo   - Ver logs: docker-compose logs -f
echo   - Detener: docker-compose down
echo   - Ver contenedores: docker ps
echo.
pause
