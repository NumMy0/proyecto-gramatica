# Proyecto de Gramática y Lenguajes Formales

## Integrantes del Equipo

- [Nombre 1]
- [Nombre 2]
- [Nombre 3]

---

## Fase 1: El Plano (Teoría y Diseño)

### 1. Expresión Regular Elegida

**Regex:** `\d{4}|\d{6}`

**Descripción:** Código PIN de 4 o 6 dígitos.

**Justificación:**
Elegimos esta expresión regular porque es un caso común en validación de formularios web (códigos PIN, códigos de verificación, contraseñas numéricas). Es lo suficientemente simple para crear un AFD manejable, pero interesante desde el punto de vista teórico porque requiere contar exactamente 4 o 6 dígitos, lo que implica un manejo cuidadoso de los estados.

---

### 2. Autómata Finito Determinista (AFD)

#### Definición Formal del AFD

- **Q (Estados):** {q0, q1, q2, q3, q4, q5, q6, q_error}
  - `q0`: Estado inicial
  - `q1`: Un dígito leído
  - `q2`: Dos dígitos leídos
  - `q3`: Tres dígitos leídos
  - `q4`: Cuatro dígitos leídos (estado de aceptación - PIN de 4 dígitos)
  - `q5`: Cinco dígitos leídos
  - `q6`: Seis dígitos leídos (estado de aceptación - PIN de 6 dígitos)
  - `q_error`: Estado de error (cualquier entrada inválida)

- **Σ (Alfabeto):** {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}

- **q0 (Estado Inicial):** q0

- **F (Estados Finales):** {q4, q6}

#### Diagrama de Estados del AFD

```
     [0-9]      [0-9]      [0-9]      [0-9]
q0 --------> q1 --------> q2 --------> q3 --------> ((q4))
                                                       |
                                                    [0-9]
                                                       |
                                                       v
                                                      q5
                                                       |
                                                    [0-9]
                                                       |
                                                       v
                                                    ((q6))
                                                       |
                                                    [0-9]
                                                       |
                                                       v
                                                    q_error

Nota:
- ((q4)) y ((q6)) son estados de aceptación (doble círculo)
- Cualquier otro símbolo que no sea [0-9] lleva a q_error
- Desde q6, cualquier dígito adicional lleva a q_error
```

#### Tabla de Transición del AFD

| Estado Actual | Entrada (dígito 0-9) | Entrada (otro símbolo) | Estado Siguiente |
| ------------- | -------------------- | ---------------------- | ---------------- |
| q0            | 0-9                  | -                      | q1               |
| q0            | otro                 | -                      | q_error          |
| q1            | 0-9                  | -                      | q2               |
| q1            | otro                 | -                      | q_error          |
| q2            | 0-9                  | -                      | q3               |
| q2            | otro                 | -                      | q_error          |
| q3            | 0-9                  | -                      | q4               |
| q3            | otro                 | -                      | q_error          |
| **q4** ✓      | 0-9                  | -                      | q5               |
| **q4** ✓      | otro                 | -                      | q_error          |
| q5            | 0-9                  | -                      | q6               |
| q5            | otro                 | -                      | q_error          |
| **q6** ✓      | 0-9                  | -                      | q_error          |
| **q6** ✓      | otro                 | -                      | q_error          |
| q_error       | cualquiera           | -                      | q_error          |

---

### 3. Máquina de Turing (MT)

La Máquina de Turing emulará el AFD con las siguientes restricciones:

- El cabezal **nunca se moverá a la izquierda** (siempre R o S - Stay)
- La MT **nunca escribirá un símbolo diferente** al que leyó (preserva la entrada)

#### Definición Formal de la MT

