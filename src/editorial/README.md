# Editorial Bounded Context

## Overview

El **Editorial Bounded Context** es responsable de la gestión de editores, analítica de editores y órdenes de servicio en la plataforma YouTube Music Editorial Platform.

## Estructura DDD (Domain-Driven Design)

```
editorial/
├── domain/                  # Capa de Dominio (Domain Layer)
│   ├── models/
│   │   └── editor.model.js           # Entidades y Value Objects del dominio
│   ├── exceptions/
│   │   └── editor.exceptions.js      # Excepciones del dominio
│   └── repositories/
│       └── editor.repository.interface.js  # Interfaz del repositorio
│
├── application/             # Capa de Aplicación (Application Layer)
│   └── use-cases/
│       └── editor.usecases.js        # Casos de uso y DTOs
│
├── infrastructure/          # Capa de Infraestructura (Infrastructure Layer)
│   └── repositories/
│       └── editor.http.repository.js # Implementación del repositorio con HTTP
│
└── presentation/            # Capa de Presentación (Presentation Layer)
    ├── views/
    │   ├── editor-analytics.vue      # Vista de analítica de editores
    │   └── new-editor.vue            # Vista para crear nuevo editor
    ├── components/
    │   ├── editor-role-stats.vue     # Componente de estadísticas por rol
    │   └── next-service-order.vue    # Componente de próxima orden de servicio
    └── editorial-routes.js           # Definición de rutas del contexto
```

## Características Principales

### 1. **Editor Entity** (`domain/models/editor.model.js`)
- Representa un editor en el sistema
- Define roles de editor (METADATA_REVIEWER, SYNC_SPECIALIST, AUDIO_QUALITY_ANALYST)
- Define estados de editor (AVAILABLE, BUSY)
- Métodos auxiliares como `isAvailable()` y `getHoursElapsed()`

### 2. **Editor Repository Interface** (`domain/repositories/`)
- Contrato para operaciones de acceso a datos
- Métodos: getAll(), getById(), getByRole(), create(), update(), delete()

### 3. **Use Cases** (`application/use-cases/`)
- `CreateEditorUseCase`: Crea un nuevo editor con validación de duplicados por día
- `GetEditorsByRoleUseCase`: Obtiene editores filtrados por rol
- `GetAllEditorsUseCase`: Obtiene todos los editores

### 4. **HTTP Repository** (`infrastructure/repositories/`)
- Implementa IEditorRepository usando Fetch API
- Se conecta con json-server en `http://localhost:3000/editors`

### 5. **Componentes de Presentación** (`presentation/components/`)
- **EditorRoleStats**: Card que muestra estadísticas por rol de editor
  - Cost Per Hour (suma de costos)
  - Accumulated Cost (costo acumulado por horas)
  - Active Editors (contador)
- **NextServiceOrder**: Muestra la orden de servicio más antigua con prioridad HIGH

### 6. **Vistas** (`presentation/views/`)
- **EditorAnalytics**: Vista home con grid de analítica de editores
- **NewEditor**: Formulario para crear nuevo editor con campos de Track y EditorRole

## Reglas de Negocio

1. **Validación de Duplicados por Día**: Solo se puede registrar 1 editor por track por día
2. **Auto-generación de Service Orders**: Al crear un editor, se genera automáticamente una orden de servicio
3. **Cálculo de Costos**: 
   - Cost Per Hour = suma de costPerHour de todos los editores AVAILABLE del rol
   - Accumulated Cost = costPerHour * horas transcurridas desde registeredAt

## Flujo de Creación de Editor

```
1. Usuario selecciona Track y EditorRole
2. CreateEditorUseCase.execute()
   ├─ Valida que no exista editor para ese track hoy
   ├─ Crea nuevo editor (status=AVAILABLE, registeredAt=ahora)
   └─ Auto-genera Service Order con neededAction del track
3. Usuario es redirigido a /home
```

## Relaciones Externas

- **Shared Context**: 
  - `trackService` - Para obtener información de tracks
  - `serviceOrderService` - Para crear órdenes de servicio

## Próximas Mejoras

- [ ] Agregar eventos de dominio (Domain Events)
- [ ] Implementar especificaciones (Domain Specifications)
- [ ] Agregar Value Objects específicos (TrackId, EditorId, CostPerHour)
- [ ] Implementar Aggregates root
- [ ] Agregar transacciones/Unit of Work

## Documentación de API

### Editor Model
```javascript
{
  id: number,
  trackId: number,
  editorRole: "METADATA_REVIEWER" | "SYNC_SPECIALIST" | "AUDIO_QUALITY_ANALYST",
  status: "AVAILABLE" | "BUSY",
  registeredAt: ISO8601 DateTime string
}
```

### Editor Role Stats
- METADATA_REVIEWER: Revisor especializado en metadatos
- SYNC_SPECIALIST: Especialista en sincronización
- AUDIO_QUALITY_ANALYST: Analista de calidad de audio

