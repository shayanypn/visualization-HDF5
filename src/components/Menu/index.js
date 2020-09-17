import React from 'react';

const Menu = () => {
  return (
    <aside>
      <img className="logo" src="https://getbootstrap.com/docs/4.5/assets/brand/bootstrap-solid.svg" alt="sample logo" />
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <a href="/">
            <i className="fas fa-tachometer-alt"></i>
          </a>
        </li>
        <li className="list-group-item">
          <a href="/">
            <i className="fas fa-signal"></i>
          </a>
        </li>
        <li className="list-group-item">
          <a href="/">
            <i className="fas fa-network-wired"></i>
          </a>
        </li>
        <li className="list-group-item">
          <a href="/">
            <i className="fas fa-cog"></i>
          </a>
        </li>
        <li className="list-group-item">
          <a href="/">
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Menu;
