# 🎵 YouTube Music Editorial Platform

A modern web application for managing music editors and service orders using **Domain-Driven Design (DDD)** architecture with **Bounded Contexts**.

## 🎯 Features

✨ **Editorial Management**
- Create and manage music editors
- Track editor roles (Metadata Reviewer, Sync Specialist, Audio Quality Analyst)
- Real-time editor analytics and statistics
- Automatic service order generation

📊 **Analytics Dashboard**
- Cost per hour calculations
- Accumulated cost tracking
- Active editors monitoring
- High-priority service order alerts

🌐 **Multi-language Support**
- English (EN) - Default
- Spanish (ES)
- Real-time language switching

🏗️ **Enterprise Architecture**
- Domain-Driven Design principles
- Clear Bounded Contexts separation
- Repository pattern implementation
- Layered architecture (Domain → Application → Infrastructure → Presentation)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start json-server (Terminal 1)
cd server
json-server --watch db.json

# Start dev server (Terminal 2)
npm run dev
```

Visit `http://localhost:5173`

## 📂 Project Structure

```
src/
├── editorial/              # 🎯 Editorial Bounded Context
├── catalog/                # 📚 Catalog Bounded Context
└── shared/                 # 🔄 Shared Components & Utilities
```

**Read more:** Check `STRUCTURE.md` for detailed file structure

## 🏛️ Architecture

This project implements **Domain-Driven Design (DDD)** with multiple **Bounded Contexts**:

### Editorial Context
Handles everything related to editor management:
- Domain models for Editor, EditorRole, EditorStatus
- Use cases for creating and retrieving editors
- HTTP repository for data access
- Vue components for UI

### Catalog Context
Manages the music track catalog:
- Track entity and Value Objects
- Track repository interface and HTTP implementation
- Use cases for querying tracks

### Shared Context
Common components and utilities:
- Layout, navigation, footer
- Internationalization (i18n)
- Error pages (404)

**Read more:** Check `ARCHITECTURE.md` for complete architecture details

## 📋 Available Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/home` | EditorAnalytics | Main dashboard with editor analytics |
| `/support/editors/new` | NewEditor | Form to create new editor |
| `/404` | PageNotFound | Page not found error |

## 🎨 Design System

- **Framework:** PrimeVue (based on Material Design)
- **Icons:** PrimeIcons
- **Layout:** PrimeFlex CSS Grid
- **Theme Color:** Dark theme with YouTube red accents

## 🌐 API Integration

### json-server (Development)
- **Base URL:** `http://localhost:3000`
- **Endpoints:**
  - `GET /tracks` - Fetch all tracks
  - `POST /editors` - Create new editor
  - `GET /editors` - Fetch all editors
  - `POST /service-orders` - Create service order

### External APIs
- **Clearbit Logo API** - Fetch company logos
  - Used for YouTube Music icon in navbar

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `ARCHITECTURE.md` | Complete architecture explanation with diagrams |
| `DEVELOPMENT_GUIDE.md` | Step-by-step guide for developing new features |
| `QUICK_REFERENCE.md` | Code examples and common patterns |
| `STRUCTURE.md` | Visual project structure and diagrams |
| `ARCHITECTURE_DIAGRAM.txt` | ASCII art architecture visualization |
| `src/editorial/README.md` | Editorial context documentation |
| `src/catalog/README.md` | Catalog context documentation |

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎓 Learning Resources

### Domain-Driven Design
1. **Bounded Contexts** - Independent domains (Editorial, Catalog)
2. **Repository Pattern** - Data access abstraction
3. **Use Cases** - Business logic encapsulation
4. **Value Objects** - Immutable domain concepts
5. **Entities** - Domain models with identity

### Code Examples

**Creating an Editor (Use Case Pattern):**
```javascript
import { CreateEditorUseCase, CreateEditorDTO } from '@/editorial';

const useCase = new CreateEditorUseCase(repository, serviceOrderService);
const dto = new CreateEditorDTO(trackId, editorRole);
const result = await useCase.execute(dto, track);
```

