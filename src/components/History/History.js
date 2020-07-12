import React, {useState, useEffect} from 'react';
import './History.scss';
import Element from "./Element/Element";


const units = [
    {value: ' ms', number: 1000},
    {value: ' seconds', number: 60},
    {value: ' minutes', number: 60},
    {value: ' hrs', number: 24},
    {value: ' days', number: 365},
    {value: ' years'}
];


function howLongAgo(timestamp) {
    let difference = Date.now() - new Date(timestamp).getTime();
    let result = null;

    for (let unit of units) {
        if (difference < unit.number) {
            result = Math.round(difference) + unit.value + ' ago';
            break;
        } else difference /= unit.number;
    }

    return result;
}


const History = () => {

    const [storage, updateStorage] = useState(JSON.parse(localStorage.getItem('storage')) || []);

    useEffect(() => {
        localStorage.setItem('storage', JSON.stringify(storage));
    }, [storage]);

    function onLock(timestamp) {
        const storageCopy = [].concat(storage);
        const elementForLock = storageCopy.find(element => element.timestamp === timestamp);

        if (storageCopy.reduce((accumulator, currentValue) => accumulator + (currentValue.isLocked ? 1 : 0), 0) === 3) {
            for (let i = storageCopy.length - 1; i > 0; i--) { //if the history storage has 3 locked elements(max 3 locked), then unlock the oldest of them
                if (storageCopy[i].isLocked) {
                    storageCopy[i].isLocked = false;
                    break;
                }
            }
        }

        storageCopy.map(element => {
            if (element === elementForLock) {
                element.isLocked = true;
            }
            return element;
        });

        updateStorage(storageCopy);
    }

    function onUnlock(timestamp) {
        const storageCopy = [].concat(storage);
        const elementForUnlock = storageCopy.find(element => element.timestamp === timestamp);

        storageCopy.map(element => {
            if (element === elementForUnlock) {
                element.isLocked = false;
            }
            return element;
        });

        updateStorage(storageCopy);
    }

    function onCopy(string) {
        navigator.clipboard.writeText(string)
            .then(() => {
                // Do something
            })
            .catch(err => {
                // Do something
            });
    }

    function onDelete(timestamp) {
        let storageCopy = [].concat(storage);
        const elementForDelete = storageCopy.find(element => element.timestamp === timestamp);

        updateStorage(storageCopy.filter(element => element.timestamp !== elementForDelete.timestamp));
    }

    return (
        <div className='history'>

            {storage.some(element => element.isLocked) &&
                <>
                    <div className='history__title'>LOCKED</div>
                    {storage
                        .filter(element => element.isLocked)
                        .map(element =>
                            <Element
                                key={element.timestamp}
                                avatarURL={element.avatarURL}
                                nickName={element.nickName}
                                date={howLongAgo(element.timestamp)}
                                isLocked={element.isLocked}
                                onLock={() => onLock(element.timestamp)}
                                onUnlock={() => onUnlock(element.timestamp)}
                                onCopy={() => onCopy(element.searchRequest)}
                                onDelete={() => onDelete(element.timestamp)}
                            />
                        )}
                </>
            }

            {storage.some(element => !element.isLocked) &&
                <>
                    <div className='history__title'>HISTORY</div>
                    {storage
                        .filter(element => !element.isLocked)
                        .map(element =>
                            <Element
                                key={element.timestamp}
                                avatarURL={element.avatarURL}
                                nickName={element.nickName}
                                date={howLongAgo(element.timestamp)}
                                isLocked={element.isLocked}
                                onLock={() => onLock(element.timestamp)}
                                onUnlock={() => onUnlock(element.timestamp)}
                                onCopy={() => onCopy(element.searchRequest)}
                                onDelete={() => onDelete(element.timestamp)}
                            />
                        )}
                </>
            }

            {storage.length === 0 &&
                <div className='history__empty'>THERE IS NOTHING...</div>
            }

        </div>
    )
};

export default History;