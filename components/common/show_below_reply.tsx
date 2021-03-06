// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Tooltip} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

import {localizeMessage} from 'utils/utils.jsx';

import OverlayTrigger from 'components/overlay_trigger';
import ReplyIcon from 'components/widgets/icons/reply_icon';
import RecentDate from 'components/recent_date'
import LocalDateTime from 'components/local_date_time';

type Props = {
    location: 'CENTER' | 'SEARCH';
    handleCommentClick: React.EventHandler<React.MouseEvent>;
    searchStyle: string;
    commentCount: number;
    postId?: string;
    extraClass: string;
    lastReplyCreatedAt: number;
}

export default class ShowBelowReply extends React.PureComponent<Props> {
    public static defaultProps: Partial<Props> = {
        location: 'CENTER',
        searchStyle: '',
        commentCount: 0,
        extraClass: '',
    }

    public render(): JSX.Element {
        let commentCountSpan: JSX.Element | null = null;
        let iconStyle = 'post-menu__item post-menu__item--wide post-menu__item--comment';
        let reply = 'reply';
        if (this.props.commentCount > 1) {
            reply = 'replies';
        }
        const dateString = (
            <RecentDate
                value={this.props.lastReplyCreatedAt}
                weekday='short'
                month='short'
                day='2-digit'
                year='numeric'
            />
        );
        const localDateTime = (
            <LocalDateTime
                eventTime={this.props.lastReplyCreatedAt}
            />
        );

        if (this.props.commentCount > 0) {
            iconStyle += ' post-menu__item--show';
            commentCountSpan = (
                <span
                    className='post-menu__comment-count'
                    style={{color: '#2389d7'}}
                >
                    {`${this.props.commentCount} ${reply}`}
                </span>
            );
        } else if (this.props.searchStyle !== '') {
            iconStyle = iconStyle + ' ' + this.props.searchStyle;
        }

        const tooltip = (
            <Tooltip
                id='comment-icon-tooltip'
                className='hidden-xs'
            >
                <FormattedMessage
                    id='post_info.comment_icon.tooltip.reply'
                    defaultMessage='Reply'
                />
            </Tooltip>
        );

        return (
            <OverlayTrigger
                delayShow={500}
                placement='top'
                overlay={tooltip}
            >
                <button
                    id={`${this.props.location}_commentIcon_${this.props.postId}`}
                    aria-label={localizeMessage('post_info.comment_icon.tooltip.reply', 'Reply').toLowerCase()}
                    className={iconStyle + ' ' + this.props.extraClass}
                    onClick={this.props.handleCommentClick}
                >
                    <span className='align-items-center post-menu__comment-show-below-last-reply-at' >
                        <ReplyIcon className='icon icon--small'/>
                        {commentCountSpan}
                        <span className='post-menu__comment-show-below-last-reply-at-text'>{'Last reply at:'}</span>
                        <span className='post-menu__comment-show-below-last-reply-date'>{dateString}</span>
                        <span className='post-menu__comment-show-below-last-reply-time'>{localDateTime}</span>
                    </span>
                </button>
            </OverlayTrigger>
        );
    }
}

