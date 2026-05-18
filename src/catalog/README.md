# Catalog Bounded Context

## Overview

El **Catalog Bounded Context** es responsable de la gestión del catálogo de tracks (canciones) en la plataforma YouTube Music Editorial Platform.

## Estructura DDD

```
catalog/
├── domain/
│   ├── models/
│   │   └── track.model.js
│   └── repositories/
│       └── track.repository.interface.js
│
├── application/
│   └── use-cases/
│       └── track.usecases.js
│
└── infrastructure/
    └── repositories/
        └── track.http.repository.js
```

## Características Principales

### Track Entity
- Representa una canción en el catálogo
- Propiedades: id, name, costPerHour, impactInPlayback, defaultAction
- Métodos: hasPlaybackImpact(), getImpactLevel(), getRequiredAction()

### Value Objects
- **ImpactLevel**: NONE, PARTIAL, TOTAL
- **DefaultAction**: REPROCESS, REPLACE

### Use Cases
- `GetAllTracksUseCase`: Obtiene todos los tracks
- `GetTrackByIdUseCase`: Obtiene un track por ID
- `GetHighCostTracksUseCase`: Obtiene tracks con costo alto

### Repository Pattern
- HTTP Repository conectado con json-server
- Endpoint: `http://localhost:3000/tracks`

## Model

```javascript
{
  id: number,
  name: string,
  costPerHour: number,
  impactInPlayback: "NONE" | "PARTIAL" | "TOTAL",
  defaultAction: "REPROCESS" | "REPLACE"
}
```

## Relaciones con Otros Contextos

- **Editorial Context**: Usa información de Track para crear Editors y Service Orders
- **Service Orders**: Usa defaultAction del track para determinar neededAction

