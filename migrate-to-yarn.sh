#!/bin/bash

echo "🔁 מסיר node_modules ו-package-lock.json..."
rm -rf node_modules package-lock.json

echo "📦 מתקין yarn גלובלית (אם לא קיים)..."
npm install -g yarn

echo "📄 מתקין תלויות עם yarn..."
yarn install

echo "🧹 מוסיף package-lock.json ל-.gitignore (אם עדיין קיים)..."
if ! grep -q "package-lock.json" .gitignore 2>/dev/null; then
  echo "package-lock.json" >> .gitignore
fi

echo "✅ מוכן! עכשיו אפשר להריץ 'yarn dev' כדי לבדוק שהכול תקין."

echo ""
echo "📝 טיפ: אל תשכח לבצע push ל-git:"
echo "    git add . && git commit -m 'chore: migrate from npm to yarn' && git push"
