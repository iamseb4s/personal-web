import React from 'react';
import Container from '@/components/ui/Container';

const Footer = () => {
  const socialLinks = [
    { name: 'GITHUB', url: 'https://github.com/sebasnolascop' },
    { name: 'LINKEDIN', url: 'https://linkedin.com/in/sebasnolascop' },
    { name: 'EMAIL', url: 'mailto:sebas@iamsebas.xyz' },
  ];

  return (
    <footer className="w-full bg-secondary mb-6 md:mb-0">
      <Container
        paddingX="px-8 md:px-8 lg:px-8"
        maxWidth="max-w-screen-sm sm:max-w-none"
        className="flex flex-col-reverse items-center justify-center gap-1 py-3 md:h-27 md:flex-row md:justify-between md:py-0"
      >
        <p className="text-center font-mono text-sm sm:text-md  md:text-lg leading-loose text-secondary-foreground md:text-left">
          Built by{' '}
          <a
            href="/"
            className="relative group font-bold"
          >
            Sebas
            <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-secondary-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
          </a>
          .
        </p>
        <div className="flex items-center">
          {socialLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group text-base md:text:xl sm:text-lg font-mono text-secondary-foreground transition"
              >
                <span className="hover:secondary-foreground">
                  {link.name}
                </span>
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-secondary-foreground group-hover:bg-secondary-foreground"></span>
              </a>
              {index < socialLinks.length - 1 && (
                <span aria-hidden="true" className="mx-5 sm:mx-5 text-secondary-foreground">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
