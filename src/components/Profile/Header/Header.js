import React from "react";
import './Header.scss';

const ProfileHeader = ({avatarURL, borderURL, starsURL, battleTag, highestRank}) => {

    const avatarBorderStyle = {
        backgroundImage: `url("${starsURL}"), url("${borderURL}")`
    };

    const avatarStyle = {
        backgroundImage: `url("${avatarURL}")`
    };

    return (
        <div className='profile-header'>
            <div className='profile-header__avatar-wrapper'>
                <div
                    className='avatar-wrapper__border'
                    style={avatarBorderStyle}
                />
                <div
                    className='avatar-wrapper__avatar'
                    style={avatarStyle}
                />
            </div>
            <p className='profile-header__battle-tag'>{battleTag}</p>
            <div className='profile-header__rank-wrapper'>
                {highestRank &&
                    <>
                        <img
                            src={highestRank.rankIcon}
                            className='rank-wrapper__highest-rank-icon'
                            alt='highest rank'/>
                        <span className='rank-wrapper__highest-rank'>{highestRank.level}</span>
                    </>
                }
            </div>
        </div>
    )
};

export default ProfileHeader;