import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Kittens', href: 'kittens' },
  { name: 'Cats', href: 'cats' },
  { name: 'Puppies', href: 'puppies' },
  { name: 'Dogs', href: 'dogs' },
  { name: 'About Us', href: 'about' },
  // { name: 'Wish List', href: 'wish-list' },
  // { name: 'Support Us', href: 'support' },
  { name: 'Contact Us', href: 'contact' },
];

export const Nav = ({ className }: { className?: string }) => {
  return (
    <nav className={className}>
      <ul className="flex items-center gap-4 lg:text-lg font-bold whitespace-nowrap">
        {navigation.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'py-1 px-2 rounded-md',
                  isActive
                    ? 'text-white bg-brown-900'
                    : 'hover:bg-brown-300 hover:text-white',
                )
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
