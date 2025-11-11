# 🛒 Depoteek - Tienda Online Fullstack

Un e-commerce moderno y elegante inspirado en el diseño de Nike, construido con tecnologías web actuales. Esta aplicación permite a los usuarios navegar productos, agregar items al carrito y gestionar sus compras de forma intuitiva.

## 🌟 Características Principales

### ✨ **Experiencia de Usuario**

- **Diseño Responsive**: Se adapta perfectamente a móviles, tablets y escritorio
- **Interfaz Moderna**: Inspirado en Nike con colores elegantes y animaciones suaves
- **Navegación Fluida**: Transiciones seamless entre páginas
- **Carrito Inteligente**: Contador en tiempo real y gestión completa de productos

### 🛍️ **Funcionalidades del E-commerce**

- **Catálogo de Productos**: Catálogo de productos con imágenes optimizadas (WebP)
- **Carrito de Compras**: Agregar, quitar y modificar cantidades de productos
- **Gestión de Stock**: Control de inventario en tiempo real
- **Sistema de autenticación**: Registro y login
- **Gestión de perfil de usuario**
- **Rutas protegidas**: Para usuarios autenticados
- **Cálculo Automático**: Subtotales y total general actualizados instantáneamente

### 🔐 **Seguridad**

- **Contraseñas encriptadas con bcrypt**
- **Autenticación con JWT (JSON Web Tokens)**
- **Validación de datos con Zod**
- **Variables de entorno para credenciales sensibles**
- **Protección CORS configurada**

### 📱 **Diseño Responsivo**

- **Mobile First**: Optimizado para dispositivos móviles
- **Grid Automático**: Los productos se organizan automáticamente según el tamaño de pantalla
- **Touch Friendly**: Botones y controles optimizados para dispositivos táctiles

## 🏗️ Arquitectura del Proyecto

```
depoteek/
├── client/                    # Frontend React
│   ├── public/
│   │   ├── images/           # Imágenes estáticas
│   │   └── logo.svg          # Logo del sitio
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/            # Páginas de la aplicación
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Profile.jsx
│   │   ├── context/          # Estado global
│   │   │   ├── CartContext.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── services/         # Llamadas a la API
│   │   │   └── api.js
│   │   ├── styles/           # Estilos
│   │   │   └── components.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                    # Backend Node.js
│   ├── config/               # Configuraciones
│   │   ├── database.js       # Conexión a PostgreSQL
│   │   └── cloudinary.js     # Configuración Cloudinary
│   ├── middleware/           # Middlewares
│   │   ├── auth.js           # Autenticación JWT
│   │   └── validate.js       # Validación con Zod
│   ├── routes/               # Rutas de la API
│   │   └── upload.js         # Upload de imágenes
│   ├── schemas/              # Schemas de validación
│   │   └── authSchemas.js    # Validaciones con Zod
│   ├── server.js             # Archivo principal
│   ├── package.json
│   └── .env                  # Variables de entorno
│
└── README.md
```

### **Base de Datos**

```
PostgreSQL Database
├── categories             # Categorías de productos
├── products              # Productos del catálogo
├── users                 # Usuarios registrados
└── orders               # Órdenes de compra
```

## 🎯 Api Endpoints

### **Autenticación**

```bash
POST   /api/auth/register     Registrar nuevo usuario
POST   /api/auth/login        Iniciar sesión
```

### **Productos**

```bash
GET    /api/products          Obtener todos los productos
GET    /api/products/:id      Obtener producto por ID
```

### **Upload**

```bash
POST   /api/upload/image      Subir imagen a Cloudinary
```

## 🔧 Scripts Disponibles

### **Backend (server/)**

```bash
npm start          # Iniciar servidor en producción
npm run dev        # Iniciar servidor en desarrollo con nodemon
```

### **Frontend (client/)**

```bash
npm run dev        # Iniciar servidor de desarrollo
npm run build      # Construir para producción
npm run preview    # Preview de build de producción
npm test           # Ejecutar tests con Vitest
```

## 🚀 Tecnologías Utilizadas

### **Frontend**

- **React 18**: Biblioteca de JavaScript para interfaces de usuario
- **Vite**: Herramienta de desarrollo ultrarrápida
- **React Router**: Navegación entre páginas
- **Tailwind CSS**: Framework de CSS utilitario
- **Context API**: Gestión de estado global
- **Axios**: Cliente HTTP para peticiones al servidor
- **Lucid React**: Iconos

