import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  > button {
    margin-left: auto;
  }
`;

export const Checklist = styled.ul`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;

  margin: 2rem 0;
  padding: 0 0.4rem;
  list-style: none;

  > li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0.4rem 0;

    & + li {
      margin-top: 1rem;
    }

    > div {
      display: flex;

      > input[type='checkbox'] {
        width: 2rem;
        height: 2rem;

        border-radius: 0.4rem;
      }

      > span {
        font-weight: 600;
        margin-left: 1rem;

        &.scratched {
          text-decoration: line-through;
        }
      }
    }

    > button {
      border: 0;
      background-color: transparent;
    }
  }
`;
