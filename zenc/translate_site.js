const fs = require('fs');
const path = require('path');

const srcThemePath = path.join(__dirname, 'index.html');
const rawHtml = fs.readFileSync(srcThemePath, 'utf8');

const locales = {
    'es': {
        title: "Zen C - Ergonomía Moderna. C Puro.",
        desc: "Un lenguaje de programación de sistemas moderno que se compila a C11 legible por humanos sin sobrecarga.",
        nav: { docs: "Documentación", mirror: "Espejo", interop: "Interoperabilidad", roadmap: "Hoja de Ruta", newsletter: "Boletín", sponsors: "Patrocinadores" },
        hero: {
            sub: "Ergonomía Moderna.<br>Cero Overhead.<br>C Puro.",
            lead: "Un lenguaje de sistemas estrictamente tipado que trae <strong>coincidencia de patrones</strong>, <strong>traits</strong>, y <strong>semántica de propiedad</strong> al ecosistema de C.",
            get_started: "Empezar",
            join_discord: "Unirse a Discord",
            newsletter: "Boletín &rarr;",
            updates: "Actualizaciones sobre el progreso de Zen C:",
            join: "Únete"
        },
        install: {
            title: "Empieza a Compilar", desc: "¡Funciona con GCC/Clang/TCC y otros compiladores!",
            clone: "CLONAR", build: "CONSTRUIR", install: "INSTALAR"
        },
        features: {
            title: "Cero Fricción. Control Máximo.",
            desc: "Experimenta la transparencia de C combinada con la experiencia de desarrollo de un lenguaje moderno.",
            f1: "Transpila directamente a GNU C11 limpio y legible: C puro sin cajas negras.",
            f2: "Llama a cualquier función C, usa cualquier estructura C. Cero boilerplate FFI.",
            f3: "El trait Drop implícito evita fugas de memoria sin un recolector de basura (GC).",
            f4: "Genéricos sin sobrecarga: especializados en tiempo de compilación, no en tiempo de ejecución.",
            f5: "E/S asíncrona de alto rendimiento sin el infierno de callbacks ni runtimes ocultos.",
            f6: "Coincidencia de patrones exhaustiva en enums y tuplas para un flujo de control a prueba de balas.",
            f7: "Tipos paramétricos que desaparecen en tiempo de compilación: sin despacho virtual."
        },
        interop: {
            title: "Arquitectura Políglota",
            desc: "Zen C se adapta a tu ecosistema. Enlázalo sin problemas con bases de código existentes.",
            cuda: "Escribe kernels de GPU con sintaxis Zen usando atributos <code>launch</code> y <code>@global</code>.",
            cpp: "Genera código compatible con C++ para enlazar con bibliotecas. Instancia plantillas en bloques <code>raw</code>.",
            objc: "Soporte nativo para macOS. Mezcla la sintaxis <code>[Objeto mensaje]</code> dentro de tu código de sistemas."
        },
        rosetta: {
            title: "Establecido en Rosetta Code",
            desc: "Zen C es un ciudadano de primera clase en Rosetta Code, la crestomatía de programación. Compara nuestra sintaxis y semántica a través de cientos de tareas estandarizadas.",
            btn: "Explorar la Categoría Zen C &rarr;"
        },
        footer: {
            tag: "Ergonomía moderna. C puro.", project: "Proyecto", src: "Código Fuente", spon: "Patrocinar",
            news_title: "Boletín", news_desc: "Únete a la lista de correo para actualizaciones.", sub: "Suscribirse"
        }
    },
    'de': {
        title: "Zen C - Moderne Ergonomie. Reines C.",
        desc: "Eine moderne Systemprogrammiersprache, die in lesbares C11 mit null Overhead kompiliert wird.",
        nav: { docs: "Dokumentation", mirror: "Spiegel", interop: "Interoperabilität", roadmap: "Roadmap", newsletter: "Newsletter", sponsors: "Sponsoren" },
        hero: {
            sub: "Moderne Ergonomie.<br>Null Overhead.<br>Reines C.",
            lead: "Eine streng typisierte Systemsprache, die <strong>Pattern Matching</strong>, <strong>Traits</strong> und <strong>Eigentumssemantik</strong> in das C-Ökosystem bringt.",
            get_started: "Loslegen", join_discord: "Discord Beitreten", newsletter: "Newsletter &rarr;",
            updates: "Updates zum Zen C Fortschritt:", join: "Beitreten"
        },
        install: {
            title: "Beginne zu Kompilieren", desc: "Funktioniert mit GCC/Clang/TCC und anderen Compilern!",
            clone: "KLONEN", build: "BAUEN", install: "INSTALLIEREN"
        },
        features: {
            title: "Null Reibung. Maximale Kontrolle.",
            desc: "Erleben Sie die Transparenz von C kombiniert mit der Entwicklererfahrung einer modernen Sprache.",
            f1: "Kompiliert direkt in sauberes, lesbares GNU C11: reines C ohne Blackboxes.",
            f2: "Rufen Sie jede C-Funktion auf, verwenden Sie jedes C-Struct. Null FFI-Boilerplate.",
            f3: "Das implizite Drop-Trait verhindert Speicherlecks ohne GC.",
            f4: "Zero-Overhead-Generics: zur Kompilierzeit spezialisiert, nicht zur Laufzeit.",
            f5: "Leistungsstarke asynchrone I/O ohne Callback-Hölle oder versteckte Runtimes.",
            f6: "Vollständiges Match auf Enums und Tupels für absolut sicheren Kontrollfluss.",
            f7: "Parametrische Typen, die zur Kompilierzeit verschwinden: kein virtueller Dispatch."
        },
        interop: {
            title: "Polyglotte Architektur",
            desc: "Zen C passt sich an Ihr Ökosystem an. Nahtlose Verknüpfung mit bestehenden Codebasen.",
            cuda: "Schreiben Sie GPU-Kernels mit Zen-Syntax mithilfe der Attribute <code>launch</code> und <code>@global</code>.",
            cpp: "Generieren Sie C++-kompatiblen Code zur Verknüpfung mit Bibliotheken. Instanziieren Sie Templates in <code>raw</code>-Blöcken.",
            objc: "Native macOS-Unterstützung. Mischen Sie <code>[Objekt Nachricht]</code>-Syntax in Ihrem Systemcode."
        },
        rosetta: {
            title: "Etabliert auf Rosetta Code",
            desc: "Zen C ist ein erstklassiger Bürger auf Rosetta Code, der Programmier-Chrestomathie. Vergleichen Sie unsere Syntax und Semantik anhand von hunderten standardisierten Aufgaben.",
            btn: "Die Zen C Kategorie erkunden &rarr;"
        },
        footer: {
            tag: "Moderne Ergonomie. Reines C.", project: "Projekt", src: "Quellcode", spon: "Sponsern",
            news_title: "Newsletter", news_desc: "Treten Sie der Mailingliste für Updates bei.", sub: "Abonnieren"
        }
    },
    'it': {
        title: "Zen C - Ergonomia Moderna. Puro C.",
        desc: "Un linguaggio di programmazione di sistema moderno che compila in C11 leggibile con zero overhead.",
        nav: { docs: "Documentazione", mirror: "Mirror", interop: "Interop", roadmap: "Roadmap", newsletter: "Newsletter", sponsors: "Sponsor" },
        hero: {
            sub: "Ergonomia Moderna.<br>Zero Overhead.<br>Puro C.",
            lead: "Un linguaggio di sistema strettamente tipizzato che porta <strong>pattern matching</strong>, <strong>traits</strong> e <strong>semantica di proprietà</strong> nell'ecosistema C.",
            get_started: "Inizia", join_discord: "Unisciti a Discord", newsletter: "Newsletter &rarr;",
            updates: "Aggiornamenti sui progressi di Zen C:", join: "Unisciti"
        },
        install: {
            title: "Inizia a Compilare", desc: "Funziona con GCC/Clang/TCC e altri compilatori!",
            clone: "CLONA", build: "COMPILA", install: "INSTALLA"
        },
        features: {
            title: "Zero Attrito. Massimo Controllo.",
            desc: "Scopri la trasparenza del C combinata con l'esperienza di sviluppo di un linguaggio moderno.",
            f1: "Transpila direttamente in GNU C11 pulito e leggibile: puro C senza scatole nere.",
            f2: "Chiama qualsiasi funzione C, usa qualsiasi struct C. Zero boilerplate FFI.",
            f3: "Il trait Drop implicito previene le perdite di memoria senza un GC.",
            f4: "Generics a zero overhead: specializzati a tempo di compilazione, non a runtime.",
            f5: "I/O asincrono ad alte prestazioni senza l'inferno delle callback o runtime nascosti.",
            f6: "Pattern matching esaustivo su enum e tuple per un flusso di controllo a prova di proiettile.",
            f7: "Tipi parametrici che scompaiono a tempo di compilazione: nessun dispatch virtuale."
        },
        interop: {
            title: "Architettura Poliglotta",
            desc: "Zen C si adatta al tuo ecosistema. Collegati senza problemi ai codici esistenti.",
            cuda: "Scrivi kernel GPU con sintassi Zen utilizzando gli attributi <code>launch</code> e <code>@global</code>.",
            cpp: "Genera codice compatibile con C++ per collegarti alle librerie. Istanzia template nei blocchi <code>raw</code>.",
            objc: "Supporto nativo macOS. Mescola la sintassi <code>[Oggetto messaggio]</code> nel tuo codice di sistema."
        },
        rosetta: {
            title: "Istituito su Rosetta Code",
            desc: "Zen C è un cittadino di prim'ordine su Rosetta Code. Confronta la nostra sintassi e semantica attraverso centinaia di attività standardizzate.",
            btn: "Esplora la Categoria Zen C &rarr;"
        },
        footer: {
            tag: "Ergonomia moderna. Puro C.", project: "Progetto", src: "Codice Sorgente", spon: "Sponsorizza",
            news_title: "Newsletter", news_desc: "Unisciti alla mailing list per gli aggiornamenti.", sub: "Iscriviti"
        }
    },
    'zh-cn': {
        title: "Zen C - 现代人体工程学。纯粹的 C。",
        desc: "一种现代系统编程语言，可无开销地编译为人类可读的 C11。",
        nav: { docs: "文档", mirror: "镜像", interop: "互操作性", roadmap: "路线图", newsletter: "通讯", sponsors: "赞助商" },
        hero: {
            sub: "现代人体工程学。<br>零开销。<br>纯粹的 C。",
            lead: "一种严格类型的系统语言，为 C 生态系统带来了<strong>模式匹配</strong>、<strong>特征(Traits)</strong>和<strong>所有权语义</strong>。",
            get_started: "开始使用", join_discord: "加入 Discord", newsletter: "通讯 &rarr;",
            updates: "有关 Zen C 进度的更新：", join: "加入"
        },
        install: {
            title: "开始编译", desc: "适用于 GCC/Clang/TCC 和其他编译器！",
            clone: "克隆 (CLONE)", build: "构建 (BUILD)", install: "安装 (INSTALL)"
        },
        features: {
            title: "零摩擦。最大控制。",
            desc: "体验 C 的透明度与现代语言的开发体验的完美结合。",
            f1: "直接转译为干净、可读的 GNU C11：纯粹的 C，没有黑盒。",
            f2: "调用任何 C 函数，使用任何 C 结构。零 FFI 样板代码。",
            f3: "隐式的 Drop 特征防止内存泄漏，无需垃圾回收器 (GC)。",
            f4: "零开销泛型：在编译时专门化，而不是在运行时。",
            f5: "高性能异步 I/O，没有回调地狱或隐藏的运行时。",
            f6: "对枚举和元组进行穷举模式匹配，实现防弹控制流。",
            f7: "在编译时消失的参数化类型：没有虚分派。"
        },
        interop: {
            title: "多语言架构",
            desc: "Zen C 适应您的生态系统。与现有代码库无缝链接。",
            cuda: "使用 <code>launch</code> 和 <code>@global</code> 属性编写 GPU 内核的 Zen 语法。",
            cpp: "生成兼容 C++ 的代码以链接库。在 <code>raw</code> 块中实例化模板。",
            objc: "原生 macOS 支持。在系统代码中混合使用 <code>[对象 消息]</code> 语法。"
        },
        rosetta: {
            title: "在 Rosetta Code 上建立",
            desc: "Zen C 是一等公民。通过数百项标准化任务比较我们的语法和语义。",
            btn: "探索 Zen C 类别 &rarr;"
        },
        footer: {
            tag: "现代人体工程学。纯粹的 C。", project: "项目", src: "源代码", spon: "赞助",
            news_title: "通讯", news_desc: "加入邮件列表以获取更新。", sub: "订阅"
        }
    },
    'pt': {
        title: "Zen C - Ergonomia Moderna. C Puro.",
        desc: "Uma linguagem de programação de sistemas moderna que compila para C11 legível por humanos com zero overhead.",
        nav: { docs: "Documentação", mirror: "Espelho", interop: "Interoperação", roadmap: "Roteiro", newsletter: "Boletim", sponsors: "Patrocinadores" },
        hero: {
            sub: "Ergonomia Moderna.<br>Zero Overhead.<br>C Puro.",
            lead: "Uma linguagem de sistemas estritamente tipada que traz <strong>pattern matching</strong>, <strong>traits</strong>, e <strong>semântica de propriedade</strong> para o ecossistema C.",
            get_started: "Começar", join_discord: "Juntar-se ao Discord", newsletter: "Boletim &rarr;",
            updates: "Atualizações sobre o progresso do Zen C:", join: "Juntar-se"
        },
        install: {
            title: "Comece a Compilar", desc: "Funciona com GCC/Clang/TCC e outros compiladores!",
            clone: "CLONAR", build: "CONSTRUIR", install: "INSTALAR"
        },
        features: {
            title: "Zero Atrito. Controle Máximo.",
            desc: "Experimente a transparência do C combinada com a experiência de desenvolvimento de uma linguagem moderna.",
            f1: "Transpila diretamente para GNU C11 limpo e legível: C puro sem caixas pretas.",
            f2: "Chame qualquer função C, use qualquer struct C. Zero boilerplate FFI.",
            f3: "O trait Drop implícito evita vazamentos de memória sem um GC.",
            f4: "Generics sem overhead: especializa em tempo de compilação, não em tempo de execução.",
            f5: "E/S assíncrona de alto desempenho sem o inferno de callbacks ou runtimes ocultos.",
            f6: "Pattern matching exaustivo em enums e tuplas para um fluxo de controle à prova de balas.",
            f7: "Tipos paramétricos que desaparecem em tempo de compilação: sem despacho virtual."
        },
        interop: {
            title: "Arquitetura Poliglota",
            desc: "O Zen C se adapta ao seu ecossistema. Conecte-se perfeitamente a bases de código existentes.",
            cuda: "Escreva kernels de GPU com sintaxe Zen usando atributos <code>launch</code> e <code>@global</code>.",
            cpp: "Gere código compatível com C++ para conectar a bibliotecas. Instancie templates em blocos <code>raw</code>.",
            objc: "Suporte nativo para macOS. Misture sintaxe <code>[Objeto mensagem]</code> no seu código de sistemas."
        },
        rosetta: {
            title: "Estabelecido no Rosetta Code",
            desc: "Zen C é um cidadão de primeira classe no Rosetta Code, a crestomatia de programação. Compare nossa sintaxe e semântica em centenas de tarefas padronizadas.",
            btn: "Explorar a Categoria Zen C &rarr;"
        },
        footer: {
            tag: "Ergonomia moderna. C puro.", project: "Projeto", src: "Código Fonte", spon: "Patrocinar",
            news_title: "Boletim", news_desc: "Junte-se à lista de e-mails para atualizações.", sub: "Inscrever-se"
        }
    },
    'ru': {
        title: "Zen C - Современная эргономика. Чистый C.",
        desc: "Современный язык системного программирования, компилируемый в читаемый C11 без накладных расходов.",
        nav: { docs: "Документация", mirror: "Зеркало", interop: "Взаимодействие", roadmap: "Дорожная карта", newsletter: "Новости", sponsors: "Спонсоры" },
        hero: {
            sub: "Современная эргономика.<br>Ноль накладных расходов.<br>Чистый C.",
            lead: "Строго типизированный системный язык, который привносит <strong>сопоставление с образцом</strong>, <strong>типажи (traits)</strong> и <strong>семантику владения</strong> в экосистему C.",
            get_started: "Начать", join_discord: "Присоединиться к Discord", newsletter: "Новости &rarr;",
            updates: "Обновления прогресса Zen C:", join: "Присоединиться"
        },
        install: {
            title: "Начните Компилировать", desc: "Работает с GCC/Clang/TCC и другими компиляторами!",
            clone: "КЛОНИРОВАТЬ", build: "СБОРКА", install: "УСТАНОВКА"
        },
        features: {
            title: "Ноль препятствий. Максимальный контроль.",
            desc: "Ощутите прозрачность C в сочетании с удобством современной разработки.",
            f1: "Транспилируется прямо в чистый GNU C11: чистый C без черных ящиков.",
            f2: "Вызов любой функции C, использование любых структур C. Ноль FFI шаблонов.",
            f3: "Неявный трейт Drop предотвращает утечки памяти без сборщика мусора.",
            f4: "Дженерики без накладных расходов: специализируются во время компиляции, а не во время выполнения.",
            f5: "Высокопроизводительный асинхронный ввод-вывод без ада обратных вызовов.",
            f6: "Исчерпывающее сопоставление с образцом на перечислениях и кортежах.",
            f7: "Параметрические типы исчезают во время компиляции: никакой виртуальной диспетчеризации."
        },
        interop: {
            title: "Полиглот-Архитектура",
            desc: "Zen C адаптируется к вашей экосистеме. Бесшовная связка с существующими базами кода.",
            cuda: "Пишите ядра GPU с синтаксисом Zen, используя атрибуты <code>launch</code> и <code>@global</code>.",
            cpp: "Генерация C++-совместимого кода для сборки с библиотеками. Инстанциация шаблонов в <code>raw</code> блоках.",
            objc: "Нативная поддержка macOS. Смешивайте синтаксис <code>[Объект сообщение]</code> в системном коде."
        },
        rosetta: {
            title: "Признан на Rosetta Code",
            desc: "Zen C — полноправный гражданин Rosetta Code. Сравните наш синтаксис и семантику в сотнях стандартных задач.",
            btn: "К категории Zen C &rarr;"
        },
        footer: {
            tag: "Современная эргономика. Чистый C.", project: "Проект", src: "Исходный код", spon: "Спонсировать",
            news_title: "Новости", news_desc: "Подпишитесь на рассылку обновлений.", sub: "Подписаться"
        }
    },
    'zh-tw': {
        title: "Zen C - 現代人體工學。純粹的 C。",
        desc: "一種現代系統程式設計語言，可無開銷地編譯為人類可讀的 C11。",
        nav: { docs: "文件", mirror: "鏡像", interop: "互通性", roadmap: "路線圖", newsletter: "電子報", sponsors: "贊助商" },
        hero: {
            sub: "現代人體工學。<br>零開銷。<br>純粹的 C。",
            lead: "嚴格型別的系統語言，為 C 生態系統帶來了<strong>模式匹配</strong>、<strong>特徵 (Traits)</strong>及<strong>所有權語意</strong>。",
            get_started: "開始使用", join_discord: "加入 Discord", newsletter: "電子報 &rarr;",
            updates: "有關 Zen C 發展的更新：", join: "加入"
        },
        install: {
            title: "開始編譯", desc: "適用於 GCC/Clang/TCC 和其他編譯器！",
            clone: "複製 (CLONE)", build: "建構 (BUILD)", install: "安裝 (INSTALL)"
        },
        features: {
            title: "零摩擦。最大控制。",
            desc: "體驗 C 的透明度與現代語言開發體驗的完美結合。",
            f1: "直接轉譯為乾淨、可讀的 GNU C11：沒有黑盒子的純 C。",
            f2: "呼叫任何 C 函數，使用任何 C 結構。零 FFI 樣板代碼。",
            f3: "隱含的 Drop 特徵可防止記憶體洩漏，無須垃圾回收器 (GC)。",
            f4: "零開銷泛型：在編譯時專門化，而非執行時。",
            f5: "高效能非同步 I/O，沒有回呼地獄或隱藏的運行時。",
            f6: "對列舉和元組進行詳盡的模式匹配，實現防彈的控制流。",
            f7: "在編譯時消失的參數化型別：沒有虛擬分派。"
        },
        interop: {
            title: "多語言架構",
            desc: "Zen C 融入您的生態系統。與現有程式碼庫無縫連結。",
            cuda: "使用 <code>launch</code> 和 <code>@global</code> 屬性編寫 GPU 核心的 Zen 語法。",
            cpp: "生成相容 C++ 的程式碼以連結程式庫。在 <code>raw</code> 區塊中實例化模板。",
            objc: "原生 macOS 支援。在您的系統程式碼中混合 <code>[物件 訊息]</code> 語法。"
        },
        rosetta: {
            title: "在 Rosetta Code 建立",
            desc: "Zen C 是一等公民。透過數百項標準化任務比較我們的語法和語意。",
            btn: "探索 Zen C 類別 &rarr;"
        },
        footer: {
            tag: "現代人體工學。純粹的 C。", project: "專案", src: "原始碼", spon: "贊助",
            news_title: "電子報", news_desc: "加入郵件列表以接收更新。", sub: "訂閱"
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
    { eng: /<a href="https:\/\/opencollective\.com\/z-libs">Sponsor<\/a>/, key: 'nav.sponsors', tag: '<a href="https://opencollective.com/z-libs">{VAL}</a>' }
];

function resolveKey(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

for (const lang of Object.keys(locales)) {
    let outHtml = rawHtml;
    // Update active class in switcher
    outHtml = outHtml.replace(/<a href="\/" class="lang-item active" lang="en">English<\/a>/g, `<a href="/" class="lang-item" lang="en">English</a>`);
    outHtml = outHtml.replace(new RegExp(`<a href="/${lang}/" class="lang-item" lang="${lang}">([^<]+)<\/a>`), `<a href="/${lang}/" class="lang-item active" lang="${lang}">$1</a>`);
    // Update EN ▾ to LANG ▾
    outHtml = outHtml.replace(/EN ▾/g, `${lang.toUpperCase()} ▾`);

    for (const rx of regexes) {
        const val = resolveKey(locales[lang], rx.key);
        if (val) {
            outHtml = outHtml.replace(rx.eng, rx.tag.replace('{VAL}', val));
        }
    }

    // Correct link paths to docs localized (run LAST so it doesn't break exact match regexes)
    outHtml = outHtml.replace(/"https:\/\/docs\.zenc-lang\.org\/?([^"]*)"/g, `"https://docs.zenc-lang.org/${lang}/$1"`);

    const dirInfo = path.join(__dirname, lang);
    if (!fs.existsSync(dirInfo)) fs.mkdirSync(dirInfo);
    fs.writeFileSync(path.join(dirInfo, 'index.html'), outHtml);
    console.log(`Successfully built ${lang}/index.html`);
}
