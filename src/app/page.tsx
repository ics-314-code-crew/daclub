import { Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col xs={4} />

        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h1>Welcome to Da Club!</h1>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;

// -------CODE BELOW IS FROM MY ORIGINAL ISSUE BRANCH-------//

// 'use client';

// import { Card, Col, Container, Row } from 'react-bootstrap';

// /** The Home page. */
// const Home = () => {
//   // Example club data
//   const clubs = [
//     {
//       id: 1,
//       name: 'Club 1',
//       logo: 'logoTest.png', // Replace with an actual image path or URL
//       description: 'Insert description here.',
//     },
//     {
//       id: 2,
//       name: 'Club 2',
//       logo: 'logoTest.png', // Replace with an actual image path or URL
//       description: 'Insert description here.',
//     },
//     {
//       id: 3,
//       name: 'Club 3',
//       logo: 'logoTest.png', // Replace with an actual image path or URL
//       description: 'Insert description here.',
//     },
//   ];

//   return (
//     <main>
//       <Container id="landing-page" fluid className="py-3">
//         <Row className="align-middle text-center">
//           <Col xs={8} className="d-flex flex-column justify-content-center" />
//         </Row>

//         <Container>
//           <Row className="mt-5">
//             {clubs.map((club) => (
//               <Col key={club.id} xs={12} md={4} className="mb-4">
//                 <Card className="h-100">
//                   <div className="card-header text-center" style={{ backgroundColor: '#41d538' }}>{club.name}</div>
//                   <Card.Img
//                     variant="top"
//                     src={club.logo}
//                     alt={`${club.name} logo`}
//                     className="p-3"
//                   />
//                   <Card.Body>
//                     <Card.Text>{club.description}</Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </Container>
//     </main>
//   );
// };

// export default Home;