- **Q (Estados):** {q0, q1, q2, q3, q4, q5, q6, q_accept, q_reject}
- **Σ (Alfabeto de entrada):** {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
- **Γ (Alfabeto de la cinta):** {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, \_}
- **q0 (Estado inicial):** q0
- **\_ (Símbolo blanco):** \_
- **F (Estados finales):** {q_accept, q_reject}

#### Tabla de Transición Completa de la MT

| Estado Actual | Símbolo Leído | Símbolo Escrito | Movimiento | Estado Siguiente | Comentario                    |
| ------------- | ------------- | --------------- | ---------- | ---------------- | ----------------------------- |
| q0            | 0             | 0               | R          | q1               | Primer dígito                 |
| q0            | 1             | 1               | R          | q1               | Primer dígito                 |
| q0            | 2             | 2               | R          | q1               | Primer dígito                 |
| q0            | 3             | 3               | R          | q1               | Primer dígito                 |
| q0            | 4             | 4               | R          | q1               | Primer dígito                 |
| q0            | 5             | 5               | R          | q1               | Primer dígito                 |
| q0            | 6             | 6               | R          | q1               | Primer dígito                 |
| q0            | 7             | 7               | R          | q1               | Primer dígito                 |
| q0            | 8             | 8               | R          | q1               | Primer dígito                 |
| q0            | 9             | 9               | R          | q1               | Primer dígito                 |
| q0            | \_            | \_              | S          | q_reject         | Cadena vacía                  |
| q0            | otro          | otro            | S          | q_reject         | Símbolo inválido              |
| q1            | 0-9           | 0-9             | R          | q2               | Segundo dígito                |
| q1            | \_            | \_              | S          | q_reject         | Solo 1 dígito                 |
| q1            | otro          | otro            | S          | q_reject         | Símbolo inválido              |
| q2            | 0-9           | 0-9             | R          | q3               | Tercer dígito                 |
| q2            | \_            | \_              | S          | q_reject         | Solo 2 dígitos                |
| q2            | otro          | otro            | S          | q_reject         | Símbolo inválido              |
| q3            | 0-9           | 0-9             | R          | q4               | Cuarto dígito                 |
| q3            | \_            | \_              | S          | q_reject         | Solo 3 dígitos                |
| q3            | otro          | otro            | S          | q_reject         | Símbolo inválido              |
| q4            | 0-9           | 0-9             | R          | q5               | Quinto dígito (buscando 6)    |
| q4            | \_            | \_              | S          | q_accept         | **PIN de 4 dígitos válido** ✓ |
| q4            | otro          | otro            | S          | q_reject         | Símbolo inválido              |
| q5            | 0-9           | 0-9             | R          | q6               | Sexto dígito                  |
| q5            | \_            | \_              | S          | q_reject         | Solo 5 dígitos                |
| q5            | otro          | otro            | S          | q_reject         | Símbolo inválido              |
| q6            | 0-9           | 0-9             | R          | q_reject         | Más de 6 dígitos              |
| q6            | \_            | \_              | S          | q_accept         | **PIN de 6 dígitos válido** ✓ |
| q6            | otro          | otro            | S          | q_reject         | Símbolo inválido              |
| q_accept      | cualquiera    | cualquiera      | S          | q_accept         | Estado final aceptación       |
| q_reject      | cualquiera    | cualquiera      | S          | q_reject         | Estado final rechazo          |

#### Ejemplos de Ejecución

**Ejemplo 1: "1234" (ACEPTA)**

```
Cinta inicial: [1][2][3][4][_]...
q0, lee '1' → escribe '1', mueve R, va a q1
q1, lee '2' → escribe '2', mueve R, va a q2
q2, lee '3' → escribe '3', mueve R, va a q3
q3, lee '4' → escribe '4', mueve R, va a q4
q4, lee '_' → escribe '_', se queda, va a q_accept ✓
```

**Ejemplo 2: "567890" (ACEPTA)**

```
Cinta inicial: [5][6][7][8][9][0][_]...
q0, lee '5' → escribe '5', mueve R, va a q1
q1, lee '6' → escribe '6', mueve R, va a q2
q2, lee '7' → escribe '7', mueve R, va a q3
q3, lee '8' → escribe '8', mueve R, va a q4
q4, lee '9' → escribe '9', mueve R, va a q5
q5, lee '0' → escribe '0', mueve R, va a q6
q6, lee '_' → escribe '_', se queda, va a q_accept ✓
```

**Ejemplo 3: "12345" (RECHAZA)**

```
Cinta inicial: [1][2][3][4][5][_]...
q0, lee '1' → escribe '1', mueve R, va a q1
q1, lee '2' → escribe '2', mueve R, va a q2
q2, lee '3' → escribe '3', mueve R, va a q3
q3, lee '4' → escribe '4', mueve R, va a q4
q4, lee '5' → escribe '5', mueve R, va a q5
q5, lee '_' → escribe '_', se queda, va a q_reject ✗
```

**Ejemplo 4: "1234567" (RECHAZA)**

```
Cinta inicial: [1][2][3][4][5][6][7][_]...
(... transiciones hasta q6 leyendo '6')
q6, lee '7' → escribe '7', mueve R, va a q_reject ✗
```

#### Propiedades de la MT

1. **No se mueve a la izquierda:** Todas las transiciones son R (derecha) o S (stay/quedarse).
2. **No modifica la entrada:** El símbolo escrito siempre es igual al símbolo leído.
3. **Emula el AFD:** La MT funciona exactamente como el AFD, solo que usa una cinta infinita.
4. **Manejo del blanco:** El símbolo '\_' se usa para detectar el final de la entrada y decidir si aceptar o rechazar.

---

## Fase 2: El Repositorio (Código y Documentación)

### Estructura del Proyecto

Este proyecto está construido con **Vue 3**, **TypeScript**, **Vite** y **Tailwind CSS**.

```
proyecto-gramatica/
├── public/                 # Archivos estáticos
├── src/
│   ├── assets/            # Estilos globales
│   │   ├── base.css
│   │   └── main.css
│   ├── components/        # Componentes Vue
│   │   ├── TuringMachineSimulator.vue  # Componente principal del simulador
│   │   ├── TuringTape.vue              # Visualización de la cinta
│   │   ├── StateIndicator.vue          # Indicador de estado actual
│   │   └── ControlPanel.vue            # Panel de controles
│   ├── composables/       # Lógica reutilizable
│   │   └── useTuringMachine.ts         # Hook principal del simulador
│   ├── config/            # Configuraciones
│   │   └── pinMachineConfig.ts         # Configuración de la MT para PINs
│   ├── types/             # Tipos TypeScript
│   │   └── turingMachine.ts            # Definiciones de tipos
│   ├── views/             # Vistas de la aplicación
│   │   └── HomeView.vue                # Vista principal
│   ├── router/            # Configuración de rutas
│   │   └── index.ts
│   ├── App.vue            # Componente raíz
│   └── main.ts            # Punto de entrada
├── index.html             # HTML principal
├── package.json           # Dependencias del proyecto
├── vite.config.ts         # Configuración de Vite
├── tsconfig.json          # Configuración de TypeScript
└── README.md              # Este archivo

```

### Tecnologías Utilizadas

- **Vue 3**: Framework progresivo de JavaScript
- **TypeScript**: Tipado estático para JavaScript
- **Vite**: Build tool y dev server ultra rápido
- **Tailwind CSS**: Framework de utilidades CSS
- **Vue Router**: Enrutamiento oficial de Vue

### Instalación y Ejecución

#### Prerrequisitos

- Node.js (v20.19.0 o v22.12.0+)
- pnpm (recomendado) o npm

#### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/NumMy0/proyecto-gramatica.git
cd proyecto-gramatica

# 2. Instalar dependencias
pnpm install
# o
npm install

# 3. Ejecutar en modo desarrollo
pnpm dev
# o
npm run dev

# 4. Construir para producción
pnpm build
# o
npm run build

# 5. Previsualizar build de producción
pnpm preview
# o
npm run preview
```

### Estructura de Componentes

#### `TuringMachineSimulator.vue`

Componente principal que orquesta todo el simulador. Maneja el estado global y coordina los sub-componentes.

#### `TuringTape.vue`

Visualiza la cinta de la Máquina de Turing con:

- Celdas individuales mostrando cada símbolo
- Indicador visual del cabezal (HEAD)
- Resaltado de la posición actual

#### `StateIndicator.vue`

Muestra el estado actual de la máquina con indicadores visuales:

- Verde para estado aceptado
- Rojo para estado rechazado
- Azul para estado en ejecución

#### `ControlPanel.vue`

Panel de control con:

- Input para ingresar la cadena
- Botón para iniciar la máquina
- Botones para ejecutar paso a paso o completamente
- Botón de reinicio

### Lógica del Simulador

#### `useTuringMachine.ts` (Composable)

Contiene toda la lógica del motor de la Máquina de Turing:

- `initializeTape(input)`: Inicializa la cinta con la entrada del usuario
- `step()`: Ejecuta un solo paso de la máquina
- `run()`: Ejecuta la máquina hasta que se detenga
- `reset()`: Reinicia el estado de la máquina
- `findTransition()`: Busca la transición apropiada según estado y símbolo

#### `pinMachineConfig.ts`

Configuración específica de la MT para validar PINs:

- Estados: `q0` a `q6`, `q_accept`, `q_reject`
- Transiciones completas para dígitos 0-9
- Manejo del símbolo blanco `_`

### GitHub Pages

**URL del proyecto:** [https://NumMy0.github.io/proyecto-gramatica](https://NumMy0.github.io/proyecto-gramatica)

Para activar GitHub Pages:

1. Ve a Settings → Pages en tu repositorio
2. Selecciona la rama `main` y la carpeta `/` o `/dist` (después del build)
3. Guarda los cambios
4. GitHub generará la URL pública

**Nota**: Para desplegar en GitHub Pages, ejecuta `pnpm build` y sube la carpeta `dist/` o configura GitHub Actions para deployment automático.

---

## Conclusión

Este proyecto demuestra cómo un AFD puede ser emulado por una Máquina de Turing restringida, mostrando la equivalencia entre estos dos modelos de computación para lenguajes regulares. La implementación web permitirá visualizar y probar el funcionamiento de esta máquina de manera interactiva.
