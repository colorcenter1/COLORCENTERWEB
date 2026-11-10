# Instalar las skills · Color Center

Las skills son instrucciones extra que ayudan a tu agente a hacer mejor el trabajo. Se instalan **una sola vez** dentro de la carpeta de tu página.

## 1. Skills que te enviamos en ZIP (SEO y datos personales)

1. Descomprime `seo-organico-ia.zip` y `tratamiento-datos-landing.zip`.
2. Dentro de la carpeta de tu página, crea la carpeta `.agents` y dentro `skills` (si no existen).
3. Copia ahí las dos carpetas **completas**. Debe quedar así:

```
tu-pagina/
└── .agents/
    └── skills/
        ├── seo-organico-ia/
        │   ├── SKILL.md
        │   ├── references/
        │   └── scripts/
        └── tratamiento-datos-landing/
            ├── SKILL.md
            └── references/
```

## 2. Skills de diseño (las instala tu agente)

Abre una conversación nueva con tu agente y pega este mensaje:

> Instala estas skills en `.agents/skills/` copiando cada carpeta completa, con sus referencias, desde su repositorio oficial. No modifiques ningún archivo de mi página.
> 1. `emil-design-eng` desde https://github.com/emilkowalski/skills (carpeta `skills/emil-design-eng`)
> 2. `mobile-native` desde https://github.com/emilkowalski/skills (carpeta `skills/mobile-native`)
> 3. `impeccable` desde https://github.com/pbakaus/impeccable (carpeta `.agents/skills/impeccable`)
>
> Al terminar, muéstrame la lista de carpetas que quedaron dentro de `.agents/skills/`.

**Opcional (para el paso 8):** la skill de Transitions se obtiene siguiendo las instrucciones de https://transitions.dev/skill. Usa solo la parte gratuita.

## 3. Comprobar

Pregúntale a tu agente: **«¿Qué skills tienes disponibles en este proyecto?»**. Deben aparecer `seo-organico-ia`, `tratamiento-datos-landing`, `emil-design-eng`, `mobile-native` e `impeccable`.

Si alguna no aparece como skill, puedes decirle la ruta directa, por ejemplo: «Lee `.agents/skills/seo-organico-ia/SKILL.md` y úsala».

Luego marca el **Paso 0** en `plan-mejoras.md` y sigue con el Paso 1.
