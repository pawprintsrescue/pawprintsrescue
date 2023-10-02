import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export const Nav = ({ className }: { className?: string }) => {
  return (
    <nav className={className}>
      <ul className="flex flex-wrap items-center gap-4 lg:text-lg font-bold whitespace-nowrap">
        <li>
          <NavLink
            to="kittens"
            className={({ isActive }) =>
              clsx(
                'py-1 px-2 rounded-md',
                isActive
                  ? 'text-white bg-[#87450B]'
                  : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white',
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
                  : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white',
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
                  : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white',
              )
            }
          >
            Puppies
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
                  : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white',
              )
            }
          >
            Dogs
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
                  : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white',
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
                  : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white',
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
                  : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white',
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
                  : 'hover:bg-[#87450B] hover:bg-opacity-50 hover:text-white',
              )
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
