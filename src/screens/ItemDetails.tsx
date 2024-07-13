
import { Button, Container, Image } from 'react-bootstrap';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ItemDetails() {

    const { state } = useLocation()
    const formattedYear = moment(state.Year.trim(), 'YYYYMMDD').format('MMMM Do, YYYY');
    const navigate = useNavigate()

    return (
        <div className="vh-100 d-flex flex-column justify-content-start align-items-center p-3">
            <Button onClick={() => navigate(-1)} className='d-flex top-10 align-items-center gap-2 align-self-start'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                </svg>
                Back
            </Button>
            <Container style={{ background: 'lightblue' }} className=' w-25 rounded p-3 d-flex flex-column align-items-center mb-2 text-black'>
                <Image
                    src={state.Poster}
                    thumbnail
                    style={{ width: '150px', height: '150px' }}
                />
                <div className='mt-2 text-center'>
                    <h3>{state.Title}</h3>
                    <h5>{formattedYear}</h5>
                    <p>{state.Type}</p>
                </div>
            </Container>
        </div>
    );
}