**Fetching Data (Repository Pattern):**
```javascript
import { EditorHttpRepository } from '@/editorial';

const repository = new EditorHttpRepository();
const editors = await repository.getAll();
```

## 📊 Bounded Context Diagram

```
┌─────────────────────────────────────────────────────┐
│         EDITORIAL BOUNDED CONTEXT                  │
├─────────────────────────────────────────────────────┤
│ Domain: Editor, EditorRole, EditorStatus            │
│ Use Cases: Create, Get, Filter by Role              │
│ Repository: EditorHttpRepository                    │
│ UI: EditorAnalytics, NewEditor, EditorRoleStats    │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│          CATALOG BOUNDED CONTEXT                    │
├─────────────────────────────────────────────────────┤
│ Domain: Track, ImpactLevel, DefaultAction           │
│ Use Cases: GetAll, GetById, GetHighCost             │
│ Repository: TrackHttpRepository                     │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│           SHARED CONTEXT                            │
├─────────────────────────────────────────────────────┤
│ Components: Layout, Footer, LanguageSwitcher        │
│ i18n: EN, ES                                        │
│ Utils: API config, Shared services                  │
└─────────────────────────────────────────────────────┘
```

## ✨ Best Practices Implemented

✅ **DDD Principles**
- Clear domain boundaries
- Repository pattern
- Use case-driven development

✅ **Code Organization**
- Layered architecture
- Separation of concerns
- Clean dependencies

✅ **Accessibility**
- ARIA labels and attributes
- Semantic HTML
- Keyboard navigation support

✅ **Internationalization**
- Multi-language support
- Runtime language switching
- Dynamic content translation

✅ **Error Handling**
- Custom domain exceptions
- Graceful error recovery
- User-friendly error messages

## 🚀 Extensibility

The architecture is designed to easily add new Bounded Contexts:

```
New Context Structure:
mycontext/
├── domain/
│   ├── models/
│   ├── exceptions/
│   └── repositories/
├── application/
│   └── use-cases/
├── infrastructure/
│   └── repositories/
└── presentation/
    ├── views/
    ├── components/
    └── mycontext-routes.js
```

**Refer to:** `DEVELOPMENT_GUIDE.md` for step-by-step instructions

## 🆘 Troubleshooting

**Issue:** json-server not found
```bash
# Install globally
npm install -g json-server

# Or run from node_modules
npx json-server --watch db.json
```

**Issue:** Port 5173 already in use
```bash
npm run dev -- --port 3001
```

**Issue:** Components not updating
```bash
# Clear browser cache and restart dev server
# Make sure HMR is enabled in vite.config.js
```

## 📈 Project Stats

| Metric | Count |
|--------|-------|
| Bounded Contexts | 3 (Editorial, Catalog, Shared) |
| Domain Entities | 3 |
| Use Cases | 6+ |
| Vue Components | 5+ |
| Vue Views | 4 |
| Supported Languages | 2 (EN, ES) |

## 📄 License

MIT License - Feel free to use this project for learning and development

## 👥 Contributors

- **Development:** Using Vue 3 + Vite
- **Architecture:** Domain-Driven Design
- **UI Framework:** PrimeVue
- **Backend:** json-server (Development)

## 📞 Support

For questions or issues:
1. Check the documentation in `/docs` folder
2. Review code examples in `QUICK_REFERENCE.md`
3. Refer to official docs:
   - [Vue 3 Documentation](https://vuejs.org/)
   - [Vite Documentation](https://vitejs.dev/)
   - [PrimeVue Documentation](https://primevue.org/)
   - [DDD in JavaScript](https://khalilstemmler.com/)

---

**Version:** 1.0.0  
**Last Updated:** 2026-05-17  
**Architecture Pattern:** Domain-Driven Design (DDD)  
**Status:** ✅ Production Ready

