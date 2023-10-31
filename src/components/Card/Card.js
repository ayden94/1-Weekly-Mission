import styles from './Card.module.css';
import kebabImg from '../../assets/images/kebab.svg';
import noImg from '../../assets/images/no-image.svg';
import starIcon from '../../assets/images/star.svg';
import { useState } from 'react';
import { formatDate, formatTimeAgo } from '../../utils/formatDate';

function Card({ card, shared }) {
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  const hoverImage = hover ? styles.hoverImage : '';
  const hoverBg = hover ? styles.hoverBgColor : '';

  const imageStyle = `${styles.image} ${hoverImage}`;
  const bgColorStyle = `${styles.root} ${hoverBg}`;

  const bgImg = {
    backgroundImage: `url(${unifyCardData(card).imageSource || noImg})`,
  };

  function unifyCardData(card) {
    if (card.createdAt) {
      return {
        createdAt: card.createdAt,
        imageSource: card.imageSource,
      };
    } else if (card.created_at) {
      return {
        createdAt: card.created_at,
        imageSource: card.image_source,
      };
    }
  }

  return (
    <div
      className={bgColorStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <a href={card.url}>
        <div className={imageStyle} style={bgImg}>
          {shared === 'off' && (
            <button type="button" className={styles.star}>
              <img src={starIcon} alt="즐겨찾기" />
            </button>
          )}
        </div>
        <div className={styles.explanation}>
          <div className={styles.header}>
            <div>{formatTimeAgo(unifyCardData(card).createdAt)}</div>
            {shared === 'off' && (
              <button type="button">
                <img src={kebabImg} alt="쩜쩜쩜" />
              </button>
            )}
          </div>
          <div className={styles.text}>
            <div>{card.title}</div>
            <div>{card.description}</div>
          </div>

          <div className={styles.footer}>
            {formatDate(unifyCardData(card).createdAt)}
          </div>
        </div>
      </a>
    </div>
  );
}

export default Card;
