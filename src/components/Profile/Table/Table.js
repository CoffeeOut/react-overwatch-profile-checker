import React from 'react';
import './Table.scss';

const Table = ({title, keys, values}) => {

    if(values.every(value => !value)) return ('');

    return (
        <div className='profile-table'>
            <div className='profile-table__title-wrapper'>
                <p className='profile-table__title'>{title}</p>
            </div>
            {values.map((value, i) =>
                !!value &&
                <div className='profile-table__table-row'>
                    <p className='table-row__key'>{keys[i]}</p>
                    <p className='table-row__value'>{value}</p>
                </div>
            )}
        </div>
    )
};

export default Table;