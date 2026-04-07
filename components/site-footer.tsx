import { Github, Linkedin, Instagram } from "lucide-react";

const socialLinks = [
  {
    href: "https://instagram.com/krtclcdy",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://linkedin.com/in/kurtcalacday",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://github.com/KurutoDenzeru/Password-Forge",
    label: "GitHub",
    icon: Github,
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="z-10 mt-auto w-full border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 p-6 sm:flex-row">
        <span className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Password Forge by KurutoDenzeru. All rights reserved.
        </span>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}