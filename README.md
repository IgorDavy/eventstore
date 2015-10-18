### Description
L’application permet de récupérer les différents évènements javascript (conférences, meetups, workshops) à venir dans différents pays.

### Features
Toutes les 24 heures, l’application vérifie la présence de nouveaux évènements javascript à partir du site Lanyrd (http://lanyrd.com/topics/javascript/) et met à jour une base de données qui sera utilisée par l'api.

L'application se lance sur le port 3000, l'addresse local est http://localhost:3000/api/events

L’api de l’application expose une ressource `events`. Elle est accessible via le chemin `/api/events` :

- `GET /api/events`: Renvoie la liste de tous les prochains évènements disponibles
- `POST /api/events` --> Créer un nouvel évènement à partir des données passées dans le corps de la requête
- `GET /api/events/:id` --> Renvoie l'évènement correspondant à l’identifiant donné en paramètre
- `PUT /api/events/:id` --> Met à jour l'évènement correspondant à l’identifiant donné en paramètre, avec les données passées dans le corps de la requête
- `DELETE /api/events/:id` --> Supprime l'évènement correspondant à l’identifiant donné en paramètre

### Format d'un événement
```
event {
name (string),
country (string),
city (string),
date (string),
dateEnd (string, optional),
tags (array[string], optional),
id (objectid, optional)
}
```


#Installation et lancement pour Linux
Testé sur la distributions Ubuntu

### Installer Node.js et Npm
```sh
sudo apt-get install nodejs npm
sudo ln -s /usr/bin/nodejs /usr/bin/node
```

### Télécharger l'application
Cliquer sur "Download Zip"

Extraire eventstore-master.zip

### Installer les dépendances
Ouvrir un terminal

Se placer dans le repertoire eventstore-master contenant l'application
```sh
sudo npm install
```

### Installer mongodb et lancer le service
```sh
sudo apt-get install mongodb
sudo service mongod start
```

### Modifier le fichier server/datasources.json si besoin
```
{"host": "127.0.0.1", 
"database": "eventstore", 
"username": User, 
"password": Password, 
"port": 27017} 
```
### Installer forever :
```sh
sudo npm install -g forever
```

### Lancer l'application :
```sh
forever start -l ${PWD}/logs/out.log server/server.js
```

#Installation et lancement pour Windows
Testé sur Windows 8

###Installer nodejs
https://nodejs.org/dist/v4.2.1/node-v4.2.1-x64.msi

###Installer mongodb
https://www.mongodb.org/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.0.7-signed.msi/download

###Lancer le service mongod	
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/

### Télécharger l'application
Cliquer sur "Download Zip"

Extraire eventstore-master.zip

###Installer les dépendances
Lancer le terminal Node.js

Se placer dans le repertoire eventstore-master contenant l'application

Lancer la commande
```sh
npm install
```

###Installer forever
```sh
npm install -g forever
```

###Lancer l'application avec forever
```sh
forever start -l %CD%\logs\out.log server\server.js
```
