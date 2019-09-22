import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
//styles
import { styles } from '@togakure/styles';
const classes = styles.button;

/**
 * Button Component
 * @extends { PureComponent }
 * @class
 */
class Button extends PureComponent {
  /**
   * defaultProps
   * @property {Boolean} active
   * @property {Boolean} disabled
   * @property {Boolean} block
   * @property {Boolean} outline
   * @property {Boolean} rounded
   * @property {Boolean} circle
   * @property {Boolean} loading
   * @property {String} style
   * @property {String} size
   * @property {String} type
   * @property {Boolean} children
   * @property {String} className
   */
  static defaultProps = {
    active: false,
    disabled: false,
    block: false,
    outline: false,
    rounded: false,
    circle: false,
    loading: false,
    style: 'default',
    size: 'medium',
    type: 'button',
    children: false,
    className: undefined
  };

  /**
   * propTypes
   * @property {Boolean} active
   * @property {Boolean} disabled
   * @property {Boolean} block
   * @property {Boolean} outline
   * @property {Boolean} rounded
   * @property {Boolean} circle
   * @property {String} style
   * @property {String} loading
   * @property {String} size
   * @property {String} type
   * @property {Function} onClick
   * @property {Object} children
   * @property {String} className
   */
  static propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    circle: PropTypes.bool,
    loading: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    style: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger', 'transparent']),
    size: PropTypes.oneOf(['mini', 'small','medium', 'large', 'none']),
    onClick: PropTypes.func,
    children: PropTypes.any.isRequired,
    className: PropTypes.string
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const { active, outline, rounded, circle, block, style, size, disabled, loading, onClick, children, type, className, ...elementProps } = this.props;

    const fullClassName = classNames(
      className,
      {
        [`${classes[style]}`]: style,
        [`${classes[size]}`]: size,
        [`${classes.block}`]: block,
        [`${classes.outline}`]: outline,
        [`${classes.rounded}`]: rounded,
        [`${classes.circle}`]: circle,
        [`${classes.active}`]: active,
        [`${classes.loading}`]: loading
      });

    if (!children) {
      return null;
    }

    return (
      <button
        {...elementProps}
        type={type}
        className={fullClassName}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

/**
 * @example <Button>Text</Button>
 */
export default Button;
