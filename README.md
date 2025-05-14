# Database tables

## 🏋️‍♂️ Schéma UML - Application Entraîneur Sportif

### 🧑‍🏫 Table `users`

- `id` (PRIMARY KEY)
- `nom`
- `image`
- `email`
- `password` (haché)
- `type_compte` (freemium ou premium)
- `role` (amateur ou pro)
- `created_at`
- `updated_at`

### 🧍 Table `clients`

- `id` (PRIMARY KEY)
- `nom`
- `prenom`
- `email`
- `sexe` (homme, femme, autre)
- `photo`
- `age`
- `objectif`
- `created_at`
- `user_id` (FOREIGN KEY vers `users.id`)

### 📏 Table `mensurations`

- `id` (PRIMARY KEY)
- `date_mesure`
- `poids`
- `taille`
- `tour_biceps`
- `tour_poitrine`
- `tour_taille`
- `tour_cuisse`
- `user_id` (FOREIGN KEY vers `users.id`)
- `client_id` (FOREIGN KEY vers `clients.id`)

### 🔗 Relations

2- Un **user** possède plusieurs **clients**
- Un **user** enregistre plusieurs **mensurations**
- Un **client** possède plusieurs **mensurations**

- voici un test
