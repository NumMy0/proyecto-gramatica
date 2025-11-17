# Estructura del Proyecto - Simulador de Máquina de Turing

## 📁 Organización de Archivos

```
proyecto-gramatica/
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions para despliegue automático
│
├── public/                         # Archivos estáticos públicos
│
├── src/
│   ├── assets/                     # Recursos y estilos
│   │   ├── base.css               # Estilos base
│   │   └── main.css               # Estilos principales
│   │
│   ├── components/                 # Componentes Vue
│   │   ├── TuringMachineSimulator.vue  # 🎯 Componente principal
│   │   ├── TuringTape.vue             # 📼 Visualización de la cinta
│   │   ├── StateIndicator.vue         # 🔵 Indicador de estados
│   │   └── ControlPanel.vue           # 🎛️ Panel de controles
│   │
│   ├── composables/                # Lógica reutilizable (Composition API)
│   │   └── useTuringMachine.ts     # 🧠 Motor de la Máquina de Turing
│   │
│   ├── config/                     # Configuraciones
│   │   └── pinMachineConfig.ts     # ⚙️ Configuración de la MT para PINs
│   │
│   ├── types/                      # Definiciones de tipos TypeScript
│   │   └── turingMachine.ts        # 📝 Tipos e interfaces
│   │
│   ├── views/                      # Vistas/Páginas
│   │   └── HomeView.vue            # 🏠 Vista principal
│   │
│   ├── router/                     # Configuración de rutas
│   │   └── index.ts               # 🛤️ Router de Vue
│   │
│   ├── App.vue                     # Componente raíz de la aplicación
│   └── main.ts                     # Punto de entrada de la aplicación
│
├── index.html                      # HTML principal
├── package.json                    # Dependencias y scripts
├── vite.config.ts                  # Configuración de Vite
├── tsconfig.json                   # Configuración de TypeScript
├── eslint.config.ts                # Configuración de ESLint
├── .gitignore                      # Archivos ignorados por Git
└── README.md                       # Documentación del proyecto
```

## 🔄 Flujo de Datos

```
Usuario
  ↓
ControlPanel.vue (Input + Botones)
  ↓
TuringMachineSimulator.vue (Coordinador)
  ↓
useTuringMachine.ts (Lógica del motor)
  ↓ lee config
pinMachineConfig.ts (Tabla de transiciones)
  ↓ actualiza
TapeState (Estado de la cinta)
  ↓ visualiza
TuringTape.vue + StateIndicator.vue
```

## 🎨 Componentes Visuales

### TuringMachineSimulator.vue

**Responsabilidad**: Componente contenedor principal

- Coordina todos los sub-componentes
- Maneja eventos de usuario
- Muestra mensajes de error
- Renderiza la interfaz completa

### TuringTape.vue

**Responsabilidad**: Visualización de la cinta

- Muestra cada celda de la cinta
- Indica la posición del cabezal
- Resalta la celda actual
- Muestra índices de posición

### StateIndicator.vue

**Responsabilidad**: Mostrar el estado actual

- Indica el estado actual de la MT
- Muestra si está en ejecución, aceptada o rechazada
- Usa colores para cada estado (verde/rojo/azul)

### ControlPanel.vue

**Responsabilidad**: Panel de control de usuario

- Input para ingresar la cadena
- Botón "Iniciar" para cargar la cadena
- Botón "Paso" para ejecución paso a paso
- Botón "Ejecutar Todo" para ejecución completa
- Botón "Reiniciar" para resetear

## 🧠 Lógica del Negocio

### useTuringMachine.ts (Composable)

**Responsabilidad**: Motor de la Máquina de Turing

Funciones principales:

- `initializeTape(input)`: Inicializa la cinta con la entrada
- `step()`: Ejecuta un paso individual de la MT
- `run()`: Ejecuta hasta halting state
- `reset()`: Reinicia el estado
- `findTransition()`: Busca la transición apropiada

Estado manejado:

- `tapeState`: Estado actual de la cinta
- `executionHistory`: Historial de estados
- `statusMessage`: Mensaje de estado legible

### pinMachineConfig.ts

**Responsabilidad**: Configuración de la MT para PINs

Contiene:

- Estados: `q0`, `q1`, `q2`, `q3`, `q4`, `q5`, `q6`, `q_accept`, `q_reject`
- Alfabeto de entrada: dígitos 0-9
- Alfabeto de cinta: dígitos 0-9 + símbolo blanco `_`
- Tabla completa de transiciones (110+ transiciones)
- Función helper `createDigitTransitions()` para generar transiciones

## 📊 Tipos TypeScript

### turingMachine.ts

Define las interfaces y tipos:

- `State`: Tipo para estados (string)
- `Symbol`: Tipo para símbolos (string)
- `Direction`: 'L' | 'R' | 'S' (Left, Right, Stay)
- `Transition`: Interface para transiciones
- `TuringMachineConfig`: Configuración completa de la MT
- `TapeState`: Estado actual de la cinta en ejecución
- `StepResult`: Resultado de ejecutar un paso

## 🚀 Deployment

### GitHub Actions (.github/workflows/deploy.yml)

Workflow automático que:

1. Se activa en cada push a `main`
2. Instala Node.js y pnpm
3. Instala dependencias
4. Construye el proyecto (`pnpm build`)
5. Despliega a GitHub Pages

### Vite Config

- `base: '/proyecto-gramatica/'` para GitHub Pages
- Alias `@` apuntando a `./src`
- Plugins: Vue, Tailwind CSS, Vue DevTools

## 🎯 Casos de Uso

1. **Validar PIN de 4 dígitos**:
   - Input: "1234"
   - Resultado: ACEPTADO (q4 → q_accept)

2. **Validar PIN de 6 dígitos**:
   - Input: "567890"
   - Resultado: ACEPTADO (q6 → q_accept)

3. **Rechazar PIN de 5 dígitos**:
   - Input: "12345"
   - Resultado: RECHAZADO (q5 → q*reject al leer '*')

4. **Rechazar PIN de 7 dígitos**:
   - Input: "1234567"
   - Resultado: RECHAZADO (q6 → q_reject al leer '7')

## 🔧 Tecnologías

- **Vue 3**: Framework reactivo con Composition API
- **TypeScript**: Tipado estático
- **Vite**: Build tool moderno
- **Tailwind CSS**: Utilidades CSS
- **Vue Router**: SPA routing
- **GitHub Actions**: CI/CD
- **GitHub Pages**: Hosting estático
