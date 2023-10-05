import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
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

export const NavMobile = ({
  className,
  onItemClick,
}: {
  className?: string;
  onItemClick?: () => void;
}) => {
  const { pathname } = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const isActive = (item: NavigationItem): boolean => {
    if (item.href === 'kittens') console.log({ item, pathname });
    return item.href
      ? item.href === pathname
      : item.children?.some(isActive) ?? false;
  };

  return (
    <nav className={className}>
      <ul className="flex flex-col gap-4 font-bold whitespace-nowrap">
        {navigation.map((item) => (
          <li key={item.name}>
            {item.href ? (
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  clsx(
                    'py-1 px-2 rounded-md block',
                    isActive
                      ? 'text-white bg-brown-900'
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
                    'py-1 px-2 rounded-md flex items-center justify-between w-full',
                    isActive(item)
                      ? 'text-white bg-brown-900'
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
                  <Popover.Panel className="absolute z-50 mt-3 flex max-w-sm w-full">
                    <div className="max-w-lg flex-auto overflow-hidden rounded-xl text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 bg-white">
                      <div className="px-4 py-2 flex flex-col gap-4">
                        {item.children?.map((item) => (
                          <Popover.Button
                            as={NavLink}
                            key={item.name}
                            to={item.href!}
                            className={clsx(
                              'py-0.5 px-2 block rounded-md',
                              isActive(item)
                                ? 'text-white bg-brown-900'
                                : 'hover:bg-brown-300 hover:text-white',
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
      </ul>
    </nav>
  );
};
