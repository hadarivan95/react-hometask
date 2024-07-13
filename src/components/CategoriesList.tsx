import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSelectedType } from '../store/listReducer';
import './styles.css';

export default function CategoriesList() {

    const { data, selectedType } = useSelector((state: RootState) => state.list);
    const dispatch = useDispatch()
    const typeCounts = data.reduce<Record<string, number>>((acc, item) => {
        acc[item.Type] = (acc[item.Type] || 0) + 1;
        return acc;
    }, {});

    const types = Object.keys(typeCounts);
    const handleSelected = (type: string) => {
        dispatch(setSelectedType(type))
    }

    return (
        <Container className='tab-view'>
            {types.map((type) => (
                <div
                    style={{ fontWeight: selectedType === type ? 'bold' : 'normal' }}
                    key={type}
                    className="category-item"
                    onClick={() => handleSelected(type)}
                >
                    {type} ({typeCounts[type]})
                </div>
            ))}
        </Container>
    );
};

