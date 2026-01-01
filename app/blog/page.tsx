import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const articles = [
    {
        id: "n-way-associative-cache",
        title: "حافظه نهان N-Way Associative",
        titleEn: "N-Way Associative Cache",
        description: "تحلیل جامع ساختار، عملکرد و پیاده‌سازی حافظه نهان N-Way Associative",
        topics: ["Cache Mapping", "Set Associative", "Replacement Policies", "Performance Analysis"],
        date: "1404/10/11",
    },
    {
        id: "core-i9-architecture",
        title: "معماری پردازنده Intel Core i9",
        titleEn: "Intel Core i9 Architecture",
        description: "بررسی معماری، قابلیت‌ها و بهینه‌سازی‌های پردازنده Core i9",
        topics: ["Microarchitecture", "Branch Prediction", "Pipeline", "Cache Hierarchy"],
        date: "1404/10/11",
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background p-8" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">مقالات معماری کامپیوتر</h1>
                    <p className="text-lg text-muted-foreground">
                        مجموعه مقالات تخصصی و آکادمیک در زمینه معماری کامپیوتر
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map((article) => (
                        <Link key={article.id} href={`/blog/${article.id}`}>
                            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <CardTitle className="text-2xl">{article.title}</CardTitle>
                                        <span className="text-sm text-muted-foreground">{article.date}</span>
                                    </div>
                                    <CardDescription className="text-base">
                                        {article.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {article.topics.map((topic) => (
                                            <span
                                                key={topic}
                                                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
