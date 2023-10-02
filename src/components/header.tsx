import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

export const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={clsx(
        'p-4 flex flex-wrap gap-8 justify-between bg-white border-b border-[#87450B]',
        className
      )}
    >
      <Link to="/" className="block h-full">
        <img src={logo} alt="Paw Prints Animal Rescue" className="h-full" />
      </Link>
      <nav className="pt-2.5">
        <ul className="flex flex-wrap items-center gap-4 lg:text-lg font-bold whitespace-nowrap">
          <li>
            <NavLink
              to="kittens"
              className={({ isActive }) =>
                clsx(
                  'py-1 px-2 rounded-md',
                  isActive
                    ? 'text-white bg-[#87450B]'
                    : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white'
                )
              }
            >
              Kittens
            </NavLink>
          </li>
          <li>
            <NavLink
              to="cats"
              className={({ isActive }) =>
                clsx(
                  'py-1 px-2 rounded-md',
                  isActive
                    ? 'text-white bg-[#87450B]'
                    : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white'
                )
              }
            >
              Cats
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                clsx(
                  'py-1 px-2 rounded-md',
                  isActive
                    ? 'text-white bg-[#87450B]'
                    : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white'
                )
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                clsx(
                  'py-1 px-2 rounded-md',
                  isActive
                    ? 'text-white bg-[#87450B]'
                    : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white'
                )
              }
            >
              Wish List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                clsx(
                  'py-1 px-2 rounded-md',
                  isActive
                    ? 'text-white bg-[#87450B]'
                    : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white'
                )
              }
            >
              Support Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                clsx(
                  'py-1 px-2 rounded-md',
                  isActive
                    ? 'text-white bg-[#87450B]'
                    : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white'
                )
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
