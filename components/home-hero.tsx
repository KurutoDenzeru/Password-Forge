interface HomeHeroProps {
  title: string;
  eyebrow: string;
  description: string;
}

export function HomeHero({ title, eyebrow, description }: HomeHeroProps) {
  return (
    <section className="max-w-2xl space-y-4 text-center">
      <h1 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
        {title} <span className="text-primary italic">{eyebrow}</span>
      </h1>
      <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
        {description}
      </p>
    </section>
  );
}