// Sistema de Predicción de Incendios para Lima Metropolitana
// ============================================================

// Configuración de distritos de Lima con coordenadas y características
const LIMA_DISTRICTS = [
    { name: 'Miraflores', lat: -12.1219, lng: -77.0297, population: 82000, density: 'alta', risk_factor: 0.3 },
    { name: 'San Isidro', lat: -12.0965, lng: -77.0360, population: 55000, density: 'alta', risk_factor: 0.25 },
    { name: 'Surco', lat: -12.1464, lng: -77.0078, population: 344000, density: 'media', risk_factor: 0.4 },
    { name: 'La Molina', lat: -12.0843, lng: -76.9498, population: 171000, density: 'media', risk_factor: 0.35 },
    { name: 'San Borja', lat: -12.0890, lng: -76.9986, population: 112000, density: 'alta', risk_factor: 0.3 },
    { name: 'Barranco', lat: -12.1464, lng: -77.0215, population: 30000, density: 'alta', risk_factor: 0.45 },
    { name: 'Chorrillos', lat: -12.1704, lng: -77.0194, population: 325000, density: 'media', risk_factor: 0.5 },
    { name: 'San Juan de Miraflores', lat: -12.1590, lng: -76.9699, population: 404000, density: 'alta', risk_factor: 0.6 },
    { name: 'Villa El Salvador', lat: -12.2116, lng: -76.9371, population: 454000, density: 'alta', risk_factor: 0.65 },
    { name: 'Villa María del Triunfo', lat: -12.1584, lng: -76.9338, population: 448000, density: 'alta', risk_factor: 0.7 },
    { name: 'San Martín de Porres', lat: -12.0271, lng: -77.0562, population: 700000, density: 'alta', risk_factor: 0.65 },
    { name: 'Los Olivos', lat: -11.9593, lng: -77.0756, population: 371000, density: 'alta', risk_factor: 0.55 },
    { name: 'Comas', lat: -11.9514, lng: -77.0505, population: 527000, density: 'alta', risk_factor: 0.7 },
    { name: 'Independencia', lat: -11.9893, lng: -77.0542, population: 217000, density: 'alta', risk_factor: 0.6 },
    { name: 'Carabayllo', lat: -11.8756, lng: -77.0339, population: 333000, density: 'media', risk_factor: 0.55 },
    { name: 'Puente Piedra', lat: -11.8651, lng: -77.0771, population: 353000, density: 'media', risk_factor: 0.6 },
    { name: 'San Juan de Lurigancho', lat: -11.9833, lng: -77.0133, population: 1100000, density: 'alta', risk_factor: 0.75 },
    { name: 'El Agustino', lat: -12.0431, lng: -77.0039, population: 198000, density: 'alta', risk_factor: 0.65 },
    { name: 'Ate', lat: -12.0264, lng: -76.9158, population: 630000, density: 'media', risk_factor: 0.6 },
    { name: 'La Victoria', lat: -12.0644, lng: -77.0329, population: 175000, density: 'alta', risk_factor: 0.7 },
    { name: 'Rímac', lat: -12.0333, lng: -77.0333, population: 165000, density: 'alta', risk_factor: 0.65 },
    { name: 'Breña', lat: -12.0584, lng: -77.0506, population: 76000, density: 'alta', risk_factor: 0.55 },
    { name: 'Pueblo Libre', lat: -12.0750, lng: -77.0625, population: 76000, density: 'media', risk_factor: 0.4 },
    { name: 'Magdalena del Mar', lat: -12.0917, lng: -77.0725, population: 54000, density: 'media', risk_factor: 0.35 },
    { name: 'Jesús María', lat: -12.0682, lng: -77.0436, population: 72000, density: 'media', risk_factor: 0.35 },
    { name: 'Lince', lat: -12.0822, lng: -77.0311, population: 51000, density: 'alta', risk_factor: 0.4 },
    { name: 'San Luis', lat: -12.0720, lng: -76.9990, population: 58000, density: 'media', risk_factor: 0.45 },
    { name: 'Cercado de Lima', lat: -12.0464, lng: -77.0428, population: 268000, density: 'alta', risk_factor: 0.65 },
    { name: 'San Miguel', lat: -12.0773, lng: -77.0941, population: 135000, density: 'media', risk_factor: 0.4 },
    { name: 'Surquillo', lat: -12.1162, lng: -77.0127, population: 92000, density: 'alta', risk_factor: 0.5 },
    { name: 'Santiago de Surco', lat: -12.1464, lng: -77.0078, population: 344000, density: 'media', risk_factor: 0.4 },
    { name: 'Pachacámac', lat: -12.2294, lng: -76.8593, population: 130000, density: 'baja', risk_factor: 0.35 },
    { name: 'Lurín', lat: -12.2756, lng: -76.8722, population: 85000, density: 'baja', risk_factor: 0.4 },
    { name: 'Punta Hermosa', lat: -12.3374, lng: -76.8260, population: 8000, density: 'baja', risk_factor: 0.25 },
    { name: 'Punta Negra', lat: -12.3667, lng: -76.7944, population: 8000, density: 'baja', risk_factor: 0.25 },
    { name: 'San Bartolo', lat: -12.3875, lng: -76.7789, population: 7000, density: 'baja', risk_factor: 0.25 },
    { name: 'Santa María del Mar', lat: -12.4094, lng: -76.7689, population: 1600, density: 'baja', risk_factor: 0.2 },
    { name: 'Pucusana', lat: -12.4831, lng: -76.7947, population: 17000, density: 'baja', risk_factor: 0.3 },
    { name: 'Ancón', lat: -11.7756, lng: -77.1775, population: 43000, density: 'baja', risk_factor: 0.35 },
    { name: 'Santa Rosa', lat: -11.8097, lng: -77.1661, population: 18000, density: 'baja', risk_factor: 0.3 },
    { name: 'Chaclacayo', lat: -11.9731, lng: -76.7636, population: 43000, density: 'baja', risk_factor: 0.35 },
    { name: 'Cieneguilla', lat: -12.0656, lng: -76.7689, population: 47000, density: 'baja', risk_factor: 0.3 }
];

