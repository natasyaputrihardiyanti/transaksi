# Membuat basic CRUD melalui API dengan Node.Js

## Instalasi
1. Clone / Download repo ini
2. Masuk ke folder repo ini. Ex: `cd api-crud`
3. Instal node module dengan command `npm install`
4. Jalankan aplikasi dengan command `node server` atau `nodemon server`

## Step-by-step of Develpment
1. Siapkan database pada mysql
2. Siapkan tabel `posts` pada database dengan kolom sebagai berikut
   * id => bigInteger, PrimaryKey, AutoIncrement
   * title => varchar(255)
   * content => bigText
   * created_at => default(current_timestamp())
3. Buat folder baru dengan nama api-crud
4. Jalankan command `npm init`
5. Install express, mysql, body-parser `npm install --save express mysql body-parser`
6. Buat file `server.js`
7. Buat file `routes.js`
8. Buat file `controller.js`
9. Buat file `conn.js`
10. Buat file `res.js`