### **Backend**

- **Node.js**: Entorno de ejecución de JavaScript
- **Express**: Framework web minimalista
- **PostgreSQL**: Base de datos relacional
- **ES Modules**: Sintaxis moderna de JavaScript
- **Cors**: Configuración para peticiones cross-origin
- **Bcrypt**: Encriptación de contraseñas
- **Zod**: Validación de schemas
- **Cloudinary**: Gestión de imágenes en la nube
- **Multer**: Manejo de archivos

## 🌐 Deployment en Producción

### **Frontend en Vercel**

1. Conecta tu repositorio con Vercel
2. Configuración:

- **framework Preset**: Vite
- **Root directory**: `client`
- **Build command**: `npm run build`
- **Output**: `dist`

3. Variables de entorno:

```bash
VITE_API_URL=https://tu-backend.onrender.com/api
```

### **Backend en Render**

1. Conecta tu repositorio con Render
2. Configuración:

- **Evironment**: Node
- **Root directory**: `server`
- **Build command**: `npm install`
- **Start Command**: `npm start`

3. Variables de entorno: Todas las del .env

### **Base de datos en Render**

1. Crear PostgreSQL Database en Render
2. Ejecutar el script SQL de creación de tablas
3. Conectar el backend usando las credenciales proporcionadas

### **Herramientas de Desarrollo**

- **pgAdmin**: Interface gráfica para PostgreSQL
- **Nodemon**: Recarga automática del servidor
- **Git**: Control de versiones

## 📋 Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **PostgreSQL** (versión 12 o superior)
- **npm** o **yarn**
- **pgAdmin** (recomendado para gestión de base de datos)
- **Git** (para clonar el repositorio)

## 🔧 Instalación y Configuración

### **1. Clonar el Repositorio**

```bash
git clone https://github.com/leanmartin98/depoteek.git
cd depoteek
```

### **2. Configurar la Base de Datos**

#### Crear la base de datos en PostgreSQL:

1. Abrir **pgAdmin**
2. Crear una nueva base de datos llamada `depoteek_db`
3. Ejecutar el siguiente script SQL:

```sql
-- Crear tabla de categorías
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de productos
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    category_id INTEGER REFERENCES categories(id),
    image_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO categories (name, description) VALUES
('Electronicos', 'Productos electronicos'),
('Ropa', 'vestimenta y accesorios');

INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES
('iPhone 17', 'latest iphone model', 999.99, 10, 1, 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=300&fit=crop'),
('Camiseta', 'cotton t-shirt', 29.99, 50, 2, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop'),
('Laptop Gaming', 'high-end gaming computer', 1299.99, 5, 1, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop'),
('Jeans', 'denim jeans', 79.99, 30, 2, 'https://images.unsplash.com/photo-1542272454315-7ad9f8731736?w=400&h=300&fit=crop');
```

### **3. Configurar el Backend**

```bash
# Navegar a la carpeta del servidor
cd server

# Instalar dependencias
npm install express cors dotenv pg

# Instalar herramientas de desarrollo
npm install -D nodemon

# Crear archivo de variables de entorno
touch .env
```

#### Configurar el archivo `.env`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_de_tu_db
DB_USER=usuario_db
DB_PASSWORD=tu_contraseña_de_postgresql

JWT_SECRET=tu_secreto_super_seguro
NODE_ENV=development

# Cloudinary (opcional para imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### **4. Configurar el Frontend**

```bash
# Navegar a la carpeta del cliente (desde la raíz del proyecto)
cd client

# Instalar dependencias
npm install

# Instalar React Router y Axios
npm install react-router-dom axios

# Instalar y configurar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 🏃‍♂️ Cómo Ejecutar el Proyecto

### **1. Iniciar el Backend**

```bash
# Desde la carpeta server/
npm run dev

# Deberías ver: "Servidor corriendo en puerto 5000"
```

### **2. Iniciar el Frontend**

```bash
# Desde la carpeta client/ (en otra terminal)
npm run dev

