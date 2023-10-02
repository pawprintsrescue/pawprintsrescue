import clsx from 'clsx';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Nav } from './nav';

export const Header = ({
  className,
  scrolled,
}: {
  className?: string;
  scrolled?: boolean;
}) => {
  return (
    <header
      className={clsx(
        'p-4 flex flex-wrap gap-8 justify-between bg-white border-b border-[#87450B]',
        className,
      )}
    >
      <Link
        to="/"
        className={clsx('block transition-all', scrolled ? 'h-12' : 'h-32')}
      >
        <img src={logo} alt="Paw Prints Animal Rescue" className="h-full" />
      </Link>

      <Nav className="mt-2.5" />
    </header>
  );
};
