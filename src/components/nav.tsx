import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import MobileDetect from 'mobile-detect';
import { Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavigationItem {
  name: string;
  href?: string;
  children?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Animals',
    children: [
      { name: 'Kittens', href: '/kittens' },
      { name: 'Cats', href: '/cats' },
      { name: 'Dogs & Puppies', href: '/dogs' },
      { name: 'Feral Cats', href: '/feral' },
    ],
  },
  { name: 'About Us', href: '/about' },
  { name: 'Wish List', href: '/wish-list' },
  { name: 'Support Us', href: '/support' },
  { name: 'Contact Us', href: '/contact' },
];

export const Nav = ({
  className,
  onItemClick,
}: {
  className?: string;
  onItemClick?: () => void;
}) => {
  const { pathname } = useLocation();
  const deviceType = new MobileDetect(window.navigator.userAgent);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const isActive = (item: NavigationItem): boolean => {
    if (item.href === 'kittens') console.log({ item, pathname });
    return item.href
      ? item.href === pathname
      : item.children?.some(isActive) ?? false;
  };

  const handleSearchClick = () => {
    const mac = deviceType.os() === 'MacOS';
    const e = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: !mac,
      metaKey: mac,
    });
    document.dispatchEvent(e);
  };

  return (
    <nav className={className}>
      <ul className="flex gap-4 whitespace-nowrap font-bold">
        {navigation.map((item) => (
          <li key={item.name}>
            {item.href ? (
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  clsx(
                    'block rounded-md px-2 py-1',
                    isActive
                      ? 'bg-brown-900 text-white'
                      : 'hover:bg-brown-300 hover:text-white',
                  )
                }
                onClick={onItemClick}
              >
                {item.name}
              </NavLink>
            ) : (
              <Popover className="relative">
                <Popover.Button
                  className={clsx(
                    'flex items-center rounded-md px-2 py-1',
                    isActive(item)
                      ? 'bg-brown-900 text-white'
                      : 'hover:bg-brown-300 hover:text-white',
                  )}
                >
                  <span>Animals</span>
                  <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute left-1/2 z-30 mt-3 flex w-screen max-w-max -translate-x-1/2 px-4">
                    <div className="max-w-lg flex-auto overflow-hidden rounded-xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                      <div className="flex gap-8 px-4 py-2">
                        {item.children?.map((item) => (
                          <Popover.Button
                            as={NavLink}
                            key={item.name}
                            to={item.href!}
                            className={clsx(
                              'block border-b-2 px-2 py-0.5',
                              isActive(item)
                                ? 'border-brown-900'
                                : 'border-transparent hover:border-brown-300',
                            )}
                            onClick={onItemClick}
                          >
                            {item.name}
                          </Popover.Button>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            )}
          </li>
        ))}
        <li>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md"
            onClick={handleSearchClick}
          >
            <span className="sr-only">Search animals</span>
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
