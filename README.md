# Sistema Predictivo de Incendios - Lima Metropolitana 

##  Descripción del Proyecto

Sistema de análisis predictivo que utiliza Machine Learning para estimar la probabilidad de incendios en los 43 distritos de Lima Metropolitana. La aplicación genera un dataset sintético de 7,000 registros, entrena un modelo Random Forest y visualiza los resultados en un mapa de calor interactivo basado en OpenStreetMap.

##  Objetivos Principales

- Generar un dataset sintético coherente con la geografía y densidad poblacional de Lima
- Entrenar un modelo predictivo transparente y eficiente
- Visualizar las zonas de riesgo en un mapa de calor interactivo
- Proporcionar análisis estadísticos y temporales de los patrones de incendio

## Características Implementadas

### 1. **Generación de Dataset Sintético**
- ✅ 7,000 registros de incendios distribuidos en 43 distritos
- ✅ Variables incluidas: ubicación geográfica, tipo de edificación, causa probable, hora, fecha
- ✅ Distribución ponderada según factores de riesgo reales de cada distrito
- ✅ Patrones temporales realistas (mayor incidencia en horas pico)

### 2. **Modelo Predictivo**
- ✅ Algoritmo: Random Forest Classifier
- ✅ Variables predictoras: densidad poblacional, tipo de edificación, hora del día, factor de riesgo base
- ✅ Métricas de evaluación en tiempo real
- ✅ Precisión simulada entre 82-92%

### 3. **Visualización Interactiva**
- ✅ Mapa de calor en OpenStreetMap
- ✅ Gradiente de colores: Verde (bajo riesgo) → Amarillo (medio) → Rojo (alto)
- ✅ Marcadores interactivos con información detallada por distrito
- ✅ Control de capas para activar/desactivar visualizaciones

### 4. **Análisis Estadístico**
- ✅ Ranking de distritos por nivel de riesgo
- ✅ Distribución de causas de incendio (gráfico circular)
- ✅ Patrón temporal por hora del día (gráfico de líneas)
- ✅ Estadísticas en tiempo real del dataset

### 5. **Interfaz de Usuario**
- ✅ Diseño responsivo con Tailwind CSS
- ✅ Dashboard con métricas clave
- ✅ Consola de salida para monitoreo del sistema
- ✅ Controles intuitivos para generar datos y entrenar modelo

##  URIs Funcionales

### Aplicación Web Principal
- **`index.html`** - Dashboard principal con mapa interactivo y controles
  - Botón "Generar Dataset": Crea 7,000 registros sintéticos
  - Botón "Entrenar Modelo": Entrena el Random Forest con los datos generados
  - Controles del mapa: Toggle para capa de calor y marcadores

### Scripts Python (Referencia)
- **`python/generate_dataset.py`** - Script para generar dataset en formato CSV/Excel
- **`python/train_model.py`** - Entrenamiento del modelo con scikit-learn
- **`python/create_heatmap.py`** - Generación de mapas con Folium

##  Modelos de Datos

### Estructura del Dataset de Incendios
```javascript
{
  id: number,
  district: string,
  latitude: number,
  longitude: number,
  date: string (YYYY-MM-DD),
  hour: number (0-23),
  building_type: string,
  fire_cause: string,
  population_density: string (alta/media/baja),
  base_risk_factor: number (0-1),
  calculated_risk: number (0-1),
  severity: string (Alta/Media/Baja),
  response_time: number (minutos)
}
```

### Distritos de Lima (43 distritos)
- Cada distrito tiene coordenadas centrales, población, densidad y factor de riesgo base
- Los factores de riesgo varían de 0.2 (muy bajo) a 0.75 (muy alto)

## Tecnologías Utilizadas

### Frontend
- **HTML5/CSS3** - Estructura y estilos
- **JavaScript ES6** - Lógica de aplicación
- **Tailwind CSS** - Framework de diseño
- **Leaflet.js** - Mapas interactivos con OpenStreetMap
- **Leaflet.heat** - Plugin para mapas de calor
- **Chart.js** - Gráficos estadísticos
- **Font Awesome** - Iconos

### Datos y Algoritmos
- **Random Forest** - Modelo de clasificación (simulado en frontend)
- **Distribución probabilística** - Para generación de datos sintéticos
- **Análisis geoespacial** - Cálculo de distancias y clustering


##  Notas Técnicas

### Interpretación del Mapa de Calor
- **Zonas Rojas**: Probabilidad de incendio >70%
- **Zonas Amarillas**: Probabilidad entre 40-70%
- **Zonas Verdes**: Probabilidad <40%
- Los clusters indican mayor concentración histórica de eventos


##  Cómo Usar el Sistema

1. **Abrir `index.html`** en un navegador web moderno
2. **Hacer clic en "Generar Dataset"** para crear los 7,000 registros
3. **Hacer clic en "Entrenar Modelo"** para simular el entrenamiento
4. **Explorar el mapa** usando zoom y clic en marcadores
5. **Alternar visualizaciones** con los botones de Calor/Puntos
6. **Revisar estadísticas** en los paneles laterales

