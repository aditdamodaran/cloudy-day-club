import React from 'react';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';

const NavIcon = styled.div`
  display: flex;
  align-items: center;

  /* INACTIVE */
  .nav-icon { 
    border-right: 3px solid rgb(0,0,0,0);
    width: 100%;
    padding-bottom: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
    text-decoration: none;
    &:hover {
      opacity: 0.4;
    }
    img, p {
      opacity: 0.8;
    }
  }

  /* ACTIVE */
  .nav-icon.active {
    border-right: 3px solid #1BB954;
    cursor: unset;
    &:hover {
      opacity: unset;
    }
    img, p {
      opacity: 0.5;
    }
  }
`

const NavLinkStyled = styled(Link)`
`

const NavLinkIcon = styled.img`
  width: 40%;
  filter: invert(1);
  padding: 0.5rem 0rem;
`

const NavLinkText = styled.p`
  color: white;
  flex-basis: 100%;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  font-size: 0.7rem; 
  font-weight: 600;
  text-decoration: none;
  margin: 0 auto;
`

export default ({ className, ...props }) => (
  <NavIcon>
    <NavLinkStyled
      className={className}
      getProps={({ isCurrent }) =>
        isCurrent ? { className: `${className} active` } : null
      }
      {...props}
    >
      <NavLinkIcon src={props.img} alt={props.text} />
      <NavLinkText>{props.text}</NavLinkText>
    </NavLinkStyled>
  </NavIcon>
);
