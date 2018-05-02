import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
    render() {
        const { i18n } = this.props;
        return (
            <ul className="nav nav-tabs">
                <li className="nav-item dropdown">
                    <button
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {i18n.langName}
                    </button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item" id="pt" onClick={this.props.changeLangFn}>
                            Português
                        </button>
                        <button className="dropdown-item" id="en" onClick={this.props.changeLangFn}>
                            English
                        </button>
                    </div>
                </li>

                <li className="nav-item dropdown">
                    <button
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {i18n.labels.moreInfo}
                    </button>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a
                            className="dropdown-item"
                            href={i18n.urls.license}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {i18n.labels.license}
                        </a>
                        <a
                            className="dropdown-item"
                            href={i18n.urls.reportIssue}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {i18n.labels.reportIssue}
                        </a>
                        <a
                            className="dropdown-item"
                            href={i18n.urls.about}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {i18n.labels.about}
                        </a>
                    </div>
                </li>
            </ul>
        );
    }
}

Menu.propTypes = {
    i18n: PropTypes.object.isRequired,
    changeLangFn: PropTypes.func.isRequired,
};

export default Menu;