# Deberías ver algo como: "Local: http://localhost:5173"
```

### **3. Abrir en el Navegador**

Visita: **http://localhost:5173**

## 🎯 Cómo Usar la Aplicación

### **Página de Inicio**

- **Hero Section**: Mensaje de bienvenida con botón para ver productos
- **Features**: Características destacadas del servicio (envío gratis, garantía, soporte)

### **Catálogo de Productos**

- **Visualización**: Grid responsive que se adapta al tamaño de pantalla
- **Información**: Cada producto muestra imagen, nombre, categoría, precio y stock
- **Agregar al Carrito**: Botón que añade productos al carrito instantáneamente

### **Carrito de Compras**

- **Lista de Productos**: Muestra todos los items agregados
- **Controles de Cantidad**: Botones + y - para modificar cantidades
- **Cálculos**: Subtotal por producto y total general automático
- **Gestión**: Eliminar productos individuales o vaciar todo el carrito

### **Navegación**

- **Header**: Siempre visible con enlaces y contador de carrito
- **Footer**: Información de la empresa y enlaces útiles
- **URLs Amigables**: Cada página tiene su propia URL para compartir

## 🌐 API Endpoints

### **Productos**

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto específico

### **Pruebas**

- `GET /api/test` - Verificar conexión del servidor
- `GET /api/test-db` - Verificar conexión a la base de datos

## 🎨 Personalización del Diseño

### **Colores Principales**

- **Negro**: `#000000` - Botones principales y texto destacado
- **Blanco**: `#FFFFFF` - Fondo de tarjetas y áreas principales
- **Grises**: `#F3F4F6`, `#6B7280` - Fondos y texto secundario
- **Acentos**: Verde para precios, naranja para stock, rojo para eliminaciones

### **Tipografía**

- **Encabezados**: Font weight 900 (black) para máximo impacto
- **Cuerpo**: Font weight 400-600 para legibilidad
- **Tracking**: Letras más cerradas en títulos principales

### **Efectos Visuales**

- **Hover**: Elevación de tarjetas y zoom en imágenes
- **Transiciones**: 300-500ms para suavidad
- **Sombras**: Sutiles en reposo, más pronunciadas en hover
- **Bordes**: Redondeados (rounded-xl, rounded-full)

## 🔧 Estructura de Datos

### **Producto**

```javascript
{
  id: 1,
  name: "iPhone 17",
  description: "latest iphone model",
  price: 999.99,
  stock: 10,
  category_id: 1,
  category_name: "Electronicos",
  image_url: "https://...",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
}
```

### **Item del Carrito**

```javascript
{
  id: 1,
  name: "iPhone 17",
  price: 999.99,
  quantity: 2,
  category_name: "Electronicos",
  image_url: "https://..."
}
```

## 🚀 Próximas Funcionalidades

### **Funcionalidades Planeadas**

- [ ] **Búsqueda Avanzada**: Filtros por categoría, precio y nombre
- [ ] **Página de Detalles**: Vista individual de cada producto
- [ ] **Wishlist**: Lista de productos favoritos
- [ ] **Checkout**: Proceso de pago completo
- [ ] **Historial de Órdenes**: Seguimiento de compras anteriores

### **Mejoras Técnicas**

- [ ] **Testing**: Pruebas unitarias e integración
- [ ] **PWA**: Funcionalidad offline
- [ ] **SEO**: Optimización para motores de búsqueda
- [ ] **Analytics**: Seguimiento de comportamiento de usuario
- [ ] **CI/CD**: Deploy automático

## 🐛 Problemas Comunes y Soluciones

### **Error: "Cannot connect to database"**

- Verificar que PostgreSQL esté ejecutándose
- Revisar credenciales en el archivo `.env`
- Confirmar que la base de datos `depoteek_db` existe

### **Error: "Module not found"**

- Ejecutar `npm install` en ambas carpetas (client y server)
- Verificar que todas las dependencias estén instaladas

### **Las imágenes no cargan**

- Verificar conexión a internet
- Las URLs de Unsplash pueden cambiar ocasionalmente

### **El carrito no actualiza**

- Verificar que CartProvider envuelva toda la aplicación
- Revisar la consola del navegador en busca de errores

### **Render Free Tier**

El backend en Render puede "dormirse" después de 15 minutos de inactividad. El primer request después de esto puede tardar 30-60 segundos.

### **Imágenes en desarrollor**

Las imágenes se sirven desde Cloudinary. Asegúrate de tener configuradas las credenciales correctamente.

## 👤 Autor

**Tu Nombre**

- GitHub: [@leanmarti98](https://github.com/leanmartin98)
- LinkedIn: [Leandro Garcete](https://www.linkedin.com/in/leandro-garcete-23216b251/)
- Email: garcetemartin908@gmail.com

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos personales o comerciales.

---

⭐ **¡No olvides dar una estrella al proyecto si te fue útil!** ⭐
