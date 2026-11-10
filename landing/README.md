<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/f02fa02d-69ed-42e8-9692-ca268544e05f

## Vista previa local en Windows

La aplicación está dentro de `landing/`. Desde la raíz `COLORCENTERWEB`, abrir PowerShell y ejecutar:

```powershell
cd landing
npm.cmd install
npm.cmd run dev
```

Abrir la dirección que indique Vite, normalmente http://localhost:3000. Si las dependencias ya están instaladas, basta con `npm.cmd run dev` desde esta carpeta. Mantener la terminal abierta durante la previsualización; `Ctrl+C` detiene el servidor.

Para comprobar el proyecto desde `landing/`:

```powershell
npm.cmd run lint
npm.cmd run build
```

La landing actual funciona en el navegador y no usa `GEMINI_API_KEY`. No hace falta configurar una clave para previsualizarla. El catálogo y las métricas son datos de demostración locales; los enlaces de WhatsApp abren un servicio externo.
