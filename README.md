# Inventario Frontend

Aplicación frontend desarrollada con React y Vite para la prueba técnica de carga masiva de inventario.

## Objetivo

Permitir la carga de un archivo Excel y presentar al usuario el resultado del procesamiento generado por el backend de forma clara y rápida.

## Funcionalidades

- Carga de archivo Excel (`.xlsx`)
- Envío del archivo al backend mediante `POST /api/inventario/upload`
- Visualización del reporte de validación y procesamiento
- Exportación del reporte en formato JSON

## Tecnologías

- React
- Vite
- JavaScript (ES6)
- Fetch API

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación y ejecución

```bash
npm install
npm run dev
```

La aplicación se ejecuta en entorno local y consume el servicio backend configurado para la prueba técnica.

## Estructura principal

- `src/App.jsx`: flujo principal de carga, envío y visualización del reporte
- `src/main.jsx`: punto de entrada de la aplicación
- `index.html`: plantilla base de Vite

## Notas de implementación

El desarrollo prioriza simplicidad, legibilidad y cumplimiento de los requerimientos funcionales de la prueba técnica.
