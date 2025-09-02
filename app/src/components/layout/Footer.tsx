import React from 'react';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/sebasnolascop' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/sebasnolascop' },
    { name: 'Email', url: 'mailto:sebasnolascop@gmail.com' },
  ];

  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row max-w-screen-lg px-4">
        <p className="text-center text-sm leading-loose text-gray-600 dark:text-gray-400 md:text-left">
          Designed & Built by{' '}
          <a
            href="https://github.com/sebasnolascop"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Sebas
          </a>
          .
        </p>
        <div className="flex items-center gap-4 sm:gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group text-sm font-medium text-gray-600 dark:text-gray-400 transition"
            >
              <span className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                {link.name}
              </span>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-gray-600 dark:bg-gray-400 group-hover:bg-gray-900 dark:group-hover:bg-gray-100"></span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
