import { Container, Row, Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <Container 
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  }}>
    <Row className="justify-content-md-center">
      <Spinner animation="border" />&nbsp;Loading...
    </Row>
  </Container>
);

export default LoadingSpinner;
