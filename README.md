# Aplicación web de gestión de biblioteca

Proyecto basado en los lineamientos de la **Actividad 2° Parcial** y la guía **MasdeuMaximo**:
- Arquitectura en **Capas + MVC**.
- Backend: **Node 20 + Express + PostgreSQL 15**.
- Frontend: **React 18**.
- Patrones: *Factory Method*, *Adapter/Facade*, *Observer*.
- Buenas prácticas: legibilidad, refactorización continua, KISS, DRY, control de versiones, estándares de codificación y gestión de dependencias.

## Estructura
```
backend/
  src/
    index.js
    routes/
      libros.js
      socios.js
      prestamos.js
    controllers/
      librosController.js
      sociosController.js
      prestamosController.js
    db/
      conexion.js
      migrations/
        001_init.sql
  .env.example
  package.json

frontend/
  index.html
  package.json
  vite.config.js
  src/
    main.jsx
    App.jsx
    pages/
      Libros.jsx
      Socios.jsx
      Prestamos.jsx
    components/
      Tabla.jsx
      Boton.jsx
    services/
      api.js

.github/workflows/ci.yml
.eslintrc.json
.prettierrc
.editorconfig
.gitignore
LICENSE
```

## Requisitos
- Node 20.x
- PostgreSQL 15.x

## Inicio rápido

### 1) Backend
```bash
cd backend
cp .env.example .env    # Edita DATABASE_URL y PORT
npm install
npm run dev             # modo desarrollo
```
Crea las tablas:
```bash
# conecta a tu PostgreSQL y ejecuta:
psql "$DATABASE_URL" -f src/db/migrations/001_init.sql
```

### 2) Frontend
```bash
cd ../frontend
npm install
npm run dev
```
La app de React quedará en `http://localhost:5173` (por defecto). El backend escucha en `http://localhost:3000` (o el PORT que definas).

## GitHub (paso a paso)
1. Crea un repositorio vacío en GitHub (sin README ni .gitignore).
2. En tu máquina:
```bash
git init
git add .
git commit -m "chore: proyecto base Biblioteca (capas+MVC, React 18, Node 20, PG 15)"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
git push -u origin main
```
3. (Opcional) Habilita **GitHub Actions** y **Dependabot**.

## Notas de diseño
- **Capas**: rutas/controladores (presentación), servicios de dominio (WIP), persistencia (db).  
- **MVC en cliente**: React gestiona vistas y estado, llamadas a API vía `services/api.js`.  
- **Patrones**:
  - *Factory Method*: creación de `Prestamo` centralizada (próximo commit) para validar reglas del negocio.
  - *Facade/Adapter*: punto único para notificaciones externas (email/SMS) si se requiere.
  - *Observer*: hook de alertas para “préstamos vencidos” (WIP).
- **Buenas prácticas**: ESLint+Prettier, scripts de NPM, CI, convención de ramas y mensajes de commit.
- **Gestión de dependencias**: actualizaciones de seguridad prioritarias, documentación en `package.json`, auditoría `npm audit`, eliminación de dependencias no usadas.

---

> Hecho para seguir al pie de la letra la guía de **MasdeuMaximo**. Ajusta los detalles de dominio y UI según tus diagramas.