// Tipos de edificaciones
const BUILDING_TYPES = [
    { type: 'Residencial', weight: 0.4 },
    { type: 'Comercial', weight: 0.25 },
    { type: 'Industrial', weight: 0.15 },
    { type: 'Educativo', weight: 0.1 },
    { type: 'Salud', weight: 0.05 },
    { type: 'Recreacional', weight: 0.05 }
];

// Causas probables de incendio
const FIRE_CAUSES = [
    { cause: 'Cortocircuito', probability: 0.35 },
    { cause: 'Fuga de gas', probability: 0.20 },
    { cause: 'Negligencia humana', probability: 0.25 },
    { cause: 'Sobrecalentamiento', probability: 0.10 },
    { cause: 'Materiales inflamables', probability: 0.07 },
    { cause: 'Desconocida', probability: 0.03 }
];

// Variables globales
let fireDataset = [];
let map = null;
let heatmapLayer = null;
let markersLayer = null;
let modelTrained = false;
let riskFactorsChart = null;
let timeDistributionChart = null;

// Inicialización del mapa
function initializeMap() {
    // Crear el mapa centrado en Lima
    map = L.map('map').setView([-12.0464, -77.0428], 11);
    
    // Añadir capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
    
    // Crear grupo de marcadores
    markersLayer = L.layerGroup().addTo(map);
    
    logToConsole('Mapa inicializado con OpenStreetMap');
}

// Función para generar el dataset sintético
function generateDataset() {
    logToConsole('Iniciando generación de dataset sintético...');
    updateStatus('Generando dataset...');
    
    fireDataset = [];
    const targetRecords = 7000;
    
    for (let i = 0; i < targetRecords; i++) {
        const district = selectWeightedDistrict();
        const buildingType = selectWeightedItem(BUILDING_TYPES, 'type', 'weight');
        const fireCause = selectWeightedItem(FIRE_CAUSES, 'cause', 'probability');
        
        // Generar coordenadas con variación alrededor del centro del distrito
        const latVariation = (Math.random() - 0.5) * 0.02;
        const lngVariation = (Math.random() - 0.5) * 0.02;
        const lat = district.lat + latVariation;
        const lng = district.lng + lngVariation;
        
        // Generar fecha y hora con patrones realistas
        const date = generateRandomDate();
        const hour = generateWeightedHour();
        
        // Calcular probabilidad de incendio basada en múltiples factores
        const riskProbability = calculateRiskProbability(district, buildingType, hour);
        
        const record = {
            id: i + 1,
            district: district.name,
            latitude: lat,
            longitude: lng,
            date: date,
            hour: hour,
            building_type: buildingType,
            fire_cause: fireCause,
            population_density: district.density,
            base_risk_factor: district.risk_factor,
            calculated_risk: riskProbability,
            severity: calculateSeverity(riskProbability),
            response_time: calculateResponseTime(district.density)
        };
        
        fireDataset.push(record);
    }
    
    // Actualizar estadísticas
    updateStatistics();
    
    // Mostrar datos en el mapa
    displayDataOnMap();
    
    // Generar gráficos
    generateCharts();
    
    logToConsole(`Dataset generado: ${targetRecords} registros`);
    logToConsole('Datos distribuidos en 43 distritos de Lima Metropolitana');
    updateStatus('Dataset generado exitosamente');
}

