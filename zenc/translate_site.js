const fs = require('fs');
const path = require('path');

const srcThemePath = path.join(__dirname, 'index.html');
const rawHtml = fs.readFileSync(srcThemePath, 'utf8');

const locales = {
    'es': {
        title: "Zen C - Ergonomía Moderna. C Puro.", desc: "Un lenguaje moderno de programación de sistemas que transpila a C11 legible por humanos con cero sobrecarga.",
        nav: { docs: "Documentación", mirror: "Espejo", interop: "Interop", roadmap: "Hoja de Ruta", newsletter: "Boletín", sponsors: "Patrocinadores" },
        hero: {
            sub: "Ergonomía Moderna.<br>Cero Overhead.<br>C Puro.",
            lead: "Un lenguaje de sistemas con tipado fuerte que trae <strong>coincidencia de patrones</strong>, <strong>traits</strong>, y <strong>semántica de propiedad</strong> al ecosistema C.",
            get_started: "Empezar", join_discord: "Unirse a Discord", newsletter: "Boletín &rarr;", updates: "Actualizaciones sobre el progreso de Zen C:", join: "Unirse"
        },
        install: { title: "Empieza a Compilar", desc: "¡Funciona con GCC/Clang/TCC y otros compiladores!", clone: "CLONAR", build: "CONSTRUIR", install: "INSTALAR" },
        features: {
            title: "Cero Fricción. Control Máximo.", desc: "Experimenta la transparencia de C combinada con la experiencia de desarrollo de un lenguaje moderno.",
            f1: "Transpila directamente a GNU C11 limpio y legible: C puro sin cajas negras.", f2: "Llama a cualquier función C, usa cualquier struct C. Cero boilerplate FFI.",
            f3: "El trait <code>Drop</code> implícito evita fugas de memoria sin un GC.", f4: "Genéricos de cero sobrecarga: especializados en tiempo de compilación, no en ejecución.",
            f5: "E/S asíncrona de alto rendimiento sin infierno de callbacks ni runtimes ocultos.", f6: "<code>match</code> exhaustivo sobre enums y tuplas para un flujo de control a prueba de balas.", f7: "Tipos paramétricos que desaparecen en tiempo de compilación: sin despacho virtual."
        },
        interop: {
            title: "Arquitectura Políglota", desc: "Zen C se adapta a tu ecosistema. Enlázalo sin problemas con bases de código existentes.",
            cuda: "Escribe kernels de GPU con sintaxis Zen usando atributos <code>launch</code> y <code>@global</code>.",
            cpp: "Genera código compatible con C++ para enlazar con librerías. Instancia plantillas en bloques <code>raw</code>.",
            objc: "Soporte nativo para macOS. Mezcla la sintaxis <code>[Object message]</code> dentro de tu código de sistemas."
        },
        rosetta: { title: "Establecido en Rosetta Code", desc: "Zen C es un ciudadano de primera clase en Rosetta Code, la crestomatía de programación. Compara nuestra sintaxis y semántica en cientos de tareas estandarizadas.", btn: "Explorar la Categoría Zen C &rarr;" },
        footer: { tag: "Ergonomía moderna. C puro.", project: "Proyecto", src: "Código Fuente", spon: "Patrocinar", news_title: "Boletín", news_desc: "Únete a la lista de correo para actualizaciones.", sub: "Suscribirse" },
        news_hero: { title: "La lista de correo para ingenieros.", desc: "Actualizaciones directas sobre características del lenguaje, lanzamientos de la biblioteca estándar y progreso de la hoja de ruta.", btn: "Suscribirse a las Actualizaciones" },
        videos: { title: "Videos Comunitarios", desc: "Mira tutoriales, reseñas y profundizaciones creadas por la comunidad de Zen C." },
        roadmap: {
            title: "El Camino a Seguir", desc: "Nuestra hoja de ruta conceptual hacia la madurez del ecosistema.",
            p1_phase: "Base Actual", p1_title: "Lenguaje Central", p1_1: "Transpilación C sin sobrecarga", p1_2: "Interop C++, Obj-C, CUDA", p1_3: "Semántica de recursos RAII", p1_4: "Genéricos monomorfizados", p1_5: "Soporte de construcción LSP y APE",
            p2_phase: "Próximamente", p2_title: "Expansión del Ecosistema", p2_1: "Gestor de Paquetes Oficial", p2_2: "Target Wasm y Emscripten", p2_3: "Funciones avanzadas de LSP", p2_4: "Biblioteca std ampliada",
            p3_phase: "En el Horizonte", p3_title: "Semántica Avanzada", p3_1: "<code>async/await</code> estabilizado", p3_2: "API de reflexión <code>comptime</code>", p3_3: "Sistema de plugins mejorado", p3_4: "Compilador autohospedado",
            p4_phase: "El Destino", p4_title: "Estabilización y 1.0", p4_1: "Especificación del lenguaje", p4_2: "Congelación de API de biblioteca estándar", p4_3: "Garantías de estabilidad ABI", p4_4: "Casos de estudio en Kernel/Embebidos"
        },
        sponsors: {
            title: "Sostiene el Proyecto", desc: "Zen C es estrictamente Open Source y se financia mediante la comunidad. Las contribuciones a través de Open Collective aseguran la longevidad de la infraestructura.", btn: "Ver Open Collective &rarr;",
            t1_name: "Backer", t1_desc: "Apoya el mantenimiento diario.", t1_1: "Insignia en GitHub", t1_2: "Rol en Discord",
            t2_name: "Sponsor", t2_desc: "Impulsa nuevas funcionalidades.", t2_1: "Todas las recompensas de Backer", t2_2: "Acceso temprano a RFC", t2_3: "Logo en el README",
            t3_name: "Empresa", t3_price: "Contacto", t3_desc: "Soluciones a medida.", t3_1: "Soporte prioritario", t3_2: "Logo en la página de inicio",
            active: "Patrocinadores Activos", loading: "Cargando patrocinadores..."
        },
        code: {
            title1: "Echo Server escuchando en :8080",
            comm1: "// Aceptar nuevas conexiones",
            file2: "realmente_alguien_lee_esto.zc",
            comm2: "// Constructor. ¡Todas las funciones vienen activadas!",
            comm3: "// Describir el lenguaje en una línea",
            desc: "Ergonomía Moderna. Cero Overhead. C Puro."
        }
    },
    'de': {
        title: "Zen C - Moderne Ergonomie. Reines C.", desc: "Moderne Sprache, die kompiliert.",
        nav: { docs: "Dokumentation", mirror: "Spiegel", interop: "Interop", roadmap: "Roadmap", newsletter: "Newsletter", sponsors: "Sponsoren" },
        hero: {
            sub: "Moderne Ergonomie.<br>Null Overhead.<br>Reines C.",
            lead: "Strenge Sprache mit <strong>Pattern Matching</strong>.",
            get_started: "Loslegen", join_discord: "Discord", newsletter: "Newsletter &rarr;", updates: "Updates:", join: "Beitreten"
        },
        install: { title: "Kompilieren", desc: "Funktioniert mit GCC!", clone: "KLONEN", build: "BAUEN", install: "INSTALLIEREN" },
        features: {
            title: "Null Reibung.", desc: "Transparenz von C.",
            f1: "Kompiliert in C11.", f2: "C-Funktionen ohne FFI.",
            f3: "Drop-Trait ohne GC.", f4: "Zero-Overhead-Generics.",
            f5: "Asynchrone I/O.", f6: "Pattern Matching.", f7: "Kein virtueller Dispatch."
        },
        interop: { title: "Polyglott", desc: "Passt sich an.", cuda: "GPU-Kernels.", cpp: "C++ Code.", objc: "macOS." },
        rosetta: { title: "Rosetta Code", desc: "Vergleichen Sie Syntax.", btn: "Erkunden &rarr;" },
        footer: { tag: "Reines C.", project: "Projekt", src: "Quellcode", spon: "Sponsern", news_title: "Newsletter", news_desc: "Mailingliste.", sub: "Abonnieren" },
        news_hero: { title: "Die E-Mailing-Liste für Ingenieure.", desc: "Direkte Updates zu Sprachfunktionen, Veröffentlichungen der Standardbibliothek und Roadmap-Fortschritt.", btn: "Updates abonnieren" },
        videos: { title: "Videos", desc: "Tutorials ansehen." },
        roadmap: {
            title: "Der Weg", desc: "Roadmap zur Reife.",
            p1_phase: "Aktuell", p1_title: "Kern", p1_1: "C-Kompilierung", p1_2: "C++ Interop", p1_3: "RAII", p1_4: "Generics", p1_5: "LSP",
            p2_phase: "Als nächstes", p2_title: "Ökosystem", p2_1: "Paketmanager", p2_2: "Wasm", p2_3: "LSP Extra", p2_4: "std Plus",
            p3_phase: "Horizont", p3_title: "Semantik", p3_1: "async/await", p3_2: "comptime", p3_3: "Plugins", p3_4: "Compiler",
            p4_phase: "Ziel", p4_title: "1.0", p4_1: "Spezifikation", p4_2: "API Freeze", p4_3: "ABI", p4_4: "Kernel"
        },
        sponsors: {
            title: "Projekt unterstützen", desc: "Zen C ist Open Source.", btn: "Open Collective &rarr;",
            t1_name: "Backer", t1_desc: "Täglicher Support.", t1_1: "Badge", t1_2: "Discord",
            t2_name: "Sponsor", t2_desc: "Features.", t2_1: "Backer Boni", t2_2: "RFC", t2_3: "Logo",
            t3_name: "Enterprise", t3_price: "Kontakt", t3_desc: "Maßgeschneidert.", t3_1: "Prio", t3_2: "Homepage Logo",
            active: "Sponsoren", loading: "Laden..."
        },
        code: {
            title1: "Echo-Server hört auf :8080",
            comm1: "// Neue Verbindungen akzeptieren",
            file2: "liest_das_wirklich_jemand.zc",
            comm2: "// Konstruktor. Alle Features sind aktiviert!",
            comm3: "// Beschreiben Sie die Sprache in einer Zeile",
            desc: "Moderne Ergonomie. Null Overhead. Reines C."
        }
    },
    'it': {
        title: "Zen C - Ergonomia Moderna.", desc: "Linguaggio di sistema.",
        nav: { docs: "Documentazione", mirror: "Mirror", interop: "Interop", roadmap: "Roadmap", newsletter: "Newsletter", sponsors: "Sponsor" },
        hero: {
            sub: "Ergonomia Moderna.<br>Zero Overhead.<br>Puro C.",
            lead: "Linguaggio con <strong>pattern matching</strong>.",
            get_started: "Inizia", join_discord: "Unisciti a Discord", newsletter: "Newsletter &rarr;", updates: "Aggiornamenti:", join: "Unisciti"
        },
        install: { title: "Compila", desc: "Funziona con GCC!", clone: "CLONA", build: "COMPILA", install: "INSTALLA" },
        features: {
            title: "Zero Attrito.", desc: "Trasparenza del C.",
            f1: "GNU C11.", f2: "Zero FFI.",
            f3: "No GC.", f4: "Generics zero overhead.",
            f5: "I/O asincrono.", f6: "Pattern matching.", f7: "No dispatch virtuale."
        },
        interop: { title: "Poliglotta", desc: "Si adatta al tuo ecosistema.", cuda: "GPU.", cpp: "C++.", objc: "macOS." },
        rosetta: { title: "Rosetta Code", desc: "Confronta la sintassi.", btn: "Esplora &rarr;" },
        footer: { tag: "Puro C.", project: "Progetto", src: "Codice", spon: "Sponsorizza", news_title: "Newsletter", news_desc: "Unisciti.", sub: "Iscriviti" },
        news_hero: { title: "La mailing list per ingegneri.", desc: "Aggiornamenti diretti sulle funzionalità del linguaggio, rilasci della libreria standard e progressi della roadmap.", btn: "Iscriviti agli aggiornamenti" },
        videos: { title: "Video", desc: "Guarda i tutorial." },
        roadmap: {
            title: "Il Percorso", desc: "Roadmap.",
            p1_phase: "Attuale", p1_title: "Core", p1_1: "Transpilazione C", p1_2: "Interop C++", p1_3: "RAII", p1_4: "Generics", p1_5: "LSP",
            p2_phase: "Prossimamente", p2_title: "Ecosistema", p2_1: "Package Manager", p2_2: "Wasm", p2_3: "LSP Avanzato", p2_4: "std espansa",
            p3_phase: "All'orizzonte", p3_title: "Semantica", p3_1: "async/await", p3_2: "comptime", p3_3: "Plugin", p3_4: "Compilatore",
            p4_phase: "Destinazione", p4_title: "1.0", p4_1: "Specifiche", p4_2: "API Freeze", p4_3: "ABI", p4_4: "Kernel"
        },
        sponsors: {
            title: "Sostieni il Progetto", desc: "Open Source.", btn: "Open Collective &rarr;",
            t1_name: "Backer", t1_desc: "Supporto.", t1_1: "Badge", t1_2: "Discord",
            t2_name: "Sponsor", t2_desc: "Nuove feature.", t2_1: "Premi Backer", t2_2: "Accesso RFC", t2_3: "Logo",
            t3_name: "Enterprise", t3_price: "Contatto", t3_desc: "Soluzioni.", t3_1: "Supporto Prio", t3_2: "Logo Home",
            active: "Sponsor", loading: "Caricamento..."
        },
        code: {
            title1: "Echo Server in ascolto su :8080",
            comm1: "// Accetta nuove connessioni",
            file2: "qualcuno_legge_davvero_questo.zc",
            comm2: "// Costruttore. Tutte le funzioni sono abilitate!",
            comm3: "// Descrivi il linguaggio in una riga",
            desc: "Ergonomia Moderna. Zero Overhead. Puro C."
        }
    },
    'pt': {
        title: "Zen C - Ergonomia Moderna.", desc: "Linguagem de sistemas.",
        nav: { docs: "Documentação", mirror: "Espelho", interop: "Interop", roadmap: "Roteiro", newsletter: "Boletim", sponsors: "Patrocinadores" },
        hero: {
            sub: "Ergonomia Moderna.<br>Zero Overhead.<br>C Puro.",
            lead: "Linguagem com <strong>pattern matching</strong>.",
            get_started: "Começar", join_discord: "Discord", newsletter: "Boletim &rarr;", updates: "Atualizações:", join: "Juntar-se"
        },
        install: { title: "Compilar", desc: "GCC/Clang!", clone: "CLONAR", build: "CONSTRUIR", install: "INSTALAR" },
        features: {
            title: "Controle Máximo.", desc: "Transparência do C.",
            f1: "C11 limpo.", f2: "Zero FFI.",
            f3: "Sem GC.", f4: "Generics sem overhead.",
            f5: "E/S assíncrona.", f6: "Pattern matching.", f7: "Sem despacho virtual."
        },
        interop: { title: "Poliglota", desc: "Adapta-se.", cuda: "GPU.", cpp: "C++.", objc: "macOS." },
        rosetta: { title: "Rosetta Code", desc: "Compare a sintaxe.", btn: "Explorar &rarr;" },
        footer: { tag: "C Puro.", project: "Projeto", src: "Código", spon: "Patrocinar", news_title: "Boletim", news_desc: "Lista de e-mails.", sub: "Inscrever" },
        news_hero: { title: "A lista de e-mail para engenheiros.", desc: "Atualizações diretas sobre recursos da linguagem, lançamentos da biblioteca padrão e progresso do roteiro.", btn: "Inscrever-se para atualizações" },
        videos: { title: "Vídeos", desc: "Assista tutoriais." },
        roadmap: {
            title: "O Caminho", desc: "Roteiro.",
            p1_phase: "Atual", p1_title: "Core", p1_1: "Transpilação", p1_2: "Interop C++", p1_3: "RAII", p1_4: "Generics", p1_5: "LSP",
            p2_phase: "Em breve", p2_title: "Ecossistema", p2_1: "Package Manager", p2_2: "Wasm", p2_3: "LSP", p2_4: "std expandida",
            p3_phase: "Horizonte", p3_title: "Semântica", p3_1: "async/await", p3_2: "comptime", p3_3: "Plugins", p3_4: "Compilador",
            p4_phase: "Destino", p4_title: "1.0", p4_1: "Especificação", p4_2: "API Freeze", p4_3: "ABI", p4_4: "Kernel"
        },
        sponsors: {
            title: "Sustentar o Projeto", desc: "Open Source.", btn: "Open Collective &rarr;",
            t1_name: "Backer", t1_desc: "Manutenção.", t1_1: "Badge", t1_2: "Discord",
            t2_name: "Sponsor", t2_desc: "Features.", t2_1: "Recompensas", t2_2: "RFC", t2_3: "Logo",
            t3_name: "Enterprise", t3_price: "Contato", t3_desc: "Soluções.", t3_1: "Suporte", t3_2: "Logo Home",
            active: "Patrocinadores", loading: "Carregando..."
        },
        code: {
            title1: "Echo Server ouvindo em :8080",
            comm1: "// Aceitar novas conexões",
            file2: "alguem_realmente_le_isso.zc",
            comm2: "// Construtor. Todos os recursos vêm ativados!",
            comm3: "// Descreva a linguagem em uma linha",
            desc: "Ergonomia Moderna. Zero Overhead. C Puro."
        }
    },
    'ru': {
        title: "Zen C - Эргономика. Чистый C.", desc: "Системный язык.",
        nav: { docs: "Документация", mirror: "Зеркало", interop: "Взаимодействие", roadmap: "План", newsletter: "Новости", sponsors: "Спонсоры" },
        hero: {
            sub: "Эргономика.<br>Ноль расходов.<br>Чистый C.",
            lead: "Язык с <strong>сопоставлением с образцом</strong>.",
            get_started: "Начать", join_discord: "Discord", newsletter: "Новости &rarr;", updates: "Обновления:", join: "Присоединиться"
        },
        install: { title: "Компиляция", desc: "GCC/Clang!", clone: "КЛОН", build: "СБОРКА", install: "УСТАНОВКА" },
        features: {
            title: "Максимум контроля.", desc: "Прозрачность C.",
            f1: "Чистый C11.", f2: "Ноль FFI.",
            f3: "Без GC.", f4: "Дженерики.",
            f5: "Асинхронный I/O.", f6: "Pattern matching.", f7: "Без виртуальности."
        },
        interop: { title: "Полиглот", desc: "Адаптация.", cuda: "GPU.", cpp: "C++.", objc: "macOS." },
        rosetta: { title: "Rosetta Code", desc: "Сравните синтаксис.", btn: "Смотреть &rarr;" },
        footer: { tag: "Чистый C.", project: "Проект", src: "Код", spon: "Спонсоры", news_title: "Новости", news_desc: "Рассылка.", sub: "Подписка" },
        news_hero: { title: "Список рассылки для инженеров.", desc: "Прямые обновления о функциях языка, выпусках стандартной библиотеки и ходе работы над планом.", btn: "Подписаться на обновления" },
        videos: { title: "Видео", desc: "Смотреть видео." },
        roadmap: {
            title: "План", desc: "Дорожная карта.",
            p1_phase: "Текущее", p1_title: "Ядро", p1_1: "Компиляция в C", p1_2: "C++ Interop", p1_3: "RAII", p1_4: "Generics", p1_5: "LSP",
            p2_phase: "Скоро", p2_title: "Экосистема", p2_1: "Пакетный менеджер", p2_2: "Wasm", p2_3: "LSP", p2_4: "std библиотека",
            p3_phase: "Горизонт", p3_title: "Семантика", p3_1: "async", p3_2: "comptime", p3_3: "Плагины", p3_4: "Компилятор",
            p4_phase: "Цель", p4_title: "1.0", p4_1: "Спецификация", p4_2: "API Freeze", p4_3: "ABI", p4_4: "Ядро ОС"
        },
        sponsors: {
            title: "Поддержка", desc: "Open Source.", btn: "Open Collective &rarr;",
            t1_name: "Backer", t1_desc: "Поддержка.", t1_1: "Бейдж", t1_2: "Discord",
            t2_name: "Sponsor", t2_desc: "Особенности.", t2_1: "Бонусы Backer", t2_2: "RFC", t2_3: "Лого",
            t3_name: "Enterprise", t3_price: "Контакт", t3_desc: "Решения.", t3_1: "Приоритет", t3_2: "Лого Home",
            active: "Спонсоры", loading: "Загрузка..."
        },
        code: {
            title1: "Echo Server слушает на :8080",
            comm1: "// Принимать новые соединения",
            file2: "кто-то_это_читает.zc",
            comm2: "// Конструктор. Все функции включены!",
            comm3: "// Описание языка в одну строку",
            desc: "Эргономика. Ноль расходов. Чистый C."
        }
    },
    'zh-cn': {
        title: "Zen C - 现代人体工程学。", desc: "现代系统编程语言。",
        nav: { docs: "文档", mirror: "镜像", interop: "互操作", roadmap: "路线图", newsletter: "通讯", sponsors: "赞助" },
        hero: {
            sub: "现代工程学。<br>零开销。<br>纯粹的 C。",
            lead: "带有<strong>模式匹配</strong>的系统语言。",
            get_started: "开始使用", join_discord: "加入 Discord", newsletter: "通讯 &rarr;", updates: "最新动态:", join: "加入"
        },
        install: { title: "编译", desc: "支持 GCC/Clang!", clone: "克隆", build: "构建", install: "安装" },
        features: {
            title: "最大控制。", desc: "体验 C 的透明度。",
            f1: "纯 C11。", f2: "零 FFI。",
            f3: "无 GC。", f4: "零开销泛型。",
            f5: "异步 I/O。", f6: "模式匹配。", f7: "无虚分派。"
        },
        interop: { title: "互操作", desc: "适应生态。", cuda: "GPU.", cpp: "C++.", objc: "macOS." },
        rosetta: { title: "Rosetta Code", desc: "语法对比。", btn: "探索 &rarr;" },
        footer: { tag: "纯粹的 C。", project: "项目", src: "源码", spon: "赞助", news_title: "通讯", news_desc: "加入邮件列表。", sub: "订阅" },
        news_hero: { title: "工程师的邮件列表。", desc: "关于语言特性、标准库发布和路线图进展的直接更新。", btn: "订阅更新" },
        videos: { title: "社区视频", desc: "观看教程。" },
        roadmap: {
            title: "路线图", desc: "我们的愿景。",
            p1_phase: "当前", p1_title: "核心语言", p1_1: "C 转译", p1_2: "C++ 互操作", p1_3: "RAII", p1_4: "泛型", p1_5: "LSP",
            p2_phase: "下一步", p2_title: "生态", p2_1: "包管理", p2_2: "Wasm", p2_3: "LSP增强", p2_4: "扩充 std",
            p3_phase: "展望", p3_title: "语义", p3_1: "async", p3_2: "comptime", p3_3: "插件", p3_4: "自举编译器",
            p4_phase: "终点", p4_title: "1.0", p4_1: "语言规范", p4_2: "API 冻结", p4_3: "ABI 稳定", p4_4: "内核案例"
        },
        sponsors: {
            title: "赞助项目", desc: "开源社区驱动。", btn: "查看 Open Collective &rarr;",
            t1_name: "Backer", t1_desc: "日常维护。", t1_1: "GitHub 徽章", t1_2: "Discord 身份",
            t2_name: "Sponsor", t2_desc: "推动新功能。", t2_1: "Backer 奖励", t2_2: "RFC 权限", t2_3: "README Logo",
            t3_name: "Enterprise", t3_price: "联系", t3_desc: "企业方案。", t3_1: "专属支持", t3_2: "首页 Logo",
            active: "活跃赞助商", loading: "加载中..."
        },
        code: {
            title1: "回声服务器监听端口 :8080",
            comm1: "// 接受新连接",
            file2: "真的有人看吗.zc",
            comm2: "// 构造函数。所有特性均已开启！",
            comm3: "// 一行描述语言",
            desc: "现代工程学。零开销。纯粹的 C。"
        }
    },
    'zh-tw': {
        title: "Zen C - 現代人體工學。", desc: "現代系統程式語言。",
        nav: { docs: "文件", mirror: "鏡像", interop: "互通", roadmap: "路線圖", newsletter: "電子報", sponsors: "贊助" },
        hero: {
            sub: "現代工程學。<br>零開銷。<br>純粹的 C。",
            lead: "帶有<strong>模式匹配</strong>的系統語言。",
            get_started: "開始使用", join_discord: "加入 Discord", newsletter: "電子報 &rarr;", updates: "最新動態:", join: "加入"
        },
        install: { title: "編譯", desc: "支援 GCC/Clang!", clone: "複製", build: "建構", install: "安裝" },
        features: {
            title: "最大控制。", desc: "體驗 C 的透明度。",
            f1: "純 C11。", f2: "零 FFI。",
            f3: "無 GC。", f4: "零開銷泛型。",
            f5: "非同步 I/O。", f6: "模式匹配。", f7: "無虛分派。"
        },
        interop: { title: "互通", desc: "適應生態。", cuda: "GPU.", cpp: "C++.", objc: "macOS." },
        rosetta: { title: "Rosetta Code", desc: "語法對比。", btn: "探索 &rarr;" },
        footer: { tag: "純粹的 C。", project: "專案", src: "原始碼", spon: "贊助", news_title: "電子報", news_desc: "加入郵件列表。", sub: "訂閱" },
        news_hero: { title: "工程師的郵件列表。", desc: "關於語言特性、標準庫發布和路線圖進展的直接更新。", btn: "訂閱更新" },
        videos: { title: "社區影片", desc: "觀看教學。" },
        roadmap: {
            title: "路線圖", desc: "我們的願景。",
            p1_phase: "當前", p1_title: "核心語言", p1_1: "C 轉譯", p1_2: "C++ 互通", p1_3: "RAII", p1_4: "泛型", p1_5: "LSP",
            p2_phase: "下一步", p2_title: "生態", p2_1: "套件管理", p2_2: "Wasm", p2_3: "LSP增強", p2_4: "擴充 std",
            p3_phase: "展望", p3_title: "語意", p3_1: "async", p3_2: "comptime", p3_3: "外掛", p3_4: "自舉編譯器",
            p4_phase: "終點", p4_title: "1.0", p4_1: "語言規範", p4_2: "API 凍結", p4_3: "ABI 穩定", p4_4: "核心案例"
        },
        sponsors: {
            title: "贊助專案", desc: "開源社區驅動。", btn: "查看 Open Collective &rarr;",
            t1_name: "Backer", t1_desc: "日常維護。", t1_1: "GitHub 徽章", t1_2: "Discord 身份",
            t2_name: "Sponsor", t2_desc: "推動新功能。", t2_1: "Backer 獎勵", t2_2: "RFC 權限", t2_3: "README Logo",
            t3_name: "Enterprise", t3_price: "聯絡", t3_desc: "企業方案。", t3_1: "專屬支援", t3_2: "首頁 Logo",
            active: "活躍贊助商", loading: "載入中..."
        },
        code: {
            title1: "迴聲伺服器監聽埠 :8080",
            comm1: "// 接受新連接",
            file2: "真的有人看嗎.zc",
            comm2: "// 建構子。所有特性均已開啟！",
            comm3: "// 一行描述語言",
            desc: "現代工程學。零開銷。純粹的 C。"
        }
    }
};

