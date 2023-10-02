import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { MobileNav } from './mobile-nav';
import { Nav } from './nav';

export const Header = ({
  className,
  scrolled,
}: {
  className?: string;
  scrolled?: boolean;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={clsx(
        'p-4 flex gap-8 justify-between bg-white border-b border-brown-900',
        className,
      )}
    >
      <Link
        to="/"
        className={clsx('block transition-all', scrolled ? 'h-12' : 'h-32')}
      >
        <span className="sr-only">Paw Prints Animal Rescue</span>
        <img src={logo} alt="" className="h-auto max-h-full" />
      </Link>

      <div className="flex md:hidden h-7 mt-2.5">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <Nav className="hidden md:block mt-2.5" />

      <Dialog
        as="div"
        className="md:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-30" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-30 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-brown-900/10">
          <div className="flex items-start justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Paw Prints Animal Rescue</span>
              <img src={logo} alt="" className="h-12" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <MobileNav onItemClick={() => setMobileMenuOpen(false)} />
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
