import React, {useState} from 'react';
import './Element.scss';
import Button from "../../UI/Button/Button";

const Element = ({avatarURL, nickName, date, isLocked, onLock, onUnlock, onCopy, onDelete}) => {

    const [isButtonPanelOpen, setIsButtonPanelOpen] = useState(false);

    return (
        <div className='history__element'>
            <img
                className='element__avatar'
                src={avatarURL}
                alt='avatar'
            />
            <div className='element__text-wrapper'>
                <p className='element__nick-name'>{nickName}</p>
                <p className='element__date'>{date}</p>
            </div>
            {isButtonPanelOpen &&
                <div className='element__button-panel'>
                    <Button
                        className='button-panel__button'
                        imageURL={isLocked ? 'https://tinyurl.com/y72wofb5' : 'https://tinyurl.com/ya7332ep'}
                        onClick={() => isLocked ? onUnlock() : onLock()}
                    />
                    <Button
                        className='button-panel__button'
                        imageURL='https://tinyurl.com/yd4y5ynh'
                        onClick={onCopy}
                    />
                    <Button
                        className='button-panel__button'
                        imageURL='https://tinyurl.com/y83lgpnw'
                        onClick={onDelete}
                    />
                </div>
            }
            <Button
                className='element__switch-display-button-panel'
                imageURL={isButtonPanelOpen ? 'https://tinyurl.com/y6v8uyz2' : 'https://tinyurl.com/ybbq4wvd'}
                onClick={() => setIsButtonPanelOpen(!isButtonPanelOpen)}
            />
        </div>
    )
};

export default Element;