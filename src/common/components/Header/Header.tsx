import styled from 'styled-components';
import {
  LogoLink,
  SearchInput,
  SquareLink,
  ProfileLink,
} from '@/common/components';

export interface HeaderProps {
  isLogin: boolean;
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  background-color: var(--white);
  padding: 12px 16px;
  gap: 12px;
  box-shadow: var(--shadow-Header);
  > a:first-child {
    margin-right: auto;
  }
`;

const Header = ({ isLogin, ...props }: HeaderProps) => {
  const isMain: boolean = window.location.pathname === '/';

  return (
    <StyledHeader style={{ height: 64, width: '100%' }} {...props}>
      <LogoLink height="40px" width="74px" />
      {!isMain && <SearchInput size="small" />}
      <SquareLink link="/" width={178}>
        My Collectionss
      </SquareLink>
      {isLogin ? (
        <ProfileLink userid="ulgoon" />
      ) : (
        <SquareLink
          backgroundColor="var(--white)"
          color="var(--purple-900)"
          link="/"
          transition
          width={97}
        >
          Sign In
        </SquareLink>
      )}
    </StyledHeader>
  );
};

export default Header;
