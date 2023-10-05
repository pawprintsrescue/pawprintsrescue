import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Nav } from './nav';
import { NavMobile } from './nav.mobile';

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
        'flex justify-between gap-8 overflow-y-visible border-b border-brown-900 bg-white',
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

      <div className="mt-2.5 flex h-7 lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <Nav className="mt-2.5 hidden lg:block" />

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-40" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-white pb-4 pt-safe-offset-4 px-safe-offset-4 sm:max-w-sm sm:ring-1 sm:ring-brown-900/10 md:px-safe-offset-6 lg:px-safe-offset-8 2xl:px-safe-offset-10">
          <div className="flex items-start justify-between">
            <Link
              to="/"
              className="h-12"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Paw Prints Animal Rescue</span>
              <img src={logo} alt="" className="h-auto max-h-full" />
            </Link>
            <button
              type="button"
              className="-mx-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <NavMobile onItemClick={() => setMobileMenuOpen(false)} />
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
