import Image from "next/image";
import { CoreI9BlockDiagram, PipelineDiagram, BranchPredictorDiagram, CacheHierarchyDiagram } from "@/components/svg/core-i9-diagrams";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoreComparisonChart, CacheLatencyChart } from "@/components/performance-chart";
import { GlossaryText } from "@/components/glossary-text";
import { GlossaryTerm } from "@/components/glossary-term";
import { ImageZoomModal } from "@/components/image-zoom-modal";

export default function CoreI9ArchitecturePage() {
    return (
        <article className="min-h-screen bg-background" dir="rtl">
            <div className="max-w-6xl mx-auto p-8">
                {/* Header */}
                <header className="mb-12 pb-8 border-b">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        معماری ریزپردازنده Intel Core i9
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        تحلیل جامع معماری، بهینه‌سازی‌ها و قابلیت‌های نسل‌های مختلف
                    </p>
                    <div className="flex gap-4 mt-6 text-sm text-muted-foreground">
                        <span>معماری کامپیوتر</span>
                        <span>•</span>
                        <span>ریزپردازنده‌ها</span>
                        <span>•</span>
                        <span>۱۴۰۴/۱۰/۱۱</span>
                    </div>
                </header>

                {/* Introduction */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۱. مقدمه</h2>

                    <h3 className="text-2xl font-semibold mb-4 mt-6">۱.۱. پیشینه و تاریخچه</h3>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-justify mb-4">
                            <GlossaryText>
                                سری پردازنده‌های Intel Core i9 به عنوان پرچمدار محصولات Intel برای کاربران حرفه‌ای و پرعملکرد طراحی شده‌اند.
                                این پردازنده‌ها از معماری‌های پیشرفته‌ای همچون Skylake، Coffee Lake، Comet Lake، Rocket Lake، Alder Lake و Raptor Lake بهره می‌برند.
                                نسل اول Core i9 در سال ۲۰۱۷ معرفی شد و هدف آن ارائه بالاترین سطح عملکرد در پلتفرم‌های Desktop و Mobile بود.
                            </GlossaryText>
                        </p>
                        <p className="text-lg leading-relaxed text-justify mb-4">
                            <GlossaryText>
                                معماری Core i9 ترکیبی از تکنولوژی‌های پیشرفته شامل Out-of-Order Execution، Hyper-Threading، پیش‌بینی شاخه پیشرفته،
                                و سلسله مراتب حافظه نهان چند سطحی را در خود جای داده است. این پردازنده‌ها با بهره‌گیری از فرآیندهای ساخت پیشرفته (از 14nm تا 7nm Intel)
                                و معماری‌های بهینه‌شده، توانسته‌اند رکوردهای جدیدی در زمینه عملکرد تک‌هسته‌ای و چندهسته‌ای برقرار کنند.
                            </GlossaryText>
                        </p>
                    </div>

                    {/* Core i9 Architecture Diagrams */}
                    <div className="grid md:grid-cols-2 gap-6 my-8">
                        <Card>
                            <CardHeader className="bg-muted/30">
                                <CardTitle className="text-base">Intel Alder Lake (12th Gen) Architecture</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <ImageZoomModal
                                    src="/images/blog/alder-lake-architecture.svg"
                                    alt="Intel Alder Lake Core i9 Architecture"
                                />
                                <p className="text-xs text-muted-foreground mt-3 text-center">
                                    معماری Alder Lake نسل 12 - اولین پردازنده Hybrid Intel با 8 P-cores و 8 E-cores
                                    <br />
                                    <span className="text-[10px] opacity-70">Core i9-12900K: 16 هسته (8P+8E) / 24 رشته / 30MB L3</span>
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-muted/30">
                                <CardTitle className="text-base">Intel CPU Block Diagram</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <ImageZoomModal
                                    src="/images/blog/cpu-block.svg"
                                    alt="Intel Processor Block Diagram"
                                />
                                <p className="text-xs text-muted-foreground mt-3 text-center">
                                    دیاگرام بلوکی پردازنده Intel - اجزای اصلی و ارتباطات
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8 mb-8">
                        <CardHeader className="bg-primary/5">
                            <CardTitle>مشخصات فنی نسل‌های مختلف Core i9</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted">
                                        <tr>
                                            <th className="p-3 text-right">نسل</th>
                                            <th className="p-3 text-center">معماری</th>
                                            <th className="p-3 text-center">فرآیند ساخت</th>
                                            <th className="p-3 text-center">تعداد هسته</th>
                                            <th className="p-3 text-center">L3 Cache</th>
                                            <th className="p-3 text-center">TDP</th>
                                            <th className="p-3 text-center">Max Turbo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t">
                                            <td className="p-3 font-semibold">۱st Gen (2017)</td>
                                            <td className="p-3 text-center">Skylake-X</td>
                                            <td className="p-3 text-center">14nm</td>
                                            <td className="p-3 text-center">10-18</td>
                                            <td className="p-3 text-center">13.75-24.75 MB</td>
                                            <td className="p-3 text-center">165W</td>
                                            <td className="p-3 text-center">4.5 GHz</td>
                                        </tr>
                                        <tr className="border-t bg-muted/30">
                                            <td className="p-3 font-semibold">8th Gen (2018)</td>
                                            <td className="p-3 text-center">Coffee Lake</td>
                                            <td className="p-3 text-center">14nm++</td>
                                            <td className="p-3 text-center">8</td>
                                            <td className="p-3 text-center">16 MB</td>
                                            <td className="p-3 text-center">95W</td>
                                            <td className="p-3 text-center">5.0 GHz</td>
                                        </tr>
                                        <tr className="border-t">
                                            <td className="p-3 font-semibold">9th Gen (2018)</td>
                                            <td className="p-3 text-center">Coffee Lake Refresh</td>
                                            <td className="p-3 text-center">14nm++</td>
                                            <td className="p-3 text-center">8</td>
                                            <td className="p-3 text-center">16 MB</td>
                                            <td className="p-3 text-center">95-127W</td>
                                            <td className="p-3 text-center">5.0 GHz</td>
                                        </tr>
                                        <tr className="border-t bg-muted/30">
                                            <td className="p-3 font-semibold">10th Gen (2020)</td>
                                            <td className="p-3 text-center">Comet Lake</td>
                                            <td className="p-3 text-center">14nm+++</td>
                                            <td className="p-3 text-center">10</td>
                                            <td className="p-3 text-center">20 MB</td>
                                            <td className="p-3 text-center">125W</td>
                                            <td className="p-3 text-center">5.3 GHz</td>
                                        </tr>
                                        <tr className="border-t">
                                            <td className="p-3 font-semibold">12th Gen (2021)</td>
                                            <td className="p-3 text-center">Alder Lake</td>
                                            <td className="p-3 text-center">Intel 7 (10nm)</td>
                                            <td className="p-3 text-center">16 (8P+8E)</td>
                                            <td className="p-3 text-center">30 MB</td>
                                            <td className="p-3 text-center">125W</td>
                                            <td className="p-3 text-center">5.2 GHz</td>
                                        </tr>
                                        <tr className="border-t bg-muted/30">
                                            <td className="p-3 font-semibold">13th Gen (2022)</td>
                                            <td className="p-3 text-center">Raptor Lake</td>
                                            <td className="p-3 text-center">Intel 7</td>
                                            <td className="p-3 text-center">24 (8P+16E)</td>
                                            <td className="p-3 text-center">36 MB</td>
                                            <td className="p-3 text-center">125W</td>
                                            <td className="p-3 text-center">5.8 GHz</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded">
                                <strong>نکته:</strong> <GlossaryText>نسل‌های ۱۲ و ۱۳ از معماری Hybrid استفاده می‌کنند که شامل هسته‌های Performance (P-cores) و Efficient (E-cores) است.
                                TDP واقعی در بار کاری سنگین می‌تواند تا ۲۵۳W برسد.</GlossaryText>
                            </p>
                        </CardContent>
                    </Card>

                    {/* Visual References - Real Images */}
                    <div className="grid md:grid-cols-2 gap-6 my-8">
                        <Card>
                            <CardHeader className="bg-muted/30">
                                <CardTitle className="text-base">معماری Raptor Lake (نسل 13)</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="bg-white rounded-lg p-4">
                                    <ImageZoomModal
                                        src="/images/blog/raptor-lake-architecture.svg"
                                        alt="Intel Raptor Lake Architecture Diagram"
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-3 text-center">
                                    معماری Raptor Lake (نسل 13) - Core i9-13900K
                                    <br />
                                    <span className="text-[10px] opacity-70">24 هسته (8P+16E) / 32 رشته / 36MB L3 / 52MB Total Cache</span>
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-muted/30">
                                <CardTitle className="text-base">Intel Core i9 نسل 13</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="relative w-full bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden p-8">
                                    <div className="text-center space-y-4">
                                        <div className="text-6xl">🔷</div>
                                        <div>
                                            <div className="text-2xl font-bold text-primary">Intel Core i9</div>
                                            <div className="text-lg font-semibold mt-1">13th Generation</div>
                                            <div className="text-sm text-muted-foreground mt-2">Raptor Lake</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                                            <div className="bg-white/50 dark:bg-black/20 rounded p-2">
                                                <div className="font-bold">24 Cores</div>
                                                <div className="text-muted-foreground">8P + 16E</div>
                                            </div>
                                            <div className="bg-white/50 dark:bg-black/20 rounded p-2">
                                                <div className="font-bold">36 MB</div>
                                                <div className="text-muted-foreground">L3 Cache</div>
                                            </div>
                                            <div className="bg-white/50 dark:bg-black/20 rounded p-2">
                                                <div className="font-bold">5.8 GHz</div>
                                                <div className="text-muted-foreground">Max Turbo</div>
                                            </div>
                                            <div className="bg-white/50 dark:bg-black/20 rounded p-2">
                                                <div className="font-bold">Intel 7</div>
                                                <div className="text-muted-foreground">Process</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-3 text-center">
                                    پردازنده Intel Core i9 نسل 13 - معماری Hybrid با 24 هسته
                                    <br />
                                    <span className="text-[10px] opacity-70">(نمایش مشخصات واقعی پردازنده)</span>
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Architecture Diagram */}
                    <Card className="my-8">
                        <CardHeader className="bg-muted/30">
                            <CardTitle>بلوک دیاگرام پردازنده</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ImageZoomModal
                                src="/images/blog/cpu-block.svg"
                                alt="بلوک دیاگرام عمومی پردازنده - نمایش اجزای اصلی"
                            />
                            <p className="text-xs text-muted-foreground mt-3 text-center">
                                بلوک دیاگرام عمومی پردازنده - نمایش اجزای اصلی
                            </p>
                        </CardContent>
                    </Card>

                    {/* Detailed Architecture Diagram */}
                    <Card className="my-8">
                        <CardHeader className="bg-muted/30">
                            <CardTitle>جزئیات معماری Intel Core</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="relative w-full bg-linear-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden p-6">
                                <div className="grid md:grid-cols-3 gap-4">
                                    {/* Cores Section */}
                                    <div className="space-y-3">
                                        <div className="bg-blue-500/20 border-2 border-blue-400 rounded-lg p-4">
                                            <div className="text-sm font-bold text-white mb-2">Performance Cores</div>
                                            <div className="text-xs text-blue-200 space-y-1">
                                                <div>• Out-of-Order Execution</div>
                                                <div>• Hyper-Threading</div>
                                                <div>• AVX-512 Support</div>
                                                <div>• 2MB L2 per core</div>
                                            </div>
                                        </div>
                                        <div className="bg-green-500/20 border-2 border-green-400 rounded-lg p-4">
                                            <div className="text-sm font-bold text-white mb-2">Efficiency Cores</div>
                                            <div className="text-xs text-green-200 space-y-1">
                                                <div>• Power Optimized</div>
                                                <div>• 4 cores per cluster</div>
                                                <div>• Shared L2 Cache</div>
                                                <div>• Background Tasks</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Cache Section */}
                                    <div className="space-y-3">
                                        <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-4">
                                            <div className="text-sm font-bold text-white mb-2">Cache Hierarchy</div>
                                            <div className="text-xs text-yellow-200 space-y-1">
                                                <div>• L1: 32KB I + 48KB D</div>
                                                <div>• L2: 2MB per P-core</div>
                                                <div>• L2: 4MB per cluster</div>
                                                <div>• L3: 36MB Shared</div>
                                            </div>
                                        </div>
                                        <div className="bg-purple-500/20 border-2 border-purple-400 rounded-lg p-4">
                                            <div className="text-sm font-bold text-white mb-2">Memory System</div>
                                            <div className="text-xs text-purple-200 space-y-1">
                                                <div>• DDR5-5600</div>
                                                <div>• DDR4-3200</div>
                                                <div>• Dual Channel</div>
                                                <div>• 192GB Max</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* I/O Section */}
                                    <div className="space-y-3">
                                        <div className="bg-orange-500/20 border-2 border-orange-400 rounded-lg p-4">
                                            <div className="text-sm font-bold text-white mb-2">I/O Capabilities</div>
                                            <div className="text-xs text-orange-200 space-y-1">
                                                <div>• PCIe 5.0 x16</div>
                                                <div>• PCIe 4.0 x4</div>
                                                <div>• Thunderbolt 4</div>
                                                <div>• USB 3.2 Gen 2x2</div>
                                            </div>
                                        </div>
                                        <div className="bg-red-500/20 border-2 border-red-400 rounded-lg p-4">
                                            <div className="text-sm font-bold text-white mb-2">Graphics</div>
                                            <div className="text-xs text-red-200 space-y-1">
                                                <div>• Intel UHD 770</div>
                                                <div>• 32 Execution Units</div>
                                                <div>• Up to 1.65 GHz</div>
                                                <div>• AV1 Decode/Encode</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3 text-center">
                                دیاگرام معماری پردازنده‌های Intel Core - نمایش کامل اجزای مختلف
                            </p>
                        </CardContent>
                    </Card>
                    {/* CPU Topology */}
                    <Card className="my-8">
                        <CardHeader className="bg-muted/30">
                            <CardTitle>توپولوژی سیستم چندهسته‌ای</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ImageZoomModal
                                src="/images/blog/cpu-topology.png"
                                alt="نمای کلی توپولوژی سیستم - نمایش هسته‌ها، Cache و سلسله مراتب حافظه"
                            />
                            <p className="text-xs text-muted-foreground mt-3 text-center">
                                نمای کلی توپولوژی سیستم - نمایش هسته‌ها، Cache و سلسله مراتب حافظه
                            </p>
                        </CardContent>
                    </Card>
                    <h3 className="text-2xl font-semibold mb-4 mt-8">۱.۲. مفاهیم پایه معماری پردازنده</h3>

                    {/* Von Neumann Architecture */}
                    <Card className="mb-6">
                        <CardHeader className="bg-muted/30">
                            <CardTitle className="text-base">معماری فون نویمان</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ImageZoomModal
                                src="/images/blog/von-neumann.svg"
                                alt="معماری فون نویمان - اساس پردازنده‌های مدرن"
                            />
                            <p className="text-xs text-muted-foreground mt-3 text-center">
                                معماری فون نویمان - اساس پردازنده‌های مدرن
                            </p>
                        </CardContent>
                    </Card>

                    {/* Basic Computer Diagram */}
                    <Card className="mb-6">
                        <CardHeader className="bg-muted/30">
                            <CardTitle className="text-base">ساختار کامپیوتر پایه</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <ImageZoomModal
                                src="/images/blog/basic-computer.gif"
                                alt="نمودار بلوکی کامپیوتر - اجزای اصلی و ارتباطات"
                            />
                            <p className="text-xs text-muted-foreground mt-3 text-center">
                                نمودار بلوکی کامپیوتر - اجزای اصلی و ارتباطات
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="mb-6 bg-muted/30">
                        <CardContent className="pt-6">
                            <h4 className="font-bold text-lg mb-3">مفاهیم کلیدی:</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold mb-2">• Pipeline (خط لوله):</p>
                                    <p className="text-sm mr-4">تقسیم اجرای دستورالعمل‌ها به مراحل مختلف برای افزایش Throughput و اجرای همزمان چندین دستور.</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">• Out-of-Order Execution:</p>
                                    <p className="text-sm mr-4">قابلیت اجرای دستورالعمل‌ها به ترتیبی غیر از ترتیب برنامه برای بهره‌وری بهتر از منابع.</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">• Superscalar Architecture:</p>
                                    <p className="text-sm mr-4">توانایی اجرای بیش از یک دستور در هر سیکل ساعت با استفاده از واحدهای اجرایی متعدد.</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">• Cache Hierarchy:</p>
                                    <p className="text-sm mr-4">سلسله مراتب حافظه‌های نهان با سرعت‌ها و اندازه‌های مختلف برای کاهش تأخیر دسترسی به داده.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4">مقایسه تعاملی نسل‌های Core i9</h3>
                        <CoreComparisonChart />
                    </div>
                </section>

                {/* Block Diagram */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۲. نمای کلی معماری</h2>

                    <h3 className="text-2xl font-bold mb-4 mt-8">۲.۱. دیاگرام بلوکی هسته</h3>
                    <p className="text-lg leading-relaxed text-justify mb-6">
                        <GlossaryText>معماری Core i9 شامل واحدهای اصلی زیر است:</GlossaryText>
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-6 text-lg mr-6">
                        <li><GlossaryText>Front-End: واحد واکشی و رمزگشایی دستورالعمل‌ها</GlossaryText></li>
                        <li><GlossaryText>Execution Engine: واحدهای اجرایی شامل ALU، FPU، SIMD</GlossaryText></li>
                        <li><GlossaryText>Memory Subsystem: سلسله مراتب حافظه نهان و کنترلر حافظه</GlossaryText></li>
                        <li><GlossaryText>Uncore: Ring Bus، LLC و کنترلرهای I/O</GlossaryText></li>
                    </ul>

                    <CoreI9BlockDiagram />

                    <Card className="mt-6 bg-muted/50">
                        <CardContent className="pt-6">
                            <h4 className="font-bold mb-2">نکته:</h4>
                            <p className="text-sm leading-relaxed">
                                <GlossaryText>معماری‌های نسل‌های جدیدتر (Alder Lake و Raptor Lake) از طراحی Hybrid استفاده می‌کنند که شامل هسته‌های Performance (P-cores) و Efficient (E-cores) هستند.</GlossaryText>
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Pipeline Architecture */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۳. معماری خط لوله (Pipeline)</h2>

                    <h3 className="text-2xl font-bold mb-4 mt-8">۳.۱. مراحل Pipeline</h3>
                    <p className="text-lg leading-relaxed text-justify mb-6">
                        <GlossaryText>Core i9 از یک pipeline عمیق و پیچیده با قابلیت Out-of-Order Execution استفاده می‌کند:</GlossaryText>
                    </p>

                    <PipelineDiagram />

                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Front-End Pipeline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold min-w-30">Fetch:</span>
                                        <span><GlossaryText>واکشی دستورالعمل‌ها از L1-I Cache با پهنای باند بالا (16-32 byte/cycle)</GlossaryText></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold min-w-30">Decode:</span>
                                        <span><GlossaryText>رمزگشایی دستورالعمل‌های x86 پیچیده به Micro-Ops (μOps)</GlossaryText></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold min-w-30">μOp Cache:</span>
                                        <span><GlossaryText>ذخیره μOps رمزگشایی شده برای کاهش تأخیر Decode</GlossaryText></span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Back-End Pipeline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold min-w-30">Allocate:</span>
                                        <span><GlossaryText>تخصیص منابع (ROB، RS) به μOps</GlossaryText></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold min-w-30">Schedule:</span>
                                        <span><GlossaryText>زمان‌بندی خارج از ترتیب برای اجرا</GlossaryText></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold min-w-30">Execute:</span>
                                        <span><GlossaryText>اجرای μOps در واحدهای اجرایی متعدد</GlossaryText></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="font-bold min-w-30">Retire:</span>
                                        <span><GlossaryText>Commit نتایج به ترتیب برنامه</GlossaryText></span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 mt-10">۳.۲. Pipeline Stalls و Hazards</h3>
                    <p className="text-lg leading-relaxed text-justify mb-6">
                        <GlossaryText>عوامل مختلفی می‌توانند باعث توقف یا کاهش کارایی Pipeline شوند:</GlossaryText>
                    </p>

                    <Tabs defaultValue="data" className="w-full" dir="rtl">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="data">Data Hazards</TabsTrigger>
                            <TabsTrigger value="control">Control Hazards</TabsTrigger>
                            <TabsTrigger value="structural">Structural Hazards</TabsTrigger>
                        </TabsList>
                        <TabsContent value="data" className="space-y-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <h4 className="font-bold mb-3"><GlossaryText>وابستگی داده‌ها (Data Dependencies)</GlossaryText></h4>
                                    <p className="mb-4"><GlossaryText>تکنیک‌های مقابله:</GlossaryText></p>
                                    <ul className="list-disc list-inside space-y-2 mr-4">
                                        <li><GlossaryText><strong>Register Renaming:</strong> حذف WAR و WAW dependencies با استفاده از Physical Register File (180+ registers)</GlossaryText></li>
                                        <li><GlossaryText><strong>Forwarding:</strong> انتقال مستقیم نتایج بین واحدهای اجرایی</GlossaryText></li>
                                        <li><GlossaryText><strong>Out-of-Order Execution:</strong> اجرای دستورالعمل‌های مستقل در حین انتظار</GlossaryText></li>
                                        <li><GlossaryText><strong>Memory Disambiguation:</strong> پیش‌بینی وابستگی‌های حافظه</GlossaryText></li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="control" className="space-y-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <h4 className="font-bold mb-3"><GlossaryText>دستورالعمل‌های شاخه (Branch Instructions)</GlossaryText></h4>
                                    <p className="mb-4"><GlossaryText>تأثیر Branch Misprediction:</GlossaryText></p>
                                    <ul className="list-disc list-inside space-y-2 mr-4">
                                        <li><GlossaryText>Flush کامل Pipeline (15-20+ cycles penalty)</GlossaryText></li>
                                        <li><GlossaryText>از دست رفتن کار انجام شده در مسیر اشتباه</GlossaryText></li>
                                        <li><GlossaryText>تأثیر منفی بر روی IPC (Instructions Per Cycle)</GlossaryText></li>
                                    </ul>
                                    <p className="mt-4 mb-2"><GlossaryText>راه‌حل: سیستم پیش‌بینی شاخه پیشرفته (بخش بعدی)</GlossaryText></p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="structural" className="space-y-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <h4 className="font-bold mb-3"><GlossaryText>محدودیت منابع (Resource Conflicts)</GlossaryText></h4>
                                    <p className="mb-4"><GlossaryText>راه‌حل‌های معماری:</GlossaryText></p>
                                    <ul className="list-disc list-inside space-y-2 mr-4">
                                        <li><GlossaryText><strong>Port Redundancy:</strong> چندین Port اجرایی (8-12 ports)</GlossaryText></li>
                                        <li><GlossaryText><strong>Multiple ALUs:</strong> واحدهای محاسباتی متعدد (4-6 ALUs)</GlossaryText></li>
                                        <li><GlossaryText><strong>Reservation Stations:</strong> صف‌های انتظار بزرگ (97+ entries)</GlossaryText></li>
                                        <li><GlossaryText><strong>ROB Size:</strong> Reorder Buffer بزرگ (224-512 entries)</GlossaryText></li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </section>

                {/* Branch Prediction */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۴. پیش‌بینی شاخه (Branch Prediction)</h2>

                    <p className="text-lg leading-relaxed text-justify mb-6">
                        <GlossaryText>
                            پیش‌بینی شاخه یکی از حیاتی‌ترین اجزای معماری‌های مدرن است. Core i9 از یک سیستم پیش‌بینی چند لایه و پیچیده استفاده می‌کند
                            که دقت بالای 97-99% را در کاربردهای واقعی ارائه می‌دهد.
                        </GlossaryText>
                    </p>

                    <BranchPredictorDiagram />

                    <h3 className="text-2xl font-bold mb-4 mt-8">۴.۱. مؤلفه‌های Branch Predictor</h3>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle><GlossaryTerm term="btb">Branch Target Buffer (BTB)</GlossaryTerm></CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li><strong>Size:</strong> 4K-12K entries</li>
                                    <li><strong>Function:</strong> ذخیره آدرس مقصد شاخه‌های شناخته شده</li>
                                    <li><strong>Latency:</strong> <GlossaryTerm term="latency">دسترسی در یک چرخه</GlossaryTerm></li>
                                    <li><strong>Organization:</strong> ساختار <GlossaryTerm term="set-associative">Set-Associative</GlossaryTerm></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle><GlossaryTerm term="pht">Pattern History Table (PHT)</GlossaryTerm></CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li><strong>Algorithm:</strong> Two-Level Adaptive Predictor</li>
                                    <li><strong><GlossaryTerm term="global-history">Global History</GlossaryTerm>:</strong> تاریخچه چندین شاخه اخیر</li>
                                    <li><strong><GlossaryTerm term="local-history">Local History</GlossaryTerm>:</strong> تاریخچه هر شاخه خاص</li>
                                    <li><strong>Counters:</strong> <GlossaryTerm term="saturating-counter">2-bit Saturating Counters</GlossaryTerm></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle><GlossaryTerm term="rsb">Return Stack Buffer (RSB)</GlossaryTerm></CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li><strong>Purpose:</strong> پیش‌بینی آدرس بازگشت از توابع</li>
                                    <li><strong>Depth:</strong> 16-32 entries</li>
                                    <li><strong>Structure:</strong> Stack (<GlossaryTerm term="lifo">LIFO</GlossaryTerm>)</li>
                                    <li><strong>Accuracy:</strong> تقریباً 100% برای call/return معمولی</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle><GlossaryTerm term="indirect-predictor">Indirect Branch Predictor</GlossaryTerm></CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li><strong>Target:</strong> شاخه‌های غیرمستقیم (virtual functions، function pointers)</li>
                                    <li><strong>Method:</strong> Target History + Correlation</li>
                                    <li><strong>Complexity:</strong> چالش‌برانگیزترین نوع شاخه</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 mt-8">۴.۲. الگوریتم پیش‌بینی <GlossaryTerm term="tage">TAGE</GlossaryTerm></h3>
                    <Card className="bg-muted/30">
                        <CardContent className="pt-6">
                            <p className="text-lg leading-relaxed text-justify mb-4">
                                <GlossaryText>
                                    TAGE (TAgged GEometric history length predictor) یکی از پیشرفته‌ترین الگوریتم‌های
                                    پیش‌بینی شاخه است که در معماری‌های جدید Intel استفاده می‌شود:
                                </GlossaryText>
                            </p>
                            <ul className="list-disc list-inside space-y-2 mr-6">
                                <li><GlossaryText>استفاده از چندین جدول با طول‌های مختلف تاریخچه</GlossaryText></li>
                                <li>Tag-based indexing برای کاهش <GlossaryTerm term="aliasing">Aliasing</GlossaryTerm></li>
                                <li><GlossaryText>Geometric history lengths: h(i) = α^i × L</GlossaryText></li>
                                <li><GlossaryText>Usefulness counters برای مدیریت جایگزینی</GlossaryText></li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* Cache Hierarchy */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۵. سلسله مراتب حافظه نهان</h2>

                    <p className="text-lg leading-relaxed text-justify mb-6">
                        <GlossaryText>Core i9 از یک سیستم حافظه نهان سه یا چهار سطحی استفاده می‌کند که برای کاهش تأخیر دسترسی به حافظه بهینه شده است.</GlossaryText>
                    </p>

                    <CacheHierarchyDiagram />

                    <div className="overflow-x-auto mt-8 rounded-lg border">
                        <table className="w-full border-collapse bg-card">
                            <thead>
                                <tr className="bg-muted/50 border-b-2 border-border">
                                    <th className="p-4 text-right font-bold text-sm md:text-base">سطح</th>
                                    <th className="p-4 text-right font-bold text-sm md:text-base">نوع</th>
                                    <th className="p-4 text-right font-bold text-sm md:text-base">اندازه</th>
                                    <th className="p-4 text-right font-bold text-sm md:text-base hidden sm:table-cell">Associativity</th>
                                    <th className="p-4 text-right font-bold text-sm md:text-base">Latency</th>
                                    <th className="p-4 text-right font-bold text-sm md:text-base hidden md:table-cell">ویژگی‌ها</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-bold text-sm md:text-base">L1-I</td>
                                    <td className="p-4 text-sm md:text-base">Instruction</td>
                                    <td className="p-4 text-sm md:text-base">32 KB</td>
                                    <td className="p-4 text-sm md:text-base hidden sm:table-cell">8-way</td>
                                    <td className="p-4 text-sm md:text-base">4-5 cycles</td>
                                    <td className="p-4 text-sm md:text-base hidden md:table-cell">واکشی 32 byte/cycle، μOp cache</td>
                                </tr>
                                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-bold text-sm md:text-base">L1-D</td>
                                    <td className="p-4 text-sm md:text-base">Data</td>
                                    <td className="p-4 text-sm md:text-base">32-48 KB</td>
                                    <td className="p-4 text-sm md:text-base hidden sm:table-cell">8-12-way</td>
                                    <td className="p-4 text-sm md:text-base">4-5 cycles</td>
                                    <td className="p-4 text-sm md:text-base hidden md:table-cell">2 Load + 1 Store ports، ECC</td>
                                </tr>
                                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-bold text-sm md:text-base">L2</td>
                                    <td className="p-4 text-sm md:text-base">Unified</td>
                                    <td className="p-4 text-sm md:text-base">256 KB - 2 MB</td>
                                    <td className="p-4 text-sm md:text-base hidden sm:table-cell">4-16-way</td>
                                    <td className="p-4 text-sm md:text-base">12-14 cycles</td>
                                    <td className="p-4 text-sm md:text-base hidden md:table-cell">Private per core، Inclusive/Non-inclusive</td>
                                </tr>
                                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-bold text-sm md:text-base">L3 (LLC)</td>
                                    <td className="p-4 text-sm md:text-base">Unified</td>
                                    <td className="p-4 text-sm md:text-base">16-36 MB</td>
                                    <td className="p-4 text-sm md:text-base hidden sm:table-cell">11-16-way</td>
                                    <td className="p-4 text-sm md:text-base">40-50 cycles</td>
                                    <td className="p-4 text-sm md:text-base hidden md:table-cell">Shared، Ring/Mesh interconnect، Non-inclusive</td>
                                </tr>
                                <tr className="hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-bold text-sm md:text-base">L4 (eDRAM)</td>
                                    <td className="p-4 text-sm md:text-base">Unified</td>
                                    <td className="p-4 text-sm md:text-base">128 MB</td>
                                    <td className="p-4 text-sm md:text-base hidden sm:table-cell">-</td>
                                    <td className="p-4 text-sm md:text-base">~60 cycles</td>
                                    <td className="p-4 text-sm md:text-base hidden md:table-cell">فقط در برخی SKU ها، victim cache</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 mt-10">۵.۱. پروتکل‌های Coherency</h3>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-lg leading-relaxed text-justify mb-4">
                                <GlossaryText>پروتکل MESIF (بهبودیافته از MESI) برای حفظ سازگاری حافظه نهان در سیستم‌های چند هسته‌ای:</GlossaryText>
                            </p>
                            <ul className="list-disc list-inside space-y-2 mr-6">
                                <li><GlossaryText><strong>M (Modified):</strong> داده تغییر کرده و فقط در این Cache موجود است</GlossaryText></li>
                                <li><GlossaryText><strong>E (Exclusive):</strong> داده تمیز و فقط در این Cache موجود است</GlossaryText></li>
                                <li><GlossaryText><strong>S (Shared):</strong> داده در چندین Cache موجود است</GlossaryText></li>
                                <li><GlossaryText><strong>I (Invalid):</strong> داده معتبر نیست</GlossaryText></li>
                                <li><GlossaryText><strong>F (Forward):</strong> داده Shared است اما این Cache مسئول پاسخ‌دهی است (کاهش ترافیک)</GlossaryText></li>
                            </ul>
                        </CardContent>
                    </Card>

                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4">تأخیر دسترسی به سطوح مختلف حافظه</h3>
                        <CacheLatencyChart />
                    </div>
                </section>

                {/* Execution Units */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۶. واحدهای اجرایی</h2>

                    <p className="text-lg leading-relaxed text-justify mb-6">
                        <GlossaryText>Core i9 دارای تعداد زیادی واحد اجرایی تخصصی است که به صورت موازی کار می‌کنند.</GlossaryText>
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Integer Execution Units</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <strong>ALU (Arithmetic Logic Unit):</strong>
                                        <ul className="list-disc list-inside mr-4 mt-1">
                                            <li><GlossaryText>4-6 واحد ALU کامل</GlossaryText></li>
                                            <li><GlossaryText>پشتیبانی از عملیات 8 تا 64 بیتی</GlossaryText></li>
                                            <li><GlossaryText>Latency: 1 cycle برای اکثر عملیات</GlossaryText></li>
                                            <li><GlossaryText>Throughput: 4-6 ops/cycle</GlossaryText></li>
                                        </ul>
                                    </li>
                                    <li className="mt-3">
                                        <strong>Address Generation Unit (AGU):</strong>
                                        <ul className="list-disc list-inside mr-4 mt-1">
                                            <li><GlossaryText>2-3 واحد AGU برای Load</GlossaryText></li>
                                            <li><GlossaryText>1-2 واحد AGU برای Store</GlossaryText></li>
                                            <li><GlossaryText>محاسبه آدرس‌های پیچیده (base + index*scale + displacement)</GlossaryText></li>
                                        </ul>
                                    </li>
                                    <li className="mt-3">
                                        <strong>Branch Unit:</strong>
                                        <ul className="list-disc list-inside mr-4 mt-1">
                                            <li><GlossaryText>ارزیابی شرایط شاخه</GlossaryText></li>
                                            <li><GlossaryText>محاسبه آدرس مقصد</GlossaryText></li>
                                            <li><GlossaryText>بررسی صحت پیش‌بینی</GlossaryText></li>
                                        </ul>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Floating Point & Vector Units</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <strong>FPU (Floating Point Unit):</strong>
                                        <ul className="list-disc list-inside mr-4 mt-1">
                                            <li><GlossaryText>2-3 واحد FP برای ADD/SUB</GlossaryText></li>
                                            <li><GlossaryText>2-3 واحد FP برای MUL</GlossaryText></li>
                                            <li><GlossaryText>1-2 واحد FP برای DIV/SQRT</GlossaryText></li>
                                            <li><GlossaryText>پشتیبانی از FP32, FP64, FP80</GlossaryText></li>
                                        </ul>
                                    </li>
                                    <li className="mt-3">
                                        <strong>SIMD Units (AVX-512):</strong>
                                        <ul className="list-disc list-inside mr-4 mt-1">
                                            <li><GlossaryText>2 واحد 512-bit FMA (Fused Multiply-Add)</GlossaryText></li>
                                            <li><GlossaryText>عملیات روی 16× FP32 یا 8× FP64 به صورت موازی</GlossaryText></li>
                                            <li><GlossaryText>Throughput: 2× 512-bit ops/cycle</GlossaryText></li>
                                            <li><GlossaryText>32 رجیستر ZMM (512-bit)</GlossaryText></li>
                                        </ul>
                                    </li>
                                    <li className="mt-3">
                                        <strong>Special Instructions:</strong>
                                        <ul className="list-disc list-inside mr-4 mt-1">
                                            <li><GlossaryText>AES-NI: رمزنگاری سخت‌افزاری</GlossaryText></li>
                                            <li><GlossaryText>SHA Extensions: Hash محاسبات</GlossaryText></li>
                                            <li><GlossaryText>AVX-VNNI: Deep Learning</GlossaryText></li>
                                        </ul>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 mt-10">۶.۱. Execution Ports</h3>
                    <Card className="bg-muted/30">
                        <CardContent className="pt-6">
                            <p className="mb-4"><GlossaryText>توزیع واحدهای اجرایی بر روی Port ها (مثال: Ice Lake/Tiger Lake):</GlossaryText></p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="border rounded p-3">
                                    <div className="font-bold mb-2">Port 0</div>
                                    <div><GlossaryText>ALU, FP MUL, FMA, Branch</GlossaryText></div>
                                </div>
                                <div className="border rounded p-3">
                                    <div className="font-bold mb-2">Port 1</div>
                                    <div><GlossaryText>ALU, FP ADD, FMA, Shuffle</GlossaryText></div>
                                </div>
                                <div className="border rounded p-3">
                                    <div className="font-bold mb-2">Port 2</div>
                                    <div><GlossaryText>Load AGU</GlossaryText></div>
                                </div>
                                <div className="border rounded p-3">
                                    <div className="font-bold mb-2">Port 3</div>
                                    <div><GlossaryText>Load AGU</GlossaryText></div>
                                </div>
                                <div className="border rounded p-3">
                                    <div className="font-bold mb-2">Port 4</div>
                                    <div><GlossaryText>Store Data</GlossaryText></div>
                                </div>
                                <div className="border rounded p-3">
                                    <div className="font-bold mb-2">Port 5</div>
                                    <div><GlossaryText>ALU, FP ADD, Shuffle</GlossaryText></div>
                                </div>
                                <div className="border rounded p-3">
                                    <div className="font-bold mb-2">Port 6</div>
                                    <div><GlossaryText>ALU, Branch</GlossaryText></div>
                                </div>
                                <div className="border rounded p-3">
                                    <div className="font-bold mb-2">Port 7-9</div>
                                    <div><GlossaryText>Store AGU</GlossaryText></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Advanced Features */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۷. قابلیت‌ها و بهینه‌سازی‌های پیشرفته</h2>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Hyper-Threading Technology (SMT)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    اجرای همزمان دو Thread روی یک هسته فیزیکی با اشتراک‌گذاری منابع اجرایی:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mr-6">
                                    <li>هر Thread دارای Register File و Architectural State مستقل</li>
                                    <li>اشتراک Cache، Execution Units، و Pipeline resources</li>
                                    <li>بهره‌وری تا 30% در workload های مناسب</li>
                                    <li>Overhead کم: کمتر از 5% افزایش مساحت تراشه</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Turbo Boost Technology</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-4">
                                    افزایش دینامیک فرکانس بر اساس شرایط حرارتی و توان:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mr-6">
                                    <li><strong>Turbo Boost 2.0:</strong> افزایش فرکانس تا 400-600 MHz بالاتر از Base</li>
                                    <li><strong>Turbo Boost Max 3.0:</strong> شناسایی بهترین هسته‌ها و اختصاص workload های single-thread</li>
                                    <li><strong>Adaptive Boost:</strong> Multi-core turbo بهبودیافته</li>
                                    <li>مانیتورینگ لحظه‌ای دما، جریان، و توان</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Memory Subsystem Optimizations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-2 mr-6">
                                    <li><strong>Prefetchers:</strong> 4 سطح prefetcher (L1, L2, LLC, MLC Streamer)</li>
                                    <li><strong>Memory Controller:</strong> پشتیبانی از DDR4/DDR5 با پهنای باند بالا</li>
                                    <li><strong>Load/Store Optimization:</strong> Store-to-Load Forwarding، Memory Disambiguation</li>
                                    <li><strong>TLB Hierarchy:</strong> L1 DTLB (64 entries), L2 STLB (1536 entries)</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Power Management</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside space-y-2 mr-6">
                                    <li><strong>C-States:</strong> حالت‌های مختلف صرفه‌جویی انرژی (C0 تا C10)</li>
                                    <li><strong>P-States:</strong> سطوح مختلف فرکانس و ولتاژ</li>
                                    <li><strong>Power Gating:</strong> خاموش کردن واحدهای غیرفعال</li>
                                    <li><strong>FIVR:</strong> رگولاتور ولتاژ داخلی برای کنترل دقیق</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Performance Analysis */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۸. تحلیل عملکرد</h2>

                    <h3 className="text-2xl font-bold mb-4">۸.۱. معیارهای کلیدی</h3>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>IPC (Instructions Per Cycle)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold mb-2">3.5 - 4.5</p>
                                <p className="text-sm text-muted-foreground">
                                    در workload های بهینه شده با OoO execution و branch prediction موفق
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Memory Bandwidth</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold mb-2">50-100+ GB/s</p>
                                <p className="text-sm text-muted-foreground">
                                    بسته به تعداد کانال‌های حافظه و نوع DRAM (DDR4/DDR5)
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>FLOPS (FP32)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold mb-2">1-2+ TFLOPS</p>
                                <p className="text-sm text-muted-foreground">
                                    با استفاده کامل از واحدهای AVX-512 در تمام هسته‌ها
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 mt-8">۸.۲. عوامل محدودکننده عملکرد</h3>
                    <Tabs defaultValue="memory" className="w-full" dir="rtl">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="memory">Memory Bound</TabsTrigger>
                            <TabsTrigger value="compute">Compute Bound</TabsTrigger>
                            <TabsTrigger value="frontend">Front-End Bound</TabsTrigger>
                        </TabsList>
                        <TabsContent value="memory">
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="mb-4">عملکرد محدود به پهنای باند یا تأخیر حافظه:</p>
                                    <ul className="list-disc list-inside space-y-2 mr-6">
                                        <li>Cache miss های مکرر به LLC یا DRAM</li>
                                        <li>Random memory access patterns</li>
                                        <li>الگوهای دسترسی با Stride نامنظم</li>
                                        <li><strong>راه‌حل:</strong> بهینه‌سازی data locality، استفاده از prefetch، blocking</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="compute">
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="mb-4">محدودیت در واحدهای محاسباتی:</p>
                                    <ul className="list-disc list-inside space-y-2 mr-6">
                                        <li>اشباع Execution Ports خاص</li>
                                        <li>عملیات FP Division یا SQRT زیاد</li>
                                        <li>Long latency instructions (مثلاً integer division)</li>
                                        <li><strong>راه‌حل:</strong> Instruction mix balancing، استفاده از SIMD، loop unrolling</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="frontend">
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="mb-4">محدودیت در واکشی و رمزگشایی دستورالعمل:</p>
                                    <ul className="list-disc list-inside space-y-2 mr-6">
                                        <li>I-Cache miss های مکرر</li>
                                        <li>Branch misprediction rate بالا</li>
                                        <li>دستورالعمل‌های پیچیده با μOps زیاد</li>
                                        <li><strong>راه‌حل:</strong> کاهش code footprint، بهینه‌سازی branch patterns، استفاده از intrinsics</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </section>

                {/* Conclusion */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۹. نتیجه‌گیری</h2>
                    <Card className="bg-muted/30">
                        <CardContent className="pt-6">
                            <p className="text-lg leading-relaxed text-justify mb-4">
                                <GlossaryText>
                                    معماری Intel Core i9 نمونه‌ای از پیچیدگی و توان محاسباتی پردازنده‌های مدرن است. ترکیب تکنیک‌های پیشرفته
                                    شامل Out-of-Order Execution عمیق، پیش‌بینی شاخه دقیق، سلسله مراتب حافظه نهان بهینه، و واحدهای اجرایی گسترده
                                    امکان دستیابی به عملکرد بالا در طیف وسیعی از کاربردها را فراهم می‌کند.
                                </GlossaryText>
                            </p>
                            <p className="text-lg leading-relaxed text-justify mb-4">
                                <GlossaryText>
                                    درک این معماری برای بهینه‌سازی نرم‌افزار، تحلیل عملکرد، و طراحی الگوریتم‌های کارآمد ضروری است.
                                    نسل‌های جدیدتر با معرفی هسته‌های Hybrid (P-core و E-core) و بهبودهای مداوم در فرآیند ساخت و معماری،
                                    مرزهای عملکرد را به جلو می‌برند.
                                </GlossaryText>
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Glossary */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">واژه‌نامه اصطلاحات فنی</h2>
                    <p className="text-lg mb-6 text-muted-foreground">
                        در این بخش، تمام اصطلاحات فنی و تخصصی که در متن مقاله آمده‌اند، به زبان ساده توضیح داده شده‌اند.
                    </p>

                    <div className="grid gap-4">
                        <Card>
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="text-lg">اصطلاحات معماری</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">Skylake, Coffee Lake, Comet Lake, Rocket Lake, Alder Lake, Raptor Lake</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> نام‌های نسل‌های مختلف معماری پردازنده‌های Intel. هر نام نشان‌دهنده یک نسل خاص با بهبودها و ویژگی‌های جدید است.
                                            <br /><strong>مثال:</strong> Skylake نسل اول (2015)، Raptor Lake جدیدترین نسل (2022-2023) است.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Out-of-Order Execution (OoO)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> تکنیکی که پردازنده دستورات را به ترتیبی غیر از ترتیب برنامه اجرا می‌کند تا از منابع به طور بهینه استفاده شود.
                                            <br /><strong>مثال:</strong> اگر دستور 1 منتظر داده از حافظه باشد، پردازنده دستور 2 و 3 را زودتر اجرا می‌کند.
                                            <br /><strong>فایده:</strong> افزایش سرعت اجرا با پر کردن زمان‌های بیکاری پردازنده.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Hyper-Threading (HT)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> تکنولوژی Intel که یک هسته فیزیکی را به دو هسته منطقی (Thread) تبدیل می‌کند.
                                            <br /><strong>مثال:</strong> پردازنده 8 هسته‌ای با HT می‌تواند 16 Thread همزمان اجرا کند.
                                            <br /><strong>فایده:</strong> افزایش کارایی با اجرای همزمان بیشتر برنامه‌ها.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Pipeline</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> تقسیم فرآیند اجرای دستور به مراحل کوچکتر (مثل خط تولید کارخانه) برای افزایش سرعت.
                                            <br /><strong>مراحل:</strong> Fetch (واکشی دستور) → Decode (رمزگشایی) → Execute (اجرا) → Write-back (نوشتن نتیجه)
                                            <br /><strong>فایده:</strong> امکان اجرای همزمان چندین دستور در مراحل مختلف.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Hybrid Architecture</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> ترکیب دو نوع هسته: Performance Cores (P-cores) برای کارهای سنگین و Efficiency Cores (E-cores) برای کارهای سبک.
                                            <br /><strong>مثال:</strong> Core i9-13900K دارای 8 هسته P-core و 16 هسته E-core است.
                                            <br /><strong>فایده:</strong> تعادل بین عملکرد بالا و مصرف انرژی پایین.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">P-cores (Performance Cores)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> هسته‌های قدرتمند با فرکانس بالا برای کارهای سنگین محاسباتی.
                                            <br /><strong>ویژگی:</strong> دارای Hyper-Threading، سرعت بالا، مصرف برق بیشتر.
                                            <br /><strong>کاربرد:</strong> بازی‌ها، نرم‌افزارهای حرفه‌ای، کامپایل.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">E-cores (Efficiency Cores)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> هسته‌های کم‌مصرف برای کارهای پس‌زمینه و چندوظیفه‌ای.
                                            <br /><strong>ویژگی:</strong> بدون Hyper-Threading، مصرف برق کمتر، فرکانس پایین‌تر.
                                            <br /><strong>کاربرد:</strong> وظایف پس‌زمینه، مرورگر، برنامه‌های ساده.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="text-lg">اصطلاحات حافظه و Cache</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">Cache (حافظه نهان)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> حافظه‌ای بسیار سریع و کوچک بین CPU و RAM برای ذخیره داده‌های پرکاربرد.
                                            <br /><strong>سطوح:</strong> L1 (سریع‌ترین، کوچک‌ترین) → L2 → L3 (کندتر، بزرگ‌تر)
                                            <br /><strong>فایده:</strong> کاهش زمان انتظار CPU برای دریافت داده از RAM.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">L1, L2, L3 Cache</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>L1:</strong> سریع‌ترین (4-5 سیکل)، کوچک‌ترین (32-96 KB)، اختصاصی هر هسته.
                                            <br /><strong>L2:</strong> سرعت متوسط (12-15 سیکل)، اندازه متوسط (256KB-2MB)، اختصاصی هر هسته یا مشترک بین چند هسته.
                                            <br /><strong>L3:</strong> کندتر (40-50 سیکل)، بزرگ‌تر (8-36 MB)، مشترک بین همه هسته‌ها.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">TLB (Translation Lookaside Buffer)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> حافظه نهان ویژه برای ذخیره ترجمه آدرس‌های مجازی به فیزیکی.
                                            <br /><strong>فایده:</strong> سرعت بخشیدن به فرآیند ترجمه آدرس حافظه.
                                            <br /><strong>نمونه:</strong> L1 DTLB: 64 ورودی، L2 STLB: 1536 ورودی.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Prefetcher</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> مکانیزمی که داده‌های احتمالی مورد نیاز آینده را پیش از درخواست به Cache می‌آورد.
                                            <br /><strong>سطوح:</strong> L1, L2, L3 (LLC), MLC Streamer
                                            <br /><strong>فایده:</strong> کاهش Cache Miss و افزایش سرعت دسترسی به داده.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">MESIF Protocol</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> پروتکل هماهنگی Cache در سیستم‌های چندهسته‌ای (نسخه بهبود یافته MESI).
                                            <br /><strong>حالت‌ها:</strong> Modified (تغییر یافته), Exclusive (انحصاری), Shared (مشترک), Invalid (نامعتبر), Forward (ارسال‌کننده)
                                            <br /><strong>فایده:</strong> اطمینان از یکسان بودن داده‌ها در Cache های مختلف.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="text-lg">اصطلاحات فرآیند و مشخصات</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">14nm, 10nm, 7nm (فرآیند ساخت)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> اندازه ترانزیستورها در پردازنده (نانومتر = یک میلیاردم متر).
                                            <br /><strong>قانون:</strong> عدد کوچک‌تر = ترانزیستورهای کوچک‌تر = مصرف برق کمتر + سرعت بیشتر + حرارت کمتر
                                            <br /><strong>مثال:</strong> Intel 7 (10nm SuperFin) فرآیند پیشرفته‌تر از 14nm است.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">TDP (Thermal Design Power)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> حداکثر مقدار حرارتی که پردازنده تولید می‌کند و سیستم خنک‌کننده باید دفع کند (بر حسب وات).
                                            <br /><strong>مثال:</strong> Core i9-13900K: TDP پایه 125W، حداکثر در Turbo: 253W
                                            <br /><strong>کاربرد:</strong> انتخاب خنک‌کننده و منبع تغذیه مناسب.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Turbo Boost</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> تکنولوژی افزایش خودکار فرکانس پردازنده فراتر از سرعت پایه در صورت نیاز و وجود ظرفیت حرارتی.
                                            <br /><strong>مثال:</strong> Core i9 از 3.0 GHz پایه به 5.8 GHz Turbo می‌رسد.
                                            <br /><strong>شرایط:</strong> دمای پایین، مصرف برق کافی، بار کاری مناسب.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">IPC (Instructions Per Cycle)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> تعداد دستورات اجرا شده در هر سیکل ساعت پردازنده.
                                            <br /><strong>اهمیت:</strong> معیار کارایی معماری - IPC بالاتر = پردازنده کارآمدتر
                                            <br /><strong>مثال:</strong> Core i9 مدرن: 3.5-4.5 IPC در بارکاری بهینه.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="text-lg">اصطلاحات حافظه اصلی و I/O</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">DDR4, DDR5 (DRAM)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> نوع حافظه اصلی سیستم (RAM).
                                            <br /><strong>DDR4:</strong> نسل قدیمی‌تر، سرعت تا 3200 MHz، ولتاژ 1.2V
                                            <br /><strong>DDR5:</strong> جدیدترین نسل، سرعت 4800-5600 MHz+، ولتاژ 1.1V، پهنای باند بیشتر
                                            <br /><strong>پشتیبانی:</strong> Core i9-12th Gen و بالاتر از هر دو نوع پشتیبانی می‌کنند.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">PCIe (PCI Express)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> باس پرسرعت برای اتصال کارت گرافیک، SSD و دستگاه‌های پرسرعت دیگر.
                                            <br /><strong>نسل‌ها:</strong> PCIe 3.0 → 4.0 → 5.0 (هر نسل دو برابر سرعت نسل قبل)
                                            <br /><strong>مثال:</strong> PCIe 5.0 x16: حداکثر 64 GB/s پهنای باند
                                            <br /><strong>کاربرد:</strong> GPU ها، SSD های NVMe پرسرعت.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Lanes (خطوط PCIe)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> مسیرهای موازی انتقال داده در PCIe.
                                            <br /><strong>مثال:</strong> x16 = 16 خط موازی، x4 = 4 خط موازی
                                            <br /><strong>نکته:</strong> خطوط بیشتر = پهنای باند بیشتر برای انتقال داده.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">DMI (Direct Media Interface)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> باس ارتباطی اختصاصی بین CPU و چیپست مادربرد.
                                            <br /><strong>نسل‌ها:</strong> DMI 3.0 → DMI 4.0 (معادل PCIe 4.0 x8)
                                            <br /><strong>کاربرد:</strong> اتصال CPU به درگاه‌های SATA، USB، شبکه و سایر I/O های مادربرد.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">UHD Graphics 770 / 730</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> گرافیک مجتمع (iGPU) داخل پردازنده Intel.
                                            <br /><strong>کاربرد:</strong> نمایش تصویر بدون کارت گرافیک مجزا، رمزگشایی ویدئو، کارهای سبک گرافیکی
                                            <br /><strong>نکته:</strong> برای بازی سنگین کافی نیست، کارت گرافیک مجزا لازم است.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="text-lg">اصطلاحات پیشرفته</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">Branch Prediction (پیش‌بینی شاخه)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> تکنیک پیش‌بینی مسیر دستورات شرطی (if/else) قبل از اجرا برای جلوگیری از توقف Pipeline.
                                            <br /><strong>اجزا:</strong> BTB (Branch Target Buffer), PHT (Pattern History Table)
                                            <br /><strong>دقت:</strong> 95-99% در Core i9 مدرن
                                            <br /><strong>فایده:</strong> جلوگیری از اتلاف زمان در تصمیم‌گیری‌های شرطی.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">AVX-512 (Advanced Vector Extensions)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> دستورات SIMD پیشرفته برای محاسبات موازی با داده‌های 512 بیتی.
                                            <br /><strong>کاربرد:</strong> پردازش تصویر، شبیه‌سازی علمی، یادگیری ماشین، رمزنگاری
                                            <br /><strong>قدرت:</strong> اجرای 16 عملیات اعشاری 32-بیتی همزمان در یک دستور
                                            <br /><strong>نکته:</strong> در E-cores پشتیبانی نمی‌شود، فقط P-cores.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Execution Units / Ports</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> واحدهای محاسباتی تخصصی داخل هر هسته که دستورات را اجرا می‌کنند.
                                            <br /><strong>انواع:</strong> ALU (محاسبات صحیح), FPU (اعشاری), Load/Store (خواندن/نوشتن حافظه), Branch (شاخه)
                                            <br /><strong>Ports:</strong> مسیرهایی که دستورات از طریق آن به واحدهای اجرایی می‌روند (Port 0-11)
                                            <br /><strong>فایده:</strong> اجرای موازی چندین دستور در هر سیکل.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Store-to-Load Forwarding</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> تکنیک ارسال مستقیم داده از دستور Store (نوشتن) به دستور Load (خواندن) بدون نوشتن در Cache.
                                            <br /><strong>فایده:</strong> کاهش تأخیر زمانی که دستور خواندن، داده نوشته شده توسط دستور قبلی را نیاز دارد.
                                            <br /><strong>نمونه:</strong> `x = 5; y = x + 1;` - مقدار x مستقیماً به دستور دوم فرستاده می‌شود.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Memory Disambiguation</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> تشخیص این‌که آیا دو دسترسی حافظه به آدرس‌های یکسان اشاره می‌کنند یا خیر.
                                            <br /><strong>فایده:</strong> امکان اجرای out-of-order دستورات حافظه بدون تداخل
                                            <br /><strong>مثال:</strong> Load می‌تواند قبل از Store قبلی اجرا شود اگر به آدرس متفاوت باشند.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">FLOPS (Floating Point Operations Per Second)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> تعداد عملیات اعشاری در هر ثانیه - معیار قدرت محاسباتی.
                                            <br /><strong>واحدها:</strong> GFLOPS (میلیارد), TFLOPS (تریلیون)
                                            <br /><strong>مثال:</strong> Core i9-13900K با AVX-512: بیش از 2 TFLOPS
                                            <br /><strong>کاربرد:</strong> محاسبات علمی، شبیه‌سازی، یادگیری عمیق.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* References */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">منابع و مراجع</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <ul className="space-y-2">
                                <li>Intel® 64 and IA-32 Architectures Optimization Reference Manual</li>
                                <li>Intel® Architecture Instruction Set Extensions Programming Reference</li>
                                <li>Hennessy & Patterson, Computer Architecture: A Quantitative Approach (6th Edition)</li>
                                <li>Agner Fog, "The microarchitecture of Intel, AMD and VIA CPUs"</li>
                                <li>WikiChip - Intel Microarchitectures</li>
                                <li>Various Intel Architecture Day presentations and whitepapers</li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </article>
    );
}
