import { setRequestLocale } from "next-intl/server";
import { Hero } from '../components/hero/Hero';
import { AboutUs } from '../components/about/AboutUs';
import { Cosmetology } from '../components/cosmetology/Cosmetology';
import { Technologies } from '../components/technologies/Technologies';

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main className="flex flex-1 flex-col bg-background text-foreground">
            <div className="w-full mx-auto">
                <Hero />
                <AboutUs />
                <Technologies />
                <Cosmetology />
            </div>
        </main>);
}
