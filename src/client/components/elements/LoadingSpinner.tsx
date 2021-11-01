import React, { ReactElement } from 'react';
import Loader from 'react-loader-spinner';
import styles from '../../styles/LoadingSpinner.module.scss';

export default function LoadingSpinner(): ReactElement {
    return (
        <div className={styles.loading}>
            Loading...
            <Loader
                type="ThreeDots"
                color="#fac240"
                height={100}
                width={100}
                timeout={15000} //3 secs
            />
        </div>
    )
}
