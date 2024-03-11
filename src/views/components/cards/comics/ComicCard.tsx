import { Comic } from '@/src/modules/comics/domain/Comic';
import './comic-card.css';

type ComicCardProps = {
  loading: boolean;
  comicData?: Comic;
};

const ComicCard: React.FC<ComicCardProps> = ({ comicData, loading = true }) => {
  return (
    <div className="comic-card">
      <div className="comic-card--image">
        {!loading && (
          <img
            className="comic-card--image__content"
            src={`${comicData?.thumbnail?.path}.${comicData?.thumbnail?.extension}`}
          />
        )}

        {loading && <div className="comic-card--img-loading"></div>}
      </div>
      <div className="comic-card--footer">
        <div className="comic-card--footer__description">
          <div className="comic-card--footer__description--name">
            {!loading && <span>{comicData?.title}</span>}
            {loading && <span className="comic-card--text-loading"></span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
