@echo off
echo ========================================
echo    Push WhatsApp Bot to GitHub
echo ========================================
echo.

echo Setting up Git credentials...
git config user.name "dewanggaeka"
git config user.email "dewanggaeka@users.noreply.github.com"

echo.
echo Adding all files to Git...
git add .

echo.
echo Committing changes...
git commit -m "Initial commit: WhatsApp bot with Baileys library and comprehensive documentation"

echo.
echo Pushing to GitHub...
echo Please enter your GitHub credentials when prompted:
echo Username: dewanggaeka
echo Password: [Your GitHub Personal Access Token]
echo.

git push -u origin master

echo.
echo ========================================
echo    Push completed!
echo ========================================
echo.
echo Your repository is now available at:
echo https://github.com/dewanggaeka/base-baileys-whatsapp
echo.
pause