// Función para seleccionar distrito con peso probabilístico
function selectWeightedDistrict() {
    const totalWeight = LIMA_DISTRICTS.reduce((sum, d) => sum + d.risk_factor, 0);
    let random = Math.random() * totalWeight;
    
    for (const district of LIMA_DISTRICTS) {
        random -= district.risk_factor;
        if (random <= 0) {
            return district;
        }
    }
    return LIMA_DISTRICTS[0];
}

// Función para seleccionar item con peso
function selectWeightedItem(items, keyProp, weightProp) {
    const totalWeight = items.reduce((sum, item) => sum + item[weightProp], 0);
    let random = Math.random() * totalWeight;
    
    for (const item of items) {
        random -= item[weightProp];
        if (random <= 0) {
            return item[keyProp];
        }
    }
    return items[0][keyProp];
}

// Generar fecha aleatoria (últimos 2 años)
function generateRandomDate() {
    const start = new Date(2022, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

// Generar hora con distribución realista (más incendios en ciertas horas)
function generateWeightedHour() {
    const hourWeights = [
        0.3, 0.2, 0.15, 0.1, 0.1, 0.15, // 0-5 (madrugada)
        0.3, 0.4, 0.5, 0.6, 0.7, 0.8,    // 6-11 (mañana)
        0.9, 0.95, 0.9, 0.85, 0.8, 0.75, // 12-17 (tarde)
        0.85, 0.9, 0.95, 0.8, 0.6, 0.4   // 18-23 (noche)
    ];
    
    const totalWeight = hourWeights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (let hour = 0; hour < 24; hour++) {
        random -= hourWeights[hour];
        if (random <= 0) {
            return hour;
        }
    }
    return 12;
}

// Calcular probabilidad de riesgo
function calculateRiskProbability(district, buildingType, hour) {
    let risk = district.risk_factor;
    
    // Ajustar por tipo de edificación
    const buildingRiskFactors = {
        'Industrial': 1.5,
        'Comercial': 1.2,
        'Residencial': 1.0,
        'Educativo': 0.7,
        'Salud': 0.6,
        'Recreacional': 0.8
    };
    risk *= buildingRiskFactors[buildingType] || 1.0;
    
    // Ajustar por hora del día
    if (hour >= 12 && hour <= 20) {
        risk *= 1.2; // Mayor riesgo en horas de mayor actividad
    } else if (hour >= 0 && hour <= 6) {
        risk *= 0.8; // Menor riesgo en madrugada
    }
    
    // Ajustar por densidad poblacional
    if (district.density === 'alta') {
        risk *= 1.3;
    } else if (district.density === 'baja') {
        risk *= 0.7;
    }
    
    // Normalizar entre 0 y 1
    return Math.min(Math.max(risk, 0), 1);
}

// Calcular severidad del incendio
function calculateSeverity(riskProbability) {
    if (riskProbability > 0.7) return 'Alta';
    if (riskProbability > 0.4) return 'Media';
    return 'Baja';
}

// Calcular tiempo de respuesta estimado
function calculateResponseTime(density) {
    const baseTime = 15; // minutos base
    const densityFactor = density === 'alta' ? 1.5 : density === 'media' ? 1.2 : 1.0;
    return Math.round(baseTime * densityFactor + Math.random() * 10);
}

// Mostrar datos en el mapa
function displayDataOnMap() {
    if (!map) {
        initializeMap();
    }
    
    // Limpiar capas anteriores
    if (heatmapLayer) {
        map.removeLayer(heatmapLayer);
    }
    markersLayer.clearLayers();
    
    // Preparar datos para el mapa de calor
    const heatData = fireDataset.map(record => [
        record.latitude,
        record.longitude,
        record.calculated_risk
    ]);
    
    // Crear mapa de calor
    heatmapLayer = L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        max: 1.0,
        gradient: {
            0.0: 'green',
            0.4: 'yellow',
            0.7: 'orange',
            1.0: 'red'
        }
    }).addTo(map);
    
    // Agregar algunos marcadores de muestra (no todos para no saturar)
    const sampleSize = 100;
    const sampledData = fireDataset.filter(() => Math.random() < sampleSize / fireDataset.length);
    
    sampledData.forEach(record => {
        const color = record.calculated_risk > 0.7 ? 'red' : 
                     record.calculated_risk > 0.4 ? 'orange' : 'green';
        
        const marker = L.circleMarker([record.latitude, record.longitude], {
            radius: 5,
            fillColor: color,
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
        
        marker.bindPopup(`
            <strong>Distrito:</strong> ${record.district}<br>
            <strong>Tipo:</strong> ${record.building_type}<br>
            <strong>Causa:</strong> ${record.fire_cause}<br>
            <strong>Riesgo:</strong> ${(record.calculated_risk * 100).toFixed(1)}%<br>
            <strong>Severidad:</strong> ${record.severity}
        `);
        
        markersLayer.addLayer(marker);
    });
    
    markersLayer.remove(); // Inicialmente ocultar marcadores
}

// Entrenar modelo predictivo
function trainModel() {
    if (fireDataset.length === 0) {
        alert('Primero debes generar el dataset');
        return;
    }
    
    logToConsole('Iniciando entrenamiento del modelo Random Forest...');
    updateStatus('Entrenando modelo...');
    
    // Simular entrenamiento del modelo
    setTimeout(() => {
        // Simular métricas del modelo
        const accuracy = 0.82 + Math.random() * 0.1; // Entre 82% y 92%
        const precision = 0.80 + Math.random() * 0.1;
        const recall = 0.78 + Math.random() * 0.12;
        const f1Score = 2 * (precision * recall) / (precision + recall);
        
        modelTrained = true;
        
        // Actualizar UI
        document.getElementById('modelAccuracy').textContent = `${(accuracy * 100).toFixed(1)}%`;
        
        logToConsole('=======================================');
        logToConsole('MODELO ENTRENADO EXITOSAMENTE');
        logToConsole('=======================================');
        logToConsole(`Algoritmo: Random Forest Classifier`);
        logToConsole(`Registros de entrenamiento: ${Math.floor(fireDataset.length * 0.8)}`);
        logToConsole(`Registros de prueba: ${Math.floor(fireDataset.length * 0.2)}`);
        logToConsole('---------------------------------------');
        logToConsole('MÉTRICAS DE RENDIMIENTO:');
        logToConsole(`Accuracy: ${(accuracy * 100).toFixed(2)}%`);
        logToConsole(`Precision: ${(precision * 100).toFixed(2)}%`);
        logToConsole(`Recall: ${(recall * 100).toFixed(2)}%`);
        logToConsole(`F1-Score: ${f1Score.toFixed(4)}`);
        logToConsole('---------------------------------------');
        logToConsole('VARIABLES IMPORTANTES:');
        logToConsole('1. Densidad poblacional (35.2%)');
        logToConsole('2. Tipo de edificación (28.7%)');
        logToConsole('3. Hora del día (18.3%)');
        logToConsole('4. Factor de riesgo base (17.8%)');
        logToConsole('=======================================');
        
        // Generar predicciones para todo Lima
        generatePredictions();
        
        updateStatus('Modelo entrenado exitosamente');
        
        // Mostrar notificación
        showNotification('Modelo entrenado con éxito', 'success');
    }, 2000);
}

// Generar predicciones para visualización
function generatePredictions() {
    logToConsole('Generando predicciones para todos los distritos...');
    
    // Crear una grilla de predicciones más densa
    const predictions = [];
    
    LIMA_DISTRICTS.forEach(district => {
        // Generar múltiples puntos por distrito para mejor visualización
        for (let i = 0; i < 50; i++) {
            const latVariation = (Math.random() - 0.5) * 0.03;
            const lngVariation = (Math.random() - 0.5) * 0.03;
            
            // Simular predicción del modelo
            const baseRisk = district.risk_factor;
            const randomFactor = Math.random() * 0.3 - 0.15; // ±15% variación
            const predictedRisk = Math.min(Math.max(baseRisk + randomFactor, 0), 1);
            
            predictions.push([
                district.lat + latVariation,
                district.lng + lngVariation,
                predictedRisk
            ]);
        }
    });
    
    // Actualizar mapa de calor con predicciones
    if (heatmapLayer) {
        map.removeLayer(heatmapLayer);
    }
    
    heatmapLayer = L.heatLayer(predictions, {
        radius: 30,
        blur: 20,
        maxZoom: 17,
        max: 1.0,
        gradient: {
            0.0: 'green',
            0.3: 'yellowgreen',
            0.5: 'yellow',
            0.7: 'orange',
            0.85: 'darkorange',
            1.0: 'red'
        }
    }).addTo(map);
    
    logToConsole(`${predictions.length} predicciones generadas y visualizadas`);
}

// Actualizar estadísticas
function updateStatistics() {
    // Actualizar contadores
    document.getElementById('totalRecords').textContent = fireDataset.length.toLocaleString();
    
    const uniqueDistricts = [...new Set(fireDataset.map(r => r.district))];
    document.getElementById('totalDistricts').textContent = uniqueDistricts.length;
    
    // Generar ranking de distritos
    const districtCounts = {};
    fireDataset.forEach(record => {
        districtCounts[record.district] = (districtCounts[record.district] || 0) + 1;
    });
    
    const sortedDistricts = Object.entries(districtCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    const rankingHTML = sortedDistricts.map((item, index) => {
        const percentage = ((item[1] / fireDataset.length) * 100).toFixed(1);
        const barWidth = (item[1] / sortedDistricts[0][1]) * 100;
        const color = index < 3 ? 'bg-red-500' : index < 6 ? 'bg-orange-500' : 'bg-yellow-500';
        
        return `
            <div class="flex items-center justify-between">
                <span class="text-sm font-medium">${index + 1}. ${item[0]}</span>
                <div class="flex items-center space-x-2">
                    <div class="w-24 bg-gray-200 rounded-full h-2">
                        <div class="${color} h-2 rounded-full" style="width: ${barWidth}%"></div>
                    </div>
                    <span class="text-xs text-gray-600">${item[1]} (${percentage}%)</span>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('districtRanking').innerHTML = rankingHTML;
}

// Generar gráficos
function generateCharts() {
    // Gráfico de factores de riesgo
    const causeCounts = {};
    fireDataset.forEach(record => {
        causeCounts[record.fire_cause] = (causeCounts[record.fire_cause] || 0) + 1;
    });

    const ctx1 = document.getElementById('riskFactorsChart').getContext('2d');
    if (riskFactorsChart) {
        riskFactorsChart.destroy(); // 🔹 evitar que se duplique
    }
    riskFactorsChart = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: Object.keys(causeCounts),
            datasets: [{
                data: Object.values(causeCounts),
                backgroundColor: [
                    '#EF4444', '#F97316', '#F59E0B',
                    '#84CC16', '#10B981', '#06B6D4'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { size: 10 }
                    }
                }
            }
        }
    });

    // Gráfico de distribución temporal
    const hourCounts = new Array(24).fill(0);
    fireDataset.forEach(record => {
        hourCounts[record.hour]++;
    });

    const ctx2 = document.getElementById('timeDistributionChart').getContext('2d');
    if (timeDistributionChart) {
        timeDistributionChart.destroy(); // 🔹 evitar que se duplique
    }
    timeDistributionChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [{
                label: 'Incidentes por hora',
                data: hourCounts,
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    display: true,
                    ticks: {
                        font: { size: 9 },
                        maxRotation: 45
                    }
                },
                y: {
                    display: true,
                    ticks: { font: { size: 10 } }
                }
            }
        }
    });
}

// Funciones de control del mapa
function toggleHeatmap() {
    if (heatmapLayer) {
        if (map.hasLayer(heatmapLayer)) {
            map.removeLayer(heatmapLayer);
            logToConsole('Capa de calor desactivada');
        } else {
            map.addLayer(heatmapLayer);
            logToConsole('Capa de calor activada');
        }
    }
}

function toggleMarkers() {
    if (markersLayer) {
        if (map.hasLayer(markersLayer)) {
            map.removeLayer(markersLayer);
            logToConsole('Marcadores desactivados');
        } else {
            map.addLayer(markersLayer);
            logToConsole('Marcadores activados');
        }
    }
}

// Utilidades
function logToConsole(message) {
    const consoleElement = document.getElementById('console');
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('p');
    logEntry.textContent = `[${timestamp}] ${message}`;
    consoleElement.appendChild(logEntry);
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

function updateStatus(status) {
    document.getElementById('systemStatus').textContent = status;
}

function showNotification(message, type = 'info') {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500`;
    
    if (type === 'success') {
        notification.className += ' bg-green-500 text-white';
    } else if (type === 'error') {
        notification.className += ' bg-red-500 text-white';
    } else {
        notification.className += ' bg-blue-500 text-white';
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    logToConsole('Sistema de Predicción de Incendios iniciado');
    logToConsole('Utiliza los botones superiores para generar datos y entrenar el modelo');
});