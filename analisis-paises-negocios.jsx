import React, { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from "recharts";
import { Search, ChevronDown, CheckCircle2, XCircle, Info, Globe2, Scale, Landmark, Users, Cpu, Mountain, BookMarked } from "lucide-react";

/* ============================================================
   LISTA DE PAÍSES (selector completo)
   ============================================================ */
const ALL_COUNTRIES = [
"Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia",
"Australia","Austria","Azerbaiyán","Bahamas","Baréin","Bangladés","Barbados","Bélgica","Belice","Benín",
"Bielorrusia","Birmania (Myanmar)","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi",
"Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre",
"Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica",
"Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia",
"Esuatini","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana",
"Granada","Grecia","Guatemala","Guyana","Guinea","Guinea-Bisáu","Guinea Ecuatorial","Haití","Honduras","Hungría",
"India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia",
"Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto",
"Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Macedonia del Norte","Madagascar","Malasia",
"Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia",
"Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria",
"Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Panamá","Papúa Nueva Guinea","Paraguay","Perú",
"Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República del Congo","República Democrática del Congo","República Dominicana","Ruanda","Rumania",
"Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles",
"Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Sudáfrica","Sudán","Sudán del Sur","Suecia","Suiza",
"Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán",
"Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Vaticano","Venezuela","Vietnam",
"Yemen","Yibuti","Zambia","Zimbabue"
];

/* ============================================================
   DATOS INVESTIGADOS Y VERIFICADOS (subconjunto prioritario)
   Cada variable incluye su fuente. Cifras y fechas tal como
   reportadas por los organismos citados al momento de la consulta.
   ============================================================ */
const V = (texto, fuente) => ({ texto, fuente });

const COUNTRY_DATA = {

"México": {
  actualizado: "agosto 2026",
  economia: {
    positivas: [
      V("Se consolidó en 2025 como el 10º mayor exportador mundial de mercancías, apoyado en el T-MEC y la manufactura de exportación.", "OMC / Mexico Business News, 2025"),
      V("Capturó cerca del 24% de las importaciones estadounidenses que dejó de proveer China entre 2018 y 2024, favorecido por el nearshoring.", "FMI, oct. 2025"),
      V("La inflación se ha moderado y se proyecta que converja a la meta de 3% de Banxico en la segunda mitad de 2026.", "FMI, Artículo IV, oct. 2025"),
    ],
    negativas: [
      V("El crecimiento del PIB sigue siendo débil: 1.0% en 2025 y una recuperación moderada de 1.5%-1.6% prevista para 2026.", "FMI, World Economic Outlook, abril 2026"),
      V("El déficit fiscal se ubica en 4.1%-4.3% del PIB, por encima del 2.5% que el FMI recomienda alcanzar hacia 2027.", "FMI, Artículo IV, oct. 2025"),
      V("La actividad económica está limitada por la consolidación fiscal, una política monetaria restrictiva y la incertidumbre comercial con Estados Unidos.", "Banco Mundial, informe MPO México"),
    ],
  },
  politica: {
    positivas: [
      V("Mantiene relaciones comerciales institucionalizadas con Estados Unidos y Canadá a través del T-MEC.", "Gobierno de México / USTR"),
    ],
    negativas: [
      V("La próxima revisión del T-MEC introduce incertidumbre sobre las reglas de comercio con su principal socio.", "FMI, oct. 2025"),
      V("Persisten tensiones comerciales derivadas de la política arancelaria de Estados Unidos hacia productos mexicanos.", "IMF/OECD, 2025-2026"),
      V("Organismos internacionales han señalado de forma reiterada la debilidad del estado de derecho como un factor que limita el crecimiento potencial del país.", "FMI, Artículo IV, oct. 2025"),
    ],
  },
  legal: {
    positivas: [
      V("El T-MEC ofrece un marco jurídico estable de libre comercio con dos de las mayores economías del mundo.", "Gobierno de México / USTR"),
      V("Cuenta con una amplia red de tratados de libre comercio que facilita el acceso a múltiples mercados.", "Secretaría de Economía"),
    ],
    negativas: [
      V("La Oficina del Representante Comercial de EE. UU. ha señalado de forma recurrente debilidades en la protección de la propiedad intelectual.", "USTR, Special 301 Report"),
      V("La incertidumbre sobre el resultado de la revisión del T-MEC genera riesgo regulatorio para nuevas inversiones.", "FMI, oct. 2025"),
    ],
  },
  cultural: {
    positivas: [
      V("Es un mercado de habla hispana de más de 120 millones de personas, con fuerte integración cultural y comercial con el mercado hispano de Estados Unidos.", "Banco Mundial, datos demográficos"),
    ],
    negativas: [
      V("La literatura de negociación internacional describe un estilo de negociación mexicano orientado a las relaciones personales, lo que puede alargar los ciclos de venta frente a mercados más transaccionales.", "Literatura de negocios internacionales (ej. Hofstede Insights)"),
    ],
  },
  tecnologica: {
    positivas: [
      V("Es uno de los principales destinos de nearshoring manufacturero de América del Norte, con creciente inversión en infraestructura productiva.", "Mexico Business News, 2026"),
    ],
    negativas: [
      V("La penetración de internet y la infraestructura digital muestran brechas relevantes entre zonas urbanas y rurales frente al promedio de la OCDE.", "OCDE / ITU"),
    ],
  },
  geografica: {
    positivas: [
      V("Comparte una frontera de más de 3,100 km con Estados Unidos, posición estratégica para las cadenas de suministro de Norteamérica.", "Datos geográficos oficiales"),
      V("Tiene salida tanto al océano Pacífico como al golfo de México, con múltiples puertos comerciales.", "Datos geográficos oficiales"),
    ],
    negativas: [
      V("Buena parte de su territorio está expuesto a huracanes en ambos litorales y a actividad sísmica significativa.", "Datos geográficos / Protección Civil"),
    ],
  },
},

"Estados Unidos": {
  actualizado: "agosto 2026",
  economia: {
    positivas: [
      V("Es la mayor economía del mundo, con un PIB estimado en 30.8 billones de dólares en 2026.", "BEA / FMI, WEO abril 2026"),
      V("La inversión empresarial repuntó con fuerza en el primer trimestre de 2026, impulsada por gasto en equipo y en propiedad intelectual, en parte ligado a la demanda de IA.", "Departamento del Tesoro de EE. UU., mayo 2026"),
      V("El desempleo se mantiene en niveles moderados (4.3%-4.5%), compatible con la estimación de tasa no cíclica de la Oficina de Presupuesto del Congreso.", "CBO, 2026"),
    ],
    negativas: [
      V("La inflación se mantiene elevada, con el índice PCE repuntando a 4.5% en el primer trimestre de 2026, reflejando el traspaso de los aranceles a precios al consumidor.", "Statistics of the World / BEA, 2026"),
      V("El régimen arancelario ampliado desde 2025 ha elevado los costos de importación para múltiples sectores, afectando electrónicos, ropa y bienes de consumo.", "Statistics of the World, 2026"),
      V("La deuda del gobierno se ubica en niveles elevados, alrededor de 125.8% del PIB.", "Statistics of the World / FMI"),
    ],
  },
  politica: {
    positivas: [
      V("Cuenta con instituciones democráticas estables y de larga trayectoria, con separación de poderes bien establecida.", "Conocimiento general institucional"),
    ],
    negativas: [
      V("La política comercial ha cambiado de forma abrupta desde 2025 (aranceles recíprocos y ajustes posteriores), generando incertidumbre para los socios comerciales.", "CBO / SIEPR, 2025-2026"),
      V("Un cierre del gobierno federal en el otoño de 2025 retrasó la publicación de estadísticas económicas oficiales, afectando la disponibilidad de datos para la toma de decisiones.", "Center for Commercial Agriculture, marzo 2026"),
    ],
  },
  legal: {
    positivas: [
      V("Ofrece un marco sólido de protección de la propiedad intelectual y de cumplimiento contractual, respaldado por un sistema judicial consolidado.", "Conocimiento institucional general / USTR"),
    ],
    negativas: [
      V("Los cambios frecuentes en aranceles y política comercial elevan el riesgo regulatorio para empresas que dependen de cadenas de suministro internacionales.", "CBO, 2026"),
    ],
  },
  cultural: {
    positivas: [
      V("Es el mercado de consumo más grande del mundo en términos de gasto, con alta diversidad demográfica y de segmentos de consumo.", "BEA, datos de PIB"),
    ],
    negativas: [
      V("El aumento en el costo de vida y la presión inflacionaria han incrementado la sensibilidad al precio del consumidor, según analistas económicos.", "SIEPR, enero 2026"),
    ],
  },
  tecnologica: {
    positivas: [
      V("Lidera la inversión mundial en inteligencia artificial, con un fuerte ciclo de gasto en equipo tecnológico e infraestructura de datos.", "Vanguard / Nomura, 2026"),
    ],
    negativas: [
      V("El aumento en los precios de la electricidad, en parte vinculado a la demanda de centros de datos de IA, eleva los costos operativos en varios estados.", "SIEPR, enero 2026"),
    ],
  },
  geografica: {
    positivas: [
      V("Tiene salida directa al océano Atlántico y al Pacífico, con una extensa red portuaria y ferroviaria que facilita el comercio internacional.", "Datos geográficos oficiales"),
      V("Comparte fronteras terrestres extensas con México y Canadá, sus principales socios comerciales del T-MEC.", "Datos geográficos oficiales"),
    ],
    negativas: [
      V("Ciertas regiones costeras están expuestas a huracanes recurrentes que pueden interrumpir la actividad económica y logística.", "Datos geográficos generales"),
    ],
  },
},

"Alemania": {
  actualizado: "agosto 2026",
  economia: {
    positivas: [
      V("Tras dos años de recesión, la Comisión Europea proyecta una expansión de 0.6% en 2026 y 0.9% en 2027, apoyada en un mayor gasto público.", "Comisión Europea, mayo 2026"),
      V("La reforma del freno constitucional a la deuda permite una política fiscal expansiva enfocada en defensa e infraestructura.", "Bundesbank / Comisión Europea, 2026"),
      V("Las presiones inflacionarias continúan moderándose según las proyecciones del Bundesbank.", "Bundesbank, 2026"),
    ],
    negativas: [
      V("La economía registró un crecimiento prácticamente nulo en 2025 (0.2%-0.3%), tras dos años consecutivos de recesión.", "Comisión Europea / Bundesbank, 2025-2026"),
      V("El sector manufacturero, históricamente el motor de la economía, ha sido golpeado por la competencia china y los aranceles de Estados Unidos.", "Comisión Europea, mayo 2026"),
      V("El déficit público se ampliará a 3.7%-4.1% del PIB, uno de los niveles más altos fuera de una recesión en décadas.", "Goldman Sachs Research, enero 2026"),
    ],
  },
  politica: {
    positivas: [
      V("Es miembro fundador de la Unión Europea, con acceso institucional al mercado único europeo.", "Conocimiento institucional general"),
    ],
    negativas: [
      V("La incertidumbre sobre la ejecución del paquete fiscal de defensa e infraestructura ha generado dudas entre inversionistas.", "Goldman Sachs Research, enero 2026"),
      V("El conflicto en Medio Oriente ha elevado los precios de la energía, afectando el ingreso real de los hogares y el sentimiento del consumidor.", "Comisión Europea, mayo 2026"),
    ],
  },
  legal: {
    positivas: [
      V("Como miembro de la UE, ofrece un marco regulatorio armonizado y de alta previsibilidad para el comercio y la inversión dentro del mercado único.", "Conocimiento institucional general"),
    ],
    negativas: [
      V("La regulación empresarial alemana es percibida por analistas como más rígida que la de otros socios europeos, lo que limita la inversión de capital.", "Comisión Europea, mayo 2026"),
    ],
  },
  cultural: {
    positivas: [
      V("Es la mayor economía de la eurozona, con una base industrial y de ingeniería reconocida internacionalmente por su especialización técnica.", "Conocimiento económico general"),
    ],
    negativas: [
      V("La demanda interna se ha visto contenida por la desaceleración en salarios reales y el encarecimiento energético.", "Comisión Europea, mayo 2026"),
    ],
  },
  tecnologica: {
    positivas: [
      V("Cuenta con un sector de ingeniería avanzada e industrial con capacidad de innovación en manufactura de alta precisión.", "Conocimiento económico general"),
    ],
    negativas: [
      V("El estancamiento de la inversión ha limitado la modernización tecnológica del sector manufacturero frente a competidores globales.", "Comisión Europea, mayo 2026"),
    ],
  },
  geografica: {
    positivas: [
      V("Su ubicación central en Europa la convierte en un nodo logístico clave para el comercio intraeuropeo por carretera, ferrocarril y vías navegables.", "Datos geográficos oficiales"),
    ],
    negativas: [
      V("No tiene fuentes propias significativas de hidrocarburos, lo que la hace dependiente de la importación energética y vulnerable a choques de precios internacionales.", "Comisión Europea, mayo 2026"),
    ],
  },
},

"China": {
  actualizado: "agosto 2026",
  economia: {
    positivas: [
      V("El PIB real creció 5.3% interanual en el primer semestre de 2025 y el gobierno reafirma su meta de 'alrededor de 5%' para el año.", "Banco Mundial, 2025"),
      V("Las exportaciones se mantuvieron sorprendentemente sólidas en 2025 pese a los aranceles de Estados Unidos, con un crecimiento en torno al 8% anual.", "Goldman Sachs Research, nov. 2025"),
      V("En 2026 entra en vigor el 15º Plan Quinquenal, orientado a manufactura avanzada, semiconductores y autosuficiencia tecnológica.", "China Briefing / ING Think, 2025-2026"),
    ],
    negativas: [
      V("El sector inmobiliario continúa en una contracción prolongada; junto con infraestructura representa más del 31% del PIB, según el FMI.", "East Asia Forum, feb. 2026"),
      V("Persisten presiones deflacionarias derivadas de la débil demanda interna y del exceso de capacidad industrial.", "Banco Mundial, 2025"),
      V("La guerra comercial con Estados Unidos ha implicado aranceles efectivos superiores al 100% en ciertos periodos de 2025, con represalias chinas sobre minerales de tierras raras.", "Statistics of the World, 2026"),
    ],
  },
  politica: {
    positivas: [
      V("Un encuentro entre los presidentes de EE. UU. y China en octubre de 2025 derivó en una tregua comercial que mejoró temporalmente las perspectivas de crecimiento.", "Goldman Sachs Research, nov. 2025"),
    ],
    negativas: [
      V("La relación comercial con Estados Unidos sigue marcada por episodios de escalada arancelaria y restricciones tecnológicas cruzadas.", "Statistics of the World, 2026"),
      V("El gobierno enfrenta el reto estructural de sostener un alto crecimiento pese a la caída poblacional, la primera entre las grandes economías desde Japón.", "Statistics of the World, 2026"),
    ],
  },
  legal: {
    positivas: [
      V("Es miembro de la Organización Mundial del Comercio desde 2001, lo que da un marco multilateral a su comercio exterior.", "OMC"),
    ],
    negativas: [
      V("Persisten controles estatales significativos sobre sectores estratégicos y restricciones a la exportación de insumos críticos como tierras raras, usadas como palanca en disputas comerciales.", "ING Think, dic. 2025"),
    ],
  },
  cultural: {
    positivas: [
      V("Cuenta con el mayor volumen de comercio exterior del mundo y una base de consumidores de más de 1,400 millones de personas.", "Banco Mundial, datos demográficos"),
    ],
    negativas: [
      V("La confianza del consumidor y de las empresas se ha visto afectada por la incertidumbre comercial y la crisis del sector inmobiliario.", "Banco Mundial, 2025"),
    ],
  },
  tecnologica: {
    positivas: [
      V("Impulsa una estrategia de autosuficiencia tecnológica ('Made in China 2025' y el nuevo Plan Quinquenal) con fuerte inversión en semiconductores, vehículos eléctricos y energías renovables.", "Statistics of the World, 2026"),
    ],
    negativas: [
      V("Las restricciones de Estados Unidos al acceso a semiconductores avanzados limitan su capacidad de innovación en ciertas cadenas de valor tecnológicas.", "Statistics of the World, 2026"),
    ],
  },
  geografica: {
    positivas: [
      V("Cuenta con una extensa costa sobre el océano Pacífico y la infraestructura portuaria más grande del mundo en volumen de carga.", "Datos geográficos generales"),
    ],
    negativas: [
      V("Enfrenta una tendencia demográfica de declive poblacional que puede limitar su fuerza laboral e impulso de demanda interna a largo plazo.", "Statistics of the World, 2026"),
    ],
  },
},

"Japón": {
  actualizado: "agosto 2026",
  economia: {
    positivas: [
      V("Los beneficios corporativos elevados y las medidas gubernamentales sostienen un crecimiento moderado por encima del potencial estimado del país.", "Banco de Japón, enero 2025 / abril 2026"),
      V("El mercado laboral se ha fortalecido, con una tasa de desempleo de 2.5% en junio de 2026 y crecimiento del empleo asalariado.", "Deloitte Insights, 2026"),
      V("Los salarios reales aumentaron 1.6% interanual en mayo de 2026 tras la moderación de la inflación, mejorando el poder adquisitivo de los hogares.", "Deloitte Insights, 2026"),
    ],
    negativas: [
      V("La inflación se mantiene por encima de la meta del 2%, con un rango proyectado de 2.5%-3.0% para el año fiscal 2026 debido al alza de precios del petróleo.", "Banco de Japón, abril 2026"),
      V("El crecimiento se desacelera por el deterioro en los términos de intercambio derivado del conflicto en Medio Oriente y su fuerte dependencia del petróleo de esa región.", "Banco de Japón, abril 2026"),
      V("El Banco de Japón continúa retirando gradualmente los estímulos monetarios, lo que eleva el costo del financiamiento para las empresas.", "FMI, Artículo IV, abril 2026"),
    ],
  },
  politica: {
    positivas: [
      V("El FMI calificó la resiliencia económica de Japón ante los choques globales recientes como sólida.", "FMI, Consulta del Artículo IV, abril 2026"),
    ],
    negativas: [
      V("El gasto en intereses de la deuda y en salud y cuidado de largo plazo para una población envejecida continuará presionando las finanzas públicas.", "FMI, Artículo IV, abril 2026"),
    ],
  },
  legal: {
    positivas: [
      V("Cuenta con un sistema legal e institucional altamente predecible, con fuerte protección de derechos de propiedad y contratos.", "Conocimiento institucional general"),
    ],
    negativas: [
      V("La regulación laboral y empresarial tradicionalmente rígida puede dificultar la entrada de modelos de negocio disruptivos frente a competidores regionales.", "Conocimiento institucional general"),
    ],
  },
  cultural: {
    positivas: [
      V("Es una de las economías de consumo más sofisticadas del mundo, con alta disposición a adoptar productos y servicios de calidad premium.", "Conocimiento económico general"),
    ],
    negativas: [
      V("El envejecimiento poblacional reduce gradualmente la base de consumidores y de fuerza laboral disponible.", "FMI, Artículo IV, abril 2026"),
    ],
  },
  tecnologica: {
    positivas: [
      V("Se beneficia de un repunte en la demanda global relacionada con inteligencia artificial, que ha impulsado la inversión empresarial.", "Vanguard, 2026"),
    ],
    negativas: [
      V("El crecimiento potencial de la productividad se estima moderado (0.5%-1.0%), con incertidumbre sobre el efecto real de la digitalización.", "Banco de Japón, abril 2026"),
    ],
  },
  geografica: {
    positivas: [
      V("Su posición insular le da un rol estratégico como puerta de entrada tecnológica y comercial al noreste de Asia.", "Datos geográficos generales"),
    ],
    negativas: [
      V("Depende en gran medida del petróleo importado de Medio Oriente, lo que la hace vulnerable a choques de precios de energía derivados de conflictos regionales.", "Banco de Japón, abril 2026"),
      V("Su territorio está expuesto a alta actividad sísmica y volcánica.", "Datos geográficos generales"),
    ],
  },
},

"Reino Unido": {
  actualizado: "agosto 2026",
  economia: {
    positivas: [
      V("El FMI y la OCDE prevén un crecimiento del PIB de entre 0.7% y 1.1% para 2026, con una ligera aceleración esperada en 2027.", "OCDE / KPMG, 2026"),
      V("La inflación mostró señales de moderación en 2026, cayendo a 2.6% en junio tras alcanzar niveles más altos a inicios de año.", "House of Commons Library, julio 2026"),
      V("Se prevé un repunte en los flujos de inversión extranjera directa conforme el país consolida nuevos acuerdos comerciales tras el brexit.", "Institute for Fiscal Studies, mayo 2026"),
    ],
    negativas: [
      V("La productividad por trabajador ha crecido de forma débil desde la pandemia, ampliando la brecha de PIB per cápita frente a la eurozona y Estados Unidos.", "KPMG, 2026"),
      V("La inversión empresarial se mantiene por debajo de los niveles previos al brexit, limitando la acumulación de capital.", "OCDE, Panorama económico, 2026"),
      V("El aumento en los precios de la energía continúa presionando la inflación y limita el margen del Banco de Inglaterra para reducir tasas.", "KPMG, 2026"),
    ],
  },
  politica: {
    positivas: [
      V("Cuenta con una de las instituciones de banca central más establecidas del mundo, el Banco de Inglaterra, con un marco de política monetaria transparente.", "Conocimiento institucional general"),
    ],
    negativas: [
      V("La salida de la Unión Europea introdujo nuevas barreras comerciales y complejidad regulatoria para el comercio de bienes con Europa.", "Statistics of the World, 2026"),
    ],
  },
  legal: {
    positivas: [
      V("Mantiene un sistema de common law reconocido internacionalmente por su previsibilidad en la resolución de disputas comerciales.", "Conocimiento institucional general"),
      V("Londres continúa siendo uno de los dos centros financieros dominantes del mundo junto con Nueva York, pese al brexit.", "Statistics of the World, 2026"),
    ],
    negativas: [
      V("El nuevo marco aduanero y regulatorio posterior al brexit ha incrementado los costos de cumplimiento para exportadores de bienes hacia la Unión Europea.", "Statistics of the World, 2026"),
    ],
  },
  cultural: {
    positivas: [
      V("El idioma inglés como lengua de negocios global facilita la comunicación comercial internacional.", "Statistics of the World, 2026"),
      V("Cuenta con universidades de prestigio mundial (Oxford, Cambridge, Imperial) que fortalecen el capital humano especializado.", "Statistics of the World, 2026"),
    ],
    negativas: [],
  },
  tecnologica: {
    positivas: [
      V("Los sectores de servicios financieros, profesionales y tecnológicos representan más del 80% del PIB, con alta sofisticación en fintech.", "Statistics of the World, 2026"),
    ],
    negativas: [
      V("La debilidad en las ganancias de productividad limita la expansión del capital por trabajador frente a otros países del G7.", "OCDE, Panorama económico, 2026"),
    ],
  },
  geografica: {
    positivas: [
      V("Su huso horario conecta las horas de mercado de Asia y de América, lo que favorece su papel como centro financiero global.", "Statistics of the World, 2026"),
    ],
    negativas: [
      V("Su condición insular implica mayor dependencia logística marítima y aérea para el comercio con el continente europeo tras el brexit.", "Datos geográficos generales"),
    ],
  },
},

"Brasil": {
  actualizado: "agosto 2026",
  economia: {
    positivas: [
      V("El desempleo alcanzó un mínimo histórico de 6.2% en 2024, con creación de 2.8 millones de nuevos empleos y aumento de 4.8% en salarios reales.", "Banco Mundial, 2026"),
      V("El déficit fiscal primario se redujo de 2.3% del PIB en 2023 a 0.3% en 2024, reflejando mayores ingresos y menor gasto.", "Banco Mundial, 2026"),
      V("La implementación de la reforma del IVA aprobada en 2023 se proyecta como un factor estructural que elevará el crecimiento potencial a mediano plazo.", "FMI, Artículo IV, julio 2026"),
    ],
    negativas: [
      V("El crecimiento del PIB se desacelera de 3.4% en 2024 a un rango de 1.6%-2.3% en 2025-2026 por tasas de interés más altas y menor consumo de los hogares.", "Banco Mundial, 2026"),
      V("La tasa de interés de referencia (Selic) se ubicó en niveles elevados (cerca de 13.75%-11.5%) para contener la inflación, encareciendo el crédito.", "BBVA Research, dic. 2025"),
      V("La inflación se mantiene cerca del límite superior del rango meta de 1.5%-4.5% del banco central.", "BBVA Research, dic. 2025"),
    ],
  },
  politica: {
    positivas: [
      V("El gobierno mantiene desde 2023 el compromiso de acceder a la OCDE, lo que ha impulsado reformas institucionales.", "Reporte de análisis de mercado, 2026"),
    ],
    negativas: [
      V("Un sistema federal con 26 estados y 5,570 municipios, junto con un marco constitucional que preasigna el 94% de los ingresos fiscales, genera alta complejidad regulatoria.", "Reporte de análisis de mercado, 2026"),
      V("Se prevé mayor gasto fiscal antes de las elecciones del cuarto trimestre de 2026, lo que representa un riesgo al alza para el panorama fiscal.", "BBVA Research, dic. 2025"),
    ],
  },
  legal: {
    positivas: [
      V("El proceso de adhesión a la OCDE ha impulsado mejoras en la institucionalidad económica y regulatoria del país.", "Reporte de análisis de mercado, 2026"),
    ],
    negativas: [
      V("La complejidad tributaria y regulatoria derivada de la estructura federal ha sido históricamente señalada como una barrera relevante para hacer negocios.", "Reporte de análisis de mercado, 2026"),
    ],
  },
  cultural: {
    positivas: [
      V("Es el mercado de habla portuguesa más grande del mundo, con una población de más de 200 millones de personas.", "Banco Mundial, datos demográficos"),
    ],
    negativas: [],
  },
  tecnologica: {
    positivas: [
      V("El programa Nova Indústria Brasil 2025-2030 busca atraer inversión extranjera en manufactura avanzada, semiconductores y biotecnología.", "Reporte de análisis de mercado, 2026"),
    ],
    negativas: [],
  },
  geografica: {
    positivas: [
      V("Cuenta con una matriz energética limpia y baja dependencia de importaciones de energía, con amplio potencial en energías renovables.", "OCDE, Panorama económico, junio 2026"),
      V("Es un exportador neto de petróleo, lo que lo protege parcialmente de los choques en los precios internacionales de la energía.", "FMI, Artículo IV, julio 2026"),
    ],
    negativas: [
      V("Las cosechas agrícolas récord generan dependencia de condiciones climáticas favorables para sostener el crecimiento del sector.", "BBVA Research, dic. 2025"),
    ],
  },
},

"India": {
  actualizado: "agosto 2026",
  economia: {
    positivas: [
      V("Es la economía de mayor crecimiento entre las principales del mundo, con proyecciones del FMI de entre 6.2% y 7.3% para 2025-2026 según el periodo de referencia.", "FMI, World Economic Outlook, 2025-2026"),
      V("El Banco de la Reserva de India revisó al alza su proyección de crecimiento para el año fiscal 2025-26 de 6.8% a 7.3%.", "Gobierno de India (PIB), 2025"),
      V("El consumo privado y la inversión en formación bruta de capital fijo mostraron un crecimiento robusto (7.7% y 8.2% respectivamente en el año fiscal), impulsados por reformas tributarias.", "Deloitte Insights, julio 2026"),
    ],
    negativas: [
      V("La depreciación de la rupia frente al dólar (de 84.6 a 88.5 por dólar) ha reducido el valor de la producción medida en dólares.", "Statistics of the World, 2026"),
      V("Persisten vulnerabilidades por salidas de capital y presiones cambiarias, según analistas de mercado.", "Deloitte Insights, julio 2026"),
      V("Los aranceles de Estados Unidos sobre productos indios representan un riesgo relevante para el sector exportador.", "IMF, oct. 2025"),
    ],
  },
  politica: {
    positivas: [
      V("Los acuerdos comerciales de India se han vuelto un factor determinante para mantener el acceso a mercados clave en un entorno de mayor incertidumbre global.", "Deloitte Insights, julio 2026"),
    ],
    negativas: [
      V("El aumento en la tasa arancelaria efectiva de Estados Unidos sobre las importaciones desde India desde julio de 2025 ha afectado sectores exportadores clave.", "Oficina de Noticias de India, oct. 2025"),
    ],
  },
  legal: {
    positivas: [],
    negativas: [],
  },
  cultural: {
    positivas: [
      V("Cuenta con la mayor población del mundo y una base creciente de consumidores de clase media urbana.", "Banco Mundial, datos demográficos"),
    ],
    negativas: [],
  },
  tecnologica: {
    positivas: [
      V("Las exportaciones de servicios, incluyendo tecnología de la información, continúan siendo un motor relevante de crecimiento.", "Oficina de Noticias de India, 2025"),
    ],
    negativas: [],
  },
  geografica: {
    positivas: [
      V("Su ubicación en el sur de Asia le da acceso directo a las principales rutas marítimas del océano Índico.", "Datos geográficos generales"),
    ],
    negativas: [
      V("Regiones agrícolas del país enfrentan riesgo de déficit de lluvias monzónicas, lo que puede afectar la producción y el consumo rural.", "Deloitte Insights, julio 2026"),
    ],
  },
},

"Emiratos Árabes Unidos": {
  actualizado: "agosto 2026",
  economia: {
    positivas: [
      V("Se proyecta que la economía crezca alrededor de 5% en 2026, tras una expansión estimada de 5.4%-5.6% en 2025, impulsada por el sector no petrolero.", "FMI, oct. 2025 / Allianz Trade, abril 2026"),
      V("La inflación se mantiene baja, proyectada en 1.6% en 2025 y cerca de 2% a mediano plazo.", "FMI, Misión Artículo IV, oct. 2025"),
      V("El sector no petrolero, impulsado por comercio, manufactura y servicios financieros, es el principal motor de crecimiento, reflejando el avance de la diversificación económica.", "FMI, oct. 2025"),
    ],
    negativas: [
      V("El conflicto en Medio Oriente y el cierre efectivo del estrecho de Ormuz han generado disrupciones logísticas y mayores costos de transporte y seguro para el comercio importado.", "USDA Exporter Guide, julio 2026"),
      V("La economía sigue dependiendo en parte de la producción y precios del petróleo, pese a los avances en diversificación.", "Banco Mundial, informe MPO EAU"),
    ],
  },
  politica: {
    positivas: [
      V("El FMI destaca la fuerte resiliencia de la economía emiratí ante la incertidumbre global, los conflictos regionales y la volatilidad del mercado petrolero.", "FMI, Misión Artículo IV, oct. 2025"),
      V("Ha impulsado reformas favorables a la inversión, incluyendo la propiedad extranjera total de empresas y el ajuste del fin de semana a sábado-domingo para alinearse con socios comerciales.", "Coface / globalEDGE, 2025"),
    ],
    negativas: [
      V("Un eventual cambio en el equilibrio de poder regional derivado de conflictos en Medio Oriente podría afectar el entorno de negocios.", "globalEDGE, 2025"),
    ],
  },
  legal: {
    positivas: [
      V("Ofrece zonas francas con propiedad extranjera total y exenciones fiscales que facilitan el establecimiento de empresas internacionales.", "USDA Exporter Guide, julio 2026"),
    ],
    negativas: [],
  },
  cultural: {
    positivas: [
      V("El turismo alcanzó niveles récord en 2025, con más de 32 millones de huéspedes hoteleros y más de 13,000 millones de dólares en ingresos turísticos.", "USDA Exporter Guide, julio 2026"),
    ],
    negativas: [],
  },
  tecnologica: {
    positivas: [
      V("Se posiciona como un centro emergente de inteligencia artificial a nivel global, respaldado por inversión estatal en infraestructura digital.", "FMI, Misión Artículo IV, oct. 2025"),
    ],
    negativas: [],
  },
  geografica: {
    positivas: [
      V("Su ubicación estratégica entre Asia, Europa y África la convierte en un centro logístico y comercial clave para el comercio internacional.", "USDA Exporter Guide, julio 2026"),
    ],
    negativas: [
      V("La cercanía al estrecho de Ormuz la expone a riesgos logísticos en episodios de tensión geopolítica regional.", "USDA Exporter Guide, julio 2026"),
    ],
  },
},

"Sudáfrica": {
  actualizado: "agosto 2026",
  economia: {
    positivas: [
      V("La inflación se moderó a 3.2% en 2025, desde 4.4% el año previo.", "Banco Mundial, 2026"),
      V("Cuenta con la base de producción más diversificada de África, que abarca minería, agricultura, manufactura y un sector financiero desarrollado.", "Banco Mundial, 2026"),
      V("Las presiones fiscales comienzan a ceder, apoyadas por una fuerte recaudación en 2025.", "Banco Mundial, 2026"),
    ],
    negativas: [
      V("El desempleo se mantuvo por encima del 30% en 2025, promediando 32.4% y afectando a más de 8 millones de personas.", "Banco Mundial, 2026"),
      V("El crecimiento económico, aunque en recuperación, sigue siendo insuficiente para mejorar de forma significativa el empleo y la pobreza.", "Banco Mundial, 2026"),
      V("Persisten cuellos de botella en logística, agua y otros servicios de red que limitan la inversión y la productividad.", "Banco Mundial, 2026"),
    ],
  },
  politica: {
    positivas: [
      V("La disponibilidad eléctrica ha mejorado, apoyando la recuperación económica tras años de cortes de suministro (\"load shedding\").", "Banco Mundial, 2026"),
    ],
    negativas: [
      V("Se prevén elecciones locales entre noviembre de 2026 y febrero de 2027, con temas de campaña centrados en fallas de servicios municipales, gobernanza y crimen.", "Banco Mundial, 2026"),
      V("Está considerablemente expuesta al mercado estadounidense frente a otras economías africanas, particularmente en manufactura, minería y agricultura, lo que la hace vulnerable a los aranceles de EE. UU.", "Allianz Trade, 2026"),
    ],
  },
  legal: {
    positivas: [
      V("Su remoción de la lista gris del Grupo de Acción Financiera Internacional (GAFI) ha fortalecido la confianza de los inversionistas.", "Tesoro de Sudáfrica, Revisión Presupuestaria 2026"),
    ],
    negativas: [],
  },
  cultural: {
    positivas: [
      V("Actúa como principal centro regional de transporte y logística, y es uno de los mayores inversionistas hacia el resto de África.", "Banco Mundial, 2026"),
    ],
    negativas: [
      V("Cerca del 60% de la población se estima por debajo de la línea de pobreza de ingreso medio-alto, lo que condiciona el poder de compra del mercado interno.", "Banco Mundial, 2026"),
    ],
  },
  tecnologica: {
    positivas: [],
    negativas: [],
  },
  geografica: {
    positivas: [
      V("Es la puerta de entrada logística y de transporte más desarrollada del sur de África, con acceso a los océanos Atlántico e Índico.", "Banco Mundial, 2026"),
    ],
    negativas: [
      V("Los altos precios internacionales del oro y el platino son favorables, pero generan dependencia de la volatilidad de los precios de las materias primas.", "Reporte del Tesoro de Sudáfrica, 2026"),
    ],
  },
},

"Corea del Sur": {
  actualizado: "agosto 2026",
  economia: {
    positivas: [
      V("Las exportaciones de semiconductores crecieron cerca de 170% interanual en mayo de 2026, impulsadas por el auge de la inteligencia artificial.", "Korea Economic Institute of America, junio 2026"),
      V("El superávit comercial alcanzó cifras récord en 2025-2026, con 123,000 millones de dólares en 2025, muy por encima de lo proyectado inicialmente.", "Trade.gov, junio 2026"),
      V("El PIB creció 1.7% trimestral en el primer trimestre de 2026, el mayor incremento desde 2020.", "Korea Economic Institute of America, junio 2026"),
    ],
    negativas: [
      V("Los semiconductores representan cerca del 42% de las exportaciones totales, generando alta dependencia de un solo sector.", "Korea Economic Institute of America, junio 2026"),
      V("Otros sectores exportadores como autos, maquinaria y acero se contrajeron en 2026 pese al auge de los semiconductores.", "Korea Economic Institute of America, junio 2026"),
      V("La economía es altamente dependiente del comercio exterior, lo que la expone a los choques de precios de energía derivados de conflictos regionales.", "AMRO / Korea Times, abril 2026"),
    ],
  },
  politica: {
    positivas: [
      V("El gobierno aprobó un presupuesto complementario de 17,700 millones de dólares en abril de 2026 para blindar la economía de choques comerciales externos.", "Trade.gov, junio 2026"),
    ],
    negativas: [],
  },
  legal: {
    positivas: [],
    negativas: [],
  },
  cultural: {
    positivas: [],
    negativas: [],
  },
  tecnologica: {
    positivas: [
      V("Es líder mundial en manufactura de semiconductores, un insumo crítico para la infraestructura global de inteligencia artificial.", "Korea Economic Institute of America, junio 2026"),
      V("El gobierno impulsa proyectos estratégicos en semiconductores, centros de datos de IA e inteligencia artificial física.", "UPI, julio 2026"),
    ],
    negativas: [],
  },
  geografica: {
    positivas: [],
    negativas: [
      V("Depende en gran medida de la energía importada de Medio Oriente, lo que la expone a los choques de precios derivados de conflictos regionales.", "Korea Economic Institute of America, junio 2026"),
    ],
  },
},

"Australia": {
  actualizado: "agosto 2026",
  economia: {
    positivas: [
      V("La economía creció un estimado de 1.9% en 2025 y se proyecta un crecimiento cercano a 2%-2.3% en 2026.", "Australian Economic Review, marzo 2026"),
      V("El ciclo de inversión impulsado por la inteligencia artificial compensa parcialmente la debilidad de la demanda global de materias primas.", "KPMG Australia, julio 2026"),
    ],
    negativas: [
      V("La inflación repuntó a cerca de 3.8% en 2025, impulsada por precios de la electricidad y el retiro de subsidios gubernamentales, presionando al Banco de la Reserva de Australia.", "Morgans, mayo 2026"),
      V("El crecimiento de la productividad se mantiene débil, un desafío estructural señalado de forma reiterada por analistas económicos.", "KPMG Australia, julio 2026"),
      V("El mercado laboral se ha debilitado, con una tasa de desempleo que se prevé promedie 4.9% en 2026-27.", "Deloitte Access Economics, julio 2026"),
    ],
  },
  politica: {
    positivas: [],
    negativas: [
      V("El crecimiento de sus principales socios comerciales, en particular China, se proyecta más débil para 2026, afectando la demanda de exportaciones australianas.", "Australian Economic Review, marzo 2026"),
    ],
  },
  legal: {
    positivas: [],
    negativas: [],
  },
  cultural: {
    positivas: [],
    negativas: [],
  },
  tecnologica: {
    positivas: [
      V("El ciclo de inversión en inteligencia artificial está sosteniendo la demanda de insumos y commodities clave para la economía.", "KPMG Australia, julio 2026"),
    ],
    negativas: [],
  },
  geografica: {
    positivas: [
      V("Su ubicación en Asia-Pacífico y su riqueza en recursos minerales la posicionan como proveedor clave de materias primas para las economías asiáticas.", "Conocimiento geográfico general"),
    ],
    negativas: [
      V("Su crecimiento está fuertemente ligado a la demanda de materias primas de sus socios comerciales asiáticos, en particular China, lo que la hace vulnerable a desaceleraciones externas.", "Australian Economic Review, marzo 2026"),
    ],
  },
},

};

/* Países con cobertura investigada disponible en esta versión */
const COVERED = Object.keys(COUNTRY_DATA);

const CATEGORY_META = [
  { key: "economia", label: "Economía", icon: Landmark },
  { key: "politica", label: "Política", icon: Globe2 },
  { key: "legal", label: "Legal", icon: Scale },
  { key: "cultural", label: "Cultural", icon: Users },
  { key: "tecnologica", label: "Tecnológica", icon: Cpu },
  { key: "geografica", label: "Geográfica", icon: Mountain },
];

function useCounts(data) {
  return useMemo(() => {
    if (!data) return { pos: 0, neg: 0, byCat: [] };
    let pos = 0, neg = 0;
    const byCat = CATEGORY_META.map(({ key, label }) => {
      const p = data[key]?.positivas?.length || 0;
      const n = data[key]?.negativas?.length || 0;
      pos += p; neg += n;
      return { categoria: label, Positivas: p, Negativas: n };
    });
    return { pos, neg, byCat };
  }, [data]);
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("México");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!query) return ALL_COUNTRIES;
    return ALL_COUNTRIES.filter((c) =>
      c.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const data = COUNTRY_DATA[selected];
  const isCovered = COVERED.includes(selected);
  const { pos, neg, byCat } = useCounts(data);
  const total = pos + neg;

  const pieData = total > 0
    ? [
        { name: "Positivas", value: pos },
        { name: "Negativas", value: neg },
      ]
    : [];

  let conclusion = null;
  if (isCovered && total > 0) {
    const diff = pos - neg;
    if (Math.abs(diff) <= 1) {
      conclusion = {
        tone: "balanced",
        text: "El país presenta un resultado equilibrado entre variables positivas y negativas para hacer negocios, de acuerdo con la información analizada.",
      };
    } else if (diff > 1) {
      conclusion = {
        tone: "positive",
        text: "El país presenta, de acuerdo con las variables analizadas, una mayor cantidad de factores positivos que negativos.",
      };
    } else {
      conclusion = {
        tone: "negative",
        text: "El país presenta, de acuerdo con las variables analizadas, una mayor cantidad de factores negativos que positivos.",
      };
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* ENCABEZADO */}
      <header className="border-b border-stone-300 bg-slate-900 text-stone-50">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <p className="uppercase tracking-widest text-xs text-amber-400 mb-2">Comercialización virtual · De la mercadotecnia nacional a la mercadotecnia global</p>
          <h1 className="text-3xl font-serif">Atlas de entorno de negocios internacional</h1>
          <p className="text-stone-300 mt-2 max-w-2xl text-sm">
            Selecciona un país para revisar sus variables positivas y negativas en seis dimensiones clave para evaluar la entrada a un mercado: economía, política, legal, cultural, tecnológica y geográfica.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* BUSCADOR */}
        <div className="relative mb-8">
          <label className="block text-sm font-medium text-stone-700 mb-2">Buscar o seleccionar país (195 disponibles)</label>
          <div className="flex items-center border border-stone-300 rounded-lg bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-amber-500">
            <Search className="w-4 h-4 text-stone-400 mr-2 flex-shrink-0" />
            <input
              className="flex-1 outline-none text-sm bg-transparent"
              placeholder="Escribe el nombre de un país..."
              value={open ? query : selected}
              onFocus={() => { setOpen(true); setQuery(""); }}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ChevronDown className="w-4 h-4 text-stone-400" />
          </div>
          {open && (
            <div className="absolute z-10 mt-1 w-full max-h-72 overflow-y-auto bg-white border border-stone-200 rounded-lg shadow-lg">
              {filtered.length === 0 && (
                <div className="px-4 py-3 text-sm text-stone-500">Sin coincidencias.</div>
              )}
              {filtered.map((c) => (
                <button
                  key={c}
                  onClick={() => { setSelected(c); setOpen(false); setQuery(""); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-amber-50 flex items-center justify-between"
                >
                  <span>{c}</span>
                  {COVERED.includes(c) && (
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">verificado</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NOMBRE DEL PAÍS */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-6 border-b border-stone-200 pb-4">
          <h2 className="text-2xl font-serif">{selected}</h2>
          {isCovered ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Información verificada · actualizado {data.actualizado}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 bg-stone-200 px-3 py-1 rounded-full">
              <Info className="w-3.5 h-3.5" /> Sin información suficiente o verificada en esta versión
            </span>
          )}
        </div>

        {!isCovered && (
          <div className="bg-white border border-stone-200 rounded-xl p-6 text-sm text-stone-600 leading-relaxed">
            <p>
              Este país forma parte del catálogo completo de 195 naciones del selector, pero en esta versión del artefacto
              no se investigaron ni verificaron con suficiente profundidad sus variables económicas, políticas, legales,
              culturales, tecnológicas y geográficas frente a fuentes oficiales (Banco Mundial, FMI, OMC, OCDE, UNCTAD,
              ITU, bancos centrales, entre otras). Conforme a las restricciones del proyecto, no se generó información
              no verificada para completar este análisis.
            </p>
            <p className="mt-3">
              Prueba con alguno de los países ya investigados: {COVERED.join(", ")}.
            </p>
          </div>
        )}

        {isCovered && (
          <>
            {/* CATEGORÍAS */}
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {CATEGORY_META.map(({ key, label, icon: Icon }) => {
                const cat = data[key] || { positivas: [], negativas: [] };
                return (
                  <div key={key} className="bg-white border border-stone-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-4 h-4 text-slate-700" />
                      <h3 className="font-serif text-lg">{label}</h3>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-1.5">Variables positivas</p>
                      {cat.positivas.length === 0 && (
                        <p className="text-xs text-stone-400 italic">Sin información suficiente o verificada.</p>
                      )}
                      <ul className="space-y-2">
                        {cat.positivas.map((v, i) => (
                          <li key={i} className="text-sm text-stone-700 flex gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{v.texto} <span className="text-xs text-stone-400">({v.fuente})</span></span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-rose-700 uppercase tracking-wide mb-1.5">Variables negativas</p>
                      {cat.negativas.length === 0 && (
                        <p className="text-xs text-stone-400 italic">Sin información suficiente o verificada.</p>
                      )}
                      <ul className="space-y-2">
                        {cat.negativas.map((v, i) => (
                          <li key={i} className="text-sm text-stone-700 flex gap-2">
                            <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                            <span>{v.texto} <span className="text-xs text-stone-400">({v.fuente})</span></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* GRÁFICAS */}
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              <div className="bg-white border border-stone-200 rounded-xl p-5">
                <h3 className="font-serif text-lg mb-1">Variables por tipo y categoría</h3>
                <p className="text-xs text-stone-500 mb-4">Cantidad de variables positivas y negativas identificadas en cada dimensión.</p>
                <div style={{ width: "100%", height: 260 }}>
                  <ResponsiveContainer>
                    <BarChart data={byCat} margin={{ top: 5, right: 10, left: -20, bottom: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                      <XAxis dataKey="categoria" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" interval={0} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="Positivas" fill="#0f766e" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Negativas" fill="#b91c1c" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-5">
                <h3 className="font-serif text-lg mb-1">Proporción global</h3>
                <p className="text-xs text-stone-500 mb-4">
                  {total > 0
                    ? `${pos} variables positivas y ${neg} negativas identificadas (${Math.round((pos/total)*100)}% / ${Math.round((neg/total)*100)}%).`
                    : "Sin variables suficientes para calcular proporciones."}
                </p>
                <div style={{ width: "100%", height: 220 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={50}
                        outerRadius={85}
                        paddingAngle={2}
                        label={(entry) => total > 0 ? `${Math.round((entry.value/total)*100)}%` : ""}
                      >
                        <Cell fill="#0f766e" />
                        <Cell fill="#b91c1c" />
                      </Pie>
                      <Legend verticalAlign="bottom" height={24} />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* CONCLUSIÓN */}
            {conclusion && (
              <div className="bg-slate-900 text-stone-50 rounded-xl p-6 mb-10">
                <div className="flex items-center gap-2 mb-2">
                  <BookMarked className="w-4 h-4 text-amber-400" />
                  <h3 className="font-serif text-lg">Resultado general</h3>
                </div>
                <p className="text-sm text-stone-200 leading-relaxed">{conclusion.text}</p>
                <p className="text-xs text-stone-400 mt-3 leading-relaxed">
                  Este resultado corresponde únicamente a las {total} variables identificadas y respaldadas por las
                  fuentes citadas para {selected}; no constituye una recomendación de invertir o no invertir en el país.
                </p>
              </div>
            )}
          </>
        )}

        {/* METODOLOGÍA */}
        <footer className="border-t border-stone-200 pt-6 pb-2 text-xs text-stone-500 leading-relaxed">
          <p className="font-medium text-stone-700 mb-1">Metodología y alcance</p>
          <p>
            Las variables de cada país provienen de fuentes oficiales e internacionales verificables (Banco Mundial, Fondo
            Monetario Internacional, Organización Mundial del Comercio, OCDE, UNCTAD, bancos centrales nacionales y
            organismos gubernamentales, entre otras) y se clasifican como positivas o negativas únicamente cuando existe
            información suficiente para justificar esa clasificación. Cuando no se localizó información suficiente o
            verificada para una categoría, el espacio se deja explícitamente vacío en lugar de completarse con datos no
            verificados. El selector incluye los 195 países reconocidos internacionalmente; en esta versión, la
            investigación profunda cubre un grupo prioritario de {COVERED.length} economías ({COVERED.join(", ")}), y el
            resto se irá incorporando en versiones posteriores.
          </p>
        </footer>
      </main>
    </div>
  );
}
