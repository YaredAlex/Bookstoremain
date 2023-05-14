import { useNavigate } from 'react-router-dom'

const Books = ({ document }) => {
    const navigate = useNavigate();
    const showBookDetail = (id) => {
        console.log(document)
        navigate(`detail/${id}`);
    }
    return (
        <div>
            <div className='card-scroll-horizontal'>
                {document && document.map((item, index) => (
                    <div className='book-card-container' key={index}
                        onClick={() => showBookDetail(item.id)}
                    >
                        <div className='book-card-img-container'>
                            <img src={item.imageUrl} className="book-img" alt={item.name} />
                        </div>
                        <div>
                            {item.name.length > 15 ? <p>{item.name.substring(0, 15)}...</p> :

                                <p>{item.name.substring(0, 15)}</p>}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Books