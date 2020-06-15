// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import {Modal, Button} from 'react-bootstrap';

import ioslogo from '../../images/download_ios.png';
import androidlogo from '../../images/download_android.png';
import windowslogo from '../../images/download_windows.png';
import macoslogo from '../../images/download_macos.png';

import androidApp from '../../assets/Flipchat.apk';
import windowsApp from '../../assets/FlipChat-Windows.exe';
import macosApp from '../../assets/FlipChat.zip';

export default class DownloadAppsModal extends React.PureComponent {
    static defaultProps = {
        show: false,
    };

    static propTypes = {

        /**
         * Function that is called when the modal is dismissed
         */
        onHide: PropTypes.func.isRequired,

        /**
         * Global config object
         */
        config: PropTypes.object.isRequired,

        /**
         * Global license object
         */
        license: PropTypes.object.isRequired,

        /**
         * Webapp build hash override. By default, webpack sets this (so it must be overridden in tests).
         */
        webappBuildHash: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            show: true,
        };
    }

    doHide = () => {
        this.setState({show: false});
    }

    handleExit = () => {
        this.props.onHide();
    }

    render() {
        return (
            <Modal
                dialogClassName='a11y__modal about-modal'
                show={this.state.show}
                onHide={this.doHide}
                onExited={this.handleExit}
                role='dialog'
                aria-labelledby='aboutModalLabel'
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title
                        componentClass='h1'
                        id='aboutModalLabel'
                    >{'Download Apps'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='grid-container'>
                        <div className='grid-item'>
                            <img src={androidlogo} className='modal-img-custom'/>
                            <h3>{'Android'}</h3>
                            <p className='about-modal__subtitle pb-2'>{'Supported on Android 7.0+'}</p>
                            <Button href={androidApp} variant="link" download>{'Download'}</Button>{' '}
                        </div>
                        <div className='grid-item'>
                            <img src={ioslogo} className='modal-img-custom'/>
                            <h3>{'iOS'}</h3>
                            <p className='about-modal__subtitle pb-2'>{'Supported on iOS 11+'}</p>
                            <Button href="https://apps.apple.com/us/app/mattermost/id1257222717" variant="link">{'Download from AppStore'}</Button>{' '}
                        </div>
                        <div className='grid-item'>
                            <img src={macoslogo} className='modal-img-custom'/>
                            <h3>{'macOS'}</h3>
                            <p className='about-modal__subtitle pb-2'>{'Supported on 10.12+'}</p>
                            <Button href={macosApp} variant="link">{'Download'}</Button>{' '}
                        </div>
                        <div className='grid-item'>
                            <img src={windowslogo} className='modal-img-custom'/>
                            <h3>{'Windows'}</h3>
                            <p className='about-modal__subtitle pb-2'>{'Supported on Windows 7+'}</p>
                            <Button href={windowsApp} variant="link" download>{'Download'}</Button>{' '}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
