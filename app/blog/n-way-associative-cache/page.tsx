import Image from "next/image";
import CacheSimulator from "@/components/cache-simulator";
import { CacheDiagram, CacheMappingDiagram, ReplacementPolicyDiagram } from "@/components/svg/cache-diagrams";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CachePerformanceChart, AssociativityComparisonChart } from "@/components/performance-chart";
import { GlossaryTerm } from "@/components/glossary-term";
import { GlossaryText } from "@/components/glossary-text";
import { ImageZoomModal } from "@/components/image-zoom-modal";

export default function NWayAssociativeCachePage() {
    return (
        <article className="min-h-screen bg-background" dir="rtl">
            <div className="max-w-6xl mx-auto p-8">
                {/* Header */}
                <header className="mb-12 pb-8 border-b">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        حافظه نهان N-Way Set Associative
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        تحلیل جامع ساختار، عملکرد و پیاده‌سازی
                    </p>
                    <div className="flex gap-4 mt-6 text-sm text-muted-foreground">
                        <span>معماری کامپیوتر</span>
                        <span>•</span>
                        <span>سیستم‌های حافظه</span>
                        <span>•</span>
                        <span>۱۴۰۴/۱۰/۱۱</span>
                    </div>

                    {/* Interactive Glossary Note */}
                    <Card className="mt-6 bg-primary/5 border-primary/20">
                        <CardContent className="p-4">
                            <p className="text-sm">
                                💡 <strong>راهنمای استفاده:</strong> اصطلاحات فنی در متن با خط نقطه‌چین مشخص شده‌اند.
                                <br />• روی اصطلاح <strong>هاور کنید</strong> تا تعریف مختصر ببینید
                                <br />• <strong>کلیک کنید</strong> برای مشاهده تعریف کامل، مثال‌ها و جزئیات
                            </p>
                        </CardContent>
                    </Card>
                </header>

                {/* Introduction */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۱. مقدمه</h2>

                    <h3 className="text-2xl font-semibold mb-4 mt-6">۱.۱. ضرورت وجود حافظه نهان</h3>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-justify mb-4">
                            <GlossaryTerm term="cache">حافظه نهان (Cache)</GlossaryTerm> به عنوان یک لایه میانی بین پردازنده و حافظه اصلی، نقش حیاتی در بهبود عملکرد سیستم‌های کامپیوتری ایفا می‌کند.
                            شکاف سرعتی بین پردازنده‌های مدرن (با فرکانس‌های چند گیگاهرتز) و حافظه‌های <GlossaryTerm term="dram">DRAM</GlossaryTerm> (با تأخیرهای دهها نانوثانیه) یکی از بزرگ‌ترین چالش‌های
                            معماری کامپیوتر است. بدون حافظه نهان، پردازنده مجبور است برای هر دسترسی به داده صدها سیکل منتظر بماند که منجر به کاهش شدید عملکرد می‌شود.
                        </p>
                        <p className="text-lg leading-relaxed text-justify mb-4">
                            معماری <GlossaryTerm term="set-associative">Set Associative</GlossaryTerm> ترکیبی از دو رویکرد <GlossaryTerm term="direct-mapped">Direct Mapped</GlossaryTerm> و <GlossaryTerm term="fully-associative">Fully Associative</GlossaryTerm> است که تعادل بهینه‌ای بین هزینه، پیچیدگی و عملکرد ایجاد می‌کند.
                            این معماری با ارائه انعطاف‌پذیری در نگاشت آدرس‌ها و حفظ سادگی نسبی در پیاده‌سازی، به یکی از رایج‌ترین انواع <GlossaryTerm term="cache">Cache</GlossaryTerm> در پردازنده‌های مدرن تبدیل شده است.
                        </p>
                    </div>

                    {/* Real Cache Hierarchy Image */}
                    <Card className="my-8">
                        <CardHeader className="bg-muted/30">
                            <CardTitle>سلسله مراتب حافظه در سیستم‌های مدرن</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="relative w-full bg-white rounded-lg overflow-hidden p-4">
                                <ImageZoomModal
                                    src="/images/blog/memory-hierarchy.svg"
                                    alt="Computer Memory Hierarchy Pyramid"
                                    className="w-full h-auto object-contain max-h-96"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-3 text-center">
                                هرم سلسله مراتب حافظه - از سریع‌ترین (<GlossaryTerm term="registers">Registers</GlossaryTerm>) تا کندترین (<GlossaryTerm term="storage">Storage</GlossaryTerm>)
                            </p>
                        </CardContent>
                    </Card>

                    {/* Visual Memory Hierarchy Bars */}
                    <Card className="my-8">
                        <CardHeader className="bg-muted/30">
                            <CardTitle>مقایسه بصری سرعت و ظرفیت حافظه</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="relative w-full bg-linear-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden p-8">
                                {/* Simplified Die Layout Visualization */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-4 gap-2">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="aspect-square bg-blue-500/30 border-2 border-blue-400 rounded flex items-center justify-center text-xs font-bold text-white">
                                                Core {i}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-green-500/20 border-2 border-green-400 rounded-lg p-4 text-center">
                                        <div className="text-lg font-bold text-white">L3 Cache - 36 MB (Shared)</div>
                                        <div className="text-xs text-gray-300 mt-1">12-Way Set Associative</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-purple-500/20 border border-purple-400 rounded p-2 text-center text-xs text-white">
                                            Memory Controller
                                        </div>
                                        <div className="bg-orange-500/20 border border-orange-400 rounded p-2 text-center text-xs text-white">
                                            I/O Controllers
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3 text-center">
                                نمودار ساده‌شده ساختار Die پردازنده - نمایش <GlossaryTerm term="cache">Cache</GlossaryTerm> و هسته‌های پردازشی
                            </p>
                        </CardContent>
                    </Card>

                    <h3 className="text-2xl font-semibold mb-4 mt-8">۱.۲. مفاهیم پایه حافظه نهان</h3>
                    <Card className="mb-6 bg-muted/30">
                        <CardContent className="pt-6">
                            <h4 className="font-bold text-lg mb-3">مفاهیم کلیدی:</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold mb-2">• <GlossaryTerm term="hit">Cache Hit</GlossaryTerm>:</p>
                                    <p className="text-sm mr-4">زمانی که داده مورد نیاز در <GlossaryTerm term="cache">Cache</GlossaryTerm> موجود باشد و دسترسی سریع انجام شود.</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">• <GlossaryTerm term="miss">Cache Miss</GlossaryTerm>:</p>
                                    <p className="text-sm mr-4">زمانی که داده در <GlossaryTerm term="cache">Cache</GlossaryTerm> نباشد و باید از حافظه اصلی واکشی شود.</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">• <GlossaryTerm term="temporal-locality">Temporal Locality</GlossaryTerm>:</p>
                                    <p className="text-sm mr-4">داده‌هایی که اخیراً استفاده شده‌اند احتمالاً دوباره مورد استفاده قرار می‌گیرند.</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">• <GlossaryTerm term="spatial-locality">Spatial Locality</GlossaryTerm>:</p>
                                    <p className="text-sm mr-4">داده‌های مجاور به داده‌های اخیراً استفاده‌شده احتمالاً به زودی نیاز خواهند شد.</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">• <GlossaryTerm term="cache-line">Block/Line</GlossaryTerm>:</p>
                                    <p className="text-sm mr-4">واحد اساسی انتقال داده بین <GlossaryTerm term="cache">Cache</GlossaryTerm> و حافظه اصلی (معمولاً ۶۴ بایت).</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-2">• <GlossaryTerm term="lru">Replacement Policy</GlossaryTerm>:</p>
                                    <p className="text-sm mr-4">الگوریتم تعیین اینکه در صورت پر بودن <GlossaryTerm term="cache">Cache</GlossaryTerm>، کدام بلوک باید جایگزین شود.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-8 mb-8">
                        <CardHeader className="bg-primary/5">
                            <CardTitle>تأخیر دسترسی به <GlossaryTerm term="cache">Cache</GlossaryTerm> در پردازنده‌های مدرن (به سیکل)</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="p-4 border-r-4 border-blue-500 bg-blue-500/5 rounded">
                                        <h4 className="font-bold mb-2">L1 <GlossaryTerm term="cache">Cache</GlossaryTerm></h4>
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">۴-۵ cycles</div>
                                        <p className="text-sm text-muted-foreground mt-2">اندازه: ۳۲-۹۶ KB</p>
                                        <p className="text-xs mt-1">سریع‌ترین - مستقیماً به هسته متصل</p>
                                    </div>
                                    <div className="p-4 border-r-4 border-green-500 bg-green-500/5 rounded">
                                        <h4 className="font-bold mb-2">L2 <GlossaryTerm term="cache">Cache</GlossaryTerm></h4>
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">۱۲-۱۴ cycles</div>
                                        <p className="text-sm text-muted-foreground mt-2">اندازه: ۲۵۶ KB - ۲ MB</p>
                                        <p className="text-xs mt-1">متوسط - اختصاصی هر هسته</p>
                                    </div>
                                    <div className="p-4 border-r-4 border-yellow-500 bg-yellow-500/5 rounded">
                                        <h4 className="font-bold mb-2">L3 <GlossaryTerm term="cache">Cache</GlossaryTerm></h4>
                                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">۴۲-۵۰ cycles</div>
                                        <p className="text-sm text-muted-foreground mt-2">اندازه: ۱۶-۳۶ MB</p>
                                        <p className="text-xs mt-1">مشترک - بین همه هسته‌ها</p>
                                    </div>
                                </div>
                                <div className="p-4 border-r-4 border-red-500 bg-red-500/5 rounded">
                                    <h4 className="font-bold mb-2">حافظه اصلی (<GlossaryTerm term="dram">DRAM</GlossaryTerm>)</h4>
                                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">۲۰۰-۳۰۰ cycles</div>
                                    <p className="text-sm text-muted-foreground mt-2">اندازه: ۸-۱۲۸ GB | تأخیر: ~۵۰-۷۰ ns</p>
                                    <p className="text-xs mt-1">کندترین - تأثیر <GlossaryTerm term="miss">Cache Miss</GlossaryTerm> بسیار بالا</p>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-muted/30 rounded">
                                <h4 className="font-bold mb-2 text-sm">💡 تحلیل عملکرد:</h4>
                                <p className="text-sm mb-2">با فرض <GlossaryTerm term="hit">Cache Hit Rate</GlossaryTerm> ۹۵٪ در L1:</p>
                                <ul className="text-xs space-y-1 mr-6">
                                    <li>• میانگین زمان دسترسی: (۰.۹۵ × ۴) + (۰.۰۵ × ۲۰۰) = <strong>۱۳.۸ cycles</strong></li>
                                    <li>• با <GlossaryTerm term="hit">Cache Hit Rate</GlossaryTerm> ۷۵٪: (۰.۷۵ × ۴) + (۰.۲۵ × ۲۰۰) = <strong>۵۳ cycles</strong></li>
                                    <li>• بدون <GlossaryTerm term="cache">Cache</GlossaryTerm>: <strong>۲۰۰+ cycles</strong> برای هر دسترسی!</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Memory Hierarchy Visual */}
                    <Card className="my-8">
                        <CardHeader className="bg-muted/30">
                            <CardTitle>سلسله مراتب حافظه در معماری مدرن</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-32 text-right font-bold text-sm">CPU Registers</div>
                                    <div className="flex-1">
                                        <div className="h-8 bg-linear-to-r from-blue-600 to-blue-500 rounded flex items-center justify-center text-white text-xs font-bold" style={{ width: '8%' }}>
                                            &lt;1 cycle
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-32 text-right font-bold text-sm">L1 Cache</div>
                                    <div className="flex-1">
                                        <div className="h-8 bg-linear-to-r from-green-600 to-green-500 rounded flex items-center justify-center text-white text-xs font-bold" style={{ width: '15%' }}>
                                            4-5 cycles | 32-96 KB
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-32 text-right font-bold text-sm">L2 Cache</div>
                                    <div className="flex-1">
                                        <div className="h-8 bg-linear-to-r from-yellow-600 to-yellow-500 rounded flex items-center justify-center text-white text-xs font-bold" style={{ width: '30%' }}>
                                            12-14 cycles | 256KB-2MB
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-32 text-right font-bold text-sm">L3 Cache</div>
                                    <div className="flex-1">
                                        <div className="h-8 bg-linear-to-r from-orange-600 to-orange-500 rounded flex items-center justify-center text-white text-xs font-bold" style={{ width: '50%' }}>
                                            42-50 cycles | 16-36 MB
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-32 text-right font-bold text-sm">Main Memory</div>
                                    <div className="flex-1">
                                        <div className="h-8 bg-linear-to-r from-red-600 to-red-500 rounded flex items-center justify-center text-white text-xs font-bold" style={{ width: '100%' }}>
                                            200-300 cycles | 8-128 GB
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                                <div className="p-3 bg-blue-500/10 rounded">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50x</div>
                                    <div className="text-xs text-muted-foreground">L1 سریعتر از RAM</div>
                                </div>
                                <div className="p-3 bg-green-500/10 rounded">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">95%</div>
                                    <div className="text-xs text-muted-foreground"><GlossaryTerm term="hit">Cache Hit Rate</GlossaryTerm> معمولی</div>
                                </div>
                                <div className="p-3 bg-orange-500/10 rounded">
                                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">15x</div>
                                    <div className="text-xs text-muted-foreground">بهبود عملکرد با <GlossaryTerm term="cache">Cache</GlossaryTerm></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <h3 className="text-2xl font-semibold mb-4 mt-8">۱.۳. انواع معماری‌های <GlossaryTerm term="cache">Cache</GlossaryTerm></h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <Card>
                            <CardHeader className="bg-blue-500/10">
                                <CardTitle className="text-lg"><GlossaryTerm term="direct-mapped">Direct Mapped</GlossaryTerm></CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <p className="text-sm mb-2"><span className="font-semibold">مزایا:</span> سریع و ساده</p>
                                <p className="text-sm mb-2"><span className="font-semibold">معایب:</span> <GlossaryTerm term="conflict-miss">Conflict Miss</GlossaryTerm> بالا</p>
                                <p className="text-sm"><span className="font-semibold">کاربرد:</span> L1 <GlossaryTerm term="cache">Cache</GlossaryTerm> های کوچک</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="bg-green-500/10">
                                <CardTitle className="text-lg"><GlossaryTerm term="set-associative">Set Associative</GlossaryTerm></CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <p className="text-sm mb-2"><span className="font-semibold">مزایا:</span> تعادل خوب</p>
                                <p className="text-sm mb-2"><span className="font-semibold">معایب:</span> پیچیدگی متوسط</p>
                                <p className="text-sm"><span className="font-semibold">کاربرد:</span> رایج‌ترین نوع</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="bg-purple-500/10">
                                <CardTitle className="text-lg"><GlossaryTerm term="fully-associative">Fully Associative</GlossaryTerm></CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <p className="text-sm mb-2"><span className="font-semibold">مزایا:</span> Miss Rate پایین</p>
                                <p className="text-sm mb-2"><span className="font-semibold">معایب:</span> بسیار پیچیده و گران</p>
                                <p className="text-sm"><span className="font-semibold">کاربرد:</span> <GlossaryTerm term="tlb">TLB</GlossaryTerm> ها</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4">مقایسه تعاملی Associativity های مختلف</h3>
                        <AssociativityComparisonChart />
                    </div>
                </section>

                {/* Cache Structure */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۲. ساختار معماری</h2>

                    <h3 className="text-2xl font-bold mb-4 mt-8">۲.۱. سازماندهی حافظه</h3>
                    <p className="text-lg leading-relaxed text-justify mb-6">
                        در معماری N-Way Set Associative، حافظه نهان به مجموعه‌ای از Set ها تقسیم می‌شود. هر Set شامل N تا Way (راه) است
                        که هر کدام می‌توانند یک بلوک از حافظه اصلی را ذخیره کنند. این ساختار امکان می‌دهد یک آدرس حافظه در N مکان مختلف درون یک Set قرار گیرد.
                    </p>

                    <CacheDiagram numWays={4} numSets={8} />

                    <Card className="my-8 bg-secondary/20">
                        <CardContent className="p-6">
                            <h4 className="font-bold text-lg mb-4">پارامترهای اصلی:</h4>
                            <ul className="space-y-3 text-lg">
                                <li className="flex items-start gap-3">
                                    <span className="font-bold min-w-37.5">Number of Sets (S):</span>
                                    <span>تعداد <GlossaryTerm term="set">Set</GlossaryTerm> های موجود در <GlossaryTerm term="cache">Cache</GlossaryTerm></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-bold min-w-37.5">Associativity (N):</span>
                                    <span>تعداد Way ها در هر Set</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-bold min-w-37.5">Block Size (B):</span>
                                    <span>اندازه هر بلوک <GlossaryTerm term="cache">Cache</GlossaryTerm> به بایت</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="font-bold min-w-37.5"><GlossaryTerm term="cache">Cache</GlossaryTerm> Size:</span>
                                    <span className="font-mono">S × N × B بایت</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <h3 className="text-2xl font-bold mb-4 mt-8">۲.۲. ساختار آدرس</h3>
                    <p className="text-lg leading-relaxed text-justify mb-6">
                        هر آدرس حافظه به سه بخش اصلی تقسیم می‌شود:
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <Card>
                            <CardContent className="p-6">
                                <h4 className="font-bold text-lg mb-2"><GlossaryTerm term="tag">Tag</GlossaryTerm></h4>
                                <p>برای شناسایی یکتای بلوک در Set استفاده می‌شود. در مرحله مقایسه (Comparison) بررسی می‌شود.</p>
                                <p className="text-sm text-muted-foreground mt-2 font-mono">
                                    Bits: {`[31:log₂(S×B)]`}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <h4 className="font-bold text-lg mb-2"><GlossaryTerm term="set-index">Set Index</GlossaryTerm></h4>
                                <p>مشخص می‌کند بلوک در کدام <GlossaryTerm term="set">Set</GlossaryTerm> باید جستجو شود. تعیین‌کننده مکان Set است.</p>
                                <p className="text-sm text-muted-foreground mt-2 font-mono">
                                    Bits: {`[log₂(S×B)-1:log₂(B)]`}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <h4 className="font-bold text-lg mb-2"><GlossaryTerm term="block-offset">Block Offset</GlossaryTerm></h4>
                                <p>آدرس بایت مورد نظر در داخل بلوک را مشخص می‌کند. برای دسترسی به داده درون بلوک.</p>
                                <p className="text-sm text-muted-foreground mt-2 font-mono">
                                    Bits: {`[log₂(B)-1:0]`}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 mt-8">۲.۳. نگاشت آدرس به <GlossaryTerm term="cache">Cache</GlossaryTerm></h3>

                    {/* Memory Block to Cache Set Mapping Visualization */}
                    <Card className="my-8">
                        <CardHeader className="bg-muted/30">
                            <CardTitle>Memory Block to <GlossaryTerm term="cache">Cache</GlossaryTerm> <GlossaryTerm term="set">Set</GlossaryTerm> Mapping</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid md:grid-cols-[200px_1fr] gap-8">
                                {/* Main Memory */}
                                <div>
                                    <h4 className="text-center font-bold mb-4">Main Memory</h4>
                                    <div className="space-y-1">
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((block) => {
                                            const colors = ['border-blue-500 bg-blue-500/20', 'border-green-500 bg-green-500/20', 'border-orange-500 bg-orange-500/20', 'border-purple-500 bg-purple-500/20'];
                                            const setIndex = block % 4;
                                            return (
                                                <div key={block} className={`border-2 ${colors[setIndex]} rounded p-2 text-center font-semibold text-sm`}>
                                                    Block {block}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Cache Sets */}
                                <div>
                                    <h4 className="text-center font-bold mb-4">4-<GlossaryTerm term="way">Way</GlossaryTerm> <GlossaryTerm term="set-associative">Set Associative</GlossaryTerm> <GlossaryTerm term="cache">Cache</GlossaryTerm></h4>
                                    <div className="space-y-3">
                                        {[0, 1, 2, 3].map((set) => {
                                            const colors = ['border-blue-500', 'border-green-500', 'border-orange-500', 'border-purple-500'];
                                            return (
                                                <div key={set} className="flex items-center gap-3">
                                                    <div className="w-16 text-sm font-semibold">Set {set}</div>
                                                    <div className="flex-1 grid grid-cols-4 gap-2">
                                                        {[0, 1, 2, 3].map((way) => (
                                                            <div key={way} className={`border-2 ${colors[set]} bg-muted/50 rounded-lg p-4 text-center relative`}>
                                                                <div className="text-xs text-muted-foreground">(way {way})</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Formula */}
                            <div className="mt-6 p-4 bg-muted/30 rounded-lg text-center">
                                <div className="font-mono text-lg font-bold">
                                    Set Index = (Block Address) mod (Number of Sets)
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="my-8">
                        <h3 className="text-2xl font-bold mb-4">تأثیر <GlossaryTerm term="hit">Cache Hit Rate</GlossaryTerm> بر عملکرد</h3>
                        <CachePerformanceChart />
                    </div>

                    <Card className="my-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                        <CardContent className="p-6">
                            <h4 className="font-bold text-lg mb-3">فرمول نگاشت:</h4>
                            <div className="font-mono text-lg bg-background/50 p-4 rounded">
                                Set Index = (Block Address) mod (Number of Sets)
                            </div>
                            <p className="mt-4 text-muted-foreground">
                                بلوک‌هایی با فاصله Number of Sets در حافظه اصلی، به یک Set نگاشت می‌شوند.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Cache Operations */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۳. عملیات دسترسی</h2>

                    <h3 className="text-2xl font-bold mb-4 mt-8">۳.۱. فرآیند خواندن (Read)</h3>

                    <div className="space-y-4 mb-8">
                        <Card className="border-r-4 border-r-blue-500">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl font-bold text-blue-500">۱</div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">استخراج <GlossaryTerm term="set-index">Set Index</GlossaryTerm></h4>
                                        <p>بخش <GlossaryTerm term="set-index">Set Index</GlossaryTerm> از آدرس استخراج شده و <GlossaryTerm term="set">Set</GlossaryTerm> مورد نظر شناسایی می‌شود.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-r-4 border-r-green-500">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl font-bold text-green-500">۲</div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">مقایسه موازی <GlossaryTerm term="tag">Tag</GlossaryTerm> ها</h4>
                                        <p><GlossaryTerm term="tag">Tag</GlossaryTerm> آدرس با Tag همه <GlossaryTerm term="way">Way</GlossaryTerm> های معتبر (Valid=1) در Set به‌صورت موازی مقایسه می‌شود. این عملیات توسط N Comparator انجام می‌شود.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-r-4 border-r-purple-500">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl font-bold text-purple-500">۳</div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">تصمیم‌گیری Hit/Miss</h4>
                                        <div className="space-y-2 mt-2">
                                            <p><span className="font-bold text-green-600"><GlossaryTerm term="hit">Cache Hit</GlossaryTerm>:</span> یکی از Tag ها مطابقت داشت → داده از Way مربوطه خوانده می‌شود</p>
                                            <p><span className="font-bold text-red-600"><GlossaryTerm term="miss">Cache Miss</GlossaryTerm>:</span> هیچ Tag ای مطابقت نداشت → بلوک از حافظه اصلی واکشی می‌شود</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-r-4 border-r-orange-500">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl font-bold text-orange-500">۴</div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">جایگزینی در صورت Miss</h4>
                                        <p>در صورت <GlossaryTerm term="miss">Cache Miss</GlossaryTerm> و پر بودن همه Way ها، یکی از Way ها بر اساس سیاست جایگزینی (مثلاً <GlossaryTerm term="lru">LRU</GlossaryTerm>) انتخاب و جایگزین می‌شود.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Replacement Policies */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۴. سیاست‌های جایگزینی</h2>

                    <p className="text-lg leading-relaxed text-justify mb-6">
                        زمانی که Cache Miss رخ می‌دهد و همه Way های یک Set پر هستند، باید یکی از بلوک‌ها جایگزین شود.
                        سیاست جایگزینی تعیین می‌کند کدام بلوک باید حذف شود.
                    </p>

                    <h3 className="text-2xl font-bold mb-4 mt-8">۴.۱. الگوریتم LRU (Least Recently Used)</h3>

                    {/* LRU Replacement Policy Visualization */}
                    <Card className="my-6">
                        <CardHeader className="bg-muted/30">
                            <CardTitle>LRU (Least Recently Used) Replacement Policy</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                {/* Current State */}
                                <div>
                                    <h4 className="text-center font-semibold mb-4 text-muted-foreground">Current Cache Set State</h4>
                                    <div className="grid grid-cols-4 gap-3">
                                        <div className="bg-blue-500/20 border-2 border-blue-400 rounded-lg p-4 text-center">
                                            <div className="text-3xl font-bold mb-2">A</div>
                                            <div className="text-sm font-semibold">Last Access: T-4</div>
                                            <div className="text-xs text-muted-foreground mt-1">Newer</div>
                                        </div>
                                        <div className="bg-blue-500/20 border-2 border-blue-400 rounded-lg p-4 text-center">
                                            <div className="text-3xl font-bold mb-2">B</div>
                                            <div className="text-sm font-semibold">Last Access: T-2</div>
                                            <div className="text-xs text-muted-foreground mt-1">Older</div>
                                        </div>
                                        <div className="bg-blue-500/20 border-2 border-blue-400 rounded-lg p-4 text-center">
                                            <div className="text-3xl font-bold mb-2">C</div>
                                            <div className="text-sm font-semibold">Last Access: T-7</div>
                                            <div className="text-xs text-muted-foreground mt-1">Newest</div>
                                        </div>
                                        <div className="bg-red-500/20 border-2 border-red-400 rounded-lg p-4 text-center">
                                            <div className="text-3xl font-bold mb-2">D</div>
                                            <div className="text-sm font-semibold">Last Access: T-1</div>
                                            <div className="text-xs text-red-400 mt-1 font-bold">Oldest (LRU)</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="text-center">
                                    <div className="inline-block bg-muted rounded-lg px-6 py-2">
                                        <div className="text-lg font-bold">Replace ↓</div>
                                    </div>
                                </div>

                                {/* After Replacement */}
                                <div>
                                    <h4 className="text-center font-semibold mb-4 text-muted-foreground">After Replacement (New Block X)</h4>
                                    <div className="grid grid-cols-4 gap-3">
                                        <div className="bg-blue-500/20 border-2 border-blue-400 rounded-lg p-4 text-center">
                                            <div className="text-3xl font-bold mb-2">A</div>
                                            <div className="text-xs text-muted-foreground mt-1">Newer</div>
                                        </div>
                                        <div className="bg-blue-500/20 border-2 border-blue-400 rounded-lg p-4 text-center">
                                            <div className="text-3xl font-bold mb-2">B</div>
                                            <div className="text-xs text-muted-foreground mt-1">Older</div>
                                        </div>
                                        <div className="bg-blue-500/20 border-2 border-blue-400 rounded-lg p-4 text-center">
                                            <div className="text-3xl font-bold mb-2">C</div>
                                            <div className="text-xs text-muted-foreground mt-1">Newest</div>
                                        </div>
                                        <div className="bg-green-500/20 border-2 border-green-400 rounded-lg p-4 text-center">
                                            <div className="text-3xl font-bold mb-2 text-green-400">X</div>
                                            <div className="text-xs text-green-400 mt-1 font-bold">New Block</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="my-6">
                        <CardContent className="p-6">
                            <h4 className="font-bold text-lg mb-3">مشخصات LRU:</h4>
                            <ul className="space-y-2 text-lg list-disc list-inside">
                                <li>بلوکی که مدت زمان بیشتری از آخرین دسترسی آن گذشته، جایگزین می‌شود</li>
                                <li>نیاز به نگهداری اطلاعات زمان دسترسی برای هر Way</li>
                                <li>پیچیدگی سخت‌افزاری: <span className="font-mono">O(N log N)</span> بیت برای هر Set</li>
                                <li>عملکرد مناسب برای الگوهای دسترسی زمانی</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <h3 className="text-2xl font-bold mb-4 mt-8">۴.۲. سایر الگوریتم‌ها</h3>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <Card>
                            <CardContent className="p-6">
                                <h4 className="font-bold text-lg mb-3">FIFO (First-In-First-Out)</h4>
                                <p className="mb-3">قدیمی‌ترین بلوک وارد شده به Cache جایگزین می‌شود.</p>
                                <div className="text-sm space-y-1">
                                    <p className="text-green-600">✓ پیاده‌سازی ساده‌تر</p>
                                    <p className="text-green-600">✓ هزینه سخت‌افزاری کمتر</p>
                                    <p className="text-red-600">✗ عملکرد ضعیف‌تر از LRU</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h4 className="font-bold text-lg mb-3">Random Replacement</h4>
                                <p className="mb-3">یک Way به‌صورت تصادفی برای جایگزینی انتخاب می‌شود.</p>
                                <div className="text-sm space-y-1">
                                    <p className="text-green-600">✓ ساده‌ترین پیاده‌سازی</p>
                                    <p className="text-green-600">✓ هزینه سخت‌افزاری بسیار کم</p>
                                    <p className="text-orange-600">~ عملکرد غیرقابل پیش‌بینی</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h4 className="font-bold text-lg mb-3">LFU (Least Frequently Used)</h4>
                                <p className="mb-3">بلوکی که کمترین تعداد دسترسی را داشته جایگزین می‌شود.</p>
                                <div className="text-sm space-y-1">
                                    <p className="text-green-600">✓ مناسب الگوهای تکراری</p>
                                    <p className="text-red-600">✗ نیاز به Counter برای هر Way</p>
                                    <p className="text-red-600">✗ مشکل با تغییر الگوی دسترسی</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h4 className="font-bold text-lg mb-3">Pseudo-LRU</h4>
                                <p className="mb-3">تقریبی از LRU با پیچیدگی کمتر.</p>
                                <div className="text-sm space-y-1">
                                    <p className="text-green-600">✓ عملکرد نزدیک به LRU</p>
                                    <p className="text-green-600">✓ هزینه کمتر (N-1 بیت)</p>
                                    <p className="text-blue-600">→ رایج در پردازنده‌های مدرن</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Cache Organization Visual Comparison */}
                    <Card className="my-8">
                        <CardHeader className="bg-muted/30">
                            <CardTitle>مقایسه بصری سازماندهی Cache</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Direct Mapped */}
                                <div className="space-y-3">
                                    <h4 className="font-bold text-center bg-blue-500/10 p-2 rounded">Direct Mapped (1-Way)</h4>
                                    <div className="space-y-1">
                                        {[0, 1, 2, 3].map((i) => (
                                            <div key={i} className="flex gap-1">
                                                <div className="flex-1 h-12 bg-blue-500/20 border border-blue-500 rounded flex items-center justify-center text-xs font-mono">
                                                    Set {i}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-xs text-center text-muted-foreground">
                                        یک مکان ثابت برای هر آدرس
                                    </div>
                                </div>

                                {/* 2-Way Set Associative */}
                                <div className="space-y-3">
                                    <h4 className="font-bold text-center bg-green-500/10 p-2 rounded">2-Way Set Associative</h4>
                                    <div className="space-y-1">
                                        {[0, 1, 2, 3].map((i) => (
                                            <div key={i} className="flex gap-1">
                                                <div className="flex-1 h-12 bg-green-500/20 border border-green-500 rounded flex items-center justify-center text-xs font-mono">
                                                    Way 0
                                                </div>
                                                <div className="flex-1 h-12 bg-green-500/20 border border-green-500 rounded flex items-center justify-center text-xs font-mono">
                                                    Way 1
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-xs text-center text-muted-foreground">
                                        دو مکانممکن در هر Set
                                    </div>
                                </div>

                                {/* Fully Associative */}
                                <div className="space-y-3">
                                    <h4 className="font-bold text-center bg-purple-500/10 p-2 rounded">Fully Associative</h4>
                                    <div className="grid grid-cols-4 gap-1">
                                        {[...Array(16)].map((_, i) => (
                                            <div key={i} className="h-8 bg-purple-500/20 border border-purple-500 rounded flex items-center justify-center text-[10px] font-mono">
                                                {i}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-xs text-center text-muted-foreground mt-2">
                                        هر بلوک در هر مکانی قابل ذخیره
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-muted/30 rounded">
                                <p className="text-xs text-muted-foreground">
                                    <strong>💡 نکته:</strong> افزایش Associativity منجر به کاهش Conflict Miss می‌شود اما پیچیدگی سخت‌افزار و مصرف انرژی را افزایش می‌دهد.
                                    اکثر پردازنده‌های مدرن از 4-Way تا 16-Way Set Associative استفاده می‌کنند.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Performance Analysis */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۵. تحلیل عملکرد</h2>

                    <h3 className="text-2xl font-bold mb-4 mt-8">۵.۱. معیارهای ارزیابی</h3>

                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Hit Rate</h4>
                                    <div className="font-mono text-lg bg-secondary/30 p-3 rounded">
                                        Hit Rate = (Number of Hits) / (Total Accesses) × 100%
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        درصد دسترسی‌هایی که داده در Cache یافت می‌شود
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-2">Miss Rate</h4>
                                    <div className="font-mono text-lg bg-secondary/30 p-3 rounded">
                                        Miss Rate = 1 - Hit Rate = (Number of Misses) / (Total Accesses) × 100%
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-lg mb-2">Average Memory Access Time (AMAT)</h4>
                                    <div className="font-mono text-lg bg-secondary/30 p-3 rounded">
                                        AMAT = Hit Time + (Miss Rate × Miss Penalty)
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        میانگین زمان دسترسی به حافظه با در نظر گرفتن Cache
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <h3 className="text-2xl font-bold mb-4 mt-8">۵.۲. تاثیر Associativity</h3>

                    <div className="overflow-x-auto mb-6 rounded-lg border">
                        <table className="w-full border-collapse bg-card">
                            <thead>
                                <tr className="bg-muted/50 border-b-2 border-border">
                                    <th className="p-4 text-right font-bold text-sm md:text-base">Associativity</th>
                                    <th className="p-4 text-right font-bold text-sm md:text-base">Miss Rate (نسبی)</th>
                                    <th className="p-4 text-right font-bold text-sm md:text-base hidden sm:table-cell">پیچیدگی سخت‌افزار</th>
                                    <th className="p-4 text-right font-bold text-sm md:text-base">زمان دسترسی</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-mono text-sm md:text-base">Direct Mapped (1-way)</td>
                                    <td className="p-4 text-sm md:text-base">بالا</td>
                                    <td className="p-4 text-green-600 text-sm md:text-base hidden sm:table-cell">کم</td>
                                    <td className="p-4 text-green-600 text-sm md:text-base">سریع</td>
                                </tr>
                                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-mono text-sm md:text-base">2-way</td>
                                    <td className="p-4 text-sm md:text-base">متوسط-بالا</td>
                                    <td className="p-4 text-sm md:text-base hidden sm:table-cell">متوسط-کم</td>
                                    <td className="p-4 text-sm md:text-base">متوسط-سریع</td>
                                </tr>
                                <tr className="bg-blue-500/20 border-b border-border">
                                    <td className="p-4 font-mono font-bold text-sm md:text-base">4-way</td>
                                    <td className="p-4 font-bold text-sm md:text-base">متوسط (بهینه)</td>
                                    <td className="p-4 font-bold text-sm md:text-base hidden sm:table-cell">متوسط (بهینه)</td>
                                    <td className="p-4 font-bold text-sm md:text-base">متوسط (بهینه)</td>
                                </tr>
                                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-mono text-sm md:text-base">8-way</td>
                                    <td className="p-4 text-sm md:text-base">متوسط-پایین</td>
                                    <td className="p-4 text-sm md:text-base hidden sm:table-cell">متوسط-بالا</td>
                                    <td className="p-4 text-sm md:text-base">متوسط-کند</td>
                                </tr>
                                <tr className="hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-mono text-sm md:text-base">Fully Associative</td>
                                    <td className="p-4 text-green-600 text-sm md:text-base">پایین</td>
                                    <td className="p-4 text-red-600 text-sm md:text-base hidden sm:table-cell">بالا</td>
                                    <td className="border p-3 text-red-600">کند</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                        <CardContent className="p-6">
                            <h4 className="font-bold text-lg mb-3">نکته کلیدی:</h4>
                            <p className="text-lg">
                                در اکثر پردازنده‌های مدرن، <span className="font-bold">4-way یا 8-way set associative</span> به عنوان تعادل بهینه بین
                                عملکرد، پیچیدگی و توان مصرفی انتخاب می‌شود. افزایش Associativity بیش از این مقادیر معمولاً بهبود قابل توجهی در
                                Hit Rate ایجاد نمی‌کند.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Interactive Simulator */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۶. شبیه‌ساز تعاملی</h2>
                    <p className="text-lg leading-relaxed text-justify mb-6">
                        از شبیه‌ساز زیر برای درک بهتر نحوه عملکرد Cache استفاده کنید. آدرس‌های مختلف را وارد کرده و تغییرات در Cache و آمار Hit/Miss را مشاهده نمایید.
                    </p>

                    <CacheSimulator numSets={4} numWays={4} blockSize={16} />

                    <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                        <CardContent className="p-6">
                            <h4 className="font-bold text-lg mb-3">راهنمای استفاده:</h4>
                            <ul className="space-y-2 list-disc list-inside">
                                <li>آدرس‌ها را به فرمت هگزادسیمال وارد کنید (مثال: 0x1A4، 0x2F8)</li>
                                <li>رنگ سبز نشان‌دهنده Cache Hit و رنگ قرمز Cache Miss است</li>
                                <li>ستون V (Valid bit) نشان می‌دهد آیا Way معتبر است یا خیر</li>
                                <li>الگوریتم جایگزینی LRU پیاده‌سازی شده است</li>
                                <li>برای تست بهتر، آدرس‌های با فاصله منظم را امتحان کنید</li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* Conclusion */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">۷. نتیجه‌گیری</h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-justify mb-4">
                            معماری N-Way Set Associative Cache یکی از مهم‌ترین نوآوری‌ها در طراحی سیستم‌های حافظه مدرن است.
                            این معماری با ایجاد تعادل بین انعطاف‌پذیری Fully Associative و سادگی Direct Mapped، امکان دستیابی
                            به عملکرد بالا با پیچیدگی سخت‌افزاری قابل قبول را فراهم می‌کند.
                        </p>
                        <p className="text-lg leading-relaxed text-justify mb-4">
                            انتخاب مقدار مناسب N (Associativity) بستگی به موارد زیر دارد:
                        </p>
                        <ul className="text-lg space-y-2 list-disc list-inside mb-4">
                            <li>الگوی دسترسی به حافظه در برنامه‌های هدف</li>
                            <li>محدودیت‌های توان مصرفی و مساحت تراشه</li>
                            <li>فرکانس کاری مورد نیاز</li>
                            <li>سطح Cache (L1، L2، L3)</li>
                        </ul>
                        <p className="text-lg leading-relaxed text-justify">
                            در پردازنده‌های امروزی، معمولاً L1 Cache از 4-way یا 8-way، و L2/L3 از 8-way یا 16-way associativity استفاده می‌کنند.
                        </p>
                    </div>
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
                                <CardTitle className="text-lg">اصطلاحات اساسی Cache</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">Cache (حافظه نهان)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> حافظه سریع و کوچک بین CPU و حافظه اصلی (RAM) که داده‌های پرکاربرد را ذخیره می‌کند.
                                            <br /><strong>هدف:</strong> کاهش زمان دسترسی CPU به داده با نگهداری کپی داده‌های اخیر در نزدیکی.
                                            <br /><strong>مثال:</strong> وقتی برنامه‌ای چندبار به یک متغیر دسترسی دارد، آن را در Cache نگه می‌دارد تا هر بار از RAM نخواند.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Hit / Miss</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>Cache Hit:</strong> داده مورد نیاز در Cache موجود است → دسترسی سریع
                                            <br /><strong>Cache Miss:</strong> داده در Cache نیست → باید از RAM یا حافظه پایین‌تر بخواند → کند
                                            <br /><strong>Hit Rate:</strong> درصد دفعاتی که داده در Cache پیدا می‌شود (بالاتر = بهتر)
                                            <br /><strong>مثال:</strong> Hit Rate 95% یعنی از هر 100 دسترسی، 95 بار در Cache موجود است.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Registers (ثبات / رجیسترها)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> سریع‌ترین و کوچک‌ترین حافظه داخل CPU که مستقیماً توسط دستورات استفاده می‌شود.
                                            <br /><strong>سرعت:</strong> دسترسی در کمتر از 1 سیکل
                                            <br /><strong>اندازه:</strong> معمولاً چند ده تا صد رجیستر با اندازه 32 یا 64 بیت
                                            <br /><strong>نمونه:</strong> EAX, EBX در x86، R0-R31 در RISC-V
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">DRAM (Dynamic Random Access Memory)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> حافظه اصلی سیستم (RAM) که برنامه‌ها و داده‌های فعال را نگه می‌دارد.
                                            <br /><strong>ویژگی:</strong> بزرگ (گیگابایت‌ها) ولی نسبتاً کند (200-300 سیکل)
                                            <br /><strong>انواع:</strong> DDR3, DDR4, DDR5
                                            <br /><strong>تفاوت با Cache:</strong> Cache سریع ولی کوچک، DRAM بزرگ ولی کند
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Storage (حافظه جانبی)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> حافظه دائمی برای ذخیره فایل‌ها (HDD, SSD).
                                            <br /><strong>ویژگی:</strong> خیلی کند (هزاران سیکل) ولی بسیار بزرگ (ترابایت‌ها) و دائمی
                                            <br /><strong>کاربرد:</strong> ذخیره سیستم‌عامل، برنامه‌ها، فایل‌های کاربر
                                            <br /><strong>نکته:</strong> برای استفاده باید ابتدا به RAM لود شود.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="text-lg">انواع Associativity</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">Direct-Mapped Cache</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> هر بلوک حافظه فقط یک مکان مشخص در Cache دارد (1-way associative).
                                            <br /><strong>مزایا:</strong> بسیار ساده و سریع، هزینه کم
                                            <br /><strong>معایب:</strong> Conflict Miss زیاد - دو آدرس مختلف ممکن است همدیگر را از Cache بیرون بزنند
                                            <br /><strong>کاربرد:</strong> Cache های بسیار کوچک یا سیستم‌های ساده
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Set-Associative Cache (N-Way)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> هر بلوک حافظه می‌تواند در N مکان مختلف درون یک Set قرار گیرد.
                                            <br /><strong>مثال:</strong> 4-way یعنی هر بلوک 4 جای ممکن دارد
                                            <br /><strong>مزایا:</strong> تعادل خوب بین سرعت و Miss Rate، انعطاف‌پذیری متوسط
                                            <br /><strong>کاربرد:</strong> رایج‌ترین نوع - L1, L2, L3 اکثر پردازنده‌ها
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Fully-Associative Cache</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> هر بلوک حافظه می‌تواند در هر مکان Cache قرار گیرد (بدون محدودیت Set).
                                            <br /><strong>مزایا:</strong> کمترین Conflict Miss، بهترین Hit Rate
                                            <br /><strong>معایب:</strong> خیلی پیچیده، گران، کند - باید همه Entry ها را مقایسه کند
                                            <br /><strong>کاربرد:</strong> فقط برای Cache های خیلی کوچک مثل TLB (Translation Lookaside Buffer)
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Way (راه)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> هر کدام از مکان‌های موازی درون یک Set که می‌توانند داده ذخیره کنند.
                                            <br /><strong>مثال:</strong> در 4-way Cache، هر Set دارای 4 Way است
                                            <br /><strong>اندازه:</strong> N در N-way associative نشان‌دهنده تعداد Way است
                                            <br /><strong>نتیجه:</strong> Way بیشتر = انعطاف بیشتر = Conflict Miss کمتر
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Set (مجموعه)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> گروهی از Way ها که یک بلوک حافظه می‌تواند در آن‌ها قرار گیرد.
                                            <br /><strong>شناسایی:</strong> Set Index از آدرس حافظه تعیین می‌کند بلوک به کدام Set می‌رود
                                            <br /><strong>مثال:</strong> Cache با 256 Set و 4-way → 256 گروه × 4 مکان = 1024 Cache Line کل
                                            <br /><strong>فرمول:</strong> Set Index = (Block Address) mod (Number of Sets)
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="text-lg">ساختار آدرس‌دهی Cache</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">Tag (برچسب)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> بخشی از آدرس که برای شناسایی یکتای بلوک داده در یک Set استفاده می‌شود.
                                            <br /><strong>کاربرد:</strong> بررسی این‌که آیا داده موجود در Cache همان داده مورد نظر است یا خیر
                                            <br /><strong>مقایسه:</strong> در مرحله Cache Lookup، Tag ذخیره شده با Tag آدرس درخواستی مقایسه می‌شود
                                            <br /><strong>نتیجه:</strong> اگر Tag ها یکسان باشند → Hit، وگرنه → Miss
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Set Index (شاخص مجموعه)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> بخشی از آدرس که مشخص می‌کند بلوک باید به کدام Set برود.
                                            <br /><strong>محاسبه:</strong> Set Index = آدرس بلوک mod تعداد Set ها
                                            <br /><strong>مثال:</strong> اگر 256 Set داشته باشیم، از 8 بیت میانی آدرس استفاده می‌شود (2^8=256)
                                            <br /><strong>نکته:</strong> همه بلوک‌هایی که Set Index یکسان دارند، رقیب هم هستند
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Block Offset (جابجایی بلوک)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> بخشی از آدرس که مشخص می‌کند بایت مورد نظر در کدام قسمت از Cache Block قرار دارد.
                                            <br /><strong>مثال:</strong> اگر هر بلوک 64 بایت باشد، 6 بیت پایینی آدرس برای Offset است (2^6=64)
                                            <br /><strong>کاربرد:</strong> بعد از پیدا کردن بلوک در Cache، با Offset بایت دقیق را پیدا می‌کنیم
                                            <br /><strong>Byte Offset:</strong> برای انتخاب بایت خاص درون یک Word
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Cache Line / Block</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> واحد کوچکترین داده‌ای که در Cache ذخیره و جابجا می‌شود.
                                            <br /><strong>اندازه معمول:</strong> 64 بایت در پردازنده‌های مدرن
                                            <br /><strong>دلیل:</strong> به جای انتقال یک بایت، یک بلوک کامل منتقل می‌شود (Spatial Locality)
                                            <br /><strong>مثال:</strong> وقتی آدرس 1000 را می‌خوانیم، بلوک 1000-1063 وارد Cache می‌شود
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Valid Bit</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> بیتی که نشان می‌دهد آیا داده موجود در یک Cache Line معتبر است یا خیر.
                                            <br /><strong>حالت‌ها:</strong> 1 = داده معتبر، 0 = داده نامعتبر یا خالی
                                            <br /><strong>کاربرد:</strong> در ابتدای سیستم همه Valid Bit ها 0 هستند (Cache خالی)
                                            <br /><strong>نتیجه:</strong> حتی اگر Tag مطابقت داشته باشد، اگر Valid Bit = 0 باشد، Miss است
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Dirty Bit</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> بیتی که نشان می‌دهد آیا داده Cache تغییر کرده و با حافظه اصلی متفاوت است.
                                            <br /><strong>حالت‌ها:</strong> 1 = داده Modified (کثیف)، باید به حافظه نوشته شود، 0 = داده Clean (تمیز)
                                            <br /><strong>کاربرد:</strong> در Write-Back Cache - فقط وقتی Dirty Bit = 1 باشد، قبل از جایگزینی به حافظه می‌نویسیم
                                            <br /><strong>فایده:</strong> کاهش نوشتن غیرضروری به حافظه اصلی
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="text-lg">الگوریتم‌های جایگزینی</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">LRU (Least Recently Used)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> جایگزین کردن بلوکی که مدت زمان طولانی‌تری از آخرین استفاده آن گذشته است.
                                            <br /><strong>منطق:</strong> بلوکی که زمان زیادی استفاده نشده، احتمالاً در آینده نزدیک هم استفاده نمی‌شود
                                            <br /><strong>پیاده‌سازی:</strong> نگهداری شمارنده یا timestamp برای هر Cache Line
                                            <br /><strong>کاربرد:</strong> رایج‌ترین الگوریتم در L1, L2 Cache های مدرن
                                            <br /><strong>مثال:</strong> اگر 4 بلوک A, B, C, D داشته باشیم و B آخرین بار 100 سیکل پیش استفاده شده، B حذف می‌شود
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">FIFO (First In, First Out)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> جایگزین کردن قدیمی‌ترین بلوک (اولین بلوکی که وارد Cache شده).
                                            <br /><strong>منطق:</strong> مثل صف - اولی که آمده، اولی که می‌رود
                                            <br /><strong>مزیت:</strong> بسیار ساده و ارزان - فقط یک شمارنده ساده لازم است
                                            <br /><strong>مشکل:</strong> ممکن است بلوک پرکاربرد را حذف کند
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Random Replacement</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> انتخاب تصادفی یکی از بلوک‌ها برای جایگزینی.
                                            <br /><strong>مزیت:</strong> بسیار ساده، بدون نیاز به نگهداری اطلاعات اضافی
                                            <br /><strong>عملکرد:</strong> جالب این‌که گاهی نزدیک به LRU عمل می‌کند
                                            <br /><strong>کاربرد:</strong> سیستم‌هایی که سادگی بیشتر از کارایی اهمیت دارد
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">LFU (Least Frequently Used)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> جایگزین کردن بلوکی که کمترین تعداد دفعات استفاده را داشته است.
                                            <br /><strong>پیاده‌سازی:</strong> نگهداری شمارنده استفاده برای هر بلوک
                                            <br /><strong>مشکل:</strong> بلوکی که در گذشته زیاد استفاده شده ولی دیگر لازم نیست، ماندگار می‌ماند
                                            <br /><strong>کاربرد:</strong> کمتر رایج، معمولاً در کاربردهای خاص
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="text-lg">سیاست‌های نوشتن (Write Policies)</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">Write-Through</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> هر نوشتن به Cache همزمان به حافظه اصلی هم نوشته می‌شود.
                                            <br /><strong>مزیت:</strong> Cache و حافظه همیشه همگام هستند - داده‌ها ایمن‌تر
                                            <br /><strong>معایب:</strong> کند - هر نوشتن نیاز به دسترسی به حافظه اصلی دارد
                                            <br /><strong>بهینه‌سازی:</strong> استفاده از Write Buffer برای کاهش تأخیر
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Write-Back</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> نوشتن فقط در Cache انجام می‌شود، بعداً (هنگام جایگزینی) به حافظه نوشته می‌شود.
                                            <br /><strong>مزیت:</strong> سریع - نوشتن‌های متوالی به همان مکان فقط یک بار به حافظه می‌روند
                                            <br /><strong>معایب:</strong> پیچیده‌تر - نیاز به Dirty Bit، خطر از دست رفتن داده در صورت خرابی
                                            <br /><strong>کاربرد:</strong> رایج در L1, L2 Cache پردازنده‌های مدرن
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Write-Allocate</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> در Write Miss، بلوک از حافظه به Cache آورده می‌شود و سپس نوشتن انجام می‌شود.
                                            <br /><strong>منطق:</strong> احتمالاً به زودی دوباره به این بلوک نیاز خواهیم داشت
                                            <br /><strong>ترکیب:</strong> معمولاً با Write-Back استفاده می‌شود
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">No-Write-Allocate (Write-Around)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> در Write Miss، بلوک به Cache نمی‌آید و مستقیماً به حافظه اصلی نوشته می‌شود.
                                            <br /><strong>مزیت:</strong> Cache Pollution کمتر برای داده‌هایی که فقط یک بار نوشته می‌شوند
                                            <br /><strong>ترکیب:</strong> معمولاً با Write-Through استفاده می‌شود
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="text-lg">انواع Cache Miss</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">Compulsory Miss (Cold Miss)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> اولین بار که به یک بلوک دسترسی می‌شود، حتماً Miss است (چون هنوز در Cache نیست).
                                            <br /><strong>دلیل:</strong> Cache در ابتدا خالی است
                                            <br /><strong>راه‌حل:</strong> اجتناب‌ناپذیر - فقط با Prefetching قابل کاهش
                                            <br /><strong>مثال:</strong> اولین بار که برنامه اجرا می‌شود، همه دسترسی‌ها Miss هستند
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Capacity Miss</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> بلوک قبلاً در Cache بوده ولی به دلیل پر بودن Cache از آن خارج شده است.
                                            <br /><strong>دلیل:</strong> Working Set برنامه بزرگ‌تر از اندازه Cache است
                                            <br /><strong>راه‌حل:</strong> افزایش اندازه Cache یا بهینه‌سازی برنامه برای استفاده بهتر از Cache
                                            <br /><strong>مثال:</strong> کار با آرایه 10 مگابایتی در Cache 256 کیلوبایتی
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Conflict Miss</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> چند بلوک مختلف به یک Set نگاشت می‌شوند و همدیگر را بیرون می‌زنند (با وجود فضای خالی در Cache).
                                            <br /><strong>دلیل:</strong> محدودیت Associativity - بلوک‌ها نمی‌توانند در Set دلخواه قرار گیرند
                                            <br /><strong>راه‌حل:</strong> افزایش Associativity (مثلاً از 4-way به 8-way) یا تغییر الگوی دسترسی
                                            <br /><strong>مثال:</strong> در Direct-Mapped، دو آدرس با Set Index یکسان همیشه رقیب هستند
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Coherence Miss</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> در سیستم‌های چندهسته‌ای، بلوک به دلیل تغییر توسط هسته دیگر Invalid شده است.
                                            <br /><strong>دلیل:</strong> پروتکل Coherency (مثل MESI) برای حفظ سازگاری بین Cache ها
                                            <br /><strong>کاربرد:</strong> فقط در سیستم‌های multicore با Shared Memory
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="text-lg">مفاهیم اصلی Locality</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">Temporal Locality (محلی‌سازی زمانی)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> اگر به یک داده دسترسی پیدا کردیم، احتمالاً در آینده نزدیک دوباره به آن نیاز داریم.
                                            <br /><strong>مثال:</strong> متغیرهای حلقه (loop counter)، توابع پرکاربرد
                                            <br /><strong>استفاده در Cache:</strong> داده‌های اخیراً استفاده شده در Cache نگه داشته می‌شوند
                                            <br /><strong>نمونه کد:</strong> <code>for (i=0; i&lt;1000; i++)</code> - متغیر i هزاران بار استفاده می‌شود
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Spatial Locality (محلی‌سازی مکانی)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> اگر به یک آدرس دسترسی پیدا کردیم، احتمالاً به آدرس‌های نزدیک آن هم نیاز داریم.
                                            <br /><strong>مثال:</strong> آرایه‌ها، دستورات متوالی برنامه
                                            <br /><strong>استفاده در Cache:</strong> به جای یک بایت، یک Cache Line کامل (64 بایت) منتقل می‌شود
                                            <br /><strong>نمونه کد:</strong> <code>arr[0], arr[1], arr[2], ...</code> - دسترسی متوالی به عناصر آرایه
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="text-lg">واحدهای زمانی</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-1">Cycle (سیکل ساعت)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> کوچک‌ترین واحد زمانی در پردازنده - یک تیک ساعت CPU.
                                            <br /><strong>مدت زمان:</strong> وابسته به فرکانس پردازنده - مثلاً در 3 GHz، هر سیکل ≈ 0.33 نانوثانیه
                                            <br /><strong>کاربرد:</strong> اندازه‌گیری سرعت دسترسی به Cache و حافظه
                                            <br /><strong>مثال:</strong> L1 Cache: 4 سیکل یعنی 4 تیک ساعت CPU طول می‌کشد
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-1">Latency (تأخیر / زمان انتظار)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            <strong>تعریف:</strong> زمانی که از درخواست داده تا دریافت آن می‌گذرد.
                                            <br /><strong>واحد:</strong> معمولاً بر حسب سیکل یا نانوثانیه
                                            <br /><strong>مقایسه:</strong> L1: 4-5 سیکل، L2: 12-15 سیکل، L3: 40-50 سیکل، DRAM: 200-300 سیکل
                                            <br /><strong>اهمیت:</strong> کاهش Latency یکی از اهداف اصلی طراحی Cache است
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* References */}
                <section className="mb-12 pb-8 border-t pt-8">
                    <h2 className="text-2xl font-bold mb-6">منابع و مراجع</h2>
                    <div className="space-y-2 text-sm">
                        <p>1. Hennessy, J. L., & Patterson, D. A. (2017). Computer Architecture: A Quantitative Approach (6th ed.). Morgan Kaufmann.</p>
                        <p>2. Patterson, D. A., & Hennessy, J. L. (2020). Computer Organization and Design RISC-V Edition (2nd ed.). Morgan Kaufmann.</p>
                        <p>3. Intel Corporation. (2023). Intel® 64 and IA-32 Architectures Optimization Reference Manual.</p>
                        <p>4. AMD. (2022). Software Optimization Guide for AMD Family 19h Processors.</p>
                    </div>
                </section>
            </div>
        </article>
    );
}
