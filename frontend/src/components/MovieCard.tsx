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
    className="card bg-dark border-0 m-2 shadow-sm position-relative overflow-hidden"
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
    {/* Poster Image */}
    <img
      src={url}
      alt={title}
      className="card-img-top h-100 w-100 object-fit-cover"
      style={{ objectFit: 'cover' }}
    />

    {/* Title Overlay at Bottom */}
    <div
      className="position-absolute w-100 text-center"
      style={{
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        color: 'white',
        padding: '0.5rem',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
      }}
    >
      {title}
    </div>
  </div>
</Link>



    );
}