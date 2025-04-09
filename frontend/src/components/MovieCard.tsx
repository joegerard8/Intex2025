import { Link } from 'react-router-dom';

type MovieCardProps = {
    url: string;
    title: string;
    showId: string;
};

export default function MovieCard({ url, title, showId }: MovieCardProps) {
    return (
        <Link to={`/moviedetails/${showId}`} className="text-decoration-none text-light">
        <div
            className="card bg-dark border-0 m-2 shadow-sm transition-transform"
            style={{
            width: '180px',
            height: '300px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
        >
            <div className="card-img-top-wrapper" style={{ height: '80%', overflow: 'hidden' }}>
            <img
                src={url}
                alt={title}
                className="card-img-top h-100 w-100 object-fit-cover"
                style={{ objectFit: 'cover' }}
            />
            </div>
            <div className="card-body d-flex align-items-end justify-content-center p-2" style={{ height: '20%' }}>
            <h6 className="card-title text-center mb-0 text-white">{title}</h6>
            </div>
        </div>
        </Link>

    );
}