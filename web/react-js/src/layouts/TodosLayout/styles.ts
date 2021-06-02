import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  max-width: 600px;

  display: flex;
  flex-direction: column;
  align-items: center;

  > header {
    margin: 2rem;

    font-family: 'Raleway', sans-serif;
  }
`;

export const Navbar = styled.nav`
  width: 100%;
  height: 4rem;

  margin: 2rem 0;
  padding: 0 4rem;

  display: flex;
  justify-content: space-between;

  border-bottom: solid 1px #bdbdbd;

  > a {
    height: 100%;
    min-width: 12rem;

    padding: 1rem 2rem;

    font-weight: 500;
    color: inherit;
    text-align: center;
    text-decoration: none;

    &[data-selected='true'] {
      position: relative;
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;

        left: 0;
        bottom: 0;

        width: 100%;
        height: 2px;

        border-radius: 4px 4px 0 0;
        background-color: #2f80ed;
      }
    }
  }
`;
