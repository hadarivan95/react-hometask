import { ChangeEvent, useState } from 'react';
import { IResult, updateName } from '../api/service';
import { Col, Form, Image, Row } from 'react-bootstrap';
import moment from 'moment';
import './styles.css';
import { useNavigate } from 'react-router-dom';

export default function VerticalListItem({ item, viewMode }: { item: IResult, viewMode: string }) {
    const formattedYear = moment(item.Year.trim(), 'YYYYMMDD').format('MMMM Do, YYYY');
    const [imageLoaded, setImageLoaded] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [name, setName] = useState<string>(item.Title);
    const [tempTitle, setTempTitle] = useState<string>(item.Title);
    const navigate = useNavigate();

    const handleNameClick = () => {
        setIsEditing(true);
    };

    const handleBlur = async () => {
        if (tempTitle !== name) {
            try {
                // mock api request (in service.ts)
                // await updateName({ imdbID: item.imdbID, Title: tempTitle });
                setName(tempTitle);
            } catch (error) {
                setTempTitle(name);
                console.error('There was an error updating the item!', error);
            } finally {
                setIsEditing(false);
            }
        } else {
            setIsEditing(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTempTitle(e.target.value);
    };

    return (
        <div key={item.imdbID} className={`my-container ${viewMode === 'grid' ? 'h-70 d-flex text-center' : 'h-50'}`}>
            <Row className={`gap-2 d-flex align-items-center`}>
                {item.Poster !== "N/A" && imageLoaded && (
                    <Col
                        className="img-button"
                        onClick={() => navigate(`/details/${item.imdbID}`, { state: item })}
                        xs={12}
                        md={viewMode === 'grid' ? 12 : 2}
                    >
                        <Image
                            src={item.Poster}
                            thumbnail
                            style={{ width: '150px', height: '150px' }}
                            onError={() => setImageLoaded(false)}
                        />
                    </Col>
                )}
                <Col xs={12} md={viewMode === 'grid' ? 12 : item.Poster !== "N/A" ? 4 : 12} className="item-content">
                    {isEditing ? (
                        <Form.Control
                            value={tempTitle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            placeholder="Title"
                        />
                    ) : (
                        <h6 onClick={handleNameClick}>{name}</h6>
                    )}
                    <p>{formattedYear}</p>
                </Col>
            </Row>
        </div>
    );
}