const regexes = [
    { eng: /<title>Zen C - Modern Ergonomics\. Pure C\.<\/title>/, key: 'title', tag: '<title>{VAL}</title>' },
    { eng: /content="A modern systems programming language that compiles to human-readable C11 with zero overhead\."/, key: 'desc', tag: 'content="{VAL}"' },
    { eng: /<a href="https:\/\/docs\.zenc-lang\.org\/">Docs<\/a>/, key: 'nav.docs', tag: '<a href="https://docs.zenc-lang.org/">{VAL}</a>' },
    { eng: /<a href="https:\/\/git\.zenc-lang\.org\/">Mirror<\/a>/, key: 'nav.mirror', tag: '<a href="https://git.zenc-lang.org/">{VAL}</a>' },
    { eng: /<a href="#interop">Interop<\/a>/, key: 'nav.interop', tag: '<a href="#interop">{VAL}</a>' },
    { eng: /<a href="#roadmap">Roadmap<\/a>/, key: 'nav.roadmap', tag: '<a href="#roadmap">{VAL}</a>' },
    { eng: /<a href="#newsletter" class="nav-newsletter">Newsletter <span class="badge-new">New<\/span><\/a>/, key: 'nav.newsletter', tag: '<a href="#newsletter" class="nav-newsletter">{VAL} <span class="badge-new">New</span></a>' },
    { eng: /<a href="#sponsors">Sponsors<\/a>/, key: 'nav.sponsors', tag: '<a href="#sponsors">{VAL}</a>' },

    { eng: /<h2 class="sub-title">Modern Ergonomics\.<br>Zero Overhead\.<br>Pure C\.<\/h2>/, key: 'hero.sub', tag: '<h2 class="sub-title">{VAL}</h2>' },
    { eng: /A strictly typed systems language that brings <strong>pattern matching<\/strong>,[\s\n]*<strong>traits<\/strong>, and <strong>ownership semantics<\/strong> to the C ecosystem\./, key: 'hero.lead', tag: '{VAL}' },

    { eng: /<a href="https:\/\/github\.com\/zenc-lang\/zenc" class="btn btn-primary">Get Started<\/a>/, key: 'hero.get_started', tag: '<a href="https://github.com/zenc-lang/zenc" class="btn btn-primary">{VAL}</a>' },
    { eng: /<a href="https:\/\/discord\.com\/invite\/q6wEsCmkJP" class="btn btn-secondary">Join Discord<\/a>/, key: 'hero.join_discord', tag: '<a href="https://discord.com/invite/q6wEsCmkJP" class="btn btn-secondary">{VAL}</a>' },
    { eng: /<a href="#newsletter" class="btn btn-secondary">Newsletter &rarr;<\/a>/, key: 'hero.newsletter', tag: '<a href="#newsletter" class="btn btn-secondary">{VAL}</a>' },
    { eng: /<p>Updates on Zen C progress:<\/p>/, key: 'hero.updates', tag: '<p>{VAL}</p>' },

    { eng: /<h2 class="section-title">Start Compiling<\/h2>/, key: 'install.title', tag: '<h2 class="section-title">{VAL}</h2>' },
    { eng: /<p>Works with GCC\/Clang\/TCC and other compilers!<\/p>/, key: 'install.desc', tag: '<p>{VAL}</p>' },

    { eng: /<h2 class="section-title">Zero Friction\. Maximum Control\.<\/h2>/, key: 'features.title', tag: '<h2 class="section-title">{VAL}</h2>' },
    { eng: /<p class="section-desc">Experience the transparency of C combined with the developer experience of a\s*modern language\.<\/p>/, key: 'features.desc', tag: '<p class="section-desc">{VAL}</p>' },

    { eng: /<p>Transpiles directly to clean, readable GNU C11: pure C without black boxes\.<\/p>/, key: 'features.f1', tag: '<p>{VAL}</p>' },
    { eng: /<p>Call any C function, use any C struct\. Zero FFI boilerplate\.<\/p>/, key: 'features.f2', tag: '<p>{VAL}</p>' },
    { eng: /<p>Implicit <code>Drop<\/code> trait prevents memory leaks without a GC\.<\/p>/, key: 'features.f3', tag: '<p>{VAL}</p>' },
    { eng: /<p>Zero-overhead generics: specialized at compile time, not runtime\.<\/p>/, key: 'features.f4', tag: '<p>{VAL}</p>' },
    { eng: /<p>High-performance async I\/O without callback hell or hidden runtimes\.<\/p>/, key: 'features.f5', tag: '<p>{VAL}</p>' },
    { eng: /<p>Exhaustive <code>match<\/code> on enums and tuples for bulletproof control flow\.<\/p>/, key: 'features.f6', tag: '<p>{VAL}</p>' },
    { eng: /<p>Parametric types that disappear at compile time: no virtual dispatch\.<\/p>/, key: 'features.f7', tag: '<p>{VAL}</p>' },

    { eng: /<h2 class="section-title">Polyglot Architecture<\/h2>/, key: 'interop.title', tag: '<h2 class="section-title">{VAL}</h2>' },
    { eng: /<p class="section-desc">Zen C adapts to your ecosystem\. Link seamlessly with existing codebases\.<\/p>/, key: 'interop.desc', tag: '<p class="section-desc">{VAL}</p>' },
    { eng: /<p>Write GPU kernels with Zen syntax using <code>launch<\/code> and <code>@global<\/code> attributes\.[\s\n]*<\/p>/, key: 'interop.cuda', tag: '<p>{VAL}</p>' },
    { eng: /<p>Generate C\+\+ compatible code to link against libraries\. Instantiate templates in <code>raw<\/code>[\s\n]*blocks\.<\/p>/, key: 'interop.cpp', tag: '<p>{VAL}</p>' },
    { eng: /<p>Native macOS support\. Mix <code>\[Object message\]<\/code> syntax within your systems code\.<\/p>/, key: 'interop.objc', tag: '<p>{VAL}</p>' },

    { eng: /<h2 class="section-title" [^>]*>Established on[\s\n]*Rosetta Code<\/h2>/, key: 'rosetta.title', tag: '<h2 class="section-title" style="margin-bottom: 1rem; text-align: center; width: 100%;">{VAL}</h2>' },
    { eng: /Zen C is a first-class citizen on Rosetta Code, the programming chrestomathy\.[\s\n]*Compare our syntax and semantics across hundreds of standardized tasks\./, key: 'rosetta.desc', tag: '{VAL}' },
    { eng: /Explore the Zen C Category &rarr;/, key: 'rosetta.btn', tag: '{VAL}' },

    { eng: /<span>Modern ergonomics\. Pure C\.<\/span>/, key: 'footer.tag', tag: '<span>{VAL}</span>' },
    { eng: /<h4>Project<\/h4>/, key: 'footer.project', tag: '<h4>{VAL}</h4>' },
    { eng: /<h4>Newsletter<\/h4>/, key: 'footer.news_title', tag: '<h4>{VAL}</h4>' },
    { eng: /<p style="[^"]*">Join the mailing list for[\s\n]*updates\.<\/p>/, key: 'footer.news_desc', tag: '<p style="margin-bottom: 1rem; font-size: 0.85rem; color: var(--muted);">{VAL}</p>' },
    { eng: /<a href="https:\/\/docs\.zenc-lang\.org">Documentation<\/a>/, key: 'nav.docs', tag: '<a href="https://docs.zenc-lang.org">{VAL}</a>' },
    { eng: /<a href="https:\/\/git\.zenc-lang\.org">Source Code<\/a>/, key: 'nav.mirror', tag: '<a href="https://git.zenc-lang.org">{VAL}</a>' },
    { eng: /<a href="https:\/\/opencollective\.com\/z-libs">Sponsor<\/a>/, key: 'nav.sponsors', tag: '<a href="https://opencollective.com/z-libs">{VAL}</a>' },

    // Videos
    { eng: /<h2 class="section-title">Community Videos<\/h2>/, key: 'videos.title', tag: '<h2 class="section-title">{VAL}</h2>' },
    { eng: /<p class="section-desc">Watch tutorials, reviews, and deep-dives created by the Zen C community\.<\/p>/, key: 'videos.desc', tag: '<p class="section-desc">{VAL}</p>' },

    // Roadmap items
    { eng: /<h2 class="section-title">The Path Forward<\/h2>/, key: 'roadmap.title', tag: '<h2 class="section-title">{VAL}</h2>' },
    { eng: /<p class="section-desc">Our conceptual roadmap towards ecosystem maturity\.<\/p>/, key: 'roadmap.desc', tag: '<p class="section-desc">{VAL}</p>' },
    { eng: /<div class="roadmap-phase">Current Foundation<\/div>/, key: 'roadmap.p1_phase', tag: '<div class="roadmap-phase">{VAL}</div>' },
    { eng: /<h3>Core Language<\/h3>/, key: 'roadmap.p1_title', tag: '<h3>{VAL}</h3>' },
    { eng: /<li>Zero-overhead C Transpilation<\/li>/, key: 'roadmap.p1_1', tag: '<li>{VAL}</li>' },
    { eng: /<li>C\+\+, Obj-C, CUDA Interop<\/li>/, key: 'roadmap.p1_2', tag: '<li>{VAL}</li>' },
    { eng: /<li>RAII resource semantics<\/li>/, key: 'roadmap.p1_3', tag: '<li>{VAL}</li>' },
    { eng: /<li>Monomorphized Generics<\/li>/, key: 'roadmap.p1_4', tag: '<li>{VAL}</li>' },
    { eng: /<li>LSP & APE build support<\/li>/, key: 'roadmap.p1_5', tag: '<li>{VAL}</li>' },
    { eng: /<div class="roadmap-phase">Next Up<\/div>/, key: 'roadmap.p2_phase', tag: '<div class="roadmap-phase">{VAL}</div>' },
    { eng: /<h3>Ecosystem Expansion<\/h3>/, key: 'roadmap.p2_title', tag: '<h3>{VAL}</h3>' },
    { eng: /<li>Official Package Manager<\/li>/, key: 'roadmap.p2_1', tag: '<li>{VAL}</li>' },
    { eng: /<li>Wasm & Emscripten Target<\/li>/, key: 'roadmap.p2_2', tag: '<li>{VAL}</li>' },
    { eng: /<li>Advanced LSP features<\/li>/, key: 'roadmap.p2_3', tag: '<li>{VAL}</li>' },
    { eng: /<li>Expanded std library<\/li>/, key: 'roadmap.p2_4', tag: '<li>{VAL}</li>' },
    { eng: /<div class="roadmap-phase">In The Horizon<\/div>/, key: 'roadmap.p3_phase', tag: '<div class="roadmap-phase">{VAL}</div>' },
    { eng: /<h3>Advanced Semantics<\/h3>/, key: 'roadmap.p3_title', tag: '<h3>{VAL}</h3>' },
    { eng: /<li>Stabilized <code>async\/await<\/code><\/li>/, key: 'roadmap.p3_1', tag: '<li>{VAL}</li>' },
    { eng: /<li><code>comptime<\/code> reflection API<\/li>/, key: 'roadmap.p3_2', tag: '<li>{VAL}</li>' },
    { eng: /<li>Improved plugin system<\/li>/, key: 'roadmap.p3_3', tag: '<li>{VAL}</li>' },
    { eng: /<li>Self-hosted compiler<\/li>/, key: 'roadmap.p3_4', tag: '<li>{VAL}</li>' },
    { eng: /<div class="roadmap-phase">The Destination<\/div>/, key: 'roadmap.p4_phase', tag: '<div class="roadmap-phase">{VAL}</div>' },
    { eng: /<h3>Stabilization & 1\.0<\/h3>/, key: 'roadmap.p4_title', tag: '<h3>{VAL}</h3>' },
    { eng: /<li>Language Specification<\/li>/, key: 'roadmap.p4_1', tag: '<li>{VAL}</li>' },
    { eng: /<li>Standard Library API Freeze<\/li>/, key: 'roadmap.p4_2', tag: '<li>{VAL}</li>' },
    { eng: /<li>ABI stability guarantees<\/li>/, key: 'roadmap.p4_3', tag: '<li>{VAL}</li>' },
    { eng: /<li>Embedded\/Kernel case studies<\/li>/, key: 'roadmap.p4_4', tag: '<li>{VAL}</li>' },

    // Sponsors
    { eng: /<h2 class="section-title">Sustain the Project<\/h2>/, key: 'sponsors.title', tag: '<h2 class="section-title">{VAL}</h2>' },
    { eng: /Zen C is strictly Open Source and community-funded\.[\s\n]*Contributions via Open Collective ensure the longevity of the infrastructure\./, key: 'sponsors.desc', tag: '{VAL}' },
    { eng: /View Open Collective &rarr;/, key: 'sponsors.btn', tag: '{VAL}' },
    { eng: /<div class="tier-name">Backer<\/div>/, key: 'sponsors.t1_name', tag: '<div class="tier-name">{VAL}</div>' },
    { eng: /<p class="tier-desc">Support daily maintenance\.<\/p>/, key: 'sponsors.t1_desc', tag: '<p class="tier-desc">{VAL}</p>' },
    { eng: /<li>✓ Badge on GitHub<\/li>/, key: 'sponsors.t1_1', tag: '<li>✓ {VAL}</li>' },
    { eng: /<li>✓ Discord Role<\/li>/, key: 'sponsors.t1_2', tag: '<li>✓ {VAL}</li>' },
    { eng: /<div class="tier-name">Sponsor<\/div>/, key: 'sponsors.t2_name', tag: '<div class="tier-name">{VAL}</div>' },
    { eng: /<p class="tier-desc">Fuel new features\.<\/p>/, key: 'sponsors.t2_desc', tag: '<p class="tier-desc">{VAL}</p>' },
    { eng: /<li>✓ All Backer rewards<\/li>/, key: 'sponsors.t2_1', tag: '<li>✓ {VAL}</li>' },
    { eng: /<li>✓ Early RFC access<\/li>/, key: 'sponsors.t2_2', tag: '<li>✓ {VAL}</li>' },
    { eng: /<li>✓ Logo in README<\/li>/, key: 'sponsors.t2_3', tag: '<li>✓ {VAL}</li>' },
    { eng: /<div class="tier-name">Enterprise<\/div>/, key: 'sponsors.t3_name', tag: '<div class="tier-name">{VAL}</div>' },
    { eng: /<div class="tier-price">Contact<\/div>/, key: 'sponsors.t3_price', tag: '<div class="tier-price">{VAL}</div>' },
    { eng: /<p class="tier-desc">Tailored solutions\.<\/p>/, key: 'sponsors.t3_desc', tag: '<p class="tier-desc">{VAL}</p>' },
    { eng: /<li>✓ Priority Support<\/li>/, key: 'sponsors.t3_1', tag: '<li>✓ {VAL}</li>' },
    { eng: /<li>✓ Logo on Homepage<\/li>/, key: 'sponsors.t3_2', tag: '<li>✓ {VAL}</li>' },
    { eng: /<h3 class="gallery-title">Active Sponsors<\/h3>/, key: 'sponsors.active', tag: '<h3 class="gallery-title">{VAL}</h3>' },
    { eng: /<div class="loading-sponsors">Loading sponsors\.\.\.<\/div>/, key: 'sponsors.loading', tag: '<div class="loading-sponsors">{VAL}</div>' },

    // Final newsletter mappings
    { eng: /<h2 class="section-title">The engineering mailing list.<\/h2>/, key: 'news_hero.title', tag: '<h2 class="section-title">{VAL}</h2>' },
    { eng: /<p>Direct updates on language features, standard library releases, and roadmap progress.<\/p>/, key: 'news_hero.desc', tag: '<p>{VAL}</p>' },
    { eng: /<button type="submit" class="btn btn-primary"[^>]*>Subscribe to Updates<\/button>/, key: 'news_hero.btn', tag: '<button type="submit" class="btn btn-primary" style="padding: 14px 32px; border-radius: 8px;">{VAL}</button>' },
    { eng: /<button type="submit" class="btn-subscribe">Subscribe<\/button>/, key: 'footer.sub', tag: '<button type="submit" class="btn-subscribe">{VAL}</button>' },

    // Code blocks
    { eng: /"Echo Server listening on :8080"/, key: 'code.title1', tag: '"{VAL}"' },
    { eng: /\/\/ Accept new connections/, key: 'code.comm1', tag: '{VAL}' },
    { eng: /do_people_really_read_this\.zc/, key: 'code.file2', tag: '{VAL}' },
    { eng: /\/\/ Constructor\. All features ship enabled!/, key: 'code.comm2', tag: '{VAL}' },
    { eng: /\/\/ Describe the language in one line/, key: 'code.comm3', tag: '{VAL}' },
    { eng: /"Modern Ergonomics\. Zero Overhead\. Pure C\."/, key: 'code.desc', tag: '"{VAL}"' }
];

