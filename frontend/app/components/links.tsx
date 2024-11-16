export interface LinkProps {
  children: React.ReactNode;
  href: string;
}

export function ExternalLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className="hover:opacity-80 transition-opacity duration-300"
    >
      {children}
    </a>
  );
}
