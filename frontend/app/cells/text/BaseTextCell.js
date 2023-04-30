import formatValue from "@kangas/lib/formatValue"

import classNames from 'classnames/bind';
import styles from '../Cell.module.scss';
const cx = classNames.bind(styles);

const TextCell = ({ value, style }) => {
    return (
        <div className={cx("cell-content")} style={style}>
            {`${formatValue(value, 'TEXT')}`}
        </div>
    );

}

export default TextCell;