function resolveKey(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

for (const lang of Object.keys(locales)) {
    let outHtml = rawHtml;

    // Update HTML lang attribute
    outHtml = outHtml.replace('<html lang="en">', `<html lang="${lang}">`);

    // Update Dropdown Switcher state using Zola-matching syntax
    outHtml = outHtml.replace(/class="lang-option active"/g, 'class="lang-option"');
    if (lang === 'en') {
        outHtml = outHtml.replace(/<a href="\/" class="lang-option">/, '<a href="/" class="lang-option active">');
    } else {
        outHtml = outHtml.replace(new RegExp(`<a href="/${lang}/" class="lang-option">`), `<a href="/${lang}/" class="lang-option active">`);
    }

    // Update Language Code Button string (the EN inside the globe button)
    outHtml = outHtml.replace(/EN([\s\n]+<\/button>)/, `${lang.toUpperCase()}$1`);

    for (const rx of regexes) {
        const val = resolveKey(locales[lang], rx.key);
        if (val) {
            outHtml = outHtml.replace(rx.eng, rx.tag.replace('{VAL}', val));
        }
    }

    // Correct link paths to docs localized
    outHtml = outHtml.replace(/"https:\/\/docs\.zenc-lang\.org\/?([^"]*)"/g, `"https://docs.zenc-lang.org/${lang}/$1"`);

    const dirInfo = path.join(__dirname, lang);
    if (!fs.existsSync(dirInfo)) fs.mkdirSync(dirInfo);
    fs.writeFileSync(path.join(dirInfo, 'index.html'), outHtml);
    console.log(`Successfully built ${lang}/index.html`);
}
