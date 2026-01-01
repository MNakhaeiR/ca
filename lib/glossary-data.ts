export interface GlossaryEntry {
    term: string;
    brief: string;
    definition: string;
    example?: string;
    benefit?: string;
    technical?: string;
}

export const glossaryData: Record<string, GlossaryEntry> = {
    // Cache Terms
    cache: {
        term: "Cache (حافظه نهان)",
        brief: "حافظه سریع و کوچک بین CPU و RAM",
        definition: "حافظه سریع و کوچک بین CPU و حافظه اصلی (RAM) که داده‌های پرکاربرد را ذخیره می‌کند تا زمان دسترسی CPU به داده کاهش یابد.",
        example: "وقتی برنامه‌ای چندبار به یک متغیر دسترسی دارد، آن را در Cache نگه می‌دارد تا هر بار از RAM نخواند.",
        benefit: "افزایش سرعت دسترسی به داده‌ها و کاهش زمان انتظار CPU"
    },
    registers: {
        term: "Registers (ثبات)",
        brief: "سریع‌ترین حافظه داخل CPU",
        definition: "سریع‌ترین و کوچک‌ترین حافظه داخل CPU که مستقیماً توسط دستورات استفاده می‌شود. دسترسی در کمتر از 1 سیکل.",
        example: "رجیسترهایی مثل EAX, EBX در x86 یا R0-R31 در RISC-V",
        benefit: "دسترسی فوری به داده‌ها برای اجرای دستورات"
    },
    dram: {
        term: "DRAM",
        brief: "حافظه اصلی سیستم (RAM)",
        definition: "Dynamic Random Access Memory - حافظه اصلی سیستم که برنامه‌ها و داده‌های فعال را نگه می‌دارد. بزرگ (گیگابایت‌ها) ولی نسبتاً کند (200-300 سیکل).",
        example: "DDR4, DDR5 در سیستم‌های مدرن",
        benefit: "فضای کافی برای نگهداری برنامه‌ها و داده‌های در حال اجرا"
    },
    storage: {
        term: "Storage (حافظه جانبی)",
        brief: "حافظه دائمی (HDD, SSD)",
        definition: "حافظه دائمی برای ذخیره فایل‌ها. خیلی کند (هزاران سیکل) ولی بسیار بزرگ (ترابایت‌ها) و دائمی.",
        example: "هارد دیسک یا SSD برای ذخیره سیستم‌عامل، برنامه‌ها و فایل‌ها",
        benefit: "ذخیره‌سازی دائمی اطلاعات حتی بعد از خاموش شدن سیستم"
    },
    hit: {
        term: "Cache Hit",
        brief: "داده در Cache موجود است",
        definition: "زمانی که داده مورد نیاز در Cache موجود باشد و دسترسی سریع انجام شود.",
        benefit: "دسترسی سریع به داده بدون نیاز به خواندن از حافظه اصلی"
    },
    miss: {
        term: "Cache Miss",
        brief: "داده در Cache نیست",
        definition: "زمانی که داده مورد نیاز در Cache نباشد و باید از RAM یا حافظه پایین‌تر خوانده شود.",
        example: "اولین بار که به یک داده دسترسی می‌شود، Miss است",
        technical: "باعث تأخیر می‌شود چون باید از حافظه کندتر داده بخواند"
    },

    // Associativity
    "direct-mapped": {
        term: "Direct-Mapped Cache",
        brief: "هر بلوک فقط یک مکان مشخص دارد",
        definition: "هر بلوک حافظه فقط یک مکان مشخص در Cache دارد (1-way associative). بسیار ساده و سریع ولی Conflict Miss زیاد.",
        benefit: "پیاده‌سازی ساده و هزینه کم",
        technical: "دو آدرس مختلف ممکن است همدیگر را از Cache بیرون بزنند"
    },
    "set-associative": {
        term: "Set-Associative Cache",
        brief: "هر بلوک N مکان ممکن دارد",
        definition: "هر بلوک حافظه می‌تواند در N مکان مختلف درون یک Set قرار گیرد. تعادل خوب بین سرعت و Miss Rate.",
        example: "4-way یعنی هر بلوک 4 جای ممکن دارد",
        benefit: "رایج‌ترین نوع - در L1, L2, L3 اکثر پردازنده‌ها"
    },
    "fully-associative": {
        term: "Fully-Associative Cache",
        brief: "هر بلوک می‌تواند در هر مکان باشد",
        definition: "هر بلوک حافظه می‌تواند در هر مکان Cache قرار گیرد (بدون محدودیت Set). کمترین Miss ولی خیلی پیچیده و گران.",
        example: "TLB (Translation Lookaside Buffer) معمولاً Fully-Associative است",
        technical: "باید همه Entry ها را مقایسه کند - کند و گران"
    },
    way: {
        term: "Way (راه)",
        brief: "مکان‌های موازی در یک Set",
        definition: "هر کدام از مکان‌های موازی درون یک Set که می‌توانند داده ذخیره کنند.",
        example: "در 4-way Cache، هر Set دارای 4 Way است",
        benefit: "Way بیشتر = انعطاف بیشتر = Conflict Miss کمتر"
    },
    set: {
        term: "Set (مجموعه)",
        brief: "گروهی از Way ها",
        definition: "گروهی از Way ها که یک بلوک حافظه می‌تواند در آن‌ها قرار گیرد. Set Index از آدرس حافظه مشخص می‌کند بلوک به کدام Set می‌رود.",
        example: "Cache با 256 Set و 4-way → 256 × 4 = 1024 Cache Line",
        technical: "Set Index = (Block Address) mod (Number of Sets)"
    },

    // Address Structure
    tag: {
        term: "Tag (برچسب)",
        brief: "شناسه یکتای بلوک در Cache",
        definition: "بخشی از آدرس که برای شناسایی یکتای بلوک داده در یک Set استفاده می‌شود.",
        example: "اگر Tag ها یکسان باشند → Hit، وگرنه → Miss",
        benefit: "تشخیص این‌که آیا داده موجود همان داده مورد نظر است"
    },
    "set-index": {
        term: "Set Index (شاخص مجموعه)",
        brief: "مشخص می‌کند بلوک به کدام Set برود",
        definition: "بخشی از آدرس که مشخص می‌کند بلوک باید به کدام Set برود.",
        example: "اگر 256 Set داشته باشیم، از 8 بیت میانی آدرس استفاده می‌شود",
        technical: "همه بلوک‌هایی که Set Index یکسان دارند، رقیب هم هستند"
    },
    "block-offset": {
        term: "Block Offset (جابجایی بلوک)",
        brief: "مکان بایت در Cache Block",
        definition: "بخشی از آدرس که مشخص می‌کند بایت مورد نظر در کدام قسمت از Cache Block قرار دارد.",
        example: "اگر هر بلوک 64 بایت باشد، 6 بیت پایینی برای Offset است",
        benefit: "پیدا کردن بایت دقیق بعد از پیدا کردن بلوک در Cache"
    },
    "cache-line": {
        term: "Cache Line / Block",
        brief: "واحد انتقال داده در Cache",
        definition: "واحد کوچکترین داده‌ای که در Cache ذخیره و جابجا می‌شود. معمولاً 64 بایت در پردازنده‌های مدرن.",
        example: "وقتی آدرس 1000 را می‌خوانیم، بلوک 1000-1063 وارد Cache می‌شود",
        benefit: "استفاده از Spatial Locality - داده‌های نزدیک هم معمولاً با هم استفاده می‌شوند"
    },

    // Replacement Algorithms
    lru: {
        term: "LRU (Least Recently Used)",
        brief: "جایگزین کردن بلوک کمتر استفاده شده",
        definition: "جایگزین کردن بلوکی که مدت زمان طولانی‌تری از آخرین استفاده آن گذشته است. رایج‌ترین الگوریتم.",
        example: "اگر 4 بلوک داشته باشیم و B آخرین بار 100 سیکل پیش استفاده شده، B حذف می‌شود",
        benefit: "عملکرد خوب برای اکثر برنامه‌ها"
    },
    fifo: {
        term: "FIFO (First In, First Out)",
        brief: "اولی که آمده، اولی که می‌رود",
        definition: "جایگزین کردن قدیمی‌ترین بلوک (اولین بلوکی که وارد Cache شده). بسیار ساده ولی ممکن است بلوک پرکاربرد را حذف کند.",
        benefit: "پیاده‌سازی بسیار ساده - فقط یک شمارنده"
    },

    // Write Policies
    "write-through": {
        term: "Write-Through",
        brief: "نوشتن همزمان در Cache و حافظه",
        definition: "هر نوشتن به Cache همزمان به حافظه اصلی هم نوشته می‌شود. Cache و حافظه همیشه همگام هستند.",
        benefit: "داده‌ها ایمن‌تر - از دست نمی‌روند",
        technical: "کند - هر نوشتن نیاز به دسترسی به حافظه اصلی دارد"
    },
    "write-back": {
        term: "Write-Back",
        brief: "نوشتن فقط در Cache، بعداً به حافظه",
        definition: "نوشتن فقط در Cache انجام می‌شود، بعداً (هنگام جایگزینی) به حافظه نوشته می‌شود.",
        benefit: "سریع - نوشتن‌های متوالی فقط یک بار به حافظه می‌روند",
        technical: "نیاز به Dirty Bit - پیچیده‌تر"
    },

    // Miss Types
    "compulsory-miss": {
        term: "Compulsory Miss (Cold Miss)",
        brief: "اولین دسترسی به یک بلوک",
        definition: "اولین بار که به یک بلوک دسترسی می‌شود، حتماً Miss است چون هنوز در Cache نیست.",
        example: "اولین بار که برنامه اجرا می‌شود",
        technical: "اجتناب‌ناپذیر - فقط با Prefetching کاهش می‌یابد"
    },
    "capacity-miss": {
        term: "Capacity Miss",
        brief: "Cache کوچک‌تر از Working Set است",
        definition: "بلوک قبلاً در Cache بوده ولی به دلیل پر بودن Cache از آن خارج شده است.",
        example: "کار با آرایه 10 مگابایتی در Cache 256 کیلوبایتی",
        technical: "Working Set بزرگ‌تر از اندازه Cache"
    },
    "conflict-miss": {
        term: "Conflict Miss",
        brief: "بلوک‌ها یکدیگر را بیرون می‌زنند",
        definition: "چند بلوک مختلف به یک Set نگاشت می‌شوند و همدیگر را بیرون می‌زنند (با وجود فضای خالی در Cache).",
        example: "در Direct-Mapped، دو آدرس با Set Index یکسان همیشه رقیب هستند",
        technical: "محدودیت Associativity باعث این Miss می‌شود"
    },

    // Locality
    "temporal-locality": {
        term: "Temporal Locality (محلی‌سازی زمانی)",
        brief: "داده اخیر احتمالاً دوباره نیاز است",
        definition: "اگر به یک داده دسترسی پیدا کردیم، احتمالاً در آینده نزدیک دوباره به آن نیاز داریم.",
        example: "متغیرهای حلقه (loop counter)، توابع پرکاربرد",
        benefit: "داده‌های اخیراً استفاده شده در Cache نگه داشته می‌شوند"
    },
    "spatial-locality": {
        term: "Spatial Locality (محلی‌سازی مکانی)",
        brief: "داده‌های نزدیک هم احتمالاً با هم نیاز هستند",
        definition: "اگر به یک آدرس دسترسی پیدا کردیم، احتمالاً به آدرس‌های نزدیک آن هم نیاز داریم.",
        example: "آرایه‌ها، دستورات متوالی برنامه",
        benefit: "به جای یک بایت، یک Cache Line کامل منتقل می‌شود"
    },

    // Architecture Terms
    "out-of-order": {
        term: "Out-of-Order Execution (اجرای خارج از ترتیب)",
        brief: "اجرای دستورات بدون نیاز به ترتیب",
        definition: "پردازنده می‌تواند دستوراتی که داده‌هایشان آماده است را زودتر اجرا کند، حتی اگر دستورات قبلی هنوز اجرا نشده باشند.",
        benefit: "استفاده بهتر از واحدهای اجرایی و کاهش تأخیر",
        example: "در Intel Core i9، دستورات مستقل می‌توانند همزمان اجرا شوند"
    },
    "hyper-threading": {
        term: "Hyper-Threading (چندنخی‌سازی)",
        brief: "دو Thread همزمان در یک هسته",
        definition: "تکنولوژی Intel برای اجرای همزمان دو Thread در یک هسته فیزیکی با اشتراک منابع اجرایی.",
        benefit: "افزایش بهره‌وری هسته تا 30% در برخی برنامه‌ها",
        technical: "هر Thread دارای Register Set مجزا ولی واحدهای اجرایی مشترک"
    },
    pipeline: {
        term: "Pipeline (خط لوله)",
        brief: "اجرای موازی مراحل دستورات",
        definition: "تقسیم اجرای دستورات به مراحل کوچک‌تر که می‌توانند همزمان برای دستورات مختلف اجرا شوند.",
        example: "در Intel، Pipeline های 14-19 مرحله‌ای برای افزایش فرکانس",
        benefit: "افزایش تعداد دستورات در هر سیکل (Throughput)"
    },
    "p-cores": {
        term: "P-cores (Performance Cores)",
        brief: "هسته‌های قدرتمند برای عملکرد بالا",
        definition: "هسته‌های پرقدرت با معماری پیچیده، Out-of-Order Execution، و Hyper-Threading برای کارهای سنگین.",
        example: "8 هسته P-core در Core i9-12900K",
        benefit: "عملکرد بالا در برنامه‌های تک‌نخی و کارهای پردازشی سنگین"
    },
    "e-cores": {
        term: "E-cores (Efficiency Cores)",
        brief: "هسته‌های کم‌مصرف برای کارهای پس‌زمینه",
        definition: "هسته‌های ساده‌تر و کم‌مصرف بدون Hyper-Threading برای کارهای پس‌زمینه و چندنخی.",
        example: "8-16 هسته E-core در Core i9 نسل 12 و 13",
        benefit: "کاهش مصرف برق در کارهای ساده و افزایش کارایی چندنخی"
    },
    tlb: {
        term: "TLB (Translation Lookaside Buffer)",
        brief: "Cache برای ترجمه آدرس مجازی به فیزیکی",
        definition: "Cache کوچک و سریع که نگاشت آدرس‌های مجازی به فیزیکی را ذخیره می‌کند تا از دسترسی مکرر به Page Table جلوگیری شود.",
        benefit: "کاهش زمان ترجمه آدرس و افزایش سرعت دسترسی به حافظه"
    },
    prefetcher: {
        term: "Prefetcher (پیش‌بارگذار)",
        brief: "پیش‌بینی و بارگذاری داده‌های آینده",
        definition: "واحدی که الگوی دسترسی به حافظه را تشخیص داده و داده‌های مورد نیاز آینده را پیش از درخواست به Cache می‌آورد.",
        benefit: "کاهش Cache Miss و پنهان کردن تأخیر حافظه"
    },
    "branch-prediction": {
        term: "Branch Prediction (پیش‌بینی شاخه)",
        brief: "حدس مسیر شاخه‌های شرطی",
        definition: "سیستمی که مسیر دستورات شرطی (if/else, loops) را پیش‌بینی می‌کند تا Pipeline خالی نماند.",
        benefit: "کاهش تأخیر ناشی از شاخه‌های اشتباه",
        technical: "دقت 95-99% در پردازنده‌های مدرن"
    },
    "avx-512": {
        term: "AVX-512",
        brief: "دستورات SIMD 512-بیتی",
        definition: "مجموعه دستورات Intel برای پردازش همزمان داده‌های متعدد (SIMD) با عرض 512 بیت.",
        example: "پردازش همزمان 16 عدد 32-بیتی در یک دستور",
        benefit: "سرعت بالا در محاسبات علمی، AI، و رمزنگاری"
    },
    ipc: {
        term: "IPC (Instructions Per Cycle)",
        brief: "تعداد دستورات در هر سیکل",
        definition: "معیاری برای اندازه‌گیری کارایی معماری پردازنده - چند دستور در هر سیکل ساعت اجرا می‌شود.",
        example: "Intel Skylake: IPC ≈ 4-5 در شرایط ایده‌آل",
        benefit: "IPC بالاتر = عملکرد بهتر با فرکانس یکسان"
    },
    tdp: {
        term: "TDP (Thermal Design Power)",
        brief: "حداکثر توان مصرفی/حرارت",
        definition: "حداکثر توانی که پردازنده در شرایط عادی مصرف می‌کند و سیستم خنک‌کننده باید آن را دفع کند.",
        example: "Core i9-12900K: 125W TDP پایه، 241W حداکثر",
        technical: "واحد: وات (W)"
    },
    "turbo-boost": {
        term: "Turbo Boost",
        brief: "افزایش خودکار فرکانس",
        definition: "تکنولوژی Intel برای افزایش خودکار فرکانس پردازنده بالاتر از سرعت پایه زمانی که حرارت و توان اجازه می‌دهند.",
        example: "Core i9-12900K: 3.2 GHz پایه → 5.2 GHz با Turbo Boost",
        benefit: "عملکرد بالاتر در کارهای کوتاه‌مدت"
    },
    ddr4: {
        term: "DDR4",
        brief: "نسل چهارم حافظه DDR",
        definition: "نسل چهارم حافظه DRAM با سرعت 2133-3200 MHz و ولتاژ 1.2V.",
        benefit: "مصرف برق کمتر و سرعت بالاتر نسبت به DDR3"
    },
    ddr5: {
        term: "DDR5",
        brief: "جدیدترین نسل حافظه DDR",
        definition: "نسل پنجم حافظه DRAM با سرعت 4800-6400 MHz و ولتاژ 1.1V.",
        benefit: "سرعت دوبرابر و پهنای باند بیشتر نسبت به DDR4",
        technical: "پشتیبانی در Intel نسل 12 به بعد"
    },
    pcie: {
        term: "PCIe (PCI Express)",
        brief: "باس سریع برای کارت گرافیک و SSD",
        definition: "استاندارد باس سریع برای اتصال کارت گرافیک، SSD، و دیگر دستگاه‌ها به پردازنده.",
        example: "PCIe 5.0: 32 GB/s در هر جهت (x16)",
        benefit: "انتقال سریع داده بین CPU و GPU/SSD"
    },

    // CPU Architecture Terms
    core: {
        term: "Core (هسته)",
        brief: "واحد پردازش مستقل در CPU",
        definition: "واحد پردازشی مستقل که می‌تواند دستورات را به صورت جداگانه اجرا کند. پردازنده‌های مدرن چند هسته‌ای هستند.",
        example: "Core i9-12900K دارای 16 هسته (8 P-core + 8 E-core)",
        benefit: "اجرای همزمان چندین برنامه یا Thread"
    },
    thread: {
        term: "Thread (نخ)",
        brief: "رشته اجرایی مستقل در برنامه",
        definition: "مسیر اجرایی مستقل در یک برنامه که می‌تواند به صورت موازی با Thread های دیگر اجرا شود.",
        example: "یک بازی ممکن است Thread جداگانه برای گرافیک، صدا، و فیزیک داشته باشد",
        benefit: "استفاده بهتر از هسته‌های متعدد CPU"
    },
    clock: {
        term: "Clock Speed (فرکانس ساعت)",
        brief: "سرعت اجرای دستورات CPU",
        definition: "تعداد سیکل‌های ساعت در ثانیه که CPU می‌تواند اجرا کند، معمولاً بر حسب GHz.",
        example: "Core i9-12900K: 3.2 GHz پایه، 5.2 GHz حداکثر",
        technical: "1 GHz = 1 میلیارد سیکل در ثانیه"
    },

    // Cache Hierarchy
    l1: {
        term: "L1 Cache",
        brief: "سریع‌ترین و کوچک‌ترین Cache",
        definition: "نزدیک‌ترین و سریع‌ترین Cache به هسته CPU، معمولاً 32-64 کیلوبایت برای هر هسته. دسترسی در 4-5 سیکل.",
        example: "Core i9: 80 KB L1 برای هر P-core (48 KB داده + 32 KB دستور)",
        benefit: "کمترین تأخیر برای داده‌های پرکاربرد"
    },
    l2: {
        term: "L2 Cache",
        brief: "Cache میانی با سرعت خوب",
        definition: "Cache لایه دوم، بزرگ‌تر از L1 ولی کمی کندتر. معمولاً 256-512 کیلوبایت برای هر هسته.",
        example: "Core i9-12900K: 1.25 MB L2 برای هر P-core",
        technical: "زمان دسترسی: 12-15 سیکل"
    },
    l3: {
        term: "L3 Cache",
        brief: "Cache مشترک بین همه هسته‌ها",
        definition: "بزرگ‌ترین Cache که بین همه هسته‌ها مشترک است. اندازه چندین مگابایت.",
        example: "Core i9-12900K: 30 MB L3 مشترک",
        benefit: "اشتراک داده بین هسته‌ها و کاهش دسترسی به RAM"
    },

    // Performance Metrics
    latency: {
        term: "Latency (تأخیر)",
        brief: "زمان انتظار برای دریافت داده",
        definition: "مدت زمانی که طول می‌کشد تا یک عملیات کامل شود، از زمان درخواست تا دریافت نتیجه.",
        example: "L1 Cache: 4 سیکل، DRAM: 200-300 سیکل، SSD: 100,000 سیکل",
        benefit: "Latency کمتر = سرعت بیشتر در برنامه‌های حساس به تأخیر"
    },
    throughput: {
        term: "Throughput (گذردهی)",
        brief: "حجم کار در واحد زمان",
        definition: "مقدار کاری که در یک بازه زمانی مشخص انجام می‌شود، معمولاً بر حسب عملیات در ثانیه.",
        example: "GPU: Throughput بالا برای پردازش موازی، CPU: Latency پایین برای پردازش سریال",
        benefit: "Throughput بالاتر = کارایی بیشتر در کارهای موازی"
    },
    bandwidth: {
        term: "Bandwidth (پهنای باند)",
        brief: "حداکثر نرخ انتقال داده",
        definition: "حداکثر مقدار داده‌ای که می‌تواند در واحد زمان منتقل شود، معمولاً بر حسب GB/s.",
        example: "DDR5-6400: 51.2 GB/s، PCIe 5.0 x16: 64 GB/s",
        benefit: "پهنای باند بالاتر = انتقال سریع‌تر داده‌های حجیم"
    },

    // Memory Technologies
    sram: {
        term: "SRAM (Static RAM)",
        brief: "حافظه ایستا برای Cache",
        definition: "نوعی RAM که نیازی به Refresh ندارد، بسیار سریع ولی گران و بزرگ. برای Cache استفاده می‌شود.",
        benefit: "سرعت بالا و مصرف برق کم در حالت Idle",
        technical: "6 ترانزیستور برای هر بیت - گران‌تر از DRAM"
    },
    "page-table": {
        term: "Page Table (جدول صفحه)",
        brief: "نگاشت آدرس مجازی به فیزیکی",
        definition: "ساختار داده‌ای که آدرس‌های مجازی برنامه را به آدرس‌های فیزیکی حافظه نگاشت می‌کند.",
        benefit: "ایزوله‌سازی حافظه بین برنامه‌ها و حفاظت از حافظه",
        technical: "دسترسی به Page Table کند است - TLB آن را Cache می‌کند"
    },
    "virtual-memory": {
        term: "Virtual Memory (حافظه مجازی)",
        brief: "انتزاع حافظه برای برنامه‌ها",
        definition: "سیستمی که به هر برنامه یک فضای آدرس مجزا و مستقل می‌دهد، جدا از حافظه فیزیکی.",
        example: "هر برنامه فکر می‌کند تمام حافظه را دارد",
        benefit: "ایمنی، ایزوله‌سازی، و استفاده بهتر از حافظه"
    },

    // Modern CPU Features
    simd: {
        term: "SIMD (Single Instruction, Multiple Data)",
        brief: "یک دستور، چند داده",
        definition: "پردازش همزمان چندین داده با یک دستور واحد برای افزایش سرعت محاسبات موازی.",
        example: "AVX-512: پردازش 16 عدد float در یک دستور",
        benefit: "سرعت بالا در پردازش تصویر، صدا، و محاسبات علمی"
    },
    alu: {
        term: "ALU (Arithmetic Logic Unit)",
        brief: "واحد محاسبات حسابی و منطقی",
        definition: "واحدی در CPU که عملیات حسابی (جمع، تفریق) و منطقی (AND, OR, XOR) را انجام می‌دهد.",
        benefit: "هسته اصلی محاسبات در پردازنده",
        example: "پردازنده‌های مدرن چندین ALU دارند برای اجرای موازی"
    },
    fpu: {
        term: "FPU (Floating Point Unit)",
        brief: "واحد محاسبات اعشاری",
        definition: "واحد ویژه برای محاسبات اعشاری (اعداد اعشاری شناور) با دقت بالا.",
        example: "محاسبات علمی، گرافیک 3D، شبیه‌سازی فیزیک",
        benefit: "محاسبات دقیق اعداد اعشاری بزرگ و کوچک"
    },

    // Cache Optimization
    "false-sharing": {
        term: "False Sharing",
        brief: "تداخل غیرضروری Cache بین Thread ها",
        definition: "زمانی که دو Thread به متغیرهای مختلف ولی در یک Cache Line دسترسی دارند، باعث ابطال مکرر Cache می‌شود.",
        technical: "مشکل عملکردی در برنامه‌های چندنخی",
        benefit: "شناسایی و رفع آن می‌تواند سرعت را چندین برابر کند"
    },
    "cache-coherence": {
        term: "Cache Coherence (همدوسی Cache)",
        brief: "همگام‌سازی Cache بین هسته‌ها",
        definition: "مکانیزمی برای اطمینان از این‌که همه هسته‌ها نسخه یکسانی از یک داده را می‌بینند.",
        example: "پروتکل MESI برای مدیریت وضعیت Cache Line ها",
        benefit: "جلوگیری از ناهماهنگی داده بین هسته‌ها"
    },
    mesi: {
        term: "MESI Protocol",
        brief: "پروتکل همدوسی Cache",
        definition: "پروتکلی با چهار حالت (Modified, Exclusive, Shared, Invalid) برای مدیریت وضعیت Cache Line ها در سیستم‌های چند هسته‌ای.",
        technical: "Modified: تغییر یافته، Exclusive: انحصاری، Shared: مشترک، Invalid: نامعتبر",
        benefit: "کارایی بالا در همگام‌سازی Cache"
    },

    // Power Management
    "power-gating": {
        term: "Power Gating",
        brief: "قطع کامل برق بخش‌های غیرفعال",
        definition: "قطع کامل تغذیه برق به بخش‌های غیرفعال CPU برای صرفه‌جویی در مصرف انرژی.",
        benefit: "کاهش قابل توجه مصرف برق در حالت Idle",
        technical: "استفاده در حالت‌های خواب عمیق (C-States)"
    },
    "clock-gating": {
        term: "Clock Gating",
        brief: "توقف ساعت بخش‌های غیرفعال",
        definition: "توقف سیگنال ساعت به بخش‌های غیرفعال CPU بدون قطع برق کامل.",
        benefit: "کاهش مصرف انرژی دینامیک با زمان بازگشت سریع",
        technical: "استفاده گسترده در پردازنده‌های مدرن"
    },

    // Instruction Set
    risc: {
        term: "RISC (Reduced Instruction Set)",
        brief: "معماری با دستورات ساده",
        definition: "معماری پردازنده با دستورات ساده و یکسان که هر دستور در یک سیکل اجرا می‌شود.",
        example: "ARM, RISC-V",
        benefit: "طراحی ساده‌تر، مصرف برق کمتر، فرکانس بالاتر"
    },
    cisc: {
        term: "CISC (Complex Instruction Set)",
        brief: "معماری با دستورات پیچیده",
        definition: "معماری پردازنده با دستورات پیچیده که هر دستور می‌تواند چندین عملیات انجام دهد.",
        example: "x86, x86-64 (Intel, AMD)",
        technical: "دستورات پیچیده به میکروکد تبدیل می‌شوند"
    },
    isa: {
        term: "ISA (Instruction Set Architecture)",
        brief: "مجموعه دستورات پردازنده",
        definition: "مجموعه دستوراتی که یک پردازنده می‌تواند اجرا کند - رابط بین سخت‌افزار و نرم‌افزار.",
        example: "x86-64, ARM64, RISC-V",
        benefit: "برنامه‌های نوشته شده برای یک ISA روی همه پردازنده‌های آن ISA اجرا می‌شوند"
    },

    // Memory Ordering
    "memory-barrier": {
        term: "Memory Barrier (سد حافظه)",
        brief: "اطمینان از ترتیب عملیات حافظه",
        definition: "دستوری که تضمین می‌کند عملیات حافظه قبل از آن قبل از عملیات بعد از آن کامل شوند.",
        technical: "ضروری در برنامه‌نویسی چندنخی برای جلوگیری از مشکلات همزمانی",
        benefit: "اطمینان از صحت داده در برنامه‌های موازی"
    },

    // Benchmarking
    "single-threaded": {
        term: "Single-Threaded Performance",
        brief: "عملکرد تک‌نخی",
        definition: "سرعت اجرای برنامه‌هایی که فقط از یک Thread استفاده می‌کنند.",
        example: "بازی‌های قدیمی، برخی برنامه‌های آفیس",
        benefit: "مهم برای برنامه‌هایی که نمی‌توانند موازی‌سازی شوند"
    },
    "multi-threaded": {
        term: "Multi-Threaded Performance",
        brief: "عملکرد چندنخی",
        definition: "سرعت اجرای برنامه‌هایی که از چندین Thread همزمان استفاده می‌کنند.",
        example: "رندرینگ ویدیو، کامپایل کد، فشرده‌سازی",
        benefit: "استفاده کامل از همه هسته‌های CPU"
    },
    microcode: {
        term: "Microcode (میکروکد)",
        brief: "دستورات داخلی سخت‌افزار",
        definition: "لایه نرم‌افزاری پایین‌سطح که دستورات پیچیده x86 را به عملیات ساده‌تر سخت‌افزاری ترجمه می‌کند.",
        benefit: "امکان رفع باگ‌های سخت‌افزاری بدون تغییر چیپ",
        technical: "قابل به‌روزرسانی از طریق BIOS"
    },
    ecc: {
        term: "ECC (Error-Correcting Code)",
        brief: "تشخیص و تصحیح خطای حافظه",
        definition: "تکنولوژی برای تشخیص و تصحیح خطاهای بیتی در حافظه RAM.",
        benefit: "قابلیت اطمینان بالاتر در سرورها و workstation ها",
        technical: "معمولاً در RAM های سرور، نه مصرفی"
    },

    // Pipeline Components
    "micro-ops": {
        term: "Micro-Ops (μOps)",
        brief: "عملیات ریز در پردازنده",
        definition: "دستورات پیچیده x86 تبدیل به عملیات ساده‌تر (μOps) می‌شوند که توسط پردازنده اجرا می‌گردند.",
        example: "یک دستور ADD پیچیده ممکن است به 3-4 μOp تقسیم شود",
        benefit: "ساده‌سازی اجرای Out-of-Order و بهینه‌سازی",
        technical: "μOp Cache این μOps را ذخیره می‌کند"
    },
    rob: {
        term: "ROB (Reorder Buffer)",
        brief: "بافر مرتب‌سازی مجدد دستورات",
        definition: "بافری که دستورات را پیگیری می‌کند تا در پایان به ترتیب اولیه برنامه Commit شوند.",
        benefit: "اجازه Out-of-Order Execution با حفظ صحت برنامه",
        technical: "در Core i9: 224-512 ورودی ROB",
        example: "اگر دستور 5 قبل از دستور 3 اجرا شود، ROB اطمینان می‌دهد که نتایج به ترتیب نوشته شوند"
    },
    "reservation-station": {
        term: "Reservation Station (RS)",
        brief: "ایستگاه رزرو برای زمان‌بندی",
        definition: "بافری که دستورات آماده اجرا را نگه می‌دارد تا واحد اجرایی آزاد شود.",
        benefit: "امکان اجرای موازی و Out-of-Order",
        technical: "هر واحد اجرایی RS مخصوص خود دارد"
    },
    btb: {
        term: "BTB (Branch Target Buffer)",
        brief: "بافر هدف شاخه",
        definition: "Cache ای که آدرس‌های مقصد شاخه‌ها را ذخیره می‌کند برای پیش‌بینی سریع.",
        benefit: "کاهش تأخیر در تشخیص مقصد شاخه",
        technical: "معمولاً هزاران ورودی در پردازنده‌های مدرن"
    },
    bht: {
        term: "BHT (Branch History Table)",
        brief: "جدول تاریخچه شاخه",
        definition: "جدولی که تاریخچه اخیر شاخه‌ها را ذخیره می‌کند برای پیش‌بینی رفتار آینده.",
        benefit: "پیش‌بینی دقیق‌تر شاخه‌های تکراری",
        technical: "استفاده از الگوریتم‌های 2-bit saturating counter"
    },

    // Memory Operations
    "load-store": {
        term: "Load-Store Unit",
        brief: "واحد بارگذاری و ذخیره‌سازی",
        definition: "واحدی که عملیات خواندن (Load) و نوشتن (Store) به حافظه را مدیریت می‌کند.",
        benefit: "اجرای موازی عملیات حافظه",
        technical: "دارای Load Buffer و Store Buffer جداگانه"
    },
    forwarding: {
        term: "Forwarding (Bypassing)",
        brief: "ارسال مستقیم نتایج",
        definition: "ارسال مستقیم نتیجه یک دستور به دستور بعدی بدون نیاز به نوشتن در رجیستر.",
        benefit: "کاهش تأخیر Data Hazard",
        example: "نتیجه ADD مستقیماً به SUB بعدی فرستاده می‌شود"
    },
    stall: {
        term: "Pipeline Stall",
        brief: "توقف خط لوله",
        definition: "توقف موقت اجرای Pipeline به دلیل عدم آمادگی داده یا منبع.",
        technical: "باعث کاهش IPC و عملکرد می‌شود",
        example: "Cache Miss باعث Stall تا بارگذاری از حافظه"
    },
    hazard: {
        term: "Hazard",
        brief: "خطر در Pipeline",
        definition: "شرایطی که مانع اجرای صحیح دستور بعدی در Pipeline می‌شود.",
        technical: "سه نوع: Data Hazard، Control Hazard، Structural Hazard"
    },

    // Architecture Generations
    skylake: {
        term: "Skylake",
        brief: "معماری Intel نسل 6",
        definition: "معماری ریزپردازنده Intel معرفی شده در 2015، اولین معماری 14nm با بهبودهای قابل توجه در IPC.",
        example: "Core i7-6700K اولین پردازنده Skylake Desktop",
        benefit: "IPC بهبود یافته، مصرف برق کمتر"
    },
    "coffee-lake": {
        term: "Coffee Lake",
        brief: "معماری Intel نسل 8",
        definition: "معماری Intel معرفی شده در 2017، افزایش تعداد هسته‌ها در Desktop (6 هسته).",
        example: "Core i7-8700K با 6 هسته و 12 Thread",
        benefit: "عملکرد چندنخی بهتر با هسته‌های بیشتر"
    },
    "alder-lake": {
        term: "Alder Lake",
        brief: "معماری Hybrid Intel نسل 12",
        definition: "اولین معماری Hybrid Intel با ترکیب P-cores و E-cores، معرفی شده در 2021.",
        example: "Core i9-12900K: 8 P-cores + 8 E-cores",
        benefit: "توازن بین عملکرد و کارایی انرژی",
        technical: "اولین پردازنده Intel با DDR5 و PCIe 5.0"
    },
    "raptor-lake": {
        term: "Raptor Lake",
        brief: "معماری Intel نسل 13",
        definition: "بهبود معماری Alder Lake با E-cores بیشتر و Cache بیشتر، معرفی شده در 2022.",
        example: "Core i9-13900K: 8 P-cores + 16 E-cores",
        benefit: "عملکرد چندنخی بهبود یافته با E-cores بیشتر"
    },

    // Advanced Features
    "speculative-execution": {
        term: "Speculative Execution",
        brief: "اجرای حدسی دستورات",
        definition: "اجرای دستورات پیش از اطمینان از نیاز به آن‌ها، بر اساس پیش‌بینی شاخه.",
        benefit: "افزایش عملکرد با پنهان کردن تأخیر شاخه",
        technical: "در صورت پیش‌بینی اشتباه، نتایج باید دور ریخته شوند"
    },
    "register-renaming": {
        term: "Register Renaming",
        brief: "تغییر نام رجیسترها",
        definition: "نگاشت رجیسترهای معماری به رجیسترهای فیزیکی برای رفع False Dependencies.",
        benefit: "امکان اجرای موازی دستورات بیشتر",
        technical: "Core i9 دارای 180+ رجیستر فیزیکی"
    },
    retire: {
        term: "Retire (Commit)",
        brief: "تکمیل نهایی دستور",
        definition: "مرحله نهایی Pipeline که نتایج دستور به صورت دائمی در معماری نوشته می‌شود.",
        benefit: "اطمینان از صحت برنامه با Commit به ترتیب",
        technical: "دستورات Speculative فقط بعد از Retire تأثیر دائمی دارند"
    },
    fetch: {
        term: "Fetch (واکشی)",
        brief: "واکشی دستورات از حافظه",
        definition: "اولین مرحله Pipeline که دستورات را از Cache دستورات (I-Cache) می‌خواند.",
        benefit: "شروع اجرای دستورات",
        technical: "در Core i9: 16-32 بایت در هر سیکل"
    },
    decode: {
        term: "Decode (رمزگشایی)",
        brief: "رمزگشایی دستورات",
        definition: "تبدیل دستورات x86 پیچیده به Micro-Ops ساده‌تر برای اجرا.",
        benefit: "ساده‌سازی مراحل بعدی Pipeline",
        technical: "μOp Cache این مرحله را Bypass می‌کند"
    },

    // Advanced Cache Terms
    "write-allocate": {
        term: "Write-Allocate",
        brief: "تخصیص Cache هنگام نوشتن",
        definition: "سیاستی که هنگام Cache Miss در نوشتن، بلوک را به Cache می‌آورد.",
        benefit: "بهره‌گیری از Temporal Locality در نوشتن‌ها",
        technical: "معمولاً با Write-Back استفاده می‌شود"
    },
    "no-write-allocate": {
        term: "No-Write-Allocate",
        brief: "عدم تخصیص Cache هنگام نوشتن",
        definition: "سیاستی که هنگام Cache Miss در نوشتن، مستقیماً به حافظه می‌نویسد بدون آوردن به Cache.",
        technical: "معمولاً با Write-Through استفاده می‌شود"
    },
    "dirty-bit": {
        term: "Dirty Bit",
        brief: "بیت تغییر داده",
        definition: "بیتی که مشخص می‌کند آیا یک Cache Line تغییر کرده و باید به حافظه نوشته شود.",
        benefit: "جلوگیری از نوشتن غیرضروری به حافظه",
        technical: "استفاده در Write-Back Cache"
    },
    "valid-bit": {
        term: "Valid Bit",
        brief: "بیت اعتبار داده",
        definition: "بیتی که مشخص می‌کند آیا یک Cache Line حاوی داده معتبر است یا خیر.",
        benefit: "تشخیص Cache Line های خالی",
        technical: "0 = خالی، 1 = دارای داده معتبر"
    },

    // System Components
    "ring-bus": {
        term: "Ring Bus",
        brief: "باس حلقوی Intel",
        definition: "معماری باس حلقوی که هسته‌ها، GPU، و LLC را به هم متصل می‌کند.",
        benefit: "پهنای باند بالا و Latency پایین",
        technical: "جایگزین با Mesh در پردازنده‌های HEDT"
    },
    llc: {
        term: "LLC (Last Level Cache)",
        brief: "آخرین سطح Cache",
        definition: "بزرگ‌ترین Cache که بین همه هسته‌ها مشترک است (معمولاً L3).",
        example: "30-36 MB در Core i9 مدرن",
        benefit: "کاهش دسترسی به حافظه اصلی",
        technical: "معمولاً Inclusive یا Non-Inclusive"
    },
    uncore: {
        term: "Uncore",
        brief: "اجزای غیر-هسته در CPU",
        definition: "بخش‌هایی از CPU که هسته اجرایی نیستند: LLC، Ring Bus، Memory Controller، I/O.",
        benefit: "سرویس‌های مشترک برای همه هسته‌ها"
    },

    // Performance Terms
    "cache-miss-rate": {
        term: "Cache Miss Rate",
        brief: "نرخ از دست رفتن Cache",
        definition: "درصد دسترسی‌هایی که در Cache موجود نیستند و باید از حافظه پایین‌تر خوانده شوند.",
        technical: "Miss Rate = Misses / Total Accesses",
        benefit: "معیار مهم برای ارزیابی کارایی Cache"
    },
    "cache-hit-rate": {
        term: "Cache Hit Rate",
        brief: "نرخ یافتن در Cache",
        definition: "درصد دسترسی‌هایی که با موفقیت در Cache یافت می‌شوند.",
        technical: "Hit Rate = Hits / Total Accesses = 1 - Miss Rate",
        benefit: "Hit Rate بالاتر = عملکرد بهتر"
    },
    "working-set": {
        term: "Working Set",
        brief: "مجموعه فعال داده",
        definition: "مجموعه داده‌هایی که برنامه در یک بازه زمانی به آن‌ها دسترسی دارد.",
        technical: "اگر Working Set > Cache Size → Capacity Miss زیاد",
        benefit: "تحلیل نیاز برنامه به حافظه"
    },
    prefetching: {
        term: "Prefetching",
        brief: "پیش‌بارگذاری داده",
        definition: "بارگذاری داده به Cache پیش از درخواست صریح، بر اساس الگوی دسترسی.",
        example: "Hardware Prefetcher الگوی دسترسی متوالی را تشخیص می‌دهد",
        benefit: "کاهش Compulsory Miss و پنهان کردن Latency",
        technical: "دو نوع: Hardware Prefetch و Software Prefetch"
    },

    // Branch Prediction Components
    pht: {
        term: "PHT (Pattern History Table)",
        brief: "جدول تاریخچه الگو",
        definition: "جدولی برای پیش‌بینی شاخه که از الگوی تاریخچه شاخه‌های قبلی استفاده می‌کند.",
        technical: "Two-Level Adaptive Predictor با Global و Local History",
        benefit: "پیش‌بینی دقیق‌تر با استفاده از الگوهای تاریخی",
        example: "استفاده از 2-bit Saturating Counters"
    },
    rsb: {
        term: "RSB (Return Stack Buffer)",
        brief: "بافر پشته بازگشت",
        definition: "Stack ویژه برای پیش‌بینی آدرس بازگشت از توابع (call/return).",
        technical: "LIFO با 16-32 ورودی، دقت تقریباً 100%",
        benefit: "پیش‌بینی دقیق آدرس بازگشت از توابع",
        example: "هنگام call تابع، آدرس return به RSB push می‌شود"
    },
    "indirect-predictor": {
        term: "Indirect Branch Predictor",
        brief: "پیش‌بینی کننده شاخه غیرمستقیم",
        definition: "واحد ویژه برای پیش‌بینی شاخه‌های غیرمستقیم (virtual functions، function pointers).",
        technical: "استفاده از Target History + Correlation",
        benefit: "پیش‌بینی چالش‌برانگیزترین نوع شاخه‌ها",
        example: "virtual function calls در ++C"
    },
    tage: {
        term: "TAGE (TAgged GEometric)",
        brief: "پیش‌بینی کننده پیشرفته شاخه",
        definition: "الگوریتم پیشرفته پیش‌بینی شاخه با جداول چندگانه و طول‌های مختلف تاریخچه.",
        technical: "Geometric history lengths: h(i) = α^i × L",
        benefit: "بالاترین دقت در پیش‌بینی شاخه (97-99%)",
        example: "استفاده در معماری‌های جدید Intel"
    },
    "saturating-counter": {
        term: "Saturating Counter",
        brief: "شمارنده اشباع",
        definition: "شمارنده‌ای که با رسیدن به حداکثر یا حداقل، در همان مقدار باقی می‌ماند.",
        technical: "معمولاً 2-bit: Strongly Taken, Weakly Taken, Weakly Not-Taken, Strongly Not-Taken",
        benefit: "مقاوم در برابر نویز و تغییرات موقت",
        example: "استفاده در PHT برای پیش‌بینی شاخه"
    },
    "global-history": {
        term: "Global History",
        brief: "تاریخچه سراسری شاخه",
        definition: "ثبت تاریخچه نتایج چندین شاخه اخیر برای پیش‌بینی بهتر.",
        benefit: "تشخیص الگوهای وابسته بین شاخه‌ها",
        technical: "معمولاً 8-16 بیت تاریخچه"
    },
    "local-history": {
        term: "Local History",
        brief: "تاریخچه محلی شاخه",
        definition: "ثبت تاریخچه نتایج یک شاخه خاص برای پیش‌بینی رفتار آن شاخه.",
        benefit: "دقت بالا برای حلقه‌ها و الگوهای تکراری",
        technical: "هر شاخه تاریخچه مخصوص خود را دارد"
    },
    aliasing: {
        term: "Aliasing",
        brief: "تداخل آدرس‌ها",
        definition: "زمانی که دو شاخه مختلف به یک ورودی در جدول پیش‌بینی نگاشت می‌شوند.",
        technical: "باعث کاهش دقت پیش‌بینی می‌شود",
        benefit: "TAGE با Tag-based indexing Aliasing را کاهش می‌دهد"
    },
    lifo: {
        term: "LIFO (Last In, First Out)",
        brief: "آخرین ورود، اولین خروج",
        definition: "ساختار Stack که آخرین عنصر اضافه شده، اولین عنصری است که خارج می‌شود.",
        example: "Return Stack Buffer از LIFO استفاده می‌کند",
        benefit: "مناسب برای مدیریت فراخوانی توابع"
    },

    // Architecture Names
    
    "comet-lake": {
        term: "Comet Lake",
        brief: "معماری Intel نسل دهم (2020)",
        definition: "نسخه بهبودیافته Coffee Lake با تا 10 هسته و فرکانس بالاتر.",
        example: "Core i9-10900K با 10 هسته و Turbo تا 5.3GHz",
        technical: "آخرین معماری 14nm قبل از انتقال به Intel 7"
    },
    "rocket-lake": {
        term: "Rocket Lake",
        brief: "معماری Intel نسل یازدهم (2021)",
        definition: "معماری جدید با هسته‌های Cypress Cove (backport از Sunny Cove).",
        benefit: "افزایش 19% در IPC نسبت به Comet Lake",
        technical: "همچنان 14nm ولی با معماری هسته جدید"
    },
    

    // Platform Terms
    desktop: {
        term: "Desktop",
        brief: "پلتفرم رومیزی",
        definition: "پردازنده‌های طراحی شده برای کامپیوترهای رومیزی با مصرف برق بالاتر و عملکرد بیشتر.",
        example: "Core i9-13900K برای Desktop با TDP 125W",
        benefit: "عملکرد حداکثری بدون محدودیت باتری"
    },
    mobile: {
        term: "Mobile",
        brief: "پلتفرم موبایل",
        definition: "پردازنده‌های طراحی شده برای لپ‌تاپ‌ها با تمرکز بر کارایی انرژی.",
        example: "Core i9-13980HX برای لپ‌تاپ‌های گیمینگ",
        benefit: "تعادل بین عملکرد و عمر باتری"
    },

    // Process Technology
    "14nm": {
        term: "14nm",
        brief: "فرآیند ساخت 14 نانومتری",
        definition: "فرآیند لیتوگرافی Intel برای ساخت تراشه‌ها با فاصله 14 نانومتر بین ترانزیستورها.",
        example: "Skylake تا Comet Lake از 14nm استفاده می‌کنند",
        technical: "14nm++ و 14nm+++ نسخه‌های بهینه‌شده هستند"
    },
    "intel-7": {
        term: "Intel 7",
        brief: "فرآیند ساخت نسل هفتم Intel (10nm Enhanced)",
        definition: "فرآیند پیشرفته Intel (قبلاً 10nm Enhanced) برای کاهش مصرف و افزایش تراکم.",
        example: "Alder Lake و Raptor Lake از Intel 7 استفاده می‌کنند",
        benefit: "کاهش 15% مصرف برق و افزایش 18% تراکم"
    },

    // Performance Metrics
    
    "dual-channel": {
        term: "Dual Channel",
        brief: "دو کانال موازی حافظه",
        definition: "استفاده از دو کانال موازی برای دسترسی همزمان به حافظه و دوبرابر کردن پهنای باند.",
        example: "استفاده از دو ماژول RAM در اسلات‌های درست",
        benefit: "دوبرابر شدن پهنای باند حافظه"
    },

    // Other Terms  
    "pcie-5": {
        term: "PCIe 5.0",
        brief: "نسل پنجم PCI Express",
        definition: "جدیدترین استاندارد PCI Express با سرعت 32 GT/s (4 GB/s در هر lane).",
        example: "Alder Lake اولین پردازنده با پشتیبانی PCIe 5.0",
        benefit: "پهنای باند دوبرابر برای GPU و SSD"
    },
};
