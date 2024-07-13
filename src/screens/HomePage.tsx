import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IResult, getData } from '../api/service';
import { setData, setSelectedType } from '../store/listReducer';
import { RootState } from '../store/store';
import { ListItem, CategoriesList } from '../components';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import moment from 'moment';

export default function HomePage() {
    const { data, selectedType } = useSelector((state: RootState) => state.list);
    const dispatch = useDispatch()
    const [filteredData, setFilteredData] = useState<IResult[]>(data)
    const [search, setSearch] = useState<string>('')
    const [sortingType, setSortingType] = useState<string>('asc');
    const [viewMode, setViewMode] = useState<string>('list')
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getData();
                dispatch(setData(res.results));
            } catch (error) {
                setLoading(false)
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();

    }, [dispatch]);

    useEffect(() => {

        let filtered = (selectedType ? data.filter(item => item.Type === selectedType) : data)
            .filter(item => {
                const formattedYear = moment(item.Year.trim(), 'YYYYMMDD').format('MMMM Do, YYYY');
                return (
                    item.Title.toLowerCase().includes(search.toLowerCase()) ||
                    formattedYear.toLowerCase().includes(search)
                )
            });

        filtered = filtered.sort((a, b) => {
            const titleA = a.Title.toLowerCase();
            const titleB = b.Title.toLowerCase();
            if (titleA < titleB) return sortingType === 'asc' ? -1 : 1;
            if (titleA > titleB) return sortingType === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredData(filtered);
    }, [data, selectedType, search, sortingType]);


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleClear = () => {
        setSearch("");
    };

    const handleChangeView = () => {
        setViewMode(prevViewMode => (prevViewMode === 'list' ? 'grid' : 'list'));
    };

    const handleRefresh = () => {
        setSearch("");
        dispatch(setSelectedType(null))
    }

    const handleSort = () => {
        setSortingType(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <Container className='min-vh-100 d-flex flex-column'>
            <Form className="mb-3 mt-4 align-self-center">
                <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                    <Form.Group controlId="search" className="mb-md-0">
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                    <div className="d-flex flex-wrap gap-2">
                        <Button onClick={handleClear}>Clear</Button>
                        <Button onClick={handleRefresh}>Refresh</Button>
                        <Button onClick={handleSort}>
                            Sort ({sortingType === 'asc' ? 'Asc' : 'Desc'})
                        </Button>
                    </div>
                </div>
            </Form>
            <Row>
                <Col xs={12} md={3}>
                    <CategoriesList />
                    <Button onClick={handleChangeView}>
                        Change view
                    </Button>
                </Col>
                <Col xs={12} md={8}>
                    {loading ?
                        <div className="h-100 d-flex justify-content-center align-items-center">
                            <Spinner className="d-flex justify-content-center align-items-center" animation="border" role="status" />
                        </div>
                        :
                        <Row className={`d-flex flex-${viewMode === 'grid' ? 'row' : 'column'}`}>
                            {filteredData?.map((item: IResult) => (
                                <Col xs={12} md={viewMode === 'grid' ? 4 : 12} key={item.imdbID}>
                                    <ListItem viewMode={viewMode} item={item} />
                                </Col>
                            ))}
                        </Row>}
                </Col>
            </Row>
        </Container>
    );
}